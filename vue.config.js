const webpack = require("webpack");

// 配置webpack.base.conf.js
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}


module.exports = {
    configureWebpack: {
        externals: {
            "BMap": "BMap",
            "AMap": "window.AMap",
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    publicPath: './',//打包后的位置(如果不设置这个静态资源会报404)
    outputDir: 'dist',//打包后的目录名称
    assetsDir: 'static',//静态资源目录名称
    lintOnSave: true,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('layout',resolve('src/layout'))
            .set('base',resolve('src/base'))
            .set('static',resolve('src/static'))
    }
}
