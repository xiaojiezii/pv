import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';    //处理接口方法
import element from 'element-ui';
import VueI18n from 'vue-i18n';  //实现中英文切换
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';  // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
// import "babel-polyfill"; 
import global from "./components/page/global"  //全局ip地址
import qs  from "qs";     //方法数据转换成url格式 
import LangENUS from './components/common/lang/en-us';
import LangZHCN from './components/common/lang/zh-cn';
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel.js'
import * as moment from './assets/filters'
import store from './vuex/store'

Vue.prototype.qs = qs;
Vue.config.productionTip = false
Vue.use(VueI18n);
Vue.use(element, {
    size: 'small'
});
Vue.prototype.$axios = axios;
axios.defaults.withCredentials=false;
Vue.prototype.global = global;



const i18n = new VueI18n({
    locale: 'zh-cn',
    messages: {
      'en-us': LangENUS,
      'zh-cn': LangZHCN
    }
  })
  


  Object.keys(moment).forEach(key => {
    Vue.filter(key, moment[key])
  })
  

axios.interceptors.request.use(
    config => {
      //在所有请求头部添加token值
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers.common['Authorization'] = token;
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  );

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const user = sessionStorage.getItem('user');
    // const role = sessionStorage.getItem('role');
    if (!user && to.path !== '/login') {
        next('/login');
     }  //else if (to.meta.permission) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     // role === 3 ? next() : next('/403');
    //     if(role === 1){
    //          next()
    //     }else{
    //        next('/403')
    //     }
    // } 
     else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')