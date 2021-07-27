<template>
  <div class="container">

    <!-- <transition name="el-fade-in-linear"> -->
    <!-- <div v-show="show"
         class="transition-box"> -->
    <div id='loginC'>
      <h3>后台管理</h3>
      <el-input placeholder="帐号"
                id="username"
                v-model="username"></el-input>
      <el-input placeholder="密码"
                id="password"
                v-model="password"
                show-password></el-input>
      <el-button type="primary"
                 @click="onLogin">登录</el-button>
    </div>

  </div>
  <!-- </transition> -->

  <!-- <div id='loginC'>
      <h3>后台管理</h3>
      <el-input placeholder="帐号"
                id="username"
                v-model="username"></el-input>
      <el-input placeholder="密码"
                id="password"
                v-model="password"
                show-password></el-input>
      <el-button type="primary"
                 @click="onLogin">登录</el-button>
    </div> -->

</template>

<script>
import Vue from 'vue'
import { Input, Button } from 'element-ui';
import { LoginIn } from '../ajax/api'
Vue.use(Input)
Vue.use(Button)




export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',



    };
  },
  beforeMount () {

  },
  mounted () {

    // this.$store.commit('hidenTabbar', false)
    // axios({
    //   url: `https://www.liulongbin.top:8888/api/private/v1/login?username=${username}&password=${password}`,

    // }).then((res) => {
    //   console.log(res)
    // })




  },
  components: {},

  computed: {},

  methods: {

    onLogin () {
      LoginIn(this.username, this.password).then(data => {
        // console.log(data)
        if (data.meta.status == 200) {
          window.sessionStorage.setItem('token', data.data.token)
          this.open2()
          this.$router.push({
            name: 'Home'
          })
        } else {
          this.open4()
        }

      })

    },

    open2 () {
      this.$message({
        showClose: true,
        message: `管理员${this.username},欢迎使用后台管理系统`,
        type: 'success',
        offset: 80
      });
    },

    open3 () {
      this.$message({
        showClose: true,
        message: '警告哦，这是一条警告消息',
        type: 'warning',
        offset: 80
      });
    },

    open4 () {
      this.$message({
        showClose: true,
        message: '用户名或密码错误',
        type: 'error',
        offset: 80
      });
    }

  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  background-color: #2d3a4b;
  overflow: hidden;

  #loginC {
    width: 350px;
    position: fixed;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-150px, -150px);

    >>> #username {
      margin: 10px 0;
      background-color: #2d3a4b;
      color: #eee;
    }
    >>> #password {
      background-color: #2d3a4b;
      color: #eee;
    }
    >>> .el-button--primary {
      width: 100%;
      margin-top: 20px;
    }
    h3 {
      font-size: 26px;
      color: #eee;
      text-shadow: 2px 2px 2px #409eff;
      text-align: center;
      font-weight: bold;
      text-shadow: #eee;
    }
  }
}
// .transition-box {
//   margin-bottom: 10px;
//   width: 200px;
//   height: 100px;
//   border-radius: 4px;
//   background-color: #409eff;
//   text-align: center;
//   color: #fff;
//   padding: 40px 20px;
//   box-sizing: border-box;
//   margin-right: 20px;
// }
</style>