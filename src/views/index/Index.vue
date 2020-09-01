<template>
  <div class="component-content">
    	<!-- <div class="scan" :style="{zIndex:zIndex}"> -->
        <!-- <div id="bcid" :style="{zIndex:zIndex}"> -->
           <!-- <van-icon name="cross" :style="{zIndex:zIndex+1}" class="closeButton" v-show="zIndex>-1" size="20px"/> -->
        <!-- </div> -->
      <!-- </div> -->
    <div class="search-wrap">
      <!-- 作为间隔之用 -->
      <div style="width:10px"></div>
      <van-icon name="arrow-left" size="20" color="#fff" />
      <van-search placeholder="请输入设备编号、名称" @search="searchWordChange" v-model="search.word" />
      <van-icon name="chat-o" badge="99+" size="30" color="#fff" @click="routeGO('/message')" />
    </div>
    <!-- 搜索框下面的四个按钮 -->
    <div class="menu-wrap">
      <div class="menu-item" @click="$router.push('/scan')">
        <i class="icon">&#xe634;</i>
        <span class="title">扫一扫</span>
      </div>

      <div class="menu-item" @click="$router.push('/fillIn')">
        <i class="icon">&#xe7a7;</i>
        <span class="title">填报</span>
      </div>

      <div class="menu-item">
        <div class="badgeNumber2">{{menuWrap[2]}}</div>
        <a href="http://dev150.gszhcloud.com:8091/osiApp/">
          <i class="icon">&#xe607;</i>
          <span class="title">巡检</span>
        </a>
      </div>

      <div
        class="menu-item"
        @click="$router.push({path:'/selectDevice',
      query:{
        viewType:'报修'
      }})"
      >
        <i class="icon">&#xe624;</i>
        <span class="title">报修</span>
      </div>
    </div>
    <!-- 搜索框下面的四个按钮 -->

    <!-- 维修的内容 -->
    <van-tabs v-model="tabsActive" color="#2e7ae6" sticky>
      <van-tab :title="weixiu.title">
        <div class="herader">
          <van-dropdown-menu class="serach-type">
            <van-dropdown-item
              v-model="weixiu.type"
              :options="weixiu.typeOption"
              @change="weixiuDownMenu"
            />
          </van-dropdown-menu>

          <!-- <van-search class="serach-item" placeholder="请输入搜索关键词" /> -->
        </div>
        <!-- 维修的内容 -->
        <van-list
          v-model="weixiu.process.loading"
          :finished="weixiu.process.finished"
          finished-text="没有更多了"
          @load="onProcessweixiuLoad(weixiu.data)"
        >
          <div v-for="(item,index) in weixiu.list" :key="index" class="p-order-item"
           @click="goIframe(item)">
            <!-- applyid为businessKey -->
            <!-- <a :href="weixiu.href+item.businessKey+'&t='+Math.random()"> -->
              <div class="text-wrap">
                <div class="order-wrap">
                  <p class="order-name">{{item.businessKeyName}}</p>
                  <van-tag
                    plain
                    type="warning"
                    v-if="weixiu.type==3"
                  >{{weixiu.typeOption[weixiu.type].text}}</van-tag>
                </div>
                  <p class="tips" v-if="weixiu.type==0">限办时间:{{item.completeTime}}</p>
                  <p class="tips" v-if="weixiu.type==1">限办时间:{{item.completeTime}}</p>
                  <p class="tips" v-if="weixiu.type==2">限办时间:{{item.completeTime}}</p>

                <p
                  class="tips"
                  v-if="weixiu.type === 1"
                >工单状态&nbsp;{{workOrderStatus[Number(item.businessState)]}}</p>
                <p
                  class="tips"
                  v-if="weixiu.type ===2"
                >工单状态&nbsp;{{workOrderStatus[Number(item.status)]}}</p>
           

              
              </div>
            <!-- </a> -->
          </div>
        </van-list>
      </van-tab>
      <!-- 养护的内容 -->
      <van-tab :title="yanghu.title">
        <div class="herader">
          <van-dropdown-menu class="serach-type">
            <van-dropdown-item
              v-model="yanghu.type"
              :options="yanghu.typeOption"
              @change="yanghuDownMenu"
            />
          </van-dropdown-menu>

          <!-- <van-search class="serach-item" placeholder="请输入搜索关键词" @search="install_debug_search" /> -->
        </div>
        <van-list
          v-model="yanghu.process.loading"
          :finished="yanghu.process.finished"
          finished-text="没有更多了"
          @load="onProcessyanghuLoad(yanghu.data)"
        >
          <div v-for="(item,index) in yanghu.list" :key="index" 
          class="p-order-item"
           @click="goIframe(item)">
            <!-- <a :href="yanghu.href+item.businessKey+'&t='+Math.random()"> -->
              <div class="text-wrap">
                <div class="order-wrap">
                  <p class="order-name">{{item.businessKeyName}}</p>
                  <van-tag v-if="yanghu.type==3" plain type="warning">延期</van-tag>
                </div>
                <p
                  class="tips"
                  v-if="yanghu.type !=0"
                >工单状态&nbsp;{{workOrderStatus[Number(item.businessState)]}}</p>
                <p class="tips">限办时间:{{item.completeTime}}</p>
              </div>
            <!-- </a> -->
          </div>
        </van-list>
      </van-tab>

      <!-- 安装的内容 -->
      <van-tab :title="anzhuang.title">
        <div class="herader">
          <van-dropdown-menu class="serach-type">
            <van-dropdown-item
              v-model="anzhuang.type"
              :options="anzhuang.typeOption"
              @change="anzhaungDownMenu"
            />
          </van-dropdown-menu>
          <!-- 
          <van-search
            class="serach-item"
            v-model="anzhuang.search"
            placeholder="工单号"
            @search="install_debug_search(anzhuang.search,'install')"
            @clear="clear_fillList('install')"
          />-->
        </div>
        <van-list
          v-model="anzhuang.process.loading"
          :finished="anzhuang.process.finished"
          finished-text="没有更多了"
          @load=" onProcessanzhuangLoad(anzhuang.data,'install')"
          offset="50"
        >
          <div
            v-for="(item,index) in anzhuang.list"
            :key="index"
            class="p-order-item"
            @click=" routeGOInstallDetails(item.id)"
          >
            <div class="text-wrap">
              <div class="order-wrap">
                <p class="order-name">{{item.name}}</p>
                <van-tag plain v-if="item.outTime=='1'" type="warning">延期</van-tag>
              </div>

              <p class="tips" v-if="item.completeTime">计划时间&emsp;{{item.planTime}}</p>
              <p class="tips">完成进度&emsp;{{item.completePart}}/{{item.completeProcess}}</p>
              <!-- <p class="tips" v-if="anzhuang.type =='1'">完成时间&emsp;{{item.}}</p> -->
            </div>
          </div>
        </van-list>
        <van-empty description="没数据呀" v-if="anzhuang.list.length=='0'" />
      </van-tab>

      <!-- 调试的内容 -->
      <van-tab :title="tiaoshi.title">
        <div class="herader">
          <van-dropdown-menu class="serach-type">
            <van-dropdown-item
              v-model="tiaoshi.type"
              :options="tiaoshi.typeOption"
              @change="tiaoshiDownMenu"
            />
          </van-dropdown-menu>
          <!-- 
          <van-search
            class="serach-item"
            v-model="tiaoshi.search"
            placeholder="工单号"
            @search="install_debug_search(tiaoshi.search,'debug')"
            @clear="clear_fillList('debug')"
          />-->
        </div>
        <van-list
          v-model="tiaoshi.process.loading"
          :finished="tiaoshi.process.finished"
          finished-text="没有更多了"
          @load=" onProcesstiaoshiLoad(tiaoshi.data,'debug')"
          loading-text
        >
          <div
            v-for="(item,index) in tiaoshi.list"
            :key="index"
            class="p-order-item"
            @touchstart="routeGODebugDetails(item.id)"
          >
            <div class="text-wrap">
              <div class="order-wrap">
                <p class="order-name">{{item.name}}</p>
                <van-tag plain v-if="item.outTime=='1'" type="warning">延期</van-tag>
              </div>

              <p class="tips" v-if="item.completeTime">计划时间&emsp;{{item.planTime}}</p>
              <p class="tips">完成进度&emsp;{{item.debugNum}}/{{item.allNum}}</p>
              <p class="tips" v-if="tiaoshi.type =='1'">完成时间&emsp;{{item.completeTime}}</p>
            </div>
          </div>
        </van-list>
        <van-empty description="没数据呀" v-if="tiaoshi.list.length=='0'" />
        <!-- <van-empty description="没数据呀" /> -->
      </van-tab>
      <!-- 调试的内容 -->
    </van-tabs>
    <!-- 底部的导航 -->
    <footerTabbar :footerTabbarActive="Number(0)"></footerTabbar>

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
  </div>
</template>

<script>
import {
  findDveList,
  InstallInfoPlanListForApp,
  waitHandle,
  alreadyHandle,
  myHandle,
  delayHandle,
  DebugPlanListForApp,
  taskListCount
} from "@/api/index.js";
import footerTabbar from "@/components/footerTabbar";
let kfrx = "kfrx";
let ysgl = "ysgl";
export default {
  name: "Index",
  components: {
    footerTabbar
    //
  },
  data() {
    return {
      menuWrap: ["", "", "007", ""], //四个按钮的数字
      page: {
        currentPage: "0", //当前的页码
        pageSize: "10" //一页面显示多少数据
      },
      text: "",
      codeUrl: "",
      scan: "",
      zIndex: -1,
      show: false,
      search: {
        word: "" //搜索的关键字
      },
      tabsActive: 0,
      type: 0,
      // typeText:'',
      typeOption: [
        { text: "待办", value: 0 },
        { text: "已办", value: 1 },
        { text: "我的", value: 2 },
        { text: "延期", value: 3 }
      ],
      workOrderStatus: ["", "草稿", "审批中", "", "已办结"],
      process: {
        list: [1],
        loading: false,
        finished: false
      },
      weixiu: {
        href: "http://dev150.gszhcloud.com:8091/woWeb/app/task/detail?applyid=",
        totalCnt: "(0)",
        list: [
          // {
          //   name: "工单的名字", //维修工单的名字
          //   status: "已完成", //维修工单的状态
          //   limitedTime: "2020-05-23", //维修限办时间
          //   tagColor: "" // 标签的颜色
          // }
        ],
        type: 0,
        typeText: "待办",
        process: {
          loading: false,
          finished: false,
          loadPageNumber: 1
        },
        typeOption: [
          { text: "待办", value: 0 },
          { text: "已办", value: 1 },
          { text: "我的", value: 2 },
          { text: "延期", value: 3 }
        ],
        typeText: "",
        title: "维修", // 标题
        data: {
          pageNo: 1,
          pageSize: 10,
          businessType: kfrx,
          pageNum: 1
        }
      },
      anzhuang: {
        search: "",
        status: 0,
        href: "http://dev150.gszhcloud.com:8091/woWeb/app/task/detail?applyid=",
        totalCnt: "(0)",
        list: [
          // {
          //   name: "工单的名字", //安装工单的名字
          //   status: "未完成", //安装工单的状态
          //   completeProcess: "60/100", //完成的进度
          //   planTime: "2020-09-24", //计划时间
          //   completeTime: "2020-05-23" //调试限办时间
          // },
          // {
          //   name: "工单的名字", //养护工单的名字
          //   status: "未完成", //养护工单的状态
          //   completeProcess: "", //完成的进度
          //   planTime: "", //计划时间
          //   completeTime: "2020-05-23" //调试限办时间
          // },
          // {
          //   name: "工单的名字", //养护工单的名字
          //   status: "未完成", //养护工单的状态
          //   completeProcess: "", //完成的进度
          //   planTime: "", //计划时间
          //   completeTime: "2020-05-23" //调试限办时间
          // }
        ],
        type: 0,
        typeText: "",
        title: "安装", // 标题
        typeOption: [
          { text: "待办", value: 0 },
          { text: "已办", value: 1 }
        ],
        process: {
          loading: false,
          finished: false,
          loadPageNumber: 1
        },
        data: {
          page: 1, //当前的页
          pageSize: 10, //当前页的数据
          name: "", //名字
          jobStatus: 1, // 0是已经完成,1是没完成
          type: 1, //1是安装 2是调试
          pageNum: 1,
          endDate: "",
          startDate: ""
        }
      },
      yanghu: {
        list: [],
        href: "http://dev150.gszhcloud.com:8091/woWeb/app/task/detail?applyid=",
        totalCnt: "(0)",
        data: {
          pageNo: 1,
          pageSize: 10,
          businessType: ysgl,
          pageNum: 1
        },
        typeOption: [
          { text: "待办", value: 0 },
          { text: "已办", value: 1 },
          { text: "我的", value: 2 },
          { text: "延期", value: 3 }
        ],
        process: {
          loading: false,
          finished: false,
          loadPageNumber: 1
        },
        type: 0,
        typeText: "",
        title: "养护" // 标题
      },
      tiaoshi: {
        search: "",
        totalCnt: "(0)",
        list: [
          // {
          //   name: "工单的名字", //调试工单的名字
          //   status: "已完成", //调试工单的状态
          //   completeProcess: "60/100", //完成的进度
          //   planTime: "2020-09-09", //计划时间
          //   completeTime: "2020-05-23", //调试限办时间
          //   tagColor: "" // 标签的颜色
          // }
        ],
        status: 0,
        error: true,
        data: {
          page: 1, //当前的页
          pageSize: 10, //当前页的数据
          name: "", //名字
          jobStatus: 1, // 0是已经完成,1是没完成
          type: 2 //1是安装 2是调试
        },
        title: "调试", // 标题
        typeOption: [
          //下拉类型的数组
          { text: "待办", value: 0 },
          { text: "完成", value: 1 }
        ],
        type: 0,
        typeText: "",
        process: {
          //控制加载的属性
          loading: false, // 控制loading
          finished: false, //true时候为不加载
          loadPageNumber: 1
        },
        data: {
          page: 1, //当前的页
          pageSize: 10, //当前页的数据
          name: "", //名字
          jobStatus: 1, // 0是已经完成,1是没完成
          type: 2 //1是安装 2是调试
        }
      }
    };
  },
  created() {
    this.taskListCount();
    this.tabsOnCount();
    // this.onProcessweixiuLoad();
    // this.findDveList();
    // this.getInstall_debugList({
    //   page: 1,
    //   pageSize: 10,
    //   jobStatus: 1,
    //   type: 1
    // });
  },
  methods: {
    goIframe(item){
      // window.open(this.weixiu.href+item.businessKey+'&t='+Math.random())
      this.$router.push({
        path:'/iframe',
        query:{
          url:this.weixiu.href+item.businessKey+'&t='+Math.random()

        }
      })
    },
    // startRecognize() {
    //   this.zIndex = 9990;
    //   let that = this;
    //   if (!window.plus) {
    //     this.zIndex = -1;
    //     return;
    //   }
    //   // 初始化扫描控件
    //   this.scan = new window.plus.barcode.Barcode("bcid");
    //   this.scan.onmarked = onmarked;
    //   // 调用开始扫描
    //   this.startScan();
    //   // 扫描后回调
    //   function onmarked(type, result) {
    //     switch (type) {
    //       case window.plus.barcode.QR:
    //         type = "QR";
    //         break;
    //       case window.plus.barcode.EAN13:
    //         type = "EAN13";
    //         break;
    //       case window.plus.barcode.EAN8:
    //         type = "EAN8";
    //         break;
    //       default:
    //         type = "其它" + type;
    //         break;
    //     }
    //     result = result.replace(/\n/g, "");
    //     that.codeUrl = result;
    //     // 返回值
    
    //     that.zIndex = -1;
    //     that.closeScan();
    //         that.$router.push({
    //       path:'/deviceDetails',
    //       query:{
    //         key:result
    //       }
    //     })
    //   }
    // },
    // //开始扫描
    // startScan() {
    //   if (!window.plus || !this.scan) return;
    //   this.scan.start();
    // },
    // //关闭扫描
    // cancelScan() {
    //   this.zIndex = -1;
    //   if (!window.plus || !this.scan) return;
    //   this.scan.cancel();
    // },
    // //关闭条码识别控件
    // closeScan() {
    //   this.zIndex = -1;
    //   if (!window.plus || !this.scan) return;
    //   this.scan.close();
    // },
    tabsOnCount() {
      //改变养护的数字
      waitHandle(this.yanghu.data).then(res => {
        //改变上面的数字
        // this.weixiu.title = "维修"+"("+res.obj. this.weixiu.title = "维修"+"("+res.obj.totalCnt+")";+")";
        this.yanghu.title = "养护" + "(" + res.obj.totalCount + ")";
      });
      DebugPlanListForApp({
        page: 1,
        pageSize: 10,
        jobStatus: "1",
        type: 2
      }).then(
        res => {
          // this.tiaoshi.list = [];
          //  this.isOpenDebugLoad(res.obj.length)
          // res.obj.forEach((item, index) => {
          // console.log(item, index);
          // this.renderIndexList(this.tiaoshi, item);
          // this.$set(this.tiaoshi.list, index, {
          //   name: item.jobName, //安装工单的名字
          //   status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
          //   completeProcess: item.completionProgress + "/100", //完成的进度
          //   planTime: item.startTime + "~" + item.endTime, //计划时间
          //   completeTime: item.endTime, //完成时间
          //   id: item.id
          // });

          //  this.anzhuang.list[index] = {
          //   name: item.jobName, //安装工单的名字
          //   status: item.type=='0'?'已完成':'未完成', //安装工单的状态
          //   completeProcess:item.completionProgress+'/100', //完成的进度
          //   planTime:item.startTime+'~'+item.endTime, //计划时间
          //   completeTime: item.endTime, //完成时间
          // }
          // });

          //改变上面选项卡的数字
          this.tiaoshi.title = "调试" + "(" + res.rowCount + ")";
        }

        //   this.tiaoshi.data.page = 2;
        //   if (res.obj.length < 10) {
        //     this.isOpenDebugLoad(0);
        //   }
        // });
      );
      InstallInfoPlanListForApp({
        page: 1,
        pageSize: 10,
        jobStatus: "1",
        type: 1
      }).then(res => {
        //this.anzhuang.list = [];
        // this.isOpenInstallLoad(res.obj.length)
        //   res.obj.forEach((item, index) => {
        // this.renderIndexList(this.anzhuang, item);

        //  this.anzhuang.list[index] = {
        //   name: item.jobName, //安装工单的名字
        //   status: item.type=='0'?'已完成':'未完成', //安装工单的状态
        //   completeProcess:item.completionProgress+'/100', //完成的进度
        //   planTime:item.startTime+'~'+item.endTime, //计划时间
        //   completeTime: item.endTime, //完成时间
        // }
        // });
        // this.anzhuang.status = value;
        // this.anzhuang.data.jobStatus = value == "0" ? "1" : "2";
        // // jobStatus: 1, // 0是已经完成,1是没完成
        // this.anzhuang.data.page = 2;
        // if (res.obj.length < 10) {
        //   this.isOpenInstallLoad(0);
        // }
        //改变上面选项卡的数字
        this.anzhuang.title = "安装" + "(" + res.rowCount + ")";
      });
    },
    taskListCount() {
      taskListCount().then(res => {
        //  console.log('这是巡检的数字',res.obj)
        this.menuWrap[2] = res.obj;
      });
    },
    routeGODebugDetails(id) {
      this.$router.push({
        path: "/orderDispatchDetails",
        query: {
          key: id
        }
      });
    },
    //负责添加列表的的代码
    renderIndexList(obj, item) {
      obj.list.push({
        name: item.applyNo, //安装工单的名字
        status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
        completeProcess: item.totalCnt, //完成的进度
        completePart: item.installedCnt,
        planTime: item.startDate + "~" + item.endDate, //计划时间
        completeTime: item.endDate, //完成时间
        id: item.planId ? item.planId : item.debugId,
        businessState: item.businessState,
        outTime: item.outTime,
        allNum: item.allNum,
        debugNum: item.debugNum
      });
    },
    //负责维修的加载的的代码
    onProcessweixiuLoad(data) {
      switch (this.weixiu.type) {
        case 0:
          console.log("启动维修的加载");
          waitHandle(data).then(res => {
            console.log("正在加载维修0");
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.weixiu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessState: item.businessState,
                businessKey: item.businessKey,
                businessKeyName: item.businessKeyName,
                status:item.status
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              return this.isOpenRepairLoad(0);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            this.weixiu.data.pageNo++;

            this.weixiu.process.loading = false; //停止加载

            //改变上面的数字
            this.weixiu.title = "维修" + "(" + res.obj.totalCount + ")";
          });

          break;
        case 1:
          alreadyHandle(data).then(res => {
            console.log("正在加载维修1");
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.weixiu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                businessState: item.businessState,
                businessKey: item.businessKey,
                status:item.status
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenRepairLoad(0);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            this.weixiu.data.pageNo++;

            this.weixiu.process.loading = false; //停止加载
            //维修的选项卡的数字变化
            this.weixiu.title = "维修" + "(" + res.obj.totalCount + ")";
          });
          break;
        case 2:
          data.isTimeout = false;
          myHandle(data).then(res => {
            console.log("正在加载维修2");
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.weixiu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                businessState: item.businessState,
                businessKey: item.businessKey,
                   status:item.status
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenRepairLoad(0);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            this.weixiu.data.pageNum++;

            this.weixiu.process.loading = false; //停止加载
            //维修的选项卡的数字变化
            this.weixiu.title = "维修" + "(" + res.obj.totalCount + ")";
          });
          break;
        case 3:
          data.isTimeout = true;
          delayHandle(data).then(res => {
            console.log("正在加载维修3");
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.weixiu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessState: item.businessState,
                businessKeyName: item.businessKeyName,
                businessKey: item.businessKey,
                   status:item.status
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenRepairLoad(0);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            this.weixiu.data.pageNum++;
            this.weixiu.process.loading = false; //停止加载
            //维修的选项卡的数字变化
            this.weixiu.title = "维修" + "(" + res.obj.totalCount + ")";
          });
          break;
      }

      // waitHandle({
      //   data
      // }).then(res => {
      //   console.log("正在加载维修");
      //   if (res.obj.result.length == 0) {
      //     return this.isOpenRepairLoad(0);
      //   }
      //   res.obj.result.forEach((item, index) => {
      //     console.log(item, index);
      //     this.weixiu.list.push({
      //       name: item.name, //安装工单的名字
      //       status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
      //       //completeProcess: item.completionProgress + "/100", //完成的进度
      //       planTime: item.dueDate, //计划时间
      //       completeTime: item.endTime, //完成时间
      //       id: item.id,
      //       businessState: item.businessState
      //     });
      //   });

      //   // 多于列表数大于0小于10时候的处理
      //   if (res.obj.result.length < 10 && res.obj.result.length > 0) {
      //     // console.log("这就是", res.obj.length);
      //     this.isOpenRepairLoad(0);
      //   }

      //   // this.anzhuang.list.push(res.obj); // 添加新的数据
      //   this.weixiu.data.page++;

      //   this.weixiu.process.loading = false; //停止加载
      // });
    },
    //负责养护的加载代码
    onProcessyanghuLoad(data) {
      switch (this.yanghu.type) {
        case 0:
          console.log("启动养护的加载");
          waitHandle(data).then(res => {
            console.log("正在加载维修0");
            if (res.obj.result.length == 0) {
              return this.isOpenyanghuLoad(0);
            }
            res.obj.result.forEach((item, index) => {
              // console.log(item, index);
              this.yanghu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                businessState: item.businessState,
                businessKey:item.businessKey
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              return this.isOpenyanghuLoad(0);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            this.yanghu.data.pageNo++;

            this.yanghu.process.loading = false; //停止加载

            //改变上面的数字
            this.yanghu.title = "养护" + "(" + res.obj.totalCount + ")";
          });

          break;
        case 1:
          alreadyHandle(data).then(res => {
            console.log("正在加载维修1");
            if (res.obj.result.length == 0) {
              return this.isOpenyanghuLoad(0);
            }
            res.obj.result.forEach((item, index) => {
              // console.log(item, index);
              this.yanghu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                businessState: item.businessState,
                     businessKey:item.businessKey
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenRepairLoad(0);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            this.yanghu.data.pageNo++;

            this.yanghu.process.loading = false; //停止加载
            //养护的数字
            this.yanghu.title = "养护" + "(" + res.obj.totalCount + ")";
          });
          break;
        case 2:
          data.isTimeout = false;
          myHandle(data).then(res => {
            console.log("正在加载维修2");
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.yanghu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                businessState: item.businessState,
                     businessKey:item.businessKey
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenRepairLoad(0);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            this.yanghu.data.pageNum++;

            this.yanghu.process.loading = false; //停止加载
            //养护的数字
            this.yanghu.title = "养护" + "(" + res.obj.totalCount + ")";
          });
          break;
        case 3:
          data.isTimeout = true;
          delayHandle(data).then(res => {
            console.log("正在加载维修3");
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.yanghu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                businessState: item.businessState,
                     businessKey:item.businessKey
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenyanghuLoad(0);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            this.yanghu.data.pageNum++;
            this.yanghu.process.loading = false; //停止加载
            //养护的数字
            this.yanghu.title = "养护" + "(" + res.obj.totalCount + ")";
          });
          break;
      }
    },
    //养护的下拉菜单
    // yanghuDownMenu(val){
    //         switch (val) {
    //     case 0:
    //       this.yanghu.typeText = "待办";
    //       waitHandle({
    //         pageNo: 1,
    //         pageSize: 10,
    //         businessType: ysgl
    //       }).then(res => {
    //         console.log("下拉菜单加载维修");
    //         //处理无数据的情况
    //         if (res.obj.result.length == 0) {
    //           return this.isOpenyanghuLoad(0);
    //         }
    //         //清空列表
    //         this.yanghu.list = [];
    //         // 渲染页面
    //         res.obj.result.forEach((item, index) => {
    //           console.log(item, index);
    //           this.yanghu.list.push({
    //             name: item.name, //安装工单的名字
    //             status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
    //             //completeProcess: item.completionProgress + "/100", //完成的进度
    //             planTime: item.dueDate, //计划时间
    //             completeTime: item.endTime, //完成时间
    //             id: item.id,
    //             businessState:
    //               item.businessState == "1"
    //                 ? "未完成"
    //                 : item.businessState == "2"
    //                 ? "已完成"
    //                 : ""
    //           });
    //         });

    //         // 多于列表数大于0小于10时候的处理
    //         if (res.obj.result.length < 10 && res.obj.result.length > 0) {
    //           // console.log("这就是", res.obj.length);
    //           this. isOpenyanghuLoad(0);
    //         } else {
    //           this. isOpenyanghuLoad(1);
    //         }

    //         // this.anzhuang.list.push(res.obj); // 添加新的数据
    //         //重置页面的数据
    //         this.yanghu.data.pageNum = 2;

    //         this.yanghu.process.loading = false; //停止加载
    //       });

    //       break;
    //     case 1:
    //       alreadyHandle({
    //         pageNo: 1,
    //         pageSize: 10,
    //         businessType: ysgl
    //       }).then(res => {
    //         console.log("下拉菜单加载维修1");
    //         //处理无数据的情况
    //         if (res.obj.result.length == 0) {
    //           return this.isOpenRepairLoad(0);
    //         }
    //         this.yanghu.list = [];
    //         res.obj.result.forEach((item, index) => {
    //           console.log(item, index);
    //           this.yanghu.list.push({
    //             name: item.name, //安装工单的名字
    //             status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
    //             //completeProcess: item.completionProgress + "/100", //完成的进度
    //             planTime: item.dueDate, //计划时间
    //             completeTime: item.endTime, //完成时间
    //             id: item.id,
    //             businessState: item.businessState
    //           });
    //         });

    //         // 多于列表数大于0小于10时候的处理
    //         if (res.obj.result.length < 10 && res.obj.result.length > 0) {
    //           // console.log("这就是", res.obj.length);
    //           this.isOpenRepairLoad(0);
    //         } else {
    //           this.isOpenRepairLoad(1);
    //         }

    //         // this.anzhuang.list.push(res.obj); // 添加新的数据
    //         this.yanghu.data.pageNo = 2;

    //         this.yanghu.process.loading = false; //停止加载
    //       });

    //       break;
    //     case 2:
    //       myHandle({
    //         pageNum: 1,
    //         pageSize: 10,
    //         //不用传isTimeout
    //         // isTimeout:true,
    //         typeCode: "ysgl"
    //       }).then(res => {
    //         console.log("下拉菜单加载维修2");
    //         //处理无数据的情况
    //         if (res.obj.result.length == 0) {
    //           return this.isOpenRepairLoad(0);
    //         }
    //         this.yanghu.list = [];
    //         res.obj.result.forEach((item, index) => {
    //           console.log(item, index);
    //           this.yanghu.list.push({
    //             name: item.name, //安装工单的名字
    //             status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
    //             //completeProcess: item.completionProgress + "/100", //完成的进度
    //             planTime: item.dueDate, //计划时间
    //             completeTime: item.endTime, //完成时间
    //             id: item.id,
    //             businessState: item.businessState
    //           });
    //         });

    //         // 多于列表数大于0小于10时候的处理
    //         if (res.obj.result.length < 10 && res.obj.result.length > 0) {
    //           // console.log("这就是", res.obj.length);
    //           this.isOpenRepairLoad(0);
    //         } else {
    //           this.isOpenRepairLoad(1);
    //         }

    //         // this.anzhuang.list.push(res.obj); // 添加新的数据
    //         //改变当前页面数
    //         this.yanghu.data.pageNum = 2;

    //         this.yanghu.process.loading = false; //停止加载
    //       });

    //       break;
    //     case 3:
    //       delayHandle({
    //         pageNum: 1,
    //         pageSize: 10,
    //         isTimeout: true,
    //         typeCode: "ysgl"
    //       }).then(res => {
    //         console.log("下拉菜单加载维修2");
    //         //处理无数据的情况
    //         if (res.obj.result.length == 0) {
    //           return this.isOpenRepairLoad(0);
    //         }
    //         this.yanghu.list = [];
    //         //渲染页面
    //         res.obj.result.forEach((item, index) => {
    //           console.log(item, index);
    //           this.yanghu.list.push({
    //             name: item.name, //安装工单的名字
    //             status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
    //             //completeProcess: item.completionProgress + "/100", //完成的进度
    //             planTime: item.dueDate, //计划时间
    //             completeTime: item.endTime, //完成时间
    //             id: item.id,
    //             businessState: item.businessState
    //           });
    //         });

    //         // 多于列表数大于0小于10时候的处理
    //         if (res.obj.result.length < 10 && res.obj.result.length > 0) {
    //           // console.log("这就是", res.obj.length);
    //           this.isOpenRepairLoad(0);
    //         } else {
    //           this.isOpenRepairLoad(1);
    //         }

    //         // this.anzhuang.list.push(res.obj); // 添加新的数据
    //         //改变当前页面数
    //         this.yanghu.data.pageNum = 2;
    //         //停止加载
    //         this.yanghu.process.loading = false;
    //       });
    //   }

    // },

    //维修的工单的下拉菜单事件
    weixiuDownMenu(val) {
      console.log(this.weixiu.type, typeof this.weixiu.type);
      switch (val) {
        case 0:
          this.weixiu.typeText = "待办";
          waitHandle({
            pageNo: 1,
            pageSize: 10,
            businessType: kfrx
          }).then(res => {
            console.log("下拉菜单加载维修");
            //处理无数据的情况
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            //清空列表
            this.weixiu.list = [];
            // 渲染页面
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.weixiu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKey: item.businessKey,
                businessKeyName: item.businessKeyName,
                  status:item.status,
                businessState:
                  item.businessState == "1"
                    ? "未完成"
                    : item.businessState == "2"
                    ? "已完成"
                    : ""
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenRepairLoad(0);
            } else {
              this.isOpenRepairLoad(1);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            //重置页面的数据
            this.weixiu.data.pageNum = 2;

            this.weixiu.process.loading = false; //停止加载
            //改变上面的数字
            this.weixiu.title = "维修" + "(" + res.obj.totalCount + ")";

            // this.weixiu.title = "维修"+"("+res.obj.totalCount+")"
          });

          break;
        case 1:
          alreadyHandle({
            pageNo: 1,
            pageSize: 10,
            businessType: kfrx
          }).then(res => {
            console.log("下拉菜单加载维修1");
            //处理无数据的情况
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            this.weixiu.list = [];
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.weixiu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                businessState: item.businessState,
                 businessKey: item.businessKey,
                   status:item.status
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenRepairLoad(0);
            } else {
              this.isOpenRepairLoad(1);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            this.weixiu.data.pageNo = 2;

            this.weixiu.process.loading = false; //停止加载
            //改变上面的数字
            this.weixiu.title = "维修" + "(" + res.obj.totalCount + ")";
          });

          break;
        case 2:
          myHandle({
            pageNum: 1,
            pageSize: 10,
            //不用传isTimeout
            // isTimeout:true,
            typeCode: "kfrx"
          }).then(res => {
            console.log("下拉菜单加载维修2");
            //处理无数据的情况
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            this.weixiu.list = [];
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.weixiu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                businessState: item.businessState,
                 businessKey: item.businessKey,
                   status:item.status
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenRepairLoad(0);
            } else {
              this.isOpenRepairLoad(1);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            //改变当前页面数
            this.weixiu.data.pageNum = 2;

            this.weixiu.process.loading = false; //停止加载
            //改变上面的数字
            this.weixiu.title = "维修" + "(" + res.obj.totalCount + ")";
          });

          break;
        case 3:
          delayHandle({
            pageNum: 1,
            pageSize: 10,
            isTimeout: true,
            typeCode: "kfrx"
          }).then(res => {
            console.log("下拉菜单加载维修2");
            //处理无数据的情况
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            this.weixiu.list = [];
            //渲染页面
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.weixiu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                businessState: item.businessState,
                businessKey: item.businessKey,
                status:item.status
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenRepairLoad(0);
            } else {
              this.isOpenRepairLoad(1);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            //改变当前页面数
            this.weixiu.data.pageNum = 2;
            //停止加载
            this.weixiu.process.loading = false;
            //改变上面的数字
            this.weixiu.title = "维修" + "(" + res.obj.totalCount + ")";
          });
      }
      // waitHandle({
      //   page:1,
      //   pageSize:10,
      //   businessType:kfrx
      // }).then({

      // })
    },
    //养护的下拉菜单
    yanghuDownMenu(val) {
      // console.log('他的')
      switch (val) {
        case 0:
          waitHandle({
            pageNo: 1,
            pageSize: 10,
            businessType: ysgl
          }).then(res => {
            console.log("下拉菜单加载维修");
            //处理无数据的情况
            if (res.obj.result.length == 0) {
              return this.isOpenyanghuLoad(0);
            }
            //清空列表
            this.yanghu.list = [];
            // 渲染页面
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.yanghu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                     businessKey:item.businessKey,
                businessState:
                  item.businessState == "1"
                    ? "未完成"
                    : item.businessState == "2"
                    ? "已完成"
                    : ""
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenyanghuLoad(0);
            } else {
              this.isOpenyanghuLoad(1);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            //重置页面的数据
            this.yanghu.data.pageNum = 2;

            this.yanghu.process.loading = false; //停止加载
            //改变上面的数字
            this.yanghu.title = "养护" + "(" + res.obj.totalCount + ")";
          });

          break;
        case 1:
          alreadyHandle({
            pageNo: 1,
            pageSize: 10,
            businessType: ysgl
          }).then(res => {
            console.log("下拉菜单加载维修1");
            //处理无数据的情况
            if (res.obj.result.length == 0) {
              return this.isOpenyanghuLoad(0);
            }
            this.yanghu.list = [];
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.yanghu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                businessState: item.businessState
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenyanghuLoad(0);
            } else {
              this.isOpenyanghuLoad(1);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            this.yanghu.data.pageNo = 2;

            this.yanghu.process.loading = false; //停止加载
            //改变上面的数字
            this.yanghu.title = "养护" + "(" + res.obj.totalCount + ")";
          });

          break;
        case 2:
          myHandle({
            pageNum: 1,
            pageSize: 10,
            //不用传isTimeout
            // isTimeout:true,
            typeCode: "ysgl"
          }).then(res => {
            console.log("下拉菜单加载维修2");
            //处理无数据的情况
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            this.yanghu.list = [];
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.yanghu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                businessState: item.businessState,
                     businessKey:item.businessKey
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenyanghuLoad(0);
            } else {
              this.isOpenyanghuLoad(1);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            //改变当前页面数
            this.yanghu.data.pageNum = 2;

            this.yanghu.process.loading = false; //停止加载
            //改变上面的数字
            this.yanghu.title = "养护" + "(" + res.obj.totalCount + ")";
          });

          break;
        case 3:
          delayHandle({
            pageNum: 1,
            pageSize: 10,
            isTimeout: true,
            typeCode: "ysgl"
          }).then(res => {
            console.log("下拉菜单加载维修2");
            //处理无数据的情况
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            this.yanghu.list = [];
            //渲染页面
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              this.yanghu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessKeyName: item.businessKeyName,
                businessState: item.businessState,
                     businessKey:item.businessKey
              });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.result.length < 10 && res.obj.result.length > 0) {
              // console.log("这就是", res.obj.length);
              this.isOpenyanghuLoad(0);
            } else {
              this.isOpenyanghuLoad(1);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            //改变当前页面数
            this.yanghu.data.pageNum = 2;
            //停止加载
            this.yanghu.process.loading = false;
            //改变上面的数字
            this.yanghu.title = "养护" + "(" + res.obj.totalCount + ")";
          });
      }
    },
    //安装工单列表的点击的事件
    routeGOInstallDetails(key) {
      this.$router.push({
        path: "/orderInstallDetails",
        query: {
          key: key
        }
      });
    },
    //调试工单列表的点击的事件
    routeGODubugDetails(key) {
      this.$router.push({
        path: "/orderDebugDetails",
        query: {
          key
        }
      });
    },
    //关闭调试的加载
    isOpenDebugLoad(len) {
      if (Number(len) == 0) {
        // this.anzhuang.process.finished = true;
        this.tiaoshi.process.finished = true;
      } else if (Number(len) > 0) {
        // this.anzhuang.process.finished = false;
        this.tiaoshi.process.finished = false;
      }
    },
    //关闭安装的加载
    isOpenInstallLoad(len) {
      if (Number(len) == 0) {
        this.anzhuang.process.finished = true;
        // this.tiaoshi.process.finished = true
      } else if (Number(len) > 0) {
        this.anzhuang.process.finished = false;
        // this.tiaoshi.process.finished = false
      }
    },
    //关闭维修的加载
    isOpenRepairLoad(len) {
      if (Number(len) == 0) {
        this.weixiu.process.finished = true;
        // this.tiaoshi.process.finished = true
      } else if (Number(len) > 0) {
        this.weixiu.process.finished = false;
        // this.tiaoshi.process.finished = false
      }
    },
    isOpenyanghuLoad(len) {
      if (Number(len) == 0) {
        this.yanghu.process.finished = true;
        // this.tiaoshi.process.finished = true
      } else if (Number(len) > 0) {
        this.yanghu.process.finished = false;
        // this.tiaoshi.process.finished = false
      }
    },
    clear_fillList(type) {
      if (type == "install") {
        this.anzhuang.search = ""; //清空搜索栏
        this.anzhuang.data.name = ""; // 清空所带的参数
        this.isOpenInstallLoad(1); // 开启加载

        InstallInfoPlanListForApp({
          page: 1,
          pageSize: 10,
          jobStatus: this.anzhuang.status == "0" ? "1" : "0",
          type: 1
        }).then(res => {
          this.anzhuang.list = [];
          res.obj.forEach((item, index) => {
            this.renderIndexList(this.anzhuang, item);
            // this.$set(this.anzhuang.list, index, {
            //   name: item.jobName, //安装工单的名字
            //   status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
            //   completeProcess: item.completionProgress + "/100", //完成的进度
            //   planTime: item.startTime + "~" + item.endTime, //计划时间
            //   completeTime: item.endTime, //完成时间
            //   id: item.id //设备的id
            // });
          });
          //复原page的数目，方便从头开始加载
          this.anzhuang.data.page = 2;
          //是否无数据了
          if (res.obj.length < 10) {
            this.isOpenInstallLoad(0);
          }
        });
      } else if (type == "debug") {
        this.tiaoshi.search = ""; //清空搜索栏
        this.tiaoshi.data.name = ""; // 清空所带的参数
        this.isOpenDebugLoad(1); // 开启加载
        console.log("状态", this.tiaoshi.status);
        DebugPlanListForApp({
          page: 1,
          pageSize: 10,
          jobStatus: this.tiaoshi.status == "0" ? "1" : "0",
          type: 2
        }).then(res => {
          this.tiaoshi.list = [];
          res.obj.forEach((item, index) => {
            this.renderIndexList(this.tiaoshi, item);
            // this.$set(this.tiaoshi.list, index, {
            //   name: item.jobName, //安装工单的名字
            //   status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
            //   completeProcess: item.completionProgress + "/100", //完成的进度
            //   planTime: item.startTime + "~" + item.endTime, //计划时间
            //   completeTime: item.endTime, //完成时间
            //   id: item.id
            // });

            //复原page的数目
            this.tiaoshi.data.page = 2;
            console.log("完成时候的状态", this.tiaoshi.status);
            //是否没有数据了
            if (res.obj.length < 10) {
              this.isOpenDebugLoad(0);
            }
          });
        });
      }
    },
    //安装和debug的搜索请求
    install_debug_search(value, type) {
      console.log(value);
      if (type == "install") {
        this.anzhuang.data.name = value;
        InstallInfoPlanListForApp({
          page: 1,
          pageSize: 50,
          jobStatus: this.anzhuang.status == "0" ? "1" : "2",
          type: 1,
          name: this.anzhuang.data.name
        }).then(res => {
          this.anzhuang.list = [];
          res.obj.forEach((item, index) => {
            this.renderIndexList(this.anzhuang, item);
            // this.$set(this.anzhuang.list, index, {
            //   name: item.jobName, //安装工单的名字
            //   status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
            //   completeProcess: item.completionProgress + "/100", //完成的进度
            //   planTime: item.startTime + "~" + item.endTime, //计划时间
            //   completeTime: item.endTime, //完成时间
            //   id: item.id
            // });
          });
          //关闭加载
          this.isOpenInstallLoad(0);
        });
      } else if (type == "debug") {
        this.tiaoshi.data.name = value;
        DebugPlanListForApp({
          page: 1,
          pageSize: 50,
          jobStatus: this.tiaoshi.status == "0" ? "1" : "2",
          type: 2,
          name: this.tiaoshi.data.name
        }).then(res => {
          this.tiaoshi.list = [];
          res.obj.forEach((item, index) => {
            this.renderIndexList(this.tiaoshi, item);
            // this.$set(this.tiaoshi.list, index, {
            //   name: item.jobName, //安装工单的名字
            //   status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
            //   completeProcess: item.completionProgress + "/100", //完成的进度
            //   planTime: item.startTime + "~" + item.endTime, //计划时间
            //   completeTime: item.endTime, //完成时间
            //   id: item.id
            // });
          });
          //关闭加载
          this.isOpenDebugLoad(0);
          console.log(this.tiaoshi.status);
        });
      }
    },
    //安装的下拉菜单的显示
    anzhaungDownMenu(value) {
      console.log(value);
      this.isOpenInstallLoad(1); //开启加载
      InstallInfoPlanListForApp({
        page: 1,
        pageSize: 10,
        jobStatus: value == "0" ? "1" : "2",
        type: 1
      })
        .then(res => {
          this.anzhuang.list = [];
          // this.isOpenInstallLoad(res.obj.length)
          res.obj.forEach((item, index) => {
            this.renderIndexList(this.anzhuang, item);

            //  this.anzhuang.list[index] = {
            //   name: item.jobName, //安装工单的名字
            //   status: item.type=='0'?'已完成':'未完成', //安装工单的状态
            //   completeProcess:item.completionProgress+'/100', //完成的进度
            //   planTime:item.startTime+'~'+item.endTime, //计划时间
            //   completeTime: item.endTime, //完成时间
            // }
          });
          this.anzhuang.status = value;
          this.anzhuang.data.jobStatus = value == "0" ? "1" : "2";
          // jobStatus: 1, // 0是已经完成,1是没完成
          this.anzhuang.data.page = 2;
          if (res.obj.length < 10) {
            this.isOpenInstallLoad(0);
          }
          //改变上面选项卡的数字
          this.anzhuang.title = "安装" + "(" + res.rowCount + ")";
        })
        .catch(res => {
          this.anzhuang.process.finished = true;
        });
    },
    // 调试的下拉菜单的显示
    tiaoshiDownMenu(value) {
      console.log(value);
      this.tiaoshi.status = value;
      DebugPlanListForApp({
        page: 1,
        pageSize: 10,
        jobStatus: value == "0" ? "1" : "2",
        type: 2
      }).then(res => {
        this.tiaoshi.list = [];
        //  this.isOpenDebugLoad(res.obj.length)
        res.obj.forEach((item, index) => {
          // console.log(item, index);
          this.renderIndexList(this.tiaoshi, item);
          // this.$set(this.tiaoshi.list, index, {
          //   name: item.jobName, //安装工单的名字
          //   status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
          //   completeProcess: item.completionProgress + "/100", //完成的进度
          //   planTime: item.startTime + "~" + item.endTime, //计划时间
          //   completeTime: item.endTime, //完成时间
          //   id: item.id
          // });

          //  this.anzhuang.list[index] = {
          //   name: item.jobName, //安装工单的名字
          //   status: item.type=='0'?'已完成':'未完成', //安装工单的状态
          //   completeProcess:item.completionProgress+'/100', //完成的进度
          //   planTime:item.startTime+'~'+item.endTime, //计划时间
          //   completeTime: item.endTime, //完成时间
          // }
        });

        //改变上面选项卡的数字
        this.tiaoshi.title = "调试" + "(" + res.rowCount + ")";
        this.tiaoshi.data.page = 2;
        if (res.obj.length < 10) {
          this.isOpenDebugLoad(0);
        }
      });
    },

    // 获取安装或者调试工单的方法
    getInstall_debugList(data, type) {
      InstallInfoPlanListForApp(data).then(res => {
        if (type == "Install") {
          this.anzhuang.list = res.obj;
        } else if (type == "debug") {
          this.tiaoshi.list = res.obj;
        }
      });
    },
    //加载调试
    onProcesstiaoshiLoad(data, type) {
      DebugPlanListForApp(data).then(res => {
        if (type == "debug" && this.tiaoshi.search == "") {
          if (res.obj.length == 0) {
            return this.isOpenDebugLoad(0);
          }

          this.tiaoshi.list = [];
          res.obj.forEach((item, index) => {
            this.renderIndexList(this.tiaoshi, item);
            // this.tiaoshi.list.push({
            //   name: item.jobName, //安装工单的名字
            //   status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
            //   completeProcess: item.completionProgress + "/100", //完成的进度
            //   planTime: item.startTime + "~" + item.endTime, //计划时间
            //   completeTime: item.endTime //完成时间
            // });
          });
          //多于列表数大于0小于10时候的处理
          if (res.obj.length < 10 && res.obj.length > 0) {
            this.isOpenDebugLoad(0);
          }

          // 添加新的数据
          this.tiaoshi.data.page++;
          this.tiaoshi.process.loading = false; //停止加载
        }
      });
    },
    //加载的方法
    onProcessanzhuangLoad(data, type) {
      console.log("启动加载的方法");
      InstallInfoPlanListForApp(data)
        .then(res => {
          console.log("加载成功");
          if (type == "install" && this.anzhuang.search == "") {
            if (res.obj.length == 0) {
              return this.isOpenInstallLoad(0);
            }
            res.obj.forEach((item, index) => {
              this.renderIndexList(this.anzhuang, item);
              // this.anzhuang.list.push({
              //   name: item.jobName, //安装工单的名字
              //   status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
              //   completeProcess: item.completionProgress + "/100", //完成的进度
              //   planTime: item.startTime + "~" + item.endTime, //计划时间
              //   completeTime: item.endTime, //完成时间
              //   id: item.id
              // });
            });

            // 多于列表数大于0小于10时候的处理
            if (res.obj.length < 10 && res.obj.length > 0) {
              console.log("这就是", res.obj.length);
              isOpenInstallLoad(0);
            } else {
              isOpenInstallLoad(1);
            }

            // this.anzhuang.list.push(res.obj); // 添加新的数据
            this.anzhuang.data.page++;

            this.anzhuang.process.loading = false; //停止加载
          }
        })
        .catch(res => {
          console.log("加载失败无法加载", res);
          this.anzhuang.process.finished = true; //停止加载
          // this.tiaoshi.process.finished = true; //停止加载
        });
    },

    //点击信息按钮去对应的页面
    routeGO(path) {
      this.$router.push(path);
    },
    //搜索关键字变化时候的方法
    searchWordChange(value) {
      //带搜索词去搜索的页面
      this.search.word = value;
      this.$router.push({
        path: "/search",
        query: { keyword: this.search.word }
      });
    },
    //查询设备列表的方法
    findDveList(page, pageSize, name) {
      if (!page) {
        page = "";
      }
      if (!pageSize) {
        pageSize = "";
      }
      if (!name) {
        name: "";
      }
      findDveList({
        page,
        pageSize,
        name
      }).then(res => {});
    }
    //成功加载时候的方法
    // onProcessLoad() {
    //   setTimeout(() => {
    //     for (let i = 0; i < 5; i++) {
    //       this.process.list.push(this.process.list.length + 1);
    //     }

    //     // 加载状态结束
    //     this.process.loading = false;

    //     // 数据全部加载完成
    //     if (this.process.list.length >= 5) {
    //       this.process.finished = true;
    //     }
    //   }, 1000);
    // }
  }
};
</script>

<style lang="scss" scoped>
.component-content {
  position: relative;
}
.closeButton{
  position: absolute;
  z-index: -1;
  color: white;


}
.scan{
}
#bcid {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: -20%;
  bottom: 3rem;
  text-align: center;
  color: #fff;
}
.badgeNumber2 {
  position: absolute;
  left: 4.5rem;
  box-sizing: border-box;
  min-width: 16px;
  padding: 0 3px;
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;
  line-height: 14px;
  text-align: center;
  background-color: #ee0a24;
  border: 1px solid #fff;
  border-radius: 16px;
  transform: translate(50%, -50%);
  transform-origin: 100%;
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
.serach-type {
  width: 1.5rem;

  ::v-deep .van-dropdown-menu__bar {
    box-shadow: none;
  }
}
.serach-item {
  width: 0;
  flex-grow: 1;
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
