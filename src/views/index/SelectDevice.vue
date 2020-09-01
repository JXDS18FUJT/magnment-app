<template>
  <div class="component-content">
    <topBack topTitle="选择设备"></topBack>

    <van-search
      placeholder="设备名称、设备编号、出厂编号"
      :show-action="true"
      v-model="searchKey"
      @search="searchQueryDevice(searchKey)"
    >
      <template #action>
        <div style="height:10px"></div>
        <van-icon
          name="scan"
          :show-action="true"
          size="24"
          @click="$router.push({path:'/scan',query:{
            viewType:viewType
          }})"
        />
      </template>
    </van-search>
    <!-- 搜索显示相关的列表 -->
    <van-list
      v-model="search.loading"
      :finshed="search.finished"
      :immediate-check="false"
      @load="loadingSearchQueryDevice(search.searchKey)"
      v-if="searchKey !=''"
    >
      <div
        v-for="(item,index) in search.selectList"
        :key="index"
        class="p-order-item"
        @click="markPublicState(item,index);markId(item.id)"
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
    <!-- 不搜索时候的列表 -->
    <van-list
      v-model="loading"
      :finshed="finished"
      :immediate-check="false"
      @load="queryDevice(searchKey)"
      v-if="searchKey==''"
      loading-text="正在加载请稍等"
    >
      <div
        v-for="(item,index) in selectList"
        :key="index"
        class="p-order-item"
        @click="markPublicState(item,index);markId(item.id)"
      >
        <div class="text-wrap">
          <div class="order-wrap">
            <p class="order-name">{{item.name}}</p>
            <!-- <P>我是没搜索</P> -->
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
import { selectDevieces } from "@/api/index.js";
import {getfillBySite} from "@/api/index.js"
import { Notify } from "vant";
export default {
  name: "Index",
  components: {
    //
  },
  data() {
    return {
      model: "installDevicesModel",
      page: 1,
      searchKey: "",
      loading: false,
      finished: false,
      search: {
        loading: false,
        finished: false,
        searchKey: "",
        page: 1,
        pageSize: 10,
        selectList: [],
        isNothing: false
      },
      message:"",
      repairData:[],
      noInput: true,
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
    markId(id){
      switch(this.viewType){
        case '安装':
            sessionStorage.setItem('installId',id) 
        break;
        case '调试': 
         sessionStorage.setItem('debugId',id)
         break;
      }
    },
    //每次渲染查询出来的第一页的查询结果的函数
    searchQueryDevice(name) {
      switch (this.viewType) {
        case "安装":
          selectDevieces({
            model: sessionStorage.getItem("installDevicesModel"),
            page: 1,
            pageSize: 10,
            name
          }).then(res => {
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.search.loading = false;
              this.search.finished = true;
            }
            this.search.selectList = [];
            Notify({ type: "warning", message: "正在加载请稍侯" });
            this.dealQueryDevice(res.obj, this.search.selectList);
            this.search.loading = false;
            this.search.page = 1;
          });
          break;
        case "调试":
          selectDevieces({
            model: sessionStorage.getItem("debugDevicesModel"),
            page: 1,
            pageSize: 10,
            name
          }).then(res => {
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.search.loading = false;
              this.search.finished = true;
            }
            this.search.selectList = [];
            Notify({ type: "warning", message: "正在加载请稍侯" });
            this.dealQueryDevice(res.obj, this.search.selectList);
            this.search.loading = false;
            this.search.page = 1;
          });
          break;
            case "填报":
            getfillBySite({
              page:1,
              pageSize:10,
              name
            }).then(res => {
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.search.loading = false;
              this.search.finished = true;
            }
            this.search.selectList = [];
            Notify({ type: "warning", message: "正在加载请稍侯" });
            this.dealQueryDevice(res.obj, this.search.selectList);
            this.search.loading = false;
            this.search.page = 1;
          });
          break;  
          case "报修":
          selectDevieces({
            model: sessionStorage.getItem("installDevicesModel"),
            page: 1,
            pageSize: 10,
            name
          }).then(res => {
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.search.loading = false;
              this.search.finished = true;
            }
            this.search.selectList = [];
            Notify({ type: "warning", message: "正在加载请稍侯" });
            this.dealQueryDevice(res.obj, this.search.selectList);
            this.search.loading = false;
            this.search.page = 1;
          });
          break;
          case "上级":
          selectDevieces({
            model: sessionStorage.getItem("installDevicesModel"),
            page: 1,
            pageSize: 10,
            name
          }).then(res => {
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.search.loading = false;
              this.search.finished = true;
            }
            this.search.selectList = [];
            Notify({ type: "warning", message: "正在加载请稍侯" });
            this.dealQueryDevice(res.obj, this.search.selectList);
            this.search.loading = false;
            this.search.page = 1;
          });
          break;
          
      }
    },
    loadingSearchQueryDevice(name) {
      switch (this.viewType) {
        case "安装":
          selectDevieces({
            model: sessionStorage.getItem("installDevicesModel"),
            page: ++this.search.page, //和此处和无搜索的时候的不同
            pageSize: 10,
            name
          }).then(res => {
            Notify({ type: "warning", message: "正在加载请稍侯" });
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.search.loading = false;
              this.search.finished = true;
            }
            this.dealQueryDevice(res.obj, this.search.selectList);
            this.search.loading = false;
          });
          break;
        case "调试":
          selectDevieces({
            model: sessionStorage.getItem("debugDevicesModel"),
            page: ++this.search.page, //和此处和无搜索的时候的不同
            pageSize: 10,
            name
          }).then(res => {
            Notify({ type: "warning", message: "正在加载请稍侯" });
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.search.loading = false;
              this.search.finished = true;
            }
            this.dealQueryDevice(res.obj, this.search.selectList);
            this.search.loading = false;
          });
          break;
        case "报修":
          selectDevieces({
            // model: sessionStorage.getItem("debugDevicesModel"),
            page: ++this.search.page, //和此处和无搜索的时候的不同
            pageSize: 10,
            name
          }).then(res => {
            Notify({ type: "warning", message: "正在加载请稍侯" });
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.search.loading = false;
              this.search.finished = true;
            }
            this.dealQueryDevice(res.obj, this.search.selectList);
            this.search.loading = false;
          });
          break;
                  case "上级":
          selectDevieces({
            // model: sessionStorage.getItem("debugDevicesModel"),
            page: ++this.search.page, //和此处和无搜索的时候的不同
            pageSize: 10,
            name
          }).then(res => {
            Notify({ type: "warning", message: "正在加载请稍侯" });
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.search.loading = false;
              this.search.finished = true;
            }
            this.dealQueryDevice(res.obj, this.search.selectList);
            this.search.loading = false;
          });
          break;
            case "填报":
            getfillBySite({
              page:++this.search.page,
              pageSize:10,
              name
            }).then(res => {
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.search.loading = false;
              this.search.finished = true;
            }
            this.search.selectList = [];
            Notify({ type: "warning", message: "正在加载请稍侯" });
            this.dealQueryDevice(res.obj, this.search.selectList);
            this.search.loading = false;
            this.search.page = 1;
          });
          break; 
      }
    },
    dealQueryDevice(res, list) {
   
      // list = []
      res.forEach((item, index) => {
        list.push({
          name: item.name, //名字
          deviceCode: item.code, //设备编号
          productHome: item.manufacturerName, //厂家
          type: item.model, //类型
          number: item.factoryNum, //出厂编号
          id:item.id,// 出厂id
          deviceSpec:item.model, //型号规格
          pdid:item.pdid, //上级设备id
          typeName:item.deviceTypeName,
          repairData:JSON.stringify({
            device_id:item.code,
            device_spec:item.device_spec,
            use_dept_id:item.departmentId,
            area_code:item.estateId,
            install_addr:item.installPosition,
            device_name:item.name,
          })
          //','+item.model+','+item.departmentId+','+item.estateId+','
         // device_id设备编号 device_spec 规格型号 use_dept_id 部门id ，area_code 所属区域，install_addr 安装位置，station_name 站点名称，device_name 设备名称
        });
      });
    },
    //没有搜索时候的加载函数
    queryDevice(name) {
      switch (this.viewType) {
        case "安装":
          selectDevieces({
            model: sessionStorage.getItem("installDevicesModel"),
            page: this.page++,
            pageSize: 10,
            name
          }).then(res => {
            Notify({ type: "warning", message: "正在加载请稍侯" });
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.loading = false;
              this.finished = true;
            }
            this.dealQueryDevice(res.obj, this.selectList);
            this.loading = false;
          });
          break;
        case "调试":
          selectDevieces({
            model: sessionStorage.getItem("debugDevicesModel"),
            page: this.page++,
            pageSize: 10,
            name
          }).then(res => {
            Notify({ type: "warning", message: "正在加载请稍侯" });
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.loading = false;
              this.finished = true;
            }
            this.dealQueryDevice(res.obj, this.selectList);
            this.loading = false;
          });
          break;
          case "报修":
          selectDevieces({
            page: this.page++,
            pageSize: 10,
            name
          }).then(res => {
            Notify({ type: "warning", message: "正在加载请稍侯" });
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.loading = false;
              this.finished = true;
            }
     
            this.dealQueryDevice(res.obj, this.selectList);
            this.loading = false;
          });
          break;
          case "上级":
          selectDevieces({
            page: this.page++,
            pageSize: 10,
            name
          }).then(res => {
            Notify({ type: "warning", message: "正在加载请稍侯" });
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.loading = false;
              this.finished = true;
            }
            this.dealQueryDevice(res.obj, this.selectList);
            this.loading = false;
          });
          break;
        case "填报": 
            getfillBySite({
              page:this.search.page++,
              pageSize:10,
              name
            }).then(res => {
            if (res.obj.length >= 0 && res.obj.length < 10) {
              this.search.loading = false;
              this.search.finished = true;
            }
            this.search.selectList = [];
            Notify({ type: "warning", message: "正在加载请稍侯" });
                   console.log('----------------',res.obj)
            this.dealQueryDevice(res.obj, this.selectList);
            this.search.loading = false;
            this.search.page = 1;
          });
          break; 
      }
    },
    markPublicState(selected,index) {
      switch (this.viewType) {
        case "安装":
          // localStorage.setItem("install", JSON.stringify(selected));
          this.$router.push({
            path:'/writeInstallRecord',
            query:{
              viewType:this.viewType,
              readOnly:0
            }
          });
          break;
        case "调试":
          this.$router.push({path:"/writeDebugRecord",
          query:{
            viewType:this.viewType,
            readOnly:0
          }});
          // localStorage.setItem("debug", JSON.stringify(selected));
          break;
        case "报修":
          window.location.href = "http://dev150.gszhcloud.com:8091/woWeb/service/create?service=device_wx&typeCode=sbwx&data="
          +encodeURI(this.selectList[index].repairData)
          break;
        case "上级":
          //将上级id缓存到页面
          this.message = JSON.parse(sessionStorage.getItem('installRecordMessage'))
          this.message.superior = selected.pdid||'0000'
          sessionStorage.setItem('installRecordMessage',JSON.stringify( this.message)) 
          this.$router.go(-1)
//{"disable":false,"name":"东鼎名人府邸3栋2单元801","code":"YCXB_RY_GY94-0021-16-8","installPlace":"1","installScene":"低洼地带","chipNumber":"1","LongRangeId":"1","controlPoint":"","longitude":"1","latitude":"150","remarks":"","site":"","superior":"","imageUrl":[]}
        break;
        case "填报":
          //将填报的数据名字和编号缓存进去
          sessionStorage.setItem('fillName',selected.name)
          sessionStorage.setItem('fillCode',selected.deviceCode)
          sessionStorage.setItem('filldid',selected.id),
          sessionStorage.setItem('fillTypeName',selected.typeName?selected.typeName:'')
          this.$router.push('/writeFillRecord')  
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
    },
    routerGOWrite(){
      switch (this.viewType){
        case '安装':
          this.$router.push({
            path:'/writeInstallRecord',
            query:{
              id
            }
          })
        break;
      }

    }
  },
  mounted() {
    this.viewType = this.$route.query.viewType;
    console.log(this.viewType);
    //查询条件如果没有的化传空值
    this.queryDevice("");
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
