<template>
        <van-list
          v-model="process.loading"
          :finished="process.finished"
          finished-text="没有更多了"
          @load="onProcessLoad"
          :immediate-check="false"
        >
     
          <div v-for="(item,index) in yanghu.list" :key="index" class="p-order-item">
            <div class="text-wrap">
              <div class="order-wrap">
                <p class="order-name">{{item.name}}</p>
                <van-tag plain type="success">{{item.status}}</van-tag>
              </div>

              <p class="tips">限办时间:{{item.limitedTime}}</p>
            </div>
          </div>
        </van-list>
</template>

<script>
    export default {
        data() {
            return {

                process: {
                    loading:false,
                    finished:false,
                    nowPage:1
                }
            }
        },
        methods: {
           onProcessLoad() {

                
            }
        },
        props: {
            propName: {
                type: Number,
                default: 0
            },
            type:{


            },
            resetPage:{
                type:Boolean,
                default:false,
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>