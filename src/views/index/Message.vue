<template>
    <div class="component-content">
        <topBack topTitle="设备告警"></topBack>
        <!-- <van-tabs v-model="tabsActive" color="#fff" sticky> -->
            <!-- <van-tab title="提醒消息">
                <van-list>
                    <van-swipe-cell v-for="n in 2">
                        <div class="p-order-item">
                            <div class="text-wrap">
                                <p class="order-name">代办工单即将过期</p>
                                <time>2019-10-12 14:30</time>
                            </div>

                            <p class="tips">安装工单名称安装工单名称安装工单名称安装工单名称</p>
                        </div>

                        <template #right>
                            <van-button square text="删除" type="danger" class="delete-button" />
                        </template>
                    </van-swipe-cell>

                    <van-divider dashed>以下是历史消息</van-divider>

                    <van-swipe-cell v-for="n in 5">
                        <div class="p-order-item">
                            <div class="text-wrap">
                                <p class="order-name">代办工单即将过期</p>
                                <time>2019-10-12 14:30</time>
                            </div>

                            <p class="tips">安装工单名称安装工单名称安装工单名称安装工单名称</p>
                        </div>

                        <template #right>
                            <van-button square text="删除" type="danger" class="delete-button" />
                        </template>
                    </van-swipe-cell>
                </van-list>
            </van-tab> -->

            <!-- <van-tab title="设备告警" :border="false"> -->
                <van-list>
                    <van-swipe-cell v-for="n in 2">
                        <div class="p-order-item">
                            <div class="text-wrap">
                                <p class="order-name">设备异常</p>
                                <time>2019-10-12 14:30</time>
                            </div>

                            <p class="tips">设备编号：123478765</p>
                            <p class="tips">设备名称：江南水都DN50</p>
                            <p class="tips">异常类型：离线</p>

                            <div class="tips-wrap">
                                <p class="tips">
                                    设备地址: 福建省福州市鼓楼区健康之路
                                </p>

                                <i class="icon-link">&#xe603;</i>
                            </div>
                        </div>

                        <template #right>
                            <van-button square text="删除" type="danger" class="delete-button" />
                        </template>
                    </van-swipe-cell>
                </van-list>

                <!-- <van-empty description="没数据呀" /> -->
            <!-- </van-tab> -->
        <!-- </van-tabs> -->
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
    .delete-button {
        height: 100%;
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
        .tips-wrap {
            display: flex;
            align-items: center;
            margin-top: .1rem;

            .tips {
                @include textEllipsis($type: 'multipleRows', $row: 1);
                margin-top: 0;
                width: 0;
                flex-grow: 1;
            }
        }
        .tips {
            @include textEllipsis($type: 'multipleRows', $row: 2);
            margin-top: .1rem;
            color: #666;
        }
        .icon-link {
            @include iconfont;
            margin-left: .2rem;
            padding: .1rem;
            border-radius: 50%;
            font-size: .3rem;
            color: #fff;
            background: $color-1;
        }
    }
</style>
