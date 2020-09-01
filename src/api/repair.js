import request from '@/utils/request';

// 设备管理app报修查询设备列表
export function findDveList(data) {
  return request({
    url: 'deviceWeb/devDevice/findDveList',
    method: 'get',
    params:data
  });
}