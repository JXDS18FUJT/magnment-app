<template>
  <div class="component-content">
    <topBack topTitle="设备详情"></topBack>
    <van-tabs v-model="tabsActive" color="#2e7ae6" sticky>
      <van-tab title="设备信息">
        <van-list>
          <van-cell-group title="档案信息" :border="false">
            <van-cell title="设备名称" :value="DeviceInfo.archives.name" />
            <van-cell title="设备编号" :value="DeviceInfo.archives.code" />
            <van-cell title="设备状态" :value="DeviceInfo.archives.status" />
            <van-cell title="所属部门" :value="DeviceInfo.archives.department" />
            <van-cell title="所属区域" :value="DeviceInfo.archives.area" />
            <van-cell title="设备类型" :value="DeviceInfo.archives.type" />
            <van-cell title="设备型号" :value="DeviceInfo.archives.model" />
            <van-cell title="厂家" :value="DeviceInfo.archives.manufactor" />
            <van-cell title="保修期至" :value="DeviceInfo.archives.defectsLiabilityPeriod" />
          </van-cell-group>

          <van-cell-group title="设备参数" :border="false">
            <van-cell title="设备型号" :value="DeviceInfo.devicePara.code" />
            <van-cell title="ABC类" :value="DeviceInfo.devicePara.ABC" />
            <van-cell title="钢印号" :value="DeviceInfo.devicePara.steelSealNo" />
            <van-cell title="通讯卡号" :value="DeviceInfo.devicePara.card" />
            <!-- <van-cell title="通讯卡号" value="GH12345"/> -->
          </van-cell-group>

          <van-cell-group title="安装信息" :border="false">
            <van-cell title="安装时间" :value="DeviceInfo.installInfor.installTime" />
            <van-cell title="安装地点" :value="DeviceInfo.installInfor.installPlace" />
            <van-cell title="安装人员" :value="DeviceInfo.installInfor.installPerson" />
          </van-cell-group>
        </van-list>
      </van-tab>

      <van-tab title="维修">
        <van-empty description="没数据呀" />
      </van-tab>

      <van-tab title="巡检">
        <van-empty description="没数据呀" />
      </van-tab>

      <van-tab title="养护">
        <van-empty description="没数据呀" />
      </van-tab>

      <van-tab title="监测">
        <van-tabs color="#2e7ae6" sticky>
          <van-tab title="实时">
            <van-cell-group>
              <van-cell title="最后采集：" value="1.7m/h" />
              <van-cell title="瞬时流量：" value="0.6mPa" />
              <van-cell title="累计流量：" value="2.1m" />
            </van-cell-group>

            <div class="info-wrap">
              <div class="title-wrap">
                <div class="filter-item">
                  <button class="curr">24小时</button>
                  <button>7天</button>
                  <button>1月</button>
                </div>

                <div class="filter-type">
                  <span>瞬时流量</span>
                  <i class="icon">&#xe6cb;</i>
                </div>
              </div>

              <div class="echart-warp"></div>
            </div>
          </van-tab>

          <van-tab title="历史">
            <van-cell-group v-for="n in 113" title="2020-05-20 16:23">
              <van-cell title="瞬时流量：" value="1.7m/h" />
              <van-cell title="压力：" value="0.6mPa" />
              <van-cell title="间隔流量：" value="2.1m" />
            </van-cell-group>
          </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { findDveList, queryInstallInfo } from "@/api/index.js";
export default {
  name: "Index",
  components: {
    //
  },
  data() {
    return {
      tabsActive: 0,
      DeviceInfo: {
        //档案信息
        archives: {
          name: "没查到数据", //设备名称
          code: "没查到数据", //设备编号
          status: "", // 设备状态
          department: "", //所属部门
          area: "", //所属区域
          type: "", //设备类型
          model: "", //设备型号
          manufactor: "", //厂家
          defectsLiabilityPeriod: "" //保修期
        },
        //设备参数
        devicePara: {
          code: "",
          ABC: "",
          steelSealNo: "",
          card: ""
        },

        // 安装信息
        installInfor: {
          installTime: "",
          installPerson: "",
          installPlace: ""
        }
      }
    };
  },
  methods: {
    //根据传来的设备的名称来查询对应的设备
    accordingToNameQueryDevice(name) {
      // alert(name)
      queryInstallInfo({
        id: name
      })
        .then(res => {
          this.DeviceInfo.archives = {
            name: res.obj.name,//名字
            code: res.obj.code, //编号
            status: res.obj.devStatus,//状态
            department: res.obj.departmentName, //所属部门
            area: res.obj.estateId, //所属区域
            type: res.obj.modelName, //设备类型
            model: res.obj.model, //设备型号
            manufactor: res.obj.manufacturerName, //厂家
            defectsLiabilityPeriod: res.obj.warrantyTime //保修期
          };
          this.DeviceInfo.devicePara = {
            code: res.obj.code,
            ABC: res.obj.abcType,
            steelSealNo: "",
            card: ""
          };
          this.DeviceInfo.installInfor = {
              installTime:res.obj.installationTime,
              installPerson:res.obj.createName,
              installPlace:res.obj.installPosition
          }

          switch (this.DeviceInfo.archives.status) {
            case "NORMAL":
              this.DeviceInfo.archives.status = "正常";
              break;
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  mounted() {
    this.accordingToNameQueryDevice(this.$route.query.name);
    // alert(window.Location.href)
  }
};
</script>

<style lang="scss" scoped>
.component-content {
  position: relative;
  min-height: 100vh;
  background: $color-2;
}
.info-wrap {
  margin-top: 0.3rem;
  background: #fff;

  .title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem;
  }
  .filter-item {
    display: inline-flex;
    align-items: center;
    top: 0.2rem;
    right: 0.2rem;
    border: 1px solid #2e7ae6;
    border-radius: 0.08rem;

    button {
      padding: 0.05rem 0.2rem;
      border: none;
      font-size: 0.2rem;
      background: transparent;
      transition: all 0.3s;

      &:active {
        opacity: 0.9;
      }
      &.curr {
        color: #fff;
        background: #2e7ae6;
      }
    }
  }
  .filter-type {
    span {
      color: #555;
    }
    .icon {
      @include iconfont;
      margin-left: 0.1rem;
    }
  }
  .echart-warp {
    height: 6rem;
  }
}
</style>
