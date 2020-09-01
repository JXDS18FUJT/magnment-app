module.exports = {
    publicPath:'./',
    css: {
        loaderOptions: {
            scss: {
                prependData: '@import "@/assets/style/_mixin.scss";'
            }
        }
    },
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        // '/api/*': {
        //     target: 'http://dev150.gszhcloud.com:8091/', // 目标服务器地址
        //     secure: false, // 目标服务器地址是否是安全协议
        //     changeOrigin: true, // 是否修改来源, 为true时会让目标服务器以为是webpack-dev-server发出的请求!
        //     // '/api/login' =>    target + '/login'
        //     pathRewrite: {'^/api': '/'} // 将/api开头的请求地址, /api 改为 /, 即 /api/xx 改为 /xx
        //   }
    },
    lintOnSave: false
};
