webpackJsonp([1],{100:function(e,t,a){"use strict";(function(e){function n(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=a(33),u=n(c),i=a(61),s=n(i),f=a(62),d=n(f),m=a(42),p=n(m),g=a(63),h=n(g),y=a(43),v=n(y),b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},E=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();a(45),a(64),a(65),a(46),a(66),a(47);var j=a(0),x=n(j);a(110);var T=v.default.Content,w=function(t){function a(e){l(this,a);var t=o(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.state={chapterList:[],size:20,loading:!0,headTitle:"掘金前端优质文章",pageNo:1,allFlag:!0},t.ajaxFlag=!0,t}return r(a,t),E(a,[{key:"componentWillMount",value:function(){document.title=this.state.headTitle,this.getAjaxList()}},{key:"componentDidMount",value:function(){var t=this;e(window).on("scroll",function(){t.getScrollTop()+window.screen.height>=e("#loadBtn")[0].offsetTop&&t.getAjaxList()})}},{key:"componentWillUnmount",value:function(){this.ajaxFlag=!1}},{key:"getScrollTop",value:function(){var e=0;return document.documentElement&&document.documentElement.scrollTop?e=document.documentElement.scrollTop:document.body&&(e=document.body.scrollTop),e}},{key:"getAjaxList",value:function(){var t=this,a=t.state.pageNo||1,n=a+1;this.ajaxFlag=!0,t.setState({loading:!0},function(){e.ajax({url:"/queryList",type:"get",data:{type:"juejin",pageNo:a,size:t.state.size},dataType:"jsonp",jsonp:"callback",callback:"jsonpcallback"+(new Date).getTime()}).done(function(a){if(a&&"object"==(void 0===a?"undefined":b(a))){if(t.ajaxFlag){if(!a.result||0==a.result.length)return void t.setState({loading:!1,allFlag:!1},function(){e(window).off("scroll")});t.setState({chapterList:t.state.chapterList.concat(a.result||[]),loading:!1,allFlag:!0,pageNo:n},function(){h.default.success("请求成功！！！",2)})}}else h.default.error("请求失败！！！",2)}).fail(function(e){h.default.error("请求失败！！！",2)})})}},{key:"loadMoreDom",value:function(){var e=this;return!e.state.loading&&e.state.chapterList.length>0&&e.state.allFlag?x.default.createElement("div",{style:{textAlign:"center",marginTop:12,height:32,lineHeight:"32px"}},x.default.createElement(p.default,{id:"loadBtn"},"loading ...")):!e.state.allFlag&&e.state.chapterList.length>0?x.default.createElement("div",{style:{textAlign:"center",marginTop:12,height:32,lineHeight:"32px"}},"全部加载完毕..."):void 0}},{key:"render",value:function(){var e=this,t=e.state.chapterList;return x.default.createElement("div",{className:"cmr-home"},x.default.createElement("div",{className:"cmrlog-main",ref:"main"},x.default.createElement(v.default,null,x.default.createElement(T,null,x.default.createElement("div",{className:"content-info"},x.default.createElement(s.default,{itemLayout:"horizontal",loading:e.state.loading,footer:e.loadMoreDom(),dataSource:t,renderItem:function(e){return x.default.createElement(s.default.Item,null,x.default.createElement(s.default.Item.Meta,{avatar:x.default.createElement(d.default,{src:"http://cdn.cmread.com/headIcon/13592361622/5527c1c8a693e08405538b4990cca305ab4e9224449d/defaultmigu.jpg"}),title:x.default.createElement("div",{className:"chapterUser"},x.default.createElement("div",null,e.chapterUsername," · ",e.chapterTags.replace(/&nbsp;/g," "))),description:x.default.createElement("div",{className:"chapterInfo"},x.default.createElement("a",{className:"chapterUrl",href:e.chapterUrl},e.chapterName),x.default.createElement("div",{className:"chapterCount"},x.default.createElement(d.default,{size:20,src:"https://b-gold-cdn.xitu.io/v3/static/img/zan.e9d7698.svg"}),x.default.createElement("span",{className:"chapterText"},e.chapterLikeCount)),x.default.createElement("div",{className:"chapterCount"},x.default.createElement(d.default,{size:20,src:"https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg"}),x.default.createElement("span",{className:"chapterText"},e.chapterCommentsCount)))}))}}))))),x.default.createElement(u.default,null))}}]),a}(x.default.Component);t.default=w}).call(t,a(60))},110:function(e,t){},289:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var l=a(0),o=n(l),r=a(7),c=n(r),u=a(100),i=n(u);a(290),c.default.render(o.default.createElement("div",{className:"page"},o.default.createElement(i.default,null)),document.getElementById("page"))},290:function(e,t){}},[289]);