import React, { Component } from 'react';
import './codem.scss';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/blackboard.css';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars';
import {Layout,message,List, BackTop ,Avatar, Icon,Button} from 'antd';
const {Content} = Layout;
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
);

const options = {
    tabSize:4,
    lineNumbers: true,  
    line:true,  
    keymap:"sublime",
    mode:"text/javascript",
    theme:"blackboard",    
    spellcheck:true,
    matchBrackets: true,
    extraKeys:true
};

class Codem extends React.Component {
	constructor(props){
		super(props);              
		this.state = {            
            headTitle:'在线代码编辑',
            code:localStorage.getItem("codem")||'// code',
            allFlag:true/**是否全部加载完，默认true，可以继续加载 */
        }
        this.ajaxFlag = true;
    }
    componentWillMount(){
        document.title = this.state.headTitle;        
    }
    componentDidMount(){
    }
    updateCode(code){
        console.log(this);
        console.log(code);
        this.setState({code:code});
        localStorage.setItem("codem",code);
    }
    
    render() {
        const _this = this;
		return (
			<div className="cmr-codem">                                
                <Layout className="codem-layout">
                    <Content>
                        <CodeMirror autoSave={true} styleActiveLine={true} autoFocus={true} preserveScrollPosition={true} value={this.state.code} onChange={this.updateCode.bind(_this)} options={options} />
                    </Content>                        
                </Layout>                                           
            </div>
		)
    }
}

export default Codem;