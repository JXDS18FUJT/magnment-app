import Mock from 'mockjs'
import monitor from './data/monitor'
let prefix = 'http://192.168.50.71:8088/'
Mock.mock(prefix+'monitor/index', 'post', () => {  // 此处会劫持/root/login/checkMemberLogin接口，并返回数据
  return monitor.monitorIndex  // 返回模拟数据
})

