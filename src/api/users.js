import request from '../util/request'

/**
 * 请求需要携带token
 * @returns {AxiosPromise}
 */
export const getAllUsers =(current,size,users)=>{
  let params = new URLSearchParams();
  params.append("current",current);
  params.append("size",size);
  params.append("users",users);
  return request({
    url:'/users/getAllUsers',
    method:'post',
    data:{
      current:current,
      size:size,
      users:users
    }
  })
}

//添加队员信息
export const insertUser = (user)=>{
  let params = new URLSearchParams();
  params.append("user",user)
  return request({
    url:'/users/insertUser',
    method:'post',
    data:{
      user:user
    }
  })
}
