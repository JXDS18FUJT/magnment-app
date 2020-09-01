<template>
  <div class="component-content">
    <van-nav-bar :title="barTitle" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon name="plus" size="18" />
      </template>
      <template #left>
        <!-- <van-icon name="plus" size="18" /> -->
      </template>
    </van-nav-bar>
    <!-- <van-icon name="plus" /> -->

    <van-list
      :immediate-check="false"
      finished-text="没有更多了"
      @load="querySearch"
      v-model="loading"
      :finished="finished"
    >
      <div v-for="(item,index) in  remarkList" 
      :key="index" class="p-order-item"
      @click="routerGODetail(item)">
        <div class="text-wrap">
          <div class="order-wrap">
            <p class="order-name">{{item.type}}</p>
          </div>

          <p class="tips">设备编号：{{item.deviceCode}}</p>
          <!-- <p class="tips">生产厂商：{{item.productHome}}</p> -->
          <p class="tips">安装位置：{{item. installPlace}}</p>
          <p class="tips" v-if="viewType=='调试'">调试人：{{item.debugPerson}}</p>
          <!-- <p class="tips">设备型号：{{item.type}}</p> -->
          <!-- <p class="tips">出厂编号：{{item.number}}</p> -->
          <p class="tips" v-if="viewType=='安装'">安装人：{{item.installPerson}}</p>
        </div>
      </div>
    </van-list>

    <van-empty v-if="remarkList.length==0" description="搜索无记录" />
  </div>
</template>

<script>
import { installPlan,queryInfoList } from "@/api/index.js";
export default {
  name: "Index",
  components: {
    //
  },
  data() {
    return {
      loading: false,
      finished: false,
      barTitle: "调试记录",
      firstScreen: 0,
      viewType: "调试",
      modelCode: "",
      page: 1,
      remarkList: [
        // {
        //   // name:'设备名称设备名称设备名称',
        //   deviceCode: "212", //设备编号
        //   // productHome:'智恒', //厂家
        //   type: "bn13", //类型
        //   number: "hy121", //出厂编号
        //   installPlace: "我的地方", //安装的地方
        //   debugPerson: "调试家", //调试人
        //   installPerson: "安装人" //安装人
        // }
      ]
      //
    };
  },
  methods: {
    routerGODetail(item){
      console.log(item)
      switch (this.viewType){
        case '安装':
          sessionStorage.setItem('installId',item.id)
          this.$router.push({
            path:'/writeInstallRecord',
            query:{
              viewType:this.viewType,
              readOnly:1 //1的话是只能查看 0的话就能编辑
            }

          })
          break;
        case '调试':
          sessionStorage.setItem('debugId',item.did),
          sessionStorage.setItem('debugName',item.name)
          sessionStorage.setItem('debugCode',item.deviceCode)
          this.$router.push({
            path:'/writeDebugRecord',
            query:{
              viewType:this.viewType,
              readOnly:1 //1的话是只能查看 0的话就能编辑
            }

          }) 
          break;
      }

    },
    dealQuerySearch(res, list) {
      res.forEach((item, index) => {
        list.push({
          deviceCode: item.code, //设备编号
          type: item.modelName, //设备的类型
          installPlace: item.installPosition, //安装的位置
          installPerson: item.userName, //安装人
          id:item.did, // id
          did:item.itemId,
          name:item.deviceName,
          debugPerson:item.debugUserName
        });
      });
    },
    //根据参数进行查询
    querySearch() {
      switch (this.viewType) {
        case "安装":
          installPlan({
            modelCode: this.modelCode,
            page: this.page++,
            pageSize: 10,
            type: 1
          }).then(res => {
            this.loading = false;
            this.dealQuerySearch(res.obj, this.remarkList);

            this.firstScreen = res.obj.length;
            //小于10的时候停止加载
            if (res.obj.length < 10 && res.obj.length > 0) {
              this.loading = false;
              this.finished = true;
            } else if (res.obj.length == 0) {
              this.loading = false;
              this.finished = true;
            }
            // console.log(res)
          });
          break;
        case "调试":
          queryInfoList({
            itemId: this.modelCode,
            page: this.page++,
            pageSize: 10,
            // type: 2
          })
            .then(res => {
              this.loading = false;
              this.dealQuerySearch(res.obj, this.remarkList);
              this.firstScreen = res.obj.length;
              //小于10的时候停止加载
              if (res.obj.length < 10 && res.obj.length > 0) {
                this.loading = false;
                this.finished = true;
              } else if (res.obj.length == 0) {
                this.loading = false;
                this.finished = true;
              }
              // console.log(res)
            })
            .catch(res => {
              this.loading = false;
              this.finished = true;
            });
          break;
      }
    },
    loadQuerySearch() {
      // switch (this.viewType)
      if (this.firstScreen == 10) {
        installPlan({
          modelCode: this.modelCode,
          page: this.page++,
          pageSize: 10,
          type: this.viewType=='安装'?1:2
        }).then(res => {
          this.dealQuerySearch(res.obj, this.remarkList);
          this.loading = false;
          this.firstScreen = res.obj.length;
          //小于10的时候停止加载
          if (res.obj.length < 10 && res.obj.length >= 0) {
            this.finished = true;
          }
          // console.log(res)
        });
      } else {
        this.finished = true;
      }
    },
    //改变标题和显示在改标题下的列表
    queryBarTitle() {
      this.viewType = this.$route.query.viewType || "调试";
      this.barTitle = this.viewType + "记录";
      this.modelCode = this.$route.query.key;
    },
    onClickRight() {
      this.$router.push({
        path: "/selectDevice",
        query: {
          viewType: this.viewType
        }
      });
    },
    //左边的点击的事件
    onClickLeft() {
      switch (this.viewType) {
        case "安装":
          this.$router.go(-1);
          break;
        case "调试":
          this.$router.go(-1);
          break;
      }
    }
    //
  },
  mounted() {
    this.queryBarTitle();
    this.querySearch();
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
