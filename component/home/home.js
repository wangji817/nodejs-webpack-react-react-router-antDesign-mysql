import React, { Component } from 'react';
import './home.scss';
import {Layout,message,List, BackTop ,Avatar, Button} from 'antd';
const {Content} = Layout;

class Home extends React.Component {
	constructor(props){
		super(props);              
		this.state = {
            chapterList:[],
            size:20,
            loading:true,
            headTitle:'掘金前端优质文章',
            pageNo:1,
            allFlag:true/**是否全部加载完，默认true，可以继续加载 */
        }        
        this.ajaxFlag = true;
    }
    componentWillMount(){
        document.title = this.state.headTitle;
        this.getAjaxList();
    }
    componentDidMount(){
        const _this = this;
        $(window).on('scroll',()=>{            
            if(_this.getScrollTop()+window.screen.height >= $('#loadBtn')[0].offsetTop){
                _this.getAjaxList();
            }
        });
    }
    componentWillUnmount(){
        this.ajaxFlag = false;
    }
    getScrollTop(){
        let scroll_top = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scroll_top = document.documentElement.scrollTop;
        }
        else if (document.body) {
            scroll_top = document.body.scrollTop;
        }
        return scroll_top;
    }
    getAjaxList(){
        const _this = this;
        const currPageNo = _this.state.pageNo||1,
            nextPageNo = currPageNo+1;
        this.ajaxFlag = true;
        _this.setState({            
            loading:true            
        },()=>{            
            $.ajax({
                url: '/queryList',
                type: 'get',
                data:{type:"juejin",pageNo:currPageNo,size:_this.state.size},
                dataType:"jsonp",
                jsonp:"callback",
                callback:"jsonpcallback"+new Date().getTime()
            }).done((returnData) =>{                
                if(returnData && typeof returnData == "object"){                    
                    if(_this.ajaxFlag){
                        if(!returnData.result || returnData.result.length == 0){
                            _this.setState({
                                loading:false,
                                allFlag:false
                            },()=>{
                                $(window).off('scroll');
                            });
                            return;
                        }
                        _this.setState({
                            chapterList:_this.state.chapterList.concat(returnData.result||[]),
                            loading:false,
                            allFlag:true,
                            pageNo:nextPageNo
                        },()=>{                            
                            message.success('请求成功！！！',2);
                        });
                    }
                }else{
                    message.error('请求失败！！！',2);
                }
            }).fail((error) =>{
                message.error('请求失败！！！',2);
            });            
        });
    }
    loadMoreDom(){
        let _this = this;
        if(!_this.state.loading && _this.state.chapterList.length > 0 && _this.state.allFlag){
            return(
                <div style={{textAlign: 'center',marginTop: 12,height: 32,lineHeight: '32px'}}>
                    <Button id="loadBtn">loading ...</Button>
                </div>
            )
        }else{
            if(!_this.state.allFlag && _this.state.chapterList.length > 0){
                return(
                    <div style={{textAlign: 'center',marginTop: 12,height: 32,lineHeight: '32px'}}>全部加载完毕...</div>
                )
            }
        }
    }
    render() {
        const _this = this;        
        let chapterList = _this.state.chapterList;        
		return (
			<div className="cmr-home">                
                <div className="cmrlog-main" ref="main">
                    <Layout>                        
                        <Content>                            
                            <div className="content-info">
                                <List itemLayout="horizontal" loading={_this.state.loading} footer={_this.loadMoreDom()} dataSource={chapterList} renderItem={
                                    item => (
                                        <List.Item>
                                            <List.Item.Meta avatar={<Avatar src="http://cdn.cmread.com/headIcon/13592361622/5527c1c8a693e08405538b4990cca305ab4e9224449d/defaultmigu.jpg" />} 
                                                title={<div className="chapterUser"><div>{item.chapterUsername} · {item.chapterTags.replace(/&nbsp;/g,' ')}</div></div>}
                                                description={<div className="chapterInfo"><a className="chapterUrl" href={item.chapterUrl}>{item.chapterName}</a><div className="chapterCount"><Avatar size={20} src="https://b-gold-cdn.xitu.io/v3/static/img/zan.e9d7698.svg"/><span className="chapterText">{item.chapterLikeCount}</span></div><div className="chapterCount"><Avatar size={20} src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg"/><span className="chapterText">{item.chapterCommentsCount}</span></div></div>}/>
                                        </List.Item>)}/>
                            </div>                            
                        </Content>                        
                    </Layout>                
                </div>
                <BackTop />
            </div>
		)
    }
}

export default Home;