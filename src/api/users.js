import request from '../util/request'
import current from 'element-ui/packages/table/src/store/current'

/**
 * 请求需要携带token
 * @returns {AxiosPromise}
 */
export const getAllUsers =(current,size)=>{
  let params = new URLSearchParams();
  params.append("current",current);
  params.append("size",size);
  return request({
    url:'/users/getAllUsers',
    method:'post',
    data:{
      current:current,
      size:size
    }
  })
}
