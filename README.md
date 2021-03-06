### 基于nodejs+react+react-router+webpack+antDesign+mysql环境的爬取掘金跟csdn文章项目
### 由于最近做项目紧，暂更
##### 开场白：
> 小明：你知道什么是爬虫吗？<br/>
小红：知道啊。<br/>
小明：是一种在地上爬的虫子吗？<br/>
小红：不是，它不是真正意义上的昆虫。是一种网络爬虫（又被称为网页蜘蛛，网络机器人，在FOAF社区中间，更经常的称为网页追逐者），是一种按照一定的规则，自动地抓取万维网信息的程序或者脚本。另外一些不常使用的名字还有蚂蚁、自动索引、模拟程序或者蠕虫。<br/>
小明：哦！原来如此，我懂了，是计算机里的爬虫。<br/>

##### 爬虫目标
> 以掘金和csdn技术文章作为爬取目标，最终实现至本地网页展示、后续还可以不停新增别的爬取目标。

##### 文件说明
```
|-- README.md 项目描述文件
|-- asset 资源文件夹
|   |-- swiper.min.css swiper插件样式文件
|   `-- vendor1.0.min.css 基础样式文件
|-- component 组件文件夹
|   |-- app 主入口组件
|   |   |-- app.js
|   |   `-- app.scss
|   |-- base 组件库
|   |   |-- config.scss
|   |   |-- lazy.js
|   |   |-- pinyin.js
|   |   |-- screenLog.js
|   |   `-- swiper.min.js
|   |-- codem 写代码文件
|   |   |-- codem.js
|   |   `-- codem.scss
|   |-- csdn csdn组件
|   |   |-- csdn.js
|   |   `-- csdn.scss
|   `-- home 掘金组件
|       |-- home.js
|       `-- home.scss
|-- csdnlist.sql csdn数据库表
|-- dist 打包文件夹
|   |-- app
|   |   |-- app.css
|   |   `-- app.js
|   |-- csdn
|   |   |-- csdn.css
|   |   `-- csdn.js
|   |-- home
|   |   |-- home.css
|   |   `-- home.js
|   |-- hot
|   |   |-- hot-update.js
|   |   `-- hot-update.json
|   `-- vendor.js 核心js文件
|-- index.html 主页html用来重定向
|-- jjIndex.js node前端及后端服务主文件
|-- jjchapter.sql 掘金数据库表文件
|-- jjmysql.json 数据库json文件
|-- jjrequestUrl.json 爬取相关配置文件
|-- package-lock.json 
|-- package.json 项目配置文件
|-- src 入口文件夹
|   `-- app app入口文件
|       |-- index.js
|       `-- index.scss
|-- views 静态页面文件夹
|   `-- index.html 默认静态页面
`-- webpack.config.js webpack配置文件
```

##### 爬虫技术
> 1）Nodejs作为核心后端爬取媒介<br/>
2）Mysql作为数据存储<br/>
3）Webpack+react+ant Design作为前端页面数据展示<br/>
4）react-router进行组件化页面路由<br/>

##### 爬虫框架
> superagent基于nodejs服务端请求的模块，是轻量级更为优化的ajax API，对比大量糟糕的现存的API，SuperAgent是灵活的、易读的、并且非常易学，同时SuperAgent可用于Node.js！

##### 启动顺序
> 1.git clone 当前项目.git地址<br/>
2.npm install<br/>
3.已安装mysql并已启动，创建jjchapter数据库，导入项目下jjchapter.sql、csdnlist.sql两个数据库表，数据库账号root，密码123456，端口号3306<br/>
4.新开cmd窗口 node jjIndex.js，前提是安装了nodejs，推荐8.5以上稳定版本<br/>
5.新开cmd窗口 npm run online 线上模式 npm run dev 开发模式，开发模式需要新开窗口 npm run build 文件监听；<br/>
6.访问地址：localhost:5678<br/>
7.项目线上地址：[http://www.xyji.top:5678](http://www.xyji.top:5678)

##### 更新日志
1. 更新package.json依赖  
2. 新增codem组件，添加codem路由；
3. git pull更新项目后，npm install 安装依赖，即可启动查看
