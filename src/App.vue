<template>
  <div id="app">
    <header style="width:100%;background: none;height: 0;">
      <div class="header-container">
        <div class="header-container-content">
          <a class="header-container-logo" href="/" rel="noopener noreferrer">
            <img src="/logo.png" style="width: 60px;" />
          </a>
          <div class="header-container-userinfo">
            <template v-if="!sysUserName">
        <!--弹框-->
        
      <el-dialog title="注册"  :visible.sync="dialogVisible" :close-on-click-modal="true" :modal="false" :show-close="true" :center="true" >
            
      <el-form ref="form" :model="register_form" :rules="rules" label-width="80px">
        
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="register_form.userName" placeholder="请输入用户名">{{register_form.userName}} </el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="register_form.password" placeholder="请输入密码" >{{register_form.password}} </el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="register_form.phone" placeholder="请输入手机号">{{register_form.phone}} </el-input>
            </el-form-item>
          </el-col>
        </el-row> 
      </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

      <el-dialog title="登录"  :visible.sync="dialogVisibleLogin" :close-on-click-modal="true" :modal="false" :show-close="true" :center="true" >     
          <el-form ref="form" :model="login_form" :rules="rules" label-width="80px">
            <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="login_form.userName" placeholder="请输入用户名">{{login_form.userName}} </el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="login_form.password" placeholder="请输入密码" >{{login_form.password}} </el-input>
            </el-form-item>
          </el-col>
        </el-row> 

          </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="login2">确 定</el-button>
            </span>
      </el-dialog>

              <a
                @click="dialogVisibleLogin=true"
                class="header-container-userinfo-login header-container-user-btn header-container-in header-container-user-size"
                role="button"
                tabindex="-1"
              >
                <span>登录</span>
              </a>
              <a
                @click="dialogVisible=true"
                target="_blank"
                class="header-container-userinfo-login header-container-user-btn header-container-hv header-container-user-size"
                role="button"
                tabindex="-1"
              >
                <span>注册</span>
              </a>
            </template>
            <template v-else>
              <a
                class="header-container-banner-item-btn"
              >{{ sysUserName }}</a>
              <a
                href="/Editor"
                class="header-container-user-btn header-container-hv header-container-user-size _1YbC5u"
                role="button"
                tabindex="-1"
              >
                <span>写文章</span>
              </a>
              <span class="header-container-logout" @click="logout2">注销</span>
            </template>
          </div>
          
        </div>
      </div>
    </header>
    <div id="nav"></div>
    <router-view />
  </div>
  
</template>

<script>
import applicationUserManager from "./Auth/applicationusermanager";
import userAuth from "./Auth/UserAuth";
import store from "./store";

export default {
  name: "app",
  mixins: [userAuth],
  data: function() {
    return {
      sysUserName: "",
      dialogVisible: false,
      dialogVisibleLogin: false,

      register_form: {
        userName: undefined,
        password: undefined,
        phone: undefined
      },

      login_form: {
        userName: undefined,
        password: undefined,
      },

      rules: {
        password: [{
          required: true,
          trigger: 'blur'
        }]
   },
    };
  },

   


  updated() {
    this.sysUserName = window.localStorage.getItem("USER_NAME") || "";
  },
  created() {
    this.sysUserName = window.localStorage.getItem("USER_NAME") || "";
  },
  watch: {
    $route: async function(to, from) {
      //这里使用Id4授权认证，用Jwt，请删之；
      await this.refreshUserInfo();
    }
  },
  methods: {
    async login() {
      try {
        await applicationUserManager.login();
      } catch (error) {
        console.log(error);
        this.$root.$emit("show-snackbar", { message: error });
      }
    },
    async logout() {
      try {
        window.localStorage.removeItem("USER_NAME");
        await applicationUserManager.logout();
        store.commit("saveToken", "");
      } catch (error) {
        console.log(error);
        this.$root.$emit("show-snackbar", { message: error });
      }
    },

    login2() {
      const loginForm = this.$refs.form.model;
      
      this.$api.post("/toLogin", { userName: loginForm.userName,password:loginForm.password }, r => {
        console.log(r)
        if(r.code == 200){//将token和user保存到localStorage中
          store.commit('setToken',r.token)
          store.commit('setUsername',r.staff)
          //跳转到登录成功后的页面
          //获取本地存储中的staff
          // vm.staff=JSON.parse(localStorage.getItem('staff'))
          this.dialogVisible = false;
          this.dialogVisibleLogin = false;
          window.localStorage.setItem("USER_NAME", loginForm.userName);
        }
        else{
          alert(response.data.msg)
        }  
      });
    },

    logout2() {
      try {
        window.localStorage.removeItem("USER_NAME");
        this.$store.commit("logout", "");
        window.localStorage.removeItem("staff");
        window.localStorage.removeItem("token");
        this.sysUserName="";
      } catch (error) {
        console.log(error);
        this.$root.$emit("show-snackbar", { message: error });
      }
    },
  },
  
};

    
</script>

<style lang="css">
@import "./style/stylehome.css";
@import "./style/base.css";
@import "./style/m.css";
</style>


<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  text-align: center;
}

a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}

.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.header-container-content {
  height: 56px;
  max-width: 1440px;
  margin: 0 auto;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.header-container-logo {
  float: left;
  color: #ec7259;
  margin-left : 10px;
}

.header-container-userinfo {
  float: right;
  margin: 0 16px;
}

.header-container-userinfo-login {
  padding-left: 24px;
  padding-right: 24px;
}

.header-container-in, .header-container-in:focus, .header-container-in:hover {
  background-color: transparent;
  border-color: transparent;
}

.header-container-in {
  color: #969696;
}

.header-container-user-size {
  font-size: 16px;
  padding: 8px 16px;
}

.header-container-user-btn {
  position: relative;
  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5000px;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 14px;
  padding: 4px 12px;
  color: #969696;
  background-color: #fff;
  border: 1px solid #999;
}

.header-container-userinfo-login {
  padding-left: 24px;
  padding-right: 24px;
}

.header-container-user-size {
  font-size: 16px;
  padding: 8px 16px;
}

.header-container-hv, .header-container-hv[disabled]:hover {
  color: #ec7259;
  background-color: #fff;
  border-color: #ec7259;
  margin-top: 7px;
}

.header-container-hv._1YbC5u, .header-container-hv._1YbC5u[disabled]:hover {
  color: #fff;
  background-color: #ec7259;
  border-color: #ec7259;
  margin-top: 7px;
}

.header-container-user-btn+.header-container-user-btn, .header-container-user-btn>.anticon+span, .header-container-user-btn>span+.anticon {
  margin-left: 8px;
}

[role=button], button {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.header-container-banner {
  display: block;
  height: 56px;
}

.header-container-banner {
  box-sizing: content-box;
  padding-left: 16px;
  padding-right: 16px;
  margin-left: auto;
  margin-right: auto;
}

.header-container-banner-item {
  flex-shrink: 0;
}

.header-container-logo, .header-container-banner-item, .header-container-userinfo, .header-container-userinfo ._3Sn1bM, .header-container-banner-item-btn {
  display: block;
  align-items: center;
}

.header-container-banner-item-btn {
  font-size: 17px;
  color: #333;
  padding: 0 20px;
  cursor: pointer;
  float: left;
  line-height: 60px;
}

.header-container-logout {
  cursor: pointer;
  color: #007bff;
  margin-left: 10px;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  border-color: #007bff;
}
</style>
