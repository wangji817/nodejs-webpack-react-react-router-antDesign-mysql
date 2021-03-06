import React, { Component } from 'react';
import {BrowserRouter,Route,Link} from "react-router-dom";
import Home from '../../component/home/home.js';
import Csdn from '../../component/csdn/csdn.js';
import Codem from '../../component/codem/codem.js';
import {Layout, BackTop ,Menu, Dropdown, Icon,Affix} from 'antd';
const { SubMenu }  = Menu;
const {Header, Footer} = Layout;
import './app.scss';

class App extends React.Component {
	constructor(props){
		super(props);              
		this.state = {            
            loading:true,
            inlineCollapsed:false,
            bottomTitle:"Powered by Night  | Copyright © xyji | v2016 - v"+new Date().getFullYear()
        }
    }        
    onChangeItem(openKeys){        
        this.setState({
            inlineCollapsed:false
        });
    }
    setAppState(_state){
        this.setState(_state);
    }
    menuDom(){
        return (            
            <Menu>
                <Menu.Item>
                    <Link className="router-link" to="/views">掘金文章</Link>                                    
                </Menu.Item>
                <Menu.Item>                                    
                    <Link className="router-link" to="/views/csdn">csdn文章</Link>
                </Menu.Item>
                <Menu.Item>                                    
                    <Link className="router-link" to="/views/codem">在线代码编辑</Link>
                </Menu.Item>
            </Menu>
        )
    }
    render() {
        const _this = this;        
        let chapterList = _this.state.chapterList;        
		return (
			<div className="cmr-home">
                <BrowserRouter>
                    <div className="cmrlog-main" ref="main">
                        <Layout>
                            <Header>
                                <div className="header-title">这是一个优质的网站，包括技术文章和在线代码编辑</div>
                                <Affix style={{zIndex:20,top:0,right:0,width:"100%",hieght:"100%",overflow:"hidden"}} offsetTop={0}>
                                    <Dropdown overlay={_this.menuDom()}>
                                        <div className="ant-dropdown-link">
                                            切换平台<Icon type="down" />
                                        </div>
                                    </Dropdown>
                                </Affix>
                            </Header>
                            <Route exact path="/views" component={Home}/>                            
                            <Route exact path="/views/csdn" component={Csdn}/>
                            <Route exact path="/views/codem" component={Codem}/>
                            <Footer>
                                <div className="footer-title">{_this.state.bottomTitle}</div>
                            </Footer>
                        </Layout>
                    </div>
                </BrowserRouter>
                <BackTop />
            </div>
		)
    }
}
export default App;