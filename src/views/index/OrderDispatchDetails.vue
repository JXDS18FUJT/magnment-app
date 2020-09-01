<template>
  <div class="component-content">
    <topBack topTitle="调试工单"></topBack>
    <van-cell-group title="计划信息" :border="false">
      <van-cell title="任务名称" :value="planInfo.planName" />
      <van-cell title="计划时间" :value="planInfo.planTime" />
      <van-cell title="安装地点" :value="planInfo.installPlace" />
      <van-cell title="安装设备数" :value="planInfo.deviceNumber" />
      <!-- <van-cell title="工单负责人" :value="planInfo.person" /> -->
    </van-cell-group>

    <van-cell-group title="设备信息" :border="false">
      <van-cell
        @click="routeGoRemark(item.type,item.model,item.itemId)"
        v-for="(item,index) in deviceInfo"
        :key="index"
        value="填写"
        :label="item.label"
        is-link
        center
      >
        <template #title>
          <span class="custom-title">{{item.title}}</span>
          <van-tag plain type="primary">{{item.type}}</van-tag>
          <div class="custom-title">调试要求:数据正常上报</div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { debugPlan, installPlan} from "@/api/index.js";
export default {
  name: "Index",
  components: {
    //
  },
  data() {
    return {
      planInfo: {
        planName: "xx小区安装",
        planTime: "2019-06-20~2020-06-09",
        installPlace: "福州鼓楼",
        deviceNumber: "100",
        person: "大大"
      },
      deviceInfo: [
        // {
        //   label: "完成情况：11/50",
        //   title: "远传水表",
        //   type: "ND18"
        // },
        // {
        //   label: "完成情况：11/50",
        //   title: "远传水表",
        //   type: "ND18"
        // }
      ]

      //
    };
  },
  methods: {
    routeGoRemark(key,model,itemId) {
      // console.log(model)
       sessionStorage.setItem('debugDevicesModel',model)
       sessionStorage.setItem('debugDevicesItemId',itemId)
      this.$router.push({
        path: "/remark",
        query: {
          viewType: "调试",
          key:itemId
        }
      });
    },
    dealDebugDetails(res, list) {
      list = []; //清空数组，防止无关数据污染
      console.log(res.obj);
    //   console.log(res.dmDevInstallPlanItemList);
      res.dmDevDebugPlanItemList.forEach((item, index) => {
        console.log(list);
        list = this.deviceInfo;
        list.push({
          label: "完成情况：" + item.debugNum + "/" + item.debugCnt,
          title: item.typeName,
          type: item.modelCode,
          itemId:item.itemId,
          model:item.modelCode
        });
      });
      this.planInfo = {
        planName: res.applyNo,
        planTime: "" + res.startDate + "~" + res.endDate,
        installPlace: '暂时没有数据',//res.areaPath.split("/").join(""),
        deviceNumber: "" + res.debugNum + "/" + res.allNum,
        person: res.createUserName
      };
    },
    debugPlan() {
      debugPlan({
        itemId: this.$route.query.key
      }).then(res => {
        console.log(res);
        this.dealDebugDetails(res.obj,this.deviceInfo)
      });
    } //
  },
  mounted() {
    // this.viewType = ;
    this.debugPlan();
  }
};
</script>

<style lang="scss" scoped>
.component-content {
  position: relative;
  min-height: 100vh;
  background: $color-2;
}
.van-cell {
  .van-tag {
    margin-left: 0.1rem;
  }
  ::v-deep .van-cell__title {
    flex: 0 !important;
    white-space: nowrap;
  }
  ::v-deep .van-cell__value {
    flex-grow: 1;
    white-space: nowrap;
  }
}
</style>
