import request from '../util/request'

export const getWeekPlan =()=>{
  return request({
    url:'/competitionsSignUpInfo/getSignUpInfo',
    method:'post',
  })
}
