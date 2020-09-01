<template>
  <div class="orderList">
    <div class="total">
      <div>{{orderDatas.totalCnt}}</div>
      <div class="fontColor">{{title}}</div>
    </div>
    <div class="orderData">
      <div>
        已完成
        <span>{{orderDatas.myTodoCnt}}</span>
      </div>
      <div>
        延期完成
        <span class="yanqi">{{orderDatas.myEndCnt}}</span>
      </div>
      <div>
        未完成
        <span>{{orderDatas.myTodoTimeout}}</span>
      </div>
      <div>
        延期中
        <span>{{orderDatas.myEndTimeout}}</span>
      </div>
    </div>
  </div>
</template>

<script>
var a = {
  itemCode: "device_azjh",
  itemName: null,
  totalCnt: 1,
  doneEndCnt: 0,
  readableCnt: 0,
  timeoutCnt: 0,
  urgeCnt: 0,
  myTodoCnt: 1,
  myApproveCnt: 0,
  myCancelCnt: 0,
  myEndCnt: 0,
  myRejectCnt: 0,
  myRevokeCnt: 0,
  myTodoTimeout: 0,
  myEndTimeout: 0
};
export default {
  name: "orderList",
  data() {
    return {
      
    };
  },
  props: {
    title: {
      type: String,
      default: "工单"
    },
    orderDatas: {
      type: Object,
      default: []
    }
  }
};
</script>

<style lang="scss" scoped>
.orderList {
  display: flex;
  flex-flow: row nowrap;
  font-size: 16px;
  background-color: white;
  box-sizing: border-box;
  tr {
    width: 2.4rem;
  }
}
.total {
  display: flex;
  justify-content: center;
  width: 2.7rem;
  height: 2rem;
  flex-flow: column wrap;
  align-content: center;
  border-right: 0.04rem #f4f6f6 solid;
  border-left: 0.04rem #f4f6f6 solid;
  border-bottom: 0.04rem #f4f6f6 solid;

  div {
    width: 100%;
    text-align: center;
  }
  .fontColor {
    color: #969799;
    margin-top: 0.15rem;
    font-size: 12px;
  }
}
.orderData {
  width: 4.8rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  div {
    width: 50%;
    font-size: 12px;
    color: #969799;
    padding-left: 0.3rem;
    overflow: hidden;
    height: 1rem;
    line-height: 1rem;
    border-right: 0.04rem #f4f6f6 solid;
    border-bottom: 0.04rem #f4f6f6 solid;
    span {
      color: black;
      padding-left: 0.5rem;
    }
    .yanqi {
      padding-left: 0.27rem;
    }
  }
}
</style>