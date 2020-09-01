<template>
  <div class="component-content">
     <topBack topTitle="搜索"></topBack>
    <van-search
      placeholder="请输入搜索关键词"
      v-model="search.word"
      @search="searchDevList"
      @input="emptySearchDevList"
    >
      <template #action>
        <div style="height:10px"></div>
        <van-icon name="qr" size="24" @click="$router.push('/monitorFiltter')" />
      </template>
    </van-search>

    <van-list v-if="search.list.length !=0">
      <div
        v-for="(item,index) in search.list"
        :key="index"
        class="p-order-item"
        @click="generateDeviceUrl(item.id)"
      >
        <div class="text-wrap">
          <div class="order-wrap">
            <p class="order-name" v-text="item.name"></p>
          </div>

          <p class="tips" v-text="item.code">UI瞎几把画11010101010</p>
          <p class="tips" v-text="item.address?item.address:'福州市仓山区东南侧福州市仓山区东南侧'">福州市仓山区东南侧福州市仓山区东南侧</p>
        </div>
      </div>
    </van-list>
    <van-empty v-if="search.list.length==0" description="搜索无记录" />
  </div>
</template>

<script>
import { findDveList, selectDevieces } from "@/api/search";
import { Notify } from "vant";
export default {
  name: "Index",
  components: {
    //
  },
  data() {
    return {
      search: {
        word: "", //搜索的字
        list: [] //搜索结果的list
      }
      //
    };
  },
  methods: {
    //当没有关键时候清空数据
    emptySearchDevList(val) {
      if (!this.search.word) {
        this.search.list = [];
      }
    },
    //生成对应的设备的url
    generateDeviceUrl(name) {
      console.log(name);
      this.$router.push({ path: "/deviceDetails", query: { name: name } });
    },
    //关键字变化时候的查询方法
    searchDevList(value) {
      this.search.word = value;
      selectDevieces({
        page: 1,
        pageSize: 50,
        name: this.search.word
      }).then(res => {
        if (res.obj.length > 0) {
          Notify({
            type: "warning",
            message: "已查到" + res.obj.length + "数据" + ",正在加载"
          });
        } else if (res.obj.length == 0) {
          Notify({ type: "warning", message: "没查到数据" });
        }
        this.search.list = res.obj;
      }).catch(
          res=>{
            Notify({
              type: "warning",
              message: "网络不佳"
            });

          }
      )
    },
    //获取关键字并且出现搜索结果,用于挂载的情况下
    getkeyWord_showList() {
      this.search.word = this.$route.query.keyword;
      if (this.search.word) {
        console.log("搜索结果", this.search.word);
        selectDevieces({
          page: 1,
          pageSize: 50,
          name: this.search.word
        }).then(res => {
          if (res.obj.length > 0) {
            Notify({
              type: "warning",
              message: "已查到" + res.obj.length + "数据" + ",正在加载"
            });
          } else if (res.obj.length == 0) {
            Notify({ type: "warning", message: "没查到数据" });
          }
          this.search.list = res.obj;
        }).catch(
          res=>{
            Notify({
              type: "warning",
              message: "网络不佳"
            });

          }
      )
      }
    }

    //
  },
  mounted() {
    this.getkeyWord_showList();
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
