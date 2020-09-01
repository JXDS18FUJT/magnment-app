import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import { Notify } from 'vant';
import { Toast } from 'vant';

import './assets/style/_commonReset.scss';
import './assets/style/_resetMobile.scss';
import './assets/iconfont/iconfont.css';


if (process.env.NODE_ENV == 'development') {    // 判断是否为开发模式
    require('./mock/index.js')
}

import topBack from './components/topBack.vue'
Vue.component('topBack', topBack)
Vue.config.productionTip = false;
Vue.use(Vant);
Vue.use(Notify)

const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
const recalc = function () {
    const clientWidth = document.documentElement.clientWidth;

    if (!clientWidth) {
        return false;
    }

    if (clientWidth >= 750) {
        document.documentElement.style.fontSize = '100px';
    } else {
        document.documentElement.style.fontSize = 100 * (clientWidth / 750) + 'px';
    }
};

// 添加事件句柄
window.addEventListener(resizeEvt, recalc, false);
document.addEventListener('DOMContentLoaded', recalc, false);
document.body.addEventListener('touchstart', function () { }, false);


var time = ""; // 保存第一次按键时间；
// 监听返回按钮
//此处使用的h5返回事件
document.addEventListener("plusready", function () {
    plus.key.addEventListener("backbutton", function () {
        var webview = plus.webview.currentWebview();
        var url = location.hash;
        console.log(url)
        if (url == "#/index") {
            //|| url == "#/my" ||   url == "#/order" ||  url == "#/monitor"
            // 处于app首页,满足退出app操作
            Toast({
                message: '再按一次返回键退出App',
                position:'bottom'});
            if (new Date() - time < 2000) {
                // 小于2s,退出app
                webview.close();
            } else {
                // 大于2s，重置时间戳，
                time = new Date();
            }
            return;
        } else {
            console.log(url)
            history.go(-1); // 不满足退出操作，返回
        }
    }, false);
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
