<template>
  <div id="app">

    <!-- <router-view /> -->

    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>



export default {
  name: 'App',
  data () {
    return {
      isTabbarShow: true
    }
  },
  components: {

  },





}
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
  position: relative;
}
</style>

