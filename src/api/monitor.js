import request from '@/utils/request';

// 监控页面的显示异常列表的api
export function monitorIndex(params) {
  return request({
    url: 'deviceWeb/devDevice/list',
    method: 'get',
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': "*"
    }
  });
}

export function monitorSearch(params) {
  return request({
    url: '/monitor/search',
    method: 'post',
    params
  })
}
//获取统计的列表
export function getOrder(data) {
  return request({
    url: 'deviceWeb/baseDevApp/getAllMyTaskNum',
    method: 'get',
    params: data
  })
}
//获取工单的部门的列表
export function getDepartOrder(data){
  return request({
    url:'deviceWeb/baseDevApp/getAllMyTaskInfo',
    method:'get',
    params:data
  })
}
