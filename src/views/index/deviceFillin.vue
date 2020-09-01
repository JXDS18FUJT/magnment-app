<template>
  <div>
    <topBack topTitle="设备数据填报"></topBack>
    <van-list>
      <van-swipe-cell v-for="(item,index) in fill.list" :key="index" >
        <div class="p-order-item" @touchstart="routeGOSelectDevice()">
          <div class="text-wrap">
            <p class="order-name">{{item.name}}</p>
          </div>
          <p class="tips">设备编号{{item.code}}</p>
          <time class="tips">{{item.createTime}}</time>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="deleteFillList(item.fillInId)" />
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import { queryFillInDevBaseList,deleteFillList } from "@/api/index.js";
import { Form } from "vant";
export default {
  mounted() {
    this.queryFillInDevBaseList();
  },
  data() {
    return {
      fill:{
        list:[]
      } 
    }
  },
  methods: {
    //设备的填写
    routeGOSelectDevice(){
      this.$router.push({
        path:'/selectDevice',
        query:{
          viewType:'填报'
        }
      })
    },
    //删除填报的列表的数据
    deleteFillList(fillInId){
      deleteFillList({
        fillInId
      }).then(
        res=>{
          this.queryFillInDevBaseList();

        }
      )
    },
    //获取填报的列表
    queryFillInDevBaseList() {
      queryFillInDevBaseList({ page: 1, pageSize: 50 }).then(
        res=>{
          this.fill.list = res.obj 
        }
      )
    }
  }
};
</script>

<style lang="scss" scoped>
.component-content {
  position: relative;
}
.delete-button {
  height: 100%;
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
  padding: 0.3rem 0.3rem;
  background: #fff;
  transition: all 0.3s;

  &:active {
    background: #f3f3f3;
  }
  .text-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .order-name {
      @include textEllipsis($type: "multipleRows", $row: 1);
      font-weight: bold;
      color: $color-1;
    }
    time {
      flex-shrink: 0;
      font-size: 0.2rem;
      color: #999;
    }
  }
  .tips-wrap {
    display: flex;
    align-items: center;
    margin-top: 0.1rem;

    .tips {
      @include textEllipsis($type: "multipleRows", $row: 1);
      margin-top: 0;
      width: 0;
      flex-grow: 1;
    }
  }
  .tips {
    @include textEllipsis($type: "multipleRows", $row: 2);
    margin-top: 0.1rem;
    color: #666;
  }
  .icon-link {
    @include iconfont;
    margin-left: 0.2rem;
    padding: 0.1rem;
    border-radius: 50%;
    font-size: 0.3rem;
    color: #fff;
    background: $color-1;
  }
}
</style>