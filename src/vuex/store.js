import Vue from 'vue';//引用vue
import Vuex from 'vuex';//引用vuex
Vue.use(Vuex);//使用vuex
const state={
    lock:'',  //数据锁定
    role:'',  //职务
    die:1,
}
export default new Vuex.Store({////暴露Store对象
    state
})