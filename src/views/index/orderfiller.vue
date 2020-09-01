<template>
    <div class="component-content">
        <van-form>
            <van-field label-width="5em" name="radio" label="工单状态:">
                <template #input>
                    <van-radio-group v-model="radio">
                        <van-radio name="1">不限</van-radio>
                        <van-radio name="2">已完成</van-radio>
                        <van-radio name="3">未完成</van-radio>
                        <van-radio name="4">延期完成</van-radio>
                        <van-radio name="5">延期中</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
        </van-form>
        <div class="department-item" v-for="n in 5">
            <van-sticky>
                <van-field name="checkbox" :label="`维修部门${n}`" input-align="right" class="title">
                    <template #input>
                        <van-checkbox v-model="checkboxAll" shape="square"/>
                    </template>
                </van-field>
            </van-sticky>

            <van-checkbox-group v-model="result">
                <van-cell-group>
                    <van-cell
                        v-for="(item, index) in list"
                        clickable
                        :key="item"
                        :title="`人员 ${item}`"
                        @click="toggle(index)"
                    >
                        <template #right-icon>
                            <van-checkbox :name="item" ref="checkboxes" shape="square"/>
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
        </div>

        <div class="tools">
            <van-button size="normal" type="default">重置</van-button>
            <van-button size="normal" type="info">确定</van-button>
        </div>
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
                radio: '1',
                checkboxAll:false,
                list: ['1', '2', '3', '4', '5', '6', '7', '8'],
                result: [],
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
        padding-bottom: 2.5rem;
        min-height: 100vh;
        background: $color-2;
    }
    .van-cell {
        padding-left: .2rem;
        padding-right: .2rem;
    }
    .van-radio-group {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .van-radio {
            flex-basis: 33.33%;
            padding: .1rem 0;
        }
    }
    .department-item {
        margin-top: .3rem;
        .title {
            ::v-deep .van-cell__title {
                font-weight: bold;
                color: $color-1;
            }
        }
        .van-cell {
            padding-left: .3rem;
            padding-right: .4rem;
        }
    }
    .tools {
        position: fixed;
        left: 0; right: 0; bottom: 0;
        display: flex;
        align-items: center;
        padding: .2rem .2rem;
        padding-bottom: .64rem;
        user-select: none;
        background: #fff;
        box-shadow: 0 5px 15px #E8E8ED;
        .van-button {
            width: 0;
            flex-grow: 1;
            & + .van-button {
                margin-left: .3rem;
            }
        }
    }
</style>