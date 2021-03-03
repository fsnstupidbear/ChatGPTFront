import request from '../util/request'

export const getAllRoles =()=>{
  return request({
    url:'/userRole/getAllRoles',
    method:'post',
  })
}

export const getRolesById =(id)=>{
  return request({
    url:'/userRole/getRolesById',
    method:'post',
    data:{
      id:id
    }
  })
}

export const updateRolesById =(id,roles)=>{
  return request({
    url:'/userRole/updateRolesById',
    method:'post',
    data:{
      id:id,
      roles:roles
    }
  })
}
