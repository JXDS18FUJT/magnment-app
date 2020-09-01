import request from '@/utils/request';

// 设备管理app报修查询设备列表


export const installInfoPlan_queryCount = function installInfoPlanQueryCount() {
  return request({
    url: 'deviceWeb/installInfoPlan/queryCount',
    method: 'get'
  });
}
export const  devdevicebase_queryCount = function devdevicebaseQueryCount (){
    return request({
        url:'deviceWeb/devdevicebase/queryCount',
        method:'get'
    });
}

export function dynamicMenuList(data){
  return request({
    url:'deviceWeb/baseDevApp/dynamicMenuList',
    method:'get',
    params:data
  })

}
