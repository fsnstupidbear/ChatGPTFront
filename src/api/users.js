import request from '../util/request'

/**
 * 请求需要携带token
 * @returns {AxiosPromise}
 */
export const getAllUsers =(current,size,users)=>{
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
  return request({
    url:'/users/insertUser',
    method:'post',
    data:{
      user:user
    }
  })
}

//修改队员信息
export const updateUserById = (user)=>{
  return request({
    url:'/users/updateUserById',
    method:'post',
    data:{
      user:user
    }
  })
}

export const getMenuList = ()=>{
  return request({
    url:'/menuList/getMenuList',
    method:'post',
  })
}

export const isForbiddenUserById = (id,isForbidden)=>{
  return request({
    url:'/users/isForbiddenUserById',
    method:'post',
    data:{
      id:id,
      isForbidden:isForbidden
    }
  })
}

export const getModuleOptions = ()=>{
  return request({
    url:'/module/getModuleOptions',
    method:'post',
  })
}
