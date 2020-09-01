<template>
    <div class="component-content">
        <van-search placeholder="请输入搜索关键词" />

        <van-list>
            <div v-for="(item,index) in repair.list" class="p-order-item">
                <div class="text-wrap">
                    <div class="order-wrap">
                        <p class="order-name">{{item.name}}</p>
                    </div>

                    <p class="tips">设备编号：{{item.code}}</p>
                    <p class="tips">故障现象：{{item.appear}}</p>
                    <p class="tips">工单状态：{{item.status}}</p>
                </div>
            </div>
        </van-list>

        <van-empty description="搜索无记录" />
    </div>
</template>

<script>
import {findDveList} from '@/api/repair'
    export default {
        name: 'Index',
        components: {
            //
        },
        data() {
            return {
                repair:{
                    list:[{
                        code:'0000',
                        name:'水表',
                        appear:'挂机',
                        status:'已完成'

                    }],  //报修的列表
                }
                //
            };
        },
        methods: {
            getFindDveList(param){
                findDveList(param).then(
                    this.repair.list
                )

               
            }
            //
        },
        mounted () {
           this.getFindDveList({
                 pageSize:10,
                 page:1,
                 name:''
             });
        },
    };
</script>

<style lang="scss" scoped>
    .component-content {
        position: relative;
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
