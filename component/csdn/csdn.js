import React, { Component } from 'react';
import './csdn.scss';
import {Layout,message,List, BackTop ,Avatar, Icon,Button} from 'antd';
const {Content} = Layout;
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
);

class Csdn extends React.Component {
	constructor(props){
		super(props);              
		this.state = {
            chapterList:[],
            size:20,
            loading:true,
            headTitle:'csdn文章',
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
                data:{type:"csdn",pageNo:currPageNo,size:_this.state.size},
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
                        <List itemLayout="vertical" size="large" loading={_this.state.loading} dataSource={chapterList} footer={_this.loadMoreDom()}
                            renderItem={(item,index) => (
                            <List.Item
                                key={item.csdnTitle.replace(/amp;/g,'').replace(/&mdash;/g,'—')}
                                actions={[
                                    <a target="_blank" href={item.csdnUserUrl}><IconText type="user" text={item.csdnNickName}/></a>,
                                    <IconText type="like-o" text={item.csdnViews} />,
                                    <IconText type="message" text={item.csdnComments} />,
                                    <IconText type="history" text={item.csdnCreateDate} />,
                                    item.csdnTags&&(<IconText type="tag" text={item.csdnTags}/>),
                                ]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.csdnAvtar} alt={item.csdnNickName} />}
                                    title={<a target="_blank" href={item.csdnBlogUrl}>{item.csdnTitle.replace(/amp;/g,'').replace(/&mdash;/g,'—')}</a>}
                                    description={item.csdnChapterDesc}
                                />                                
                            </List.Item>
                            )}
                        />                                
                        </div>
                        </Content>                        
                    </Layout>                
                </div>                
            </div>
		)
    }
}

export default Csdn;