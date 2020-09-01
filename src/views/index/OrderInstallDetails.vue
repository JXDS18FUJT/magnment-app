<template>
  <div class="component-content">
    <topBack topTitle="安装工单"></topBack>
    <van-form>
      <van-cell-group title="计划信息" :border="false">
        <van-cell title="任务名称" :value="planInfo.planName" required />
        <van-cell title="计划时间" :value="planInfo.planTime" required />
        <van-cell title="安装地点" :value="planInfo.installPlace" required />
        <van-cell title="安装设备数" :value="planInfo.deviceNumber" required />
        <van-cell title="工单负责人" :value="planInfo.person" required />
      </van-cell-group>
      <van-cell-group title="设备信息" :border="false">
        <van-cell
          @click="routeGoRemark(item.type,item.type)"
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
          </template>
        </van-cell>
      </van-cell-group>
    </van-form>
  </div>
</template>

<script>
import {installDetails} from '@/api/index.js'
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
      //去到记录的页面
    routeGoRemark(key,model) {
      sessionStorage.setItem('installDevicesModel',model)
      this.$router.push({
        path: "/remark",
        query: {
          viewType: "安装",
          key
        }
      });
    },
    //axios后的渲染数组
    dealInstallDetails(res,list){
        list = [] //清空数组，防止无关数据污染
        console.log(res.obj)
        console.log( res.dmDevInstallPlanItemList)
        res.dmDevInstallPlanItemList.forEach(
            (item,index)=>{
                console.log(list)
                list = this.deviceInfo
                list.push({
                    label:'完成情况：'+item.installedCnt+'/'+item.planCnt,
                    title:item.typeName,
                    type:item.modelCode   
                })
            }
        )
        this.planInfo = {
        planName: res.applyNo,
        planTime: ""+res.startDate+"~"+res.endDate,
        installPlace: res.areaPath.split('/').join(''),
        deviceNumber:''+ res.installedCnt+'/'+res.totalCnt,
        person: res.createUserName
        }
    },
    //获取安装的设备信息
    installDetails(){
        installDetails({planId:this.$route.query.key}).then(res=>{
            this.dealInstallDetails(res.obj,this.deviceInfo)
            
        })
    }
    //
  },
  mounted () {
      //执行获取安装的设备信息
     this.installDetails();
  },
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
