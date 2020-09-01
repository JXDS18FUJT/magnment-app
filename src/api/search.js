import request from '@/utils/request';

// 设备管理app报修查询设备列表
export function findDveList(data) {
  return request({
    url: 'deviceWeb/devDevice/findDveList',
    method: 'get',
    params:data
  });
}

//选择设备时候的接口详情见eolink设备\分页查询设备
// 查询设备的接口
export function selectDevieces(data){
  return request({
    url:'deviceWeb/devDevice/list',
    method:'get',
    params:data
  })
}
