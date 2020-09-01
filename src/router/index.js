import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [
    // 临时路由，记得删除哦
    {
        path: '/', // 这个页面不需要 只是方便你们查看所有页面的入口
        component: () => import('@/views/template/Navigation')
    },
    {
        path: '/index', // 首页
        component: () => import('@/views/index/Index')
    },
    {
        path: '/my', // 我的
        component: () => import('@/views/index/My')
    },
    {
        path: '/message', // 消息
        component: () => import('@/views/index/Message')
    },
    {
        path: '/search', // 搜索
        component: () => import('@/views/index/Search')
    },
    {
        path: '/repair', // 报修
        component: () => import('@/views/index/Repair')
    },
    {
        path: '/fillIn', // 填报
        component: () => import('@/views/index/deviceFillin')
    },
    {
        path: '/selectDevice', // 选择设备
        component: () => import('@/views/index/SelectDevice')
    },
    {
        path: '/selectSite', // 选择站点
        component: () => import('@/views/index/SelectSite')
    },
    {
        path: '/monitor', // 监控
        component: () => import('@/views/index/Monitor')
    },
    {
        path: '/orderDispatchDetails', // 工单-调度工单详情
        component: () => import('@/views/index/OrderDispatchDetails')
    },
    {
        path: '/orderInstallDetails', // 工单-安装工单详情
        component: () => import('@/views/index/OrderInstallDetails')
    },
    {
        path: '/orderSearch', // 工单-按权限-工单查询
        component: () => import('@/views/index/OrderSearch')
    },
    // {
    //     path: '/orderStatistics', // 工单-按权限-工单统计 目前不存在
    //     component: () => import('@/views/index/OrderStatistics')
    // },
    {
        path: '/deviceDetails', // 设备详情
        component: () => import('@/views/index/DeviceDetails')
    },
    {
        path: '/order', // 工单
        component: () => import('@/views/index/Order')
    },
    {
        path: '/myFiltter', // 我的-筛选
        component: () => import('@/views/index/MyFiltter'),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/monitorFiltter', // 我的-筛选
        component: () => import('@/views/index/MonitorFiltter'),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/remark', // 记录页面
        component: () => import('@/views/index/Remark')
    },
    {
        path: '/writeInstallRecord', // 填写安装记录
        component: () => import('@/views/index/WriteInstallRecord'),
    },
    {
        path: '/writeDebugRecord', // 填写调试记录
        component: () => import('@/views/index/WriteDebugRecord'),
    },
    {
        path: '/myDevice', // 我的设备
        component: () => import('@/views/index/MyDevice')
    },
    {
        path: '/myComplete', //我完成的
        component: () => import('@/views/index/MyComplete')
    },
    {
        path: '/myComplete', //报修列表
        component: () => import('@/views/index/MyComplete')
    },
    {
        path: '/repairForm', // 维修的表单页面
        component: () => import('@/views/index/RepairForm')
    },
    {
        path: '/scan', // 维修的表单页面
        component: () => import('@/views/template/scan')
    },
    {
        path: '/iframe', // 维修的表单页面
        component: () => import('@/views/template/iframe')  
    },
    {
        path:'/writeFillRecord', // 填报的表单
        component:()=>import('@/views/index/WriteFillRecord')
    }
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

export default router;
