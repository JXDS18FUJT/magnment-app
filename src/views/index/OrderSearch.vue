<template>
    <div class="component-content">
        <van-tabs v-model="tabsActive" color="#2e7ae6" sticky>
            <van-tab title="维修(2)">
                <van-list>
                     <van-swipe-cell v-for="n in 2">
                        <div class="p-order-item">
                            <div class="text-wrap">
                                <p class="order-name">项目名称项目名称项目名称</p>
                            </div>

                            <p class="tips">限办时间：2020-05-12</p>
                            <p class="tips">工单状态：习大大处理中</p>
                        </div>

                        <template #right>
                            <van-button square text="删除" type="danger" class="delete-button" />
                        </template>
                    </van-swipe-cell>
                </van-list>
            </van-tab>

            <van-tab title="养护(2)">
                <van-empty description="没数据呀" />
            </van-tab>

            <van-tab title="安装(1)">
                <van-empty description="没数据呀" />
            </van-tab>

            <van-tab title="调试(2)">
                <van-empty description="没数据呀" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        name: 'Index',
        components: {
            //
        },
        data() {
            return {
                tabsActive: 0,
            };
        },
        methods: {
            //
        }
    };
</script>

<style lang="scss" scoped>
    .component-content {
        position: relative;
    }
    .p-order-item {
        @include thinLine($useBefore: true, $position: 'bottom', $backgroundColor: #eee, $top: 0, $right: .3rem, $bottom: 0, $left: .3rem);
        padding: .3rem .3rem;
        background: #fff;
        transition: all .3s;

        &:active {
            background: #f3f3f3;
        }
        .text-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .order-name {
                @include textEllipsis($type: 'multipleRows', $row: 1);
                font-weight: bold;
                color: $color-1;
            }
            time {
                flex-shrink: 0;
                font-size: .2rem;
                color: #999;
            }
        }
        .tips {
            @include textEllipsis($type: 'multipleRows', $row: 2);
            margin-top: .1rem;
            color: #666;
        }
    }
</style>
