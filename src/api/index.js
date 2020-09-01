import request from '@/utils/request';

// 设备管理app报修查询设备列表
export function findDveList(data) {
  return request({
    url: 'deviceWeb/devDevice/findDveList',
    method: 'get',
    params: data
  });
}
//调试工单
export function DebugPlanListForApp(data){
  return request({
    url: 'deviceWeb/baseDevApp/queryDmDevDebugPlanListForApp',
    method: 'get',
    params:data
  });

}

//查询设备管理app的安装和

export function InstallInfoPlanListForApp(data) {
  return request({
    url: 'deviceWeb/baseDevApp/queryDmDevInstallInfoPlanListForApp',
    method: 'get',
    params: data
  });
}

//查询未办理的接口
export function waitHandle(data){
  return request({
    url:'deviceWeb/baseDevApp/qryTodoTaskInfo',
    method:'get',
    params:data
  })

}
//查询已经办理的接口
export function alreadyHandle(data){
  return request({
    url:'deviceWeb/baseDevApp/qryDoneTaskInfo',
    method:'get',
    params:data
  })

}

//查询我的接口

export function myHandle(data){
  return request({
    url:'deviceWeb/baseDevApp/queryGdApply',
    method:'get',
    params:data
  })



}
//已经延迟办理的设备接口
export function delayHandle(data){
  return request({
    url:'deviceWeb/baseDevApp/queryGdApply',
    method:'get',
    params:data
  })

}
//查询安装工单的详情
export function installDetails(data){
  return request({
    url:'deviceWeb/baseDevApp/queryDmDevInstallInfoPlanItemForApp',
    method:'get',
    params:data
  })
}
//根据规格参数来查询安装或者调试工单，type1安装type2调试
export function installPlan(data){
  return request({
    url:'deviceWeb/baseDevApp/queryInstallInfoPlanListByModel',
    method:'get',
    params:data
  })
}

//上传文件的接口
export function afterRead(data){
  return request({
    url:'deviceWeb/baseDevApp/uploadFile',
    method:'post',
    data,
    headers:{
      'Content-Type':'application/json;charset=UTF-8'
    }
  })
}
//选择设备时候的接口详情见eolink设备\分页查询设备
export function selectDevieces(data){
  return request({
    url:'deviceWeb/devDevice/list',
    method:'get',
    params:data
  })
}
//查询调试工单的详情
export function debugPlan(data){
  return request({
    url:'deviceWeb/baseDevApp/getDmDebugPlanItemInfo',
    method:'get',
    params:data

  })

}
//用于保存设备的信息接口
export function saveInstallInfo(data){
  return request({
    url:'deviceWeb/baseDevApp/updateOrSaveInstallInfo',
    method:'post',
    data
  })
}

//用于查询设备的信息的接口,获取单个设备的接口
export function queryInstallInfo(data){
  return request({
    url:'deviceWeb/devDevice',
    method:'get',
    params:data
  })
}
//获取调试的列表
export function queryInfoList(data){
  return request({
    url:'deviceWeb/baseDevApp/queryInfoList',
    method:'get',
    params:data

  })
}
// 保存填写调试记录的页面
export function saveDebugInfo(data){
  return request({
    url:'deviceWeb/baseDevApp/saveOrUpdateForDmDevDebugInfo',
    method:'post',
    data
  })

}
//获取巡检的图标的数字
export function taskListCount(){
  return request({
    url:'deviceWeb/baseDevApp/getOsiTaskListCount',
    method:'get',
  })

}
//查询填报的列表
export function queryFillInDevBaseList(data){
  return request({
    url:'deviceWeb/baseDevApp/queryFillInDevBaseList',
    method:'get',
    params:data
  })
}

//删除填报的列表
export function deleteFillList(data){
  return request({
    url:'deviceWeb/baseDevApp/delFillInDevBaseById',
    method:'get',
    params:data
  })
}

//根据站点来获取填报的设备
export function getfillBySite(data){
  return request({
    url:'deviceWeb/baseDevApp/queryDevBaseBySite',
    method:'get',
    params:data
  })
}
//通过设备获取指标
export function getDevQuotaInfoList(data){
  return request({
    url:'deviceWeb/baseDevApp/getDevQuotaInfoList',
    method:'get',
    params:data
  })
}

//保存设备的指标的数据
export function saveMonitorCollectList(data){
  return request({
    url:'deviceWeb/baseDevApp/saveMonitorCollectList',
    method:'post',
    data
  })
}
//获取站点的列表
export function getSiteList(params){
  return request({
    url:'deviceWeb/site/list',
    method:'get',
    params
  })
}