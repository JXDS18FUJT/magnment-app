<template>
    <div class="component-content">
        <van-list>
            <van-swipe-cell v-for="n in 3">
                <div class="p-order-item">
                    <div class="text-wrap">
                        <div class="order-wrap">
                            <p class="order-name">设备名称设备名称设备名称</p>
                        </div>

                        <p class="tips">设备编号：11010101010</p>
                        <p class="tips">2020-06-23 12:34:12</p>
                    </div>
                </div>

                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button"/>
                </template>
            </van-swipe-cell>
        </van-list>

        <van-empty description="搜索无记录"/>
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

                //
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
    .delete-button {
        height: 100%;
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
