import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  // 初始化的数据
  state: {
    staff: localStorage.getItem('staff') ? localStorage.getItem('staff') : null,
      //若localSorage存在token，将值赋给Vuex.state.token
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null
  },
  // 改变state里面的值得方法
  mutations: {
    setUsername(state, staff) {
      state.staff = staff
      // JSON.stringify(ary)
      //将staff存成JSON格式
      localStorage.setItem('staff', JSON.stringify(staff))
      
  },
  setToken(state, token) {
      localStorage.setItem('token', token)
      state.token = token
  },
   //我页面中写了退出登录的按钮所以补了一个logout用来清空localStorage中的数据
  logout(state) {
      localStorage.removeItem('token')
      state.token = null
      localStorage.removeItem('staff')
      state.staff = null
       //我写的RSA加密需向后端获取公钥，为了方便我在拿到公钥后直接存入localStorage中，所以在这里也要清空
      // localStorage.removeItem('publickey')
      // state.publickey=null
      
  }
  }
});
// 输出模块
export default store;

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {}
// });
