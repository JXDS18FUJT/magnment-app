import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        footerNavSelect:0,
        installSelected:{
        }
    },
    mutations: {
        //根据传来的参数（数字）来改变footerNavSelect的值
        selectFooterNav:function(val){
            this.state.footerNavSelect = val
        },
        selectInstall(state,val){
            state.installSelected = val           
        }
    },
    actions: {
    },
    modules: {
    }
});
