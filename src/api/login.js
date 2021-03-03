import request from '../util/request'

export const login =(username,password)=>{
  let params = new URLSearchParams();
  params.append("username",username)
  params.append("password",password)
  return request({
    url:'/login',
    method:'post',
    params:{
      username:username,
      password:password
    }
  })
}

export const logout =()=>{
  return request({
    url:'/logout',
    method:'post',
  })
}
