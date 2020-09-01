<template>
  <van-nav-bar :title="topTitle" left-arrow @click-left="onClickLeft">
    <template #right>
      <van-icon />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    topTitle: {
      type: String,
      default: ""
    }
  },
  methods: {
    onClickLeft() {
      if (sessionStorage.getItem("saveInstallRecord")) {
        this.$router.push({ path: "/writeInstallRecord",
        query:{
          viewType:'安装',
          readOnly:0
        } });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>