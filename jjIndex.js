/**
 * 原生node.js接收前台post请求数据
 */

//引入模块
const express = require('express');
const app = express();
// const fs = require("fs");/*文件模块*/
const _request = require('superagent');/**服务端请求模块 */
const RequestUrl = require('./jjrequestUrl.json');
const mysqlJson = require('./jjmysql.json');

/*
    设置跨域请求
*/
let allowCrossDomain = (req, res, next) =>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:63345');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    res.header('Content-Type','applicatoin/json;charset=utf-8');    
    next();
};
/*使用中间件*/
app.use(allowCrossDomain);
/*声明当数字小于位时返回0+num这种，否则直接返回num*/
let getTen = (num)=>{
    return num<10?'0'+num:num;
}

/*
    mysql链接池
*/
let mysql  = require('mysql'); 
let pool = mysql.createPool(mysqlJson.mysql);

let querySql = (req,res,queryJson)=>{
    let _result = null;
    let startNum = queryJson.pageNo==1?0:(queryJson.pageNo*queryJson.size);
    let query_Sql = (queryJson.type=="juejin"?mysqlJson.jjSql.SELECT:mysqlJson.csdnSql.SELECT)+` limit ${startNum},${queryJson.size}`;    
    pool.getConnection((err,conn)=>{
        if(err){
            if(req.query.callback){res.jsonp({"status":400,"result":null});/*这里处理*/}res.end();return;
        }
        conn.query(query_Sql, (_err, result) =>{
            if(_err){
                console.log(_err);
                if(req.query.callback){res.jsonp({"status":400,"result":null});/*这里处理*/}res.end();return;
            }
            if(result){                                
                /*响应jsonp事件*/
                if(req.query.callback){            
                    let _result = JSON.parse(JSON.stringify(result));                    
                    res.jsonp({"status":200,"result":_result});/*这里处理*/
                }
            }else{
                console.log('???');
                if(req.query.callback){            
                    res.jsonp({"status":300,"result":null});/*这里处理*/
                }
            }
            conn.release();
            res.end();        
        });            
    });
}

/**增加数据 */
let addChapter = (sqlParams,conn,type)=>{
    let addSql = type=="juejin"?mysqlJson.jjSql.REPLACE:mysqlJson.csdnSql.REPLACE;
    conn.query(addSql,[sqlParams], (_err, result) =>{
        if(_err){console.log('[insert error] - ',_err);return;}
        if(result){console.log(`-----------${type}添加成功-----------`);}
        conn.release();        
    });
};

let addSql = (sqlParams,res,type)=>{
    pool.getConnection((err,conn)=>{
        addChapter(sqlParams,conn,type);
    });
};

app.get('/queryList', (req, res) =>{
    if(req.query){
        delete req.query._;
        querySql(req,res,{type:req.query.type,pageNo:req.query.pageNo,size:req.query.size||10});
    }
});

/**掘金爬取代码 */
function juejinReq(){
    if(!RequestUrl.juejinReq.hasNextPage){
        console.log('已经请求到底了！！！');
        return false;
    }
    _request.post(RequestUrl.juejinReq.juejinUrl).send(RequestUrl.juejinReq.requestHead).set("x-Agent","Juejin/Web").set("Accept","application/json").then(res => {
        /**请求成功，添加数据至数据库 */        
        if(res.body && res.body.data){
            try {
                let edges = res.body.data.articleFeed.items.edges||[];
                let newEdges = [];
                RequestUrl.juejinReq.hasNextPage = res.body.data.articleFeed.items.pageInfo.hasNextPage;
                if(res.body.data.articleFeed.items.pageInfo.hasNextPage){
                    /**下一页的判断 */
                    RequestUrl.juejinReq.requestHead.variables.after = res.body.data.articleFeed.items.pageInfo.endCursor||"";
                }
                edges.map((item,index)=>{
                    let chapterId = item.node.id,/**添加数据库时需要查询是否有重复id，如有更新对应其他字段数据，否则新增 */
                        chapterName = item.node.title||"程序员技术文章",
                        chapterLikeCount = item.node.likeCount||0,
                        chapterCommentsCount = item.node.commentsCount||0,
                        chapterTags = "",
                        chapterUsername = item.node.user.username||"",
                        chapterUrl = item.node.originalUrl||"";
                    item.node.tags.map((_item,_index)=>{
                        chapterTags = _index==0?(_item.title):(chapterTags+"&nbsp;/&nbsp;"+_item.title);
                    });
                    let chapters = [chapterId,chapterName,chapterLikeCount,chapterCommentsCount,chapterTags,chapterUsername,chapterUrl];
                    newEdges.push(chapters);
                });            
                addSql(newEdges,res,"juejin");
            } catch (error) {
                console.log(error,error.name,error.message);
            }
        }else{
            console.log(res.body.data,typeof res.body.data,'数据异常');
        }
    }).catch(err => {
        console.log('请求失败',err.message);
    });
}

/**爬取csdn前端文章 */
function csdnReq(){
    _request.post(RequestUrl.csdnReq.cdsnUrl).set("Accept","application/json").then(res => {
        /**请求成功，添加数据至数据库 */
        if(res.body && res.body.articles){
            try {   
                let newArticles = [];                    
                res.body.articles.map((item,index)=>{                    
                    let csdnTitle = item.title,
                        csdnNickName = item.nickname,
                        csdnAvtar = item.avatar,
                        csdnCreateDate = item.created_at,
                        csdnChapterDesc = item.desc,
                        csdnUserUrl = item.user_url,
                        csdnBlogUrl = item.url,
                        csdnViews = item.views,
                        csdnComments = item.comments,
                        csdnId = item.id,
                        csdnTags = item.tag;
                    let items = [csdnTitle,csdnNickName,csdnAvtar,csdnCreateDate,csdnChapterDesc,csdnUserUrl,csdnBlogUrl,csdnViews,csdnComments,csdnId,csdnTags];
                    newArticles.push(items);                    
                });
                addSql(newArticles,res,"csdn");
            } catch (error) {
                console.log(error,error.name,error.message);
            }
        }else{
            console.log(res.body.articles,typeof res.body.articles,'数据异常');
        }
    }).catch(err => {
        console.log('请求失败',err.message);
    });
}

// 定义一个函数，用来获取掘金或者csdn前端文章
function getInfo (type) {
    // 利用superagent 模块发送请求，获取前20篇文章。注意请求头的设置和POST请求体数据（请求参数）
    if(type == "juejin"){
        juejinReq();
    }else if(type == "csdn"){
        csdnReq();
    }
    
}

function mapreq(){
    getInfo("juejin");
    getInfo("csdn");
}
mapreq();

// 设置定时器，规定1分钟更新一此数据，假设1分钟更新一次
setInterval(() => {
    mapreq();
}, 1000*60*100);


/*监听服务器*/
let server = app.listen(4567, ()=> {
    let host = server.address().address;
    let port = server.address().port;
    console.log('cmrLog app listening at http://%s:%s', host, port);    
});