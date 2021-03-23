import request from '../util/request'

export const getAllCompetitionClassifyList =(competitionClassify,size,current)=>{
  return request({
    url:'/competitionClassify/getAllCompetitionClassifyList',
    method:'post',
    data:{
      competitionClassify:competitionClassify,
      size:size,
      current:current
    }
  })
}

export const deleteCompetitionClassifyById =(id)=>{
  return request({
    url:'/competitionClassify/deleteCompetitionClassifyById',
    method:'post',
    data:{
      id:id
    }
  })
}

export const addCompetitionClassify =(competitionClassify)=>{
  return request({
    url:'/competitionClassify/addCompetitionClassify',
    method:'post',
    data:{
      competitionClassify:competitionClassify
    }
  })
}

export const getAllCompetitions =(competitionName,current,size)=>{
  return request({
    url:'/competitions/getAllCompetitions',
    method:'post',
    data:{
      competitionName:competitionName,
      current:current,
      size:size
    }
  })
}
