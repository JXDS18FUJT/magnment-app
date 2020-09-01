<template>
  <div class="component-content">
    <topBack topTitle="我完成的"></topBack>
    <van-tabs v-model="tabsActive" color="#2e7ae6" sticky>
      <van-tab :title="weixiu.title">
        <van-list
          v-model="weixiu.process.loading"
          :finished="weixiu.process.finished"
          finished-text="没有更多了"
          @load="onProcessweixiuLoad(weixiu.data)"
        >
          <div v-for="item in weixiu.list" :key="item" class="p-order-item">
            <div class="text-wrap">
              <div class="order-wrap">
                <p class="order-name">{{item.businessKeyName}}</p>
                <!-- <van-tag plain type="success">已完成</van-tag> -->
              </div>
              <p class="tips">限办时间:{{item.completeTime}}</p>
              <p class="tips">工单状态&nbsp;{{workOrderStatus[Number(item.businessState)]}}</p>
            </div>
          </div>
        </van-list>
      </van-tab>

      <van-tab :title="yanghu.title">
        <van-list
          v-model="yanghu.process.loading"
          :finished="yanghu.process.finished"
          finished-text="没有更多了"
          @load="onProcessyanghuLoad(yanghu.data)"
        >
          <div v-for="item in yanghu.list" :key="item" class="p-order-item">
            <div class="text-wrap">
              <div class="order-wrap">
                <p class="order-name">{{item.businessKeyName}}</p>
                <!-- <van-tag plain type="success">已完成</van-tag> -->
              </div>

              <p class="tips">限办时间:{{item.completeTime}}</p>
              <p class="tips">工单状态&nbsp;{{workOrderStatus[Number(item.businessState)]}}</p>
            </div>
          </div>
        </van-list>
        <!-- <van-empty description="没数据呀" /> -->
      </van-tab>

      <van-tab :title="anzhuang.title">
        <van-list
          v-model="anzhuang.process.loading"
          :finished="anzhuang.process.finished"
          finished-text="没有更多了"
          @load="onProcessanzhuangLoad(anzhuang.data,'install')"
          offset="50"
        >
          <div v-for="item in anzhuang.list" :key="item" class="p-order-item">
            <div class="text-wrap">
              <div class="order-wrap">
                <p class="order-name">{{item.businessKeyName}}</p>
                <!-- <van-tag plain type="success">已完成</van-tag> -->
              </div>
              <p class="tips">计划时间&emsp;{{item.planTime}}</p>
              <p class="tips">完成进度&emsp;{{item.completePart}}/{{item.completeProcess}}</p>
            </div>
          </div>
        </van-list>
        <!-- <van-empty description="没数据呀" /> -->
      </van-tab>

      <van-tab :title="tiaoshi.title">
        <van-list
          v-model="tiaoshi.process.loading"
          :finished="tiaoshi.process.finished"
          finished-text="没有更多了"
          @load="onProcesstiaoshiLoad(tiaoshi.data,'debug')"
        >
          <div v-for="item in tiaoshi.list" :key="item" class="p-order-item">
            <div class="text-wrap">
              <div class="order-wrap">
                <p class="order-name">{{item.businessKeyName}}</p>
                <!-- <van-tag plain type="success">已完成</van-tag> -->
              </div>

              <p class="tips">计划时间&emsp;{{item.planTime}}</p>
              <p class="tips">完成进度&emsp;{{item.completePart}}/{{item.completeProcess}}</p>
            </div>
          </div>
        </van-list>
        <!-- <van-empty description="没数据呀" /> -->
      </van-tab>
    </van-tabs>

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
  DebugPlanListForApp
} from "@/api/index.js";
let kfrx = "kfrx";
let ysgl = "ysgl";
export default {
  name: "Index",
  components: {
    //
  },
  data() {
    return {
      workOrderStatus: ["", "草稿", "审批中", "", "已办结"],
      tabsActive: 0,
      viewTypeList: ["维修", "养护", "安装", "调试"],
      footerTabbarActive: 0,
      type: 0,
      viewType: "",
      typeOption: [
        { text: "待办", value: 0 },
        { text: "已办", value: 1 },
        { text: "完成", value: 2 }
      ],
      process: {
        list: [1],
        loading: false,
        finished: false
      },
      weixiu: {
        list: [],
        type: 1,
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
        list: [],
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
          jobStatus: 2, // 2是已经完成,1是没完成
          type: 1, //1是安装 2是调试
          pageNum: 1,
          endDate: "",
          startDate: ""
        }
      },
      yanghu: {
        list: [],
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
        type: 1,
        typeText: "",
        title: "养护" // 标题
      },
      tiaoshi: {
        search: "",
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
          jobStatus: 2, // 2是已经完成,1是没完成
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
          page: 0, //当前的页
          pageSize: 10, //当前页的数据
          name: "", //名字
          jobStatus: 2, // 0是已经完成,1是没完成
          type: 2 //1是安装 2是调试
        }
      }
    };
  },
  methods: {
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
        businessKeyName:item.businessKeyName,
        allNum: item.allNum,
        debugNum: item.debugNum
      });
    },
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
    onProcessLoad() {
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.process.list.push(this.process.list.length + 1);
        }
        // 加载状态结束
        this.process.loading = false;
        // 数据全部加载完成
        if (this.process.list.length >= 5) {
          this.process.finished = true;
        }
      }, 1000);
    },
    onProcesstiaoshiLoad(data, type) {
       
      DebugPlanListForApp(data).then(res => {
          this.tiaoshi.title = "调试("+res.rowCount+")"
        if (res.obj.length < 10) {
          this.tiaoshi.finished = true;
        }
        res.obj.forEach((item, index) => {
          this.renderIndexList(this.tiaoshi,item);
        });
        data.page++;
        this.tiaoshi.loading = false;
      });

      // 添加新的数据
      this.tiaoshi.data.page++;
      this.tiaoshi.process.loading = false; //停止加载
    },
    onProcessanzhuangLoad(data, type) {
      console.log("启动加载的方法");
      InstallInfoPlanListForApp(data).then(res => {
         this.anzhuang.title = "安装("+res.rowCount+")"
        if (res.obj.length < 10) {
          this.anzhuang.process.loading = false;
          this.anzhuang.process.finished = true;
        }
        res.obj.forEach((item, index) => {
          this.renderIndexList(this.anzhuang, item);
        });
        data.page++;
        this.anzhuang.loading = false;
      });
    },
    onProcessyanghuLoad(data) {
      switch (this.yanghu.type) {
        case 1:
          alreadyHandle(data).then(res => {
             this.yanghu.title = "养护("+res.obj.totalCount+")"
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
                businessState: item.businessState,
                businessKeyName:item.businessKeyName
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
          });
          break;
      }
    },
    onProcessweixiuLoad(data) {
      switch (this.weixiu.type) {
        case 1:
          alreadyHandle(data).then(res => {
         this.weixiu.title = "维修("+res.obj.totalCount+")"
            console.log("正在加载维修1");
            if (res.obj.result.length == 0) {
              return this.isOpenRepairLoad(0);
            }
            res.obj.result.forEach((item, index) => {
              console.log(item, index);
              //记录其总数
              this.weixiu.list.push({
                name: item.name, //安装工单的名字
                status: item.type == "0" ? "已完成" : "未完成", //安装工单的状态
                //completeProcess: item.completionProgress + "/100", //完成的进度
                planTime: item.dueDate, //计划时间
                completeTime: item.endTime, //完成时间
                id: item.id,
                businessState: item.businessState,
                businessKeyName:item.businessKeyName
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
          });
          break;
      }
    }
  },
  created() {
    this.viewType = this.$route.query.viewType; //获取url的参数
    this.tabsActive = this.viewTypeList.indexOf(this.viewType); //根据参数来变化选择的菜单
  }
};
</script>

<style lang="scss" scoped>
.component-content {
  position: relative;
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