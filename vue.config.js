const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    publicPath: './',
    productionSourceMap: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
          }
        //   if (isProduction) {
        //     config.externals = {
        //       'vue': 'Vue',
        //       'element-ui' : 'ELEMENT',
        //       'axios' : 'axios'
        //     }
        //   }
      },
    devServer: {
        // https:true,
        proxy: {
            '/api':{
                target:'http://jsonplaceholder.typicode.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
            '/ms':{
                target: 'http://118.190.246.24:8888/swagger-ui.html',
                changeOrigin: true
            }
        }
    },
}