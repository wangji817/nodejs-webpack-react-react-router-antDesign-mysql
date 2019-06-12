/*
	作者:night
	时间:2017-11-28
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const CompressionPlugin = require("compression-webpack-plugin");
let dirJson = {
    srcDir:__dirname+'/src/'
};
let getEntry = () =>{
    var jsPath = path.resolve(dirJson.srcDir);/*先取到总的页面文件夹父级路径*/
    var dirs = fs.readdirSync(jsPath);/*读取该路径下的所有文件夹对象*/
    var files = {};    
    dirs.forEach((item) => {
        if(item.indexOf(".js")==-1 && item.indexOf(".scss")==-1 && item.indexOf(".css")==-1){
            files[item] = path.resolve(dirJson.srcDir, item+'/index.js');
        }
    });
    return files;
}
let entrys = getEntry();
entrys.vendor = ['react'];
module.exports = {    
    entry: entrys,
    output: {path: path.resolve(__dirname, './dist/'),filename: '[name]/[name].js',hotUpdateChunkFilename: './hot/hot-update.js',hotUpdateMainFilename: './hot/hot-update.json'},
    devServer: {
        port: 5678,compress:true,progress:true,host:"0.0.0.0",disableHostCheck:true,        
        contentBase:path.resolve(__dirname,"./"),
        proxy:{
            "/queryList":{target:"http://127.0.0.1:4567/queryList",pathRewrite:{'^/queryList':""},changeOrigin:true,secure:true}
        }
    },
    watchOptions:{poll:1000,aggregeateTimeout:500,ignored:/node_modules/},    
    module: {
        rules: [
            {
                test: /\.jsx|\.js$/,loader: 'babel-loader',exclude: /(node_modules|bower_components)/                
            },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {//CSS处理
                test: /\.css$/,
                loader: "style-loader!css-loader?modules",
                exclude: /node_modules/,
            },
            {//antd样式处理
              test:/\.css$/,
              exclude:/src/,
              use:[
                  { loader: "style-loader"},
                  {
                      loader: "css-loader",
                      options:{
                          importLoaders:1
                      }
                  }
              ]
            }
        ]
    },    
    plugins: [        
        new ExtractTextPlugin('[name]/[name].css'),/*样式文件抽取并根据指定加载器编译*/
        new UglifyJSPlugin(),/*css，js资源文件压缩*/
        new webpack.HotModuleReplacementPlugin(),/*热更新*/
        new webpack.optimize.ModuleConcatenationPlugin(),/*作用域提升，使代码体积更小*/
        new webpack.optimize.CommonsChunkPlugin({name:'vendor',filename:'vendor.js'}),/*提取入口文件的第三方模块和公共模块*/
        new webpack.ProvidePlugin({/*引入全局插件，jquery*/
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]    
};