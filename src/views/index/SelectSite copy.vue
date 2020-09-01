<template>
  <div class="component-content">
    <topBack topTitle="选择站点"></topBack>

    <van-search placeholder="设备名称、设备编号、出厂编号" :show-action='true' >
      <template #action>
        <div style="height:10px"></div>
        <van-icon name="scan" :show-action='true' size="24" @click="$router.push('/monitorFiltter')" />
      </template>
    </van-search>

    <van-list>
      <div
        v-for="(item,index) in selectList"
        :key="index"
        class="p-order-item"
        @click="markPublicState(item)"
      >
        <div class="text-wrap">
          <div class="order-wrap">
            <p class="order-name">设备名称设备名称设备名称</p>
          </div>

          <p class="tips">设备编号：{{item.deviceCode}}</p>
          <p class="tips">生产厂商：{{item.productHome}}</p>
          <p class="tips">设备型号：{{item.type}}</p>
          <p class="tips">出厂编号：{{item.number}}</p>
        </div>
      </div>
    </van-list>

    <van-empty description="搜索无记录" />
  </div>
</template>

<script>

export default {
  name: "Index",
  components: {
    //
  },
  data() {
    return {
      selectList: [
        {
          name: "设备名称设备名称设备名称",
          deviceCode: "212", //设备编号
          productHome: "智恒", //厂家
          type: "bn13", //类型
          number: "hy121" //出厂编号
        },
        {
          name: "设备名称设备名称设备名称",
          deviceCode: "00002", //设备编号
          productHome: "星空", //厂家
          type: "mpj88", //类型
          number: "70000" //出厂编号
        }
      ]
      //
    };
  },
  methods: {
    markPublicState(selected) {
      switch (this.viewType) {
        case "安装":
          localStorage.setItem("install", JSON.stringify(selected));
          this.$router.push(
            "/writeInstallRecord"
          );
          break;
        case "调试":
          this.$router.push(
            "/writeDebugRecord"
          );
          localStorage.setItem("debug", JSON.stringify(selected));
          break;
          case "报修":
             this.$router.push(
            "/repairForm"
          );
          break;
          default:
              

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
  mounted () {
    this.viewType = this.$route.query.viewType;
    console.log( this.viewType )
  },
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
