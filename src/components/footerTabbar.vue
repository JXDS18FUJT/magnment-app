<template>
<!-- 底部导航的代码 -->
  <div>
    <van-tabbar v-model="footerTabbarActive" 
    safe-area-inset-bottom 
    placeholder 
    class="p-footer"
    @change="footerNav"
    >
      <van-tabbar-item badge="" replace >
        <span>首页</span>

        <template #icon="props">
          <i v-if="props.active" class="iconfont">&#xe683;</i>
          <i v-else class="iconfont">&#xe64e;</i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item replace  >
        <span>监控</span>

        <template #icon="props">
          <i v-if="props.active" class="iconfont">&#xe604;</i>
          <i v-else class="iconfont">&#xe603;</i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item replace >
        <span>工单</span>

        <template #icon="props">
          <i v-if="props.active" class="iconfont">&#xe68a;</i>
          <i v-else class="iconfont">&#xe65f;</i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item replace>
        <span>我的</span>

        <template #icon="props">
          <i v-if="props.active" class="iconfont">&#xe65d;</i>
          <i v-else class="iconfont">&#xe643;</i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <!-- 底部导航的代码 -->
  </div>
</template>

<script>
export default {
    name:'footerTabbar',
    data() {
        return {
                tabsActive: 0, 
                // footerTabbarActive: 0,//被激活的导航选项的值
                type: 0,
          
        }
    },
    methods: {
      //底部导航激活时候的改变底部导航栏的选中状态
      footerNav(value) {
        switch(value){
          case 0 :
            this.$router.push({path:'/index',query:{
      
            }})
              break;
          case 1 :
               this.$router.push({path:'/monitor',query:{
           
            }})
            break;
          case 2 :
               this.$router.push({path:'/order',query:{
            }})
            break;
          case 3 :
               this.$router.push({path:'/my',query:{
            }})
            break;


            
        }
  

      }
    },
    props: {
      footerTabbarActive: {
        type: Number,
        default:0 
      },
    },
    // mounted () {
    //   this.footerTabbarActive = Number(this.$route.query.selectNumber) || 0;
    // }, 

};
</script>

<style lang="scss" scoped>
    .component-content {
        position: relative;
    }
    .search-wrap {
        display: flex;
        align-items: center;
        padding-right: .4rem;
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
        padding: .3rem;
        background: $color-1;
        user-select: none;

        .menu-item {
            width: 0;
            flex-grow: 1;
            color: #fff;
            text-align: center;
            transition: all .3s;

            &:active {
                opacity: .7;
            }
            .icon {
                @include iconfont;
                font-size: .7rem;
            }
            .title {
                display: block;
                margin-top: .1rem;
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
        @include thinLine($useBefore: true, $position: 'bottom', $backgroundColor: #eee, $top: 0, $right: .3rem, $bottom: 0, $left: .3rem);
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: .3rem .3rem;
        background: #fff;
        transition: all .3s;

        &:active {
            background: #f3f3f3;
        }
        .text-wrap {
            .order-wrap {
                display: flex;
                align-items: center;

                .van-tag {
                    margin-left: .1rem;
                }
            }
            .order-name {
                @include textEllipsis($type: 'multipleRows', $row: 1);
                font-weight: bold;
                color: $color-1;
            }
            .tips {
                margin-top: .05rem;
                color: #666;
            }
        }
    }
</style>