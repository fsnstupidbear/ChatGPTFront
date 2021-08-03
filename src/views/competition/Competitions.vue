<template>
  <div>
    <!--  用户列表卡片-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>赛事总览</span>
      </div>
      <CompetitionResult :competitionResultVisible="competitionResultVisible" :choosedRowCompetitionId="choosedRowCompetitionId"
                         @changeShow="changeCompetitionResult" @getAllCompetitions="getAllCompetitions"></CompetitionResult>
      <InsertCompetition :insertCompetitionVisiable="insertCompetitionVisiable" @changeShow="changeInsertCompetitionWindow" @getAllCompetitions="getAllCompetitions"></InsertCompetition>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="查询赛事：">
          <el-input clearable v-model="competitionName" placeholder="输入赛事名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getAllCompetitions">查询</el-button>
        </el-form-item>
        <el-form-item>
          <span v-if="hasAdminAuthority">
          <el-button type="primary" icon="el-icon-refresh" @click="changeInsertCompetitionWindow">录入新赛事</el-button>
            </span>
        </el-form-item>
        <SignUpInfo :signUpInfoVisible="signUpInfoVisible" :choosedRowCompetitionId="choosedRowCompetitionId" @changeShow="changeShowSignUpInfo"
        ></SignUpInfo>
      </el-form>
      <el-table
        :show-overflow-tooltip="true"
        :data="competitionsList"
        border
        style="width: 100%"
      >
        <el-table-column
          label="赛事"
          prop="competitionName"
>
        </el-table-column>
        <el-table-column
          prop="type"
          label="赛事类型"
        >
        </el-table-column>
        <el-table-column
          prop="startDate"
          width="140px"
          label="开赛日期"
        >
        </el-table-column>
        <el-table-column
          prop="sponsor"
          width="50px"
          label="发起人"
        >
        </el-table-column>
        <el-table-column
          prop="reward"
          width="300px"
          label="奖金/元"
        >
        </el-table-column>
        <el-table-column
          width="300px"
          prop="result"
          label="结果"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          :show-overflow-tooltip="true"
          label="操作"
          :width="hasAdminAuthority?'340px':'90px'"
          >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-ico-delete" @click="changeShowSignUpInfo(scope.row.id)"
                       v-if="scope.row.couldSignUp===true">
              报名参赛
            </el-button>
            <el-button size="mini" icon="el-ico-delete" style="width: 80px"
                       v-if="scope.row.couldSignUp===false">
              已结束
            </el-button>
            <span v-if="hasAdminAuthority">
              <el-popconfirm
                @onConfirm="updateSignUpStateById(scope.row.id,scope.row.couldSignUp)"
                style="margin-left: 10px;margin-right: 10px"
                icon="el-icon-info"
                icon-color="black"
                title="确定进行此操作吗？"
              >
                <el-button slot="reference" type="warning" size="mini" icon="el-ico-delete"
                           v-if="scope.row.couldSignUp===true">
                  截止报名</el-button>
                <el-button slot="reference" type="warning" size="mini" icon="el-ico-delete"
                           v-if="scope.row.couldSignUp===false">
                  恢复报名</el-button>
              </el-popconfirm>
            <el-button type="primary" size="mini" icon="el-ico-delete" @click="changeCompetitionResult(scope.row.id)">
              录入成绩
            </el-button>
              <el-popconfirm
                @onConfirm="deleteCompetitionById(scope.row.id)"
                style="margin-left: 10px;margin-right: 10px"
                icon="el-icon-info"
                icon-color="black"
                title="确定进行此操作吗？"
              >
              <el-button slot="reference" type="danger" size="mini" icon="el-ico-delete">
              删除
            </el-button>
              </el-popconfirm>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import { getAllVocations } from '../../api/vocations'
  import { Message } from 'element-ui'
  import {
    deleteCompetitionById,
    getAllCompetitions,
    ifHasAuthority,
    updateSignUpStateById
  } from '../../api/competition'
  import SignUpInfo from '../user/SignUpInfo'
  import CompetitionResult from './CompetitionResult'
  import InsertCompetition from './InsertCompetition'

  export default {
    name: 'Competitions',
    components:{
      InsertCompetition,
      CompetitionResult,
      SignUpInfo},
    data () {
      return {
        insertCompetitionVisiable:false,
        competitionResultVisible:false,
        hasAdminAuthority:false,
        competitionName:'',
        signUpInfoVisible: false,
        authorityVisible:false,
        choosedRowCompetitionId:undefined,
        choosedRowUserInfo: [],
        formInline: {
          user: '',
          region: '',
          city: '',
        },
        competitionsList: [],
        current: 1,
        total: undefined,
        size: 6,

        allVocationsList: undefined,
        vocation: '',
      }
    },

    /**
     * 创建组件时调用
     */
    created () {
      this.getAllCompetitions()
      this.ifHasAuthority()
    },

    methods: {
      async deleteCompetitionById(competitionId){
        await deleteCompetitionById(competitionId)
        this.getAllCompetitions()
      },
      changeInsertCompetitionWindow(data){
        if (data === 'false') {
          this.insertCompetitionVisiable = false
        } else {
          this.insertCompetitionVisiable = true
        }
      },
      async ifHasAuthority(){
        const {data} = await ifHasAuthority()
        this.hasAdminAuthority = data.data.ifHasAuthority
      },
      //改变选中的比赛能否报名状态
     async updateSignUpStateById(id,state){
        if(state===true){
          state = false
         await updateSignUpStateById(id,state)
         await this.getAllCompetitions()
        }else {
          state = true
         await updateSignUpStateById(id,state)
         await this.getAllCompetitions()
        }
      },
      //更改比赛结果弹窗显示与否
      changeCompetitionResult(data){
        if (data === 'false') {
          this.competitionResultVisible = false
        } else {
          this.choosedRowCompetitionId = data
          this.competitionResultVisible = true
        }
      },
      changeShowSignUpInfo(data){
        if (data === 'false') {
          this.signUpInfoVisible = false
        } else {
          this.choosedRowCompetitionId = data
          this.signUpInfoVisible = true
        }
      },
      handleSizeChange (val) {
        this.size = val
        this.getAllCompetitions()
      },
      handleCurrentChange (val) {
        this.current = val
        this.getAllCompetitions()
      },
      async getAllCompetitions () {
        const { data } = await getAllCompetitions(this.competitionName,this.current, this.size)
        this.competitionsList = data.data.competitions
        this.total = data.data.total
      },
    }
  }
</script>

<style scoped lang="less">

</style>
