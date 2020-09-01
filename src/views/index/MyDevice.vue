<template>
  <div class="component-content">
    <van-nav-bar title="我的设备" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon />
      </template>
    </van-nav-bar>
    <van-search
      placeholder="设备名称、设备编号、出厂编号"
      :show-action="true"
      v-model="searchWord"
      @search="searchMyDevices"
    >
      <template #action>
        <div style="height:10px"></div>
        <van-icon
          name="qr"
          size="24"
          @click="$router.push({path:'/myFiltter',
        query:{viewType:$route.query.viewType}})"
        />
      </template>
    </van-search>

    <van-list
      v-if="searchWord==''"
      :immediate-check="false"
      @load="nextLoad(data)"
      v-model="loading"
      :finished="finished"
      finished-text="没有了"
    >
      <div
        v-for="(item,index) in selectList"
        :key="index"
        class="p-order-item"
        @click="markPublicState(item)"
      >
        <div class="text-wrap">
          <div class="order-wrap">
            <p class="order-name">{{item.name}}</p>
          </div>

          <p class="tips">设备编号：{{item.deviceCode}}</p>
          <p class="tips">生产厂商：{{item.productHome}}</p>
          <p class="tips">设备型号：{{item.type}}</p>
          <p class="tips">出厂编号：{{item.number}}</p>
        </div>
      </div>
    </van-list>
    <!-- <van-list></van-list> -->
    <van-list
      v-if="searchWord!=''"
      :immediate-check="false"
      @load="searchNextLoad(searchData)"
      v-model="searchLoading"
      :finished="searchFinished"
      finished-text="没有了"
    >
      <div
        v-for="(item,index) in  searchList "
        :key="index"
        class="p-order-item"
        @click="markPublicState(item)"
      >
        <div class="text-wrap">
          <div class="order-wrap">
            <p class="order-name">{{item.name}}</p>
          </div>

          <p class="tips">设备编号：{{item.deviceCode}}</p>
          <p class="tips">生产厂商：{{item.productHome}}</p>
          <p class="tips">设备型号：{{item.type}}</p>
          <p class="tips">出厂编号：{{item.number}}</p>
        </div>
      </div>
    </van-list>
    <!-- <van-empty description="搜索无记录" /> -->
  </div>
</template>

<script>
// sessionStorage.setItem("filtterCheckboxGroup0","")
// sessionStorage.setItem("filtterCheckboxGroup1","")

// let deviceTypeIdList:this.deviceTypeIdList = sessionStorage.getItem("filtterCheckboxGroup0")
// let manufacturerIdList:this.manufacturerIdList = sessionStorage.getItem("filtterCheckboxGroup1")
// console.log('deviceTypeIdList:this.deviceTypeIdList',deviceTypeIdList:this.deviceTypeIdList=="")
// console.log('manufacturerIdList:this.manufacturerIdList',manufacturerIdList:this.manufacturerIdList=="")

import { selectDevieces } from "@/api/index.js";
export default {
  name: "myDevice",
  components: {
    //
  },
  data() {
    return {
      deviceTypeIdList: "",
      manufacturerIdList: "",
      searchWord: "",
      loading: false,
      finished: false,
      searchLoading: false,
      searchFinished: false,
      data: {
        page: 1,
        isOwner: 1,
        pageSize: 10
      },
      searchData: {
        page: 1,
        isOwner: 1,
        pageSize: 10
      },
      searchList: [],
      selectList: [
        // {
        //   name: "设备名称设备名称设备名称",
        //   deviceCode: "212", //设备编号
        //   productHome: "智恒", //厂家
        //   type: "bn13", //类型
        //   number: "hy121" //出厂编号
        // },
        // {
        //   name: "设备名称设备名称设备名称",
        //   deviceCode: "00002", //设备编号
        //   productHome: "星空", //厂家
        //   type: "mpj88", //类型
        //   number: "70000" //出厂编号
        // }
      ]
      //
    };
  },
  methods: {
    searchNextLoad() {
      switch (this.viewType) {
        case "总数":
          selectDevieces({
            page: 1,
            isOwner: 1,
            pageSize: ++this.searchData.page,
            name: val,
            deviceTypeIdList: this.deviceTypeIdList,
            manufacturerIdList: this.manufacturerIdList
          }).then(res => {
            this.searchList = []; //清空数组
            res.obj.forEach((item, index) => {
              this.searchList.push({
                name: item.name,
                deviceCode: item.code,
                productHome: item.manufacturerName,
                type: item.deviceTypeName,
                number: item.factoryNum
              });
            });
            this.searchLoading = false;
            if (res.obj.length < 10) {
              this.searchLoading = false;
              this.searchFinished = true;
            }
          });
          break;
        case "异常":
          selectDevieces({
            page: 1,
            isOwner: 1,
            pageSize: 10,
            connectStatus: "ABNORMAL",
            name: val,
            deviceTypeIdList: this.deviceTypeIdList,
            manufacturerIdList: this.manufacturerIdList
          }).then(res => {
            this.loading = false;
            res.obj.forEach((item, index) => {
              this.selectList.push({
                name: item.name,
                deviceCode: item.code,
                productHome: item.manufacturerName,
                type: item.deviceTypeName,
                number: item.factoryNum
              });
            });
            if (res.obj.length < 10) {
              this.searchFinished = true;
            }
          });
          break;
        case "正常":
          selectDevieces({
            page: 1,
            isOwner: 1,
            pageSize: 10,
            connectStatus: "NORMAL",
            name: val,
            deviceTypeIdList: this.deviceTypeIdList,
            manufacturerIdList: this.manufacturerIdList
          }).then(res => {
            this.loading = false;
            res.obj.forEach((item, index) => {
              this.selectList.push({
                name: item.name,
                deviceCode: item.code,
                productHome: item.manufacturerName,
                type: item.deviceTypeName,
                number: item.factoryNum
              });
            });
            if (res.obj.length < 10) {
              this.searchFinished = true;
            }
          });
          break;
      }
    },
    searchMyDevices(val) {
      switch (this.viewType) {
        case "总数":
          selectDevieces({
            page: 1,
            isOwner: 1,
            pageSize: 10,
            name: val,
            deviceTypeIdList: this.deviceTypeIdList,
            manufacturerIdList: this.manufacturerIdList
          }).then(res => {
            this.loading = false;
            this.searchList = []; //清空数组
            res.obj.forEach((item, index) => {
              this.searchList.push({
                name: item.name,
                deviceCode: item.code,
                productHome: item.manufacturerName,
                type: item.deviceTypeName,
                number: item.factoryNum
              });
            });
            if (res.obj.length < 10) {
              this.searchFinished = true;
            }
          });
          break;
        case "正常":
          selectDevieces({
            page: 1,
            isOwner: 1,
            pageSize: 10,
            name: val,
            connectStatus: "NORMAL",
            deviceTypeIdList: this.deviceTypeIdList,
            manufacturerIdList: this.manufacturerIdList
          }).then(res => {
            this.loading = false;
            this.searchList = []; //清空数组
            res.obj.forEach((item, index) => {
              this.searchList.push({
                name: item.name,
                deviceCode: item.code,
                productHome: item.manufacturerName,
                type: item.deviceTypeName,
                number: item.factoryNum
              });
            });
            if (res.obj.length < 10) {
              this.searchFinished = true;
            }
          });
          break;
        case "异常":
          selectDevieces({
            page: 1,
            isOwner: 1,
            pageSize: 10,
            name: val,
            connectStatus: "NORMAL",
            deviceTypeIdList: this.deviceTypeIdList,
            manufacturerIdList: this.manufacturerIdList
          }).then(res => {
            this.loading = false;
            this.searchList = []; //清空数组
            res.obj.forEach((item, index) => {
              this.searchList.push({
                name: item.name,
                deviceCode: item.code,
                productHome: item.manufacturerName,
                type: item.deviceTypeName,
                number: item.factoryNum
              });
            });
            if (res.obj.length < 10) {
              this.searchFinished = true;
            }
          });
          break;
      }
    },
    startLoad() {
      switch (this.viewType) {
        case "总数":
          selectDevieces({
            page: 1,
            isOwner: 1,
            pageSize: 10,
            deviceTypeIdList: this.deviceTypeIdList,
            manufacturerIdList: this.manufacturerIdList
            //  connectStatus:'NORMAL',
          }).then(res => {
            this.loading = false;
            res.obj.forEach((item, index) => {
              this.selectList.push({
                name: item.name,
                deviceCode: item.code,
                productHome: item.manufacturerName,
                type: item.deviceTypeName,
                number: item.factoryNum
              });
            });
            if (res.obj.length < 10) {
              this.finished = true;
            }
          });
          break;
        case "异常":
          selectDevieces({
            page: 1,
            isOwner: 1,
            pageSize: 10,
            connectStatus: "ABNORMAL",
            deviceTypeIdList: this.deviceTypeIdList,
            manufacturerIdList: this.manufacturerIdList
          }).then(res => {
            this.loading = false;
            res.obj.forEach((item, index) => {
              this.selectList.push({
                name: item.name,
                deviceCode: item.code,
                productHome: item.manufacturerName,
                type: item.deviceTypeName,
                number: item.factoryNum
              });
            });
            if (res.obj.length < 10) {
              this.finished = true;
            }
          });
          break;
        case "正常":
          selectDevieces({
            page: 1,
            isOwner: 1,
            pageSize: 10,
            connectStatus: "NORMAL",
            deviceTypeIdList: this.deviceTypeIdList,
            manufacturerIdList: this.manufacturerIdList
          }).then(res => {
            this.loading = false;
            res.obj.forEach((item, index) => {
              this.selectList.push({
                name: item.name,
                deviceCode: item.code,
                productHome: item.manufacturerName,
                type: item.deviceTypeName,
                number: item.factoryNum
              });
            });
            if (res.obj.length < 10) {
              this.finished = true;
            }
          });
          break;
      }
    },
    dealQueryDevice(res, list) {
      // list = []
      res.forEach((item, index) => {
        list.push({
          name: item.name,
          deviceCode: item.code, //设备编号
          productHome: item.manufacturerName, //厂家
          type: item.model, //类型
          number: item.factoryNum, //出厂编号
          id: item.id // 出厂id
        });
      });
    },
    nextLoad(data) {
      switch (this.viewType) {
        case "总数":
          selectDevieces({
            // model: sessionStorage.getItem("installDevicesModel"),
            page: ++this.data.page,
            isOwner: 1,
            pageSize: 10,
            deviceTypeIdList: this.deviceTypeIdList,
            manufacturerIdList: this.manufacturerIdList
          }).then(res => {
            // Notify({ type: "warning", message: "正在加载请稍侯" });
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.loading = false;
              this.finished = true;
            }
            this.dealQueryDevice(res.obj, this.selectList);
            this.loading = false;
          });
          break;
        case "异常":
          selectDevieces({
            page: ++this.data.page,
            isOwner: 1,
            connectStatus: "ABNORMAL",
            pageSize: 10,
            deviceTypeIdList: this.deviceTypeIdList,
            manufacturerIdList: this.manufacturerIdList
          }).then(res => {
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.loading = false;
              this.finished = true;
            }
            this.dealQueryDevice(res.obj, this.selectList);
            this.loading = false;
          });
          break;
        case "正常":
          selectDevieces({
            page: ++this.data.page,
            isOwner: 1,
            connectStatus: "NORMAL",
            pageSize: 10,
            deviceTypeIdList: this.deviceTypeIdList,
            manufacturerIdList: this.manufacturerIdList
          }).then(res => {
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.loading = false;
              this.finished = true;
            }
            this.dealQueryDevice(res.obj, this.selectList);
            this.loading = false;
          });
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    markPublicState(selected) {
      switch (this.viewType) {
        case "安装":
          // localStorage.setItem("install", JSON.stringify(selected));
          this.$router.push("/writeInstallRecord");
          break;
        case "调试":
          this.$router.push("/writeDebugRecord");
          // localStorage.setItem("debug", JSON.stringify(selected));
          break;
        case "总数":
          break;
        default:
          console.log("默认无动作");
          console.log(this.viewType);
      }

      // localStorage.setItem('install',JSON.stringify(selected))
      // this.$router.push('/WriteInstallRecord')
      // this.$router.push({
      //   path:'/WriteInstallRecord',
      //   query:{

      //   }
      // })

      //   switch(n){
      //       case '安装':

      //           break;
      //   }

      //
    }
  },
  mounted() {
    this.viewType = this.$route.query.viewType;
    this.deviceTypeIdList = sessionStorage.getItem("filtterCheckboxGroup0");
    console.log(this.deviceTypeIdList)
    // console.log(this.deviceTypeIdList)

    this.manufacturerIdList = sessionStorage.getItem("filtterCheckboxGroup1");
    console.log(this.manufacturerIdList);
    //


    if (this.deviceTypeIdList == '""') {
      this.deviceTypeIdList = "";
    }
    if (this.manufacturerIdList == '""') {
      this.manufacturerIdList = "";
    }

    console.log(this.viewType);
    this.startLoad();
  }
};
</script>

<style lang="scss" scoped>
.component-content {
  position: relative;
}
.p-order-item {
  @include thinLine(
    $useBefore: true,
    $position: "bottom",
    $backgroundColor: #eee,
    $top: 0,
    $right: 0.3rem,
    $bottom: 0,
    $left: 0.3rem
  );
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0.3rem 0.3rem;
  background: #fff;
  transition: all 0.3s;

  &:active {
    background: #f3f3f3;
  }
  .text-wrap {
    .order-wrap {
      display: flex;
      align-items: center;

      .van-tag {
        margin-left: 0.1rem;
      }
    }
    .order-name {
      @include textEllipsis($type: "multipleRows", $row: 1);
      font-weight: bold;
      color: $color-1;
    }
    .tips {
      margin-top: 0.05rem;
      color: #666;
    }
  }
}
</style>
