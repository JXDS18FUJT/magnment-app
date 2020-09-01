<template>
  <div class="component-content">
    <div class="header">
      <van-image class="user-image" src="https://img.yzcdn.cn/vant/cat.jpeg" />

      <div class="text-wrap">
        <p class="user-name" v-text="user.name">小俊俊</p>
        <time>上次登入：{{user.time}} {{user.xingqi}}</time>
      </div>

      <button class="btn-link">
        <!-- <i>&#xe6cb;</i> -->
      </button>
    </div>

    <van-cell-group title="我完成的" :border="false">
      <van-cell title="维修" :value="myComplete.weixiu" @click="routerGOmyDevice('维修')" />
      <van-cell title="养护" :value="myComplete.yanghu" @click="routerGOmyDevice('养护')" />
      <van-cell title="安装" :value="myComplete.anzhuang" @click="routerGOmyDevice('安装')" />
      <van-cell title="调试" :value="myComplete.tiaoshi" @click="routerGOmyDevice('调试')" />
    </van-cell-group>

    <van-cell-group title="我的设备" :border="false">
      <van-cell title="总数" :value="myDevice.total" @click="routerGOmyDevice('总数')" />
      <van-cell title="正常" :value="myDevice.normal"  @click="routerGOmyDevice('正常')"/>
      <van-cell title="异常" :value="myDevice.abnormal"  @click="routerGOmyDevice('异常')" />
    </van-cell-group>
    <footerTabbar :footerTabbarActive="Number(3)" />
  </div>
</template>

<script>
import {
  installInfoPlan_queryCount,
  devdevicebase_queryCount
} from "./../../api/my.js";
import footerTabbar from "@/components/footerTabbar.vue";
export default {
  name: "Index",
  components: {
    footerTabbar
    //
  },
  data() {
    return {
      user: {
        name: "小熊",
        time: "2020-05-23",
        xingqi: "星期六"
      },
      myComplete: {
        //我完成的
        weixiu: "10", //我完成的中的维修
        yanghu: "10", //我完成的中的养护
        anzhuang: "10", //我完成的中的安装
        tiaoshi: "10" //我完成的中的调试
      },
      myDevice: {
        //我的设备
        total: "100", //总数
        normal: "50", //正常
        abnormal: "50" //非正常
      }
      //
    };
  },
  methods: {
    //点击去我的页面
    routerGOmyDevice(v) {
      switch (v) {
        case "总数":
          this.$router.push({ path: "/myDevice", query: {
            viewType:v
          } });
          break;
        case "正常":
          this.$router.push({path:"/myDevice",query:{
            viewType:v
          }});
          break;
        case "异常":
            this.$router.push({path:"/myDevice",query:{
            viewType:v
          }});
          break;
        case "维修":
          this.$router.push({
            path: "/myComplete",
            query: {
              viewType: v
            }
          });
          break;
        case "养护":
          this.$router.push({
            path: "/myComplete",
            query: {
              viewType: v
            }
          });
          break;
        case "安装":
          this.$router.push({
            path: "/myComplete",
            query: {
              viewType: v
            }
          });
          break;
        case "调试":
          this.$router.push({
            path: "/myComplete",
            query: {
              viewType: v
            }
          });
          break;
      }
    },
    //获取安装调试数量的方法
    installInfoPlan_queryCount() {
    //  this.$http.post(login,this.login).then(function(res){
    //  })
      installInfoPlan_queryCount().then(res => {
        console.log(res);
        this.myComplete = {
          anzhuang: res.obj.installNum,
          tiaoshi: res.obj.debuggingNum
        };
      });
    },
    //获取总数 正常数 异常数
    devdevicebase_queryCount() {
      devdevicebase_queryCount().then(res => {
        this.myDevice = {
          total: res.obj.allNum,
          normal: res.obj.normalNum,
          abnormal: res.obj.abnormalNum
        };
      });
    }

    //
  },
  mounted() {
    this.installInfoPlan_queryCount();
    this.devdevicebase_queryCount();
  }
};
</script>

<style lang="scss" scoped>
.component-content {
  position: relative;
  min-height: 100vh;
  background: $color-2;
}
.header {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.3rem;
  background: $color-1;

  .user-image {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .text-wrap {
    flex-grow: 1;
    margin: 0 0.2rem;
    width: 0;
    color: #fff;

    .user-name {
      margin-bottom: 0.1rem;
      font-size: 0.3rem;
    }
    time {
      font-size: 0.24rem;
    }
  }
  .btn-link {
    color: #fff;
    border: none;
    background: transparent;

    i {
      @include iconfont;
    }
  }
}
</style>
