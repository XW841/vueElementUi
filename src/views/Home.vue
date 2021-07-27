<template>

  <el-container class="home-container">
    <el-header style="height: 70px;">
      <div>
        <img src="@/assets/logo.png"
             alt="">
        <span>后台管理系统</span>
      </div>
      <el-button type="info">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'60px':'200px'">
        <el-radio-group v-model="isCollapse">
          <el-radio-button :label="true"
                           v-show="!isCollapse"> <i class="el-icon-s-fold"></i></el-radio-button>
          <el-radio-button :label="false"
                           v-show="isCollapse"> <i class="el-icon-s-unfold"></i></el-radio-button>

        </el-radio-group>
        <el-menu active-text-color='#409eef'
                 background-color="#333744"
                 text-color="#fff"
                 unique-opened
                 :collapse="isCollapse"
                 :collapse-transition='false'
                 router
                 :default-active='activePath'>
          <!-- 为menu组件开启路由模式（element ui规定）,跳转路径为菜单的index值 -->
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''"
                      v-for="item in this.menuList"
                      :key="item.id">

            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <!--:index="'/'+ item.path为 跳转路径 -->
            <el-menu-item :index="'/'+ subItem.path"
                          v-for="subItem in item.children"
                          :key="subItem.id"
                          @click="saveActiveStatus('/'+ subItem.path)">
              <template slot="title">

                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>

              </template>

            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import { getMenusList } from '../ajax/api'
export default {
  data () {
    return {
      isCollapse: false,
      menuList: [],
      iconList: {
        '125': 'iconfont icon-yonghu',
        '103': 'iconfont icon-quanxian',
        '101': 'iconfont icon-wupinguanli',
        '102': 'iconfont icon-dingdanguanli',
        '145': 'iconfont icon-tongjitu',
      },
      activePath: ''
    };
  },
  created () {
    getMenusList().then(res => {
      if (res.meta.status != 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      // console.log(this.menuList)
      this.activePath = window.sessionStorage.getItem('activeMenu')

    })
  },
  components: {},

  computed: {},


  methods: {
    saveActiveStatus (activeMenu) {
      window.sessionStorage.setItem('activeMenu', activeMenu)
      this.activePath = activeMenu
    }
  }
}
</script>
<style lang='scss' scoped>
.el-radio-group {
  width: 100%;
}
.el-radio-button {
  width: 100%;
}
>>> .el-radio-button:first-child .el-radio-button__inner {
  border: none;
  width: 100%;

  background-color: #5a6369;
  font-size: 18px;
  border-radius: 0;
  color: white;
}
>>> .el-radio-button:nth-child(2) .el-radio-button__inner {
  border: none;
  width: 100%;
  background-color: #5a6369;
  font-size: 18px;
  border-radius: 0;
  color: white;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between; //使得弹性盒子的内容左右对齐
  align-items: center; //使得弹性盒子内容纵向居中
  color: #eaedf1;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 70px;
      border-radius: 50%;
    }
    span {
      margin-left: 10px;
    }
  }
}

.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
  height: 100%;
  width: 100%;

  // position: fixed;
  // top: 0;
  // left: 200px;
}
.el-menu {
  border-right: none;
}

// // .el-main {
// //   background-color: #e9eef3;
// //   color: #333;
// //   text-align: center;
// //   line-height: 160px;
// // }

.home-container {
  height: 100%;
}
</style>