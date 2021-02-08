import request from '../util/request'

/**
 * 请求需要携带token
 * @returns {AxiosPromise}
 */
export const getPoints =()=>{
  return request({
    url:'/FVF/',
    method:'post'
  })
}

  export const divideGroup =(pointsList)=>{
    let params = new URLSearchParams();
    params.append("persons",pointsList);
    console.log(pointsList)
  return request({
    url:'/FVF/dg',
    method:'post',
    data:{
    persons:pointsList
    }
  })
}

export const clearAll =()=>{
  return request({
    url:'/FVF/clearAll',
    method:'post'
  })
}

export const checkScore =(score)=>{
  return request({
    url:'/FVF/checkScore',
    method:'post',
    data:{
      score:score
    }
  })
}
