<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted () {
    //    if (window.history && window.history.pushState) {
    //   history.pushState(null, null, document.URL);
    //   window.addEventListener('popstate', this.$router.go(-1), false);//false阻止默认事件
    // }
  },
  destroyed(){
    // window.removeEventListener('popstate', this.goback, false);//false阻止默认事件
  }
};
</script>

<style>
#app {
}
</style>