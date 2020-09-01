<template>
    <div class="component-content">
        <van-notice-bar left-icon="volume-o">
            这个导航页面
        </van-notice-bar>

        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">华丽分割线</van-divider>

        <van-cell title="首页(包含上拉加载、公用底部导航)" is-link to="/index"/>
        <van-cell title="我的" is-link to="/my"/>
        <van-cell title="首页-消息(左滑可以删除)" is-link to="/message"/>
        <van-cell title="首页-搜索" is-link to="/search"/>
        <van-cell title="首页-报修" is-link to="/repair"/>
        <van-cell title="首页-填报(左滑可以删除)" is-link to="/fillIn"/>
        <van-cell title="首页-选择设备" is-link to="/selectDevice"/>
        <van-cell title="监控" is-link to="/monitor"/>
        <van-cell title="工单-调度工单详情" is-link to="orderDispatchDetails"/>
        <van-cell title="工单-安装工单详情" is-link to="orderInstallDetails"/>
        <van-cell title="工单-按权限-工单查询" is-link to="orderSearch"/>
        <van-cell title="设备详情" is-link to="/deviceDetails"/>
        <van-cell title="工单(按权限)" is-link to="/order"/>
          <van-cell title="扫一扫" is-link to="/scan"/>

        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">华丽分割线</van-divider>
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
</style>
