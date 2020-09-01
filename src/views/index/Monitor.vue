<template>
  <div class="component-content">
    <div class="search-wrap">
      <van-search placeholder="请输入设备编号、名称" @search="searchWordChange" v-model="search.word" />
      <van-icon
        class-prefix="iconfont"
        name="icon-1"
        badge="21"
        size="20"
        color="#fff"
        @click=" isErrorDevices=!isErrorDevices"
      />
      <van-icon
        class-prefix="iconfont"
        name="icon-2"
        size="20"
        color="#fff"
        @click="routerMonterFiltter"
      />
    </div>
    <div class="map-wrap">
      <div id="map" class="map">
        <iframe :src="mapUrl" id="ifram" ref="ifram"></iframe>
      </div>

      <aside class="tools">
        <button @touchend="getgeolocation">&#xe6a9;</button>
      </aside>
    </div>
    <!-- <van-tabbar v-model="footerTabbarActive" safe-area-inset-bottom placeholder class="p-footer">
            <van-tabbar-item badge="3">
                <span>首页</span>

                <template #icon="props">
                    <i v-if="props.active" class="iconfont">&#xe683;</i>
                    <i v-else class="iconfont">&#xe64e;</i>
                </template>
            </van-tabbar-item>

            <van-tabbar-item>
                <span>监控</span>

                <template #icon="props">
                    <i v-if="props.active" class="iconfont">&#xe604;</i>
                    <i v-else class="iconfont">&#xe603;</i>
                </template>
            </van-tabbar-item>

            <van-tabbar-item>
                <span>工单</span>

                <template #icon="props">
                    <i v-if="props.active" class="iconfont">&#xe68a;</i>
                    <i v-else class="iconfont">&#xe65f;</i>
                </template>
            </van-tabbar-item>

            <van-tabbar-item>
                <span>我的</span>

                <template #icon="props">
                    <i v-if="props.active" class="iconfont">&#xe65d;</i>
                    <i v-else class="iconfont">&#xe643;</i>
                </template>
            </van-tabbar-item>
    </van-tabbar>-->
    <van-action-sheet v-model="isErrorDevices" title="异常设备列表" :round="false">
      <van-list>
        <div class="dialog-error-content">
          <div v-for=" (item,index) in errorDevices" :key="index" class="error-item">
            <div class="title-wrap">
              <p class="title">{{item.name}}</p>
              <van-tag plain type="danger">{{item.warnType}}</van-tag>
            </div>
            <p class="tips">{{item.code}}</p>
            <address>{{item.address}}</address>

            <div class="tools">
              <van-button plain type="info" size="mini" @click="routerGODetail(item.id)">设备详情</van-button>
              <van-button :url="item.repairUrl" plain type="info" size="mini">报修</van-button>
            </div>
          </div>
        </div>
      </van-list>
    </van-action-sheet>
    <keep-alive>
      <footerTabbar :footerTabbarActive="Number(1)"></footerTabbar>
    </keep-alive>
  </div>
</template>

<script>
import footerTabbar from "@/components/footerTabbar.vue";
import { monitorIndex } from "@/api/monitor.js";
import transform from "@/assets/coordinate/coordtransform.js";
export default {
  name: "Monitor",
  components: {
    //
  },
  //document.getElementById("ifram").contentWindow.deviceInterface.initClusterLayer(true)
  created() {
    var vm = this;
    window.addEventListener("message", function (obj) {
      let iframeBox = document.getElementById("ifram");
      if (obj.data.data == true) {
        try {
          console.log("初始化完成");
          iframeBox.contentWindow.deviceInterface.initClusterLayer(true);
          iframeBox.contentWindow.deviceInterface.initSite(2000, 1500);
          iframeBox.contentWindow.deviceInterface.getClickMapPoint(
            "",
            (obj) => {
              console.log("listen=============================", obj);
            }
          );
        } catch (e) {
          alert(e);
          //TODO handle the exception
          // console.log(e)
          // setTimeout(function() {
          //   vm.mapPointClick();
          // }, 3000);
        }
      }
    });
    // alert(this.mapUrl);
  },
  data() {
    return {
      mapUrl:
        "http://dev150.gszhcloud.com:8091/irms/gszhmap/deviceMap/deviceMap",
      getMapState: "",
      monitor: {
        data: {
          isAbnormal: 1,
          pageSize: 50,
          deviceTypeIdList: "",
          manufacturerIdList: "",
        },
        status: {},
      },
      search: {
        word: "",
      },
      errorDevices: [
        {
          name: "农林大学房子",
          warnType: "挂机",
          code: "",
          address: "福建技师学校",
          detailsUrl: "",
          repairUrl:
            "http://dev150.gszhcloud.com:8091/woWeb/service/create?service=device_wx&typeCode=sbwx&data=",
        },
        {
          name: "农林大学房子",
          warnType: "挂机",
          code: "",
          address: "福建技师学校",
          detailsUrl: "",
          repairUrl:
            "http://dev150.gszhcloud.com:8091/woWeb/service/create?service=device_wx&typeCode=sbwx&data=",
        },
        {
          name: "农林大学房子",
          warnType: "挂机",
          code: "",
          address: "福建技师学校",
          detailsUrl: "",
          repairUrl:
            "http://dev150.gszhcloud.com:8091/woWeb/service/create?service=device_wx&typeCode=sbwx&data=",
        },
        {
          name: "农林大学房子",
          warnType: "挂机",
          code: "",
          address: "福建技师学校",
          detailsUrl: "",
          repairUrl:
            "http://dev150.gszhcloud.com:8091/woWeb/service/create?service=device_wx&typeCode=sbwx&data=",
        },
        {
          name: "农林大学房子",
          warnType: "挂机",
          code: "",
          address: "福建技师学校",
          detailsUrl: "",
          repairUrl:
            "http://dev150.gszhcloud.com:8091/woWeb/service/create?service=device_wx&typeCode=sbwx&data=",
        },
      ],
      isErrorDevices: false,
      footerTabbarActive: 0,
    };
  },
  mounted() {
    this.getmMnitorIndex();
  },
  methods: {
    getgeolocation() {
      // var wgs84 = transform.gcj02towgs84(119.003838,26.003838)
      //   console.log(transform.gcj02towgs84(119.003838,26.003838))
      //  console.log(transform.gaussianProject(wgs84[0], wgs84[1]));
      let iframeBox = document.getElementById("ifram");
      if (window.plus) {
        plus.geolocation.getCurrentPosition(
          function (p) {
            //相关的经度纬度的最大值
            var xmin = 571575.303372192;
            var xmax = 599991.4636566162;
            var ymin = 3405184.511611942;
            var ymax = 3434860.8046112075;
            var lon = Number(p.coords.longitude); //经度
            var lat = Number(p.coords.latitude); //纬度
            //转化坐标系
            var wgs84 = transform.gcj02towgs84(lon, lat);
            console.log(transform.gcj02towgs84(lon, lat));
            console.log(transform.gaussianProject(wgs84[0], wgs84[1]));
            var res = transform.gaussianProject(wgs84[0], wgs84[1]);
            //判断是否在区域里
            // alert("经度的" + res[0] + "纬度的" + res[1]);
            if (
              res[0] > xmin &&
              res[0] < xmax &&
              res[1] > ymin &&
              res[1] < ymax
            ) {
              //调用相关的api进行定位
              iframeBox.contentWindow.deviceInterface.locationPosition(
                p.coords.longitude,
                p.coords.latitude
              );
            }else{
              alert('不在地图的区域内,无法定位')
            }

            //检验是否超过这个范围
            // try {
            //   if (p.coords.longitude && p.coords.latitude) {
            //     var wgs84 = transform.gcj02towgs84(
            //       Number(lon),
            //       Number(lat)
            //     );
            //     console.log(wgs84)
            //   }
            //   if (wgs84 && wgs84.length == 2) {
            //     var res = transform.gaussianProject(wgs84[0], wgs84[1]);
            //     console.log(res[0], res[1]);
            //   }
            //   if (p.coords.longitude && p.coords.latitude) {
            //     iframeBox.contentWindow.deviceInterface.locationPosition(
            //       p.coords.longitude,
            //       p.coords.latitude
            //     );
            //   }
            // } catch {
            //   alert("该地区超出地图的范围");
            // }

            // alert(
            //   //lat:119.003838 lon:26.003838
            //   "Geolocation\nLatitude:" +
            //     p.coords.latitude +
            //     "\nLongitude:" +
            //     p.coords.longitude +
            //     "\nAltitude:" +
            //     p.coords.altitude
            // );
          },
          function (e) {
            alert("Geolocation error: " + e.message);
          }
        );
      } else {
        alert("该设备不支持该api");
      }
    },
    checkPointFirst() {},
    routerMonterFiltter() {
      this.$router.push("/monitorFiltter");
    },
    searchWordChange(value) {
      //带搜索词去搜索的页面
      this.search.word = value;
      this.$router.push({
        path: "/search",
        query: { keyword: this.search.word },
      });
    },
    mapPointClick() {
      var vm = this;
      let iframeBox = document.getElementById("ifram");
      try {
        iframeBox.contentWindow.deviceInterface.getClickMapPoint(
          "JSPOINT",
          this.checkPointFirst
        );
      } catch (e) {
        //TODO handle the exception
        // console.log(e)
        setTimeout(function () {
          vm.mapPointClick();
        }, 3000);
      }
    },
    routerGODetail(id) {
      this.$router.push({
        path: "/deviceDetails",
        query: {
          name: id,
        },
      });
    },
    dealMnitorIndex(res, list) {
      res.forEach((item, index) => {
        list.push({
          name: item.name,
          warnType: item.connectStatusName,
          code: item.code,
          address: item.installPosition,
          id: item.id,
          // device_id设备编号 device_spec 规格型号 use_dept_id 部门id,
          //area_code 所属区域，install_addr 安装位置，station_name 站点名称，device_name 设备名称
          repairUrl:
            "http://dev150.gszhcloud.com:8091/woWeb/service/create?service=device_wx&typeCode=sbwx&data=" +
            encodeURI(
              JSON.stringify({
                device_id: item.code,
                device_spec: item.device_spec,
                use_dept_id: item.departmentId,
                area_code: item.estateId,
                install_addr: item.installPosition,
                device_name: item.name,
              })
            ),
        });
      });
    },
    getmMnitorIndex() {
      let isNormal = sessionStorage.getItem("monitorfiltterRadio");
      let deviceTypeIdList = sessionStorage.getItem(
        "monitorfiltterCheckboxGroup0"
      );
      let manufacturerIdList = sessionStorage.getItem(
        "monitorfiltterCheckboxGroup1"
      );
      //处理参数
      switch (isNormal) {
        case "0":
          this.monitor.data = {
            isAbnormal: "",
            pageSize: 50,
            deviceTypeIdList: "",
            manufacturerIdList: "",
          };
          break;
        case "1":
          this.monitor.data = {
            isAbnormal: 0,
            pageSize: 50,
            deviceTypeIdList: "",
            manufacturerIdList: "",
          };
          break;
        case "2":
          this.monitor.data = {
            isAbnormal: 1,
            pageSize: 50,
            deviceTypeIdList: "",
            manufacturerIdList: "",
          };
          break;
        default:
          this.monitor.data = {
            isAbnormal: 1,
            pageSize: 50,
            deviceTypeIdList: "",
            manufacturerIdList: "",
          };
      }
      //加上集合
      if (deviceTypeIdList && deviceTypeIdList != '""') {
        this.monitor.data.deviceTypeIdList = deviceTypeIdList;
      }
      if (manufacturerIdList && manufacturerIdList != '""') {
        this.monitor.data.manufacturerIdList = manufacturerIdList;
      }

      //请求相关的阿参数
      monitorIndex(this.monitor.data).then((res) => {
        console.log(res);
        this.dealMnitorIndex(res.obj, this.errorDevices);
      });
    },
  },
  components: {
    footerTabbar,
  },
};
</script>

<style lang="scss" scoped>
.component-content {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.search-wrap {
  display: flex;
  align-items: center;
  padding-right: 0.4rem;
  background: $color-1;

  .van-search {
    width: 0;
    flex-grow: 1;
    background: $color-1;
  }
  .iconfont {
    position: relative;

    & + .iconfont {
      margin-left: 0.3rem;
    }
    &.iconfont-icon-1 {
      &:before {
        content: "\e60f";
      }
    }
    &.iconfont-icon-2 {
      &:before {
        content: "\e688";
      }
    }
  }
}
.menu-wrap {
  display: flex;
  align-items: center;
  padding: 0.3rem;
  background: $color-1;
  user-select: none;

  .menu-item {
    width: 0;
    flex-grow: 1;
    color: #fff;
    text-align: center;
    transition: all 0.3s;

    &:active {
      opacity: 0.7;
    }
    .icon {
      @include iconfont;
      font-size: 0.7rem;
    }
    .title {
      display: block;
      margin-top: 0.1rem;
    }
  }
}
.herader {
  display: flex;
  align-items: center;
}
.map-wrap {
  position: relative;
  flex-grow: 1;

  .map {
    height: 100%;
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
  .tools {
    position: absolute;
    right: 0.3rem;
    bottom: 0.3rem;
    user-select: none;

    button {
      @include iconfont;
      padding: 0.1rem;
      border: 1px solid #ddd;
      border-radius: 0.08rem;
      color: #666;
      font-size: 0.4rem;
      background: transparent;
    }
  }
}
.dialog-error-content {
  min-height: 40vh;
  max-height: 50vh;
  user-select: none;
  overflow-y: scroll;
}
.error-item {
  @include thinLine(
    $useBefore: true,
    $position: "bottom",
    $backgroundColor: #eee,
    $top: 0,
    $right: 0.3rem,
    $bottom: 0,
    $left: 0.3rem
  );
  padding: 0.3rem;
  user-select: none;

  .title-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 0.05rem;

    .title {
      @include textEllipsis($type: "multipleRows", $row: 1);
      font-size: 0.3rem;
      color: $color-1;
    }
    .van-tag {
      flex-shrink: 0;
      margin-left: 0.1rem;
    }
  }
  .tips {
    @include textEllipsis($type: "multipleRows", $row: 2);
    font-size: 0.26rem;
    color: #666;
  }
  address {
    @include textEllipsis($type: "multipleRows", $row: 2);
    font-size: 0.26rem;
    color: #999;

    &::before {
      @include iconfont;
      content: "\e651";
    }
  }
  .tools {
    margin-top: 0.1rem;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
