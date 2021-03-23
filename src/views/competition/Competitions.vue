<template>
  <div>
    <!--  用户列表卡片-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>赛事总览</span>
      </div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="查询赛事：">
          <el-input clearable v-model="competitionName" placeholder="输入赛事名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getAllCompetitions">查询</el-button>
          <el-button type="info" icon="el-icon-refresh" @click="reset">重置</el-button>
          <el-button type="info" icon="el-icon-refresh" @click="showAddWindow">添加</el-button>
        </el-form-item>
        <SignUpInfo :signUpInfoVisible="signUpInfoVisible" :choosedRowCompetitionId="choosedRowCompetitionId" @changeShow="changeShowSignUpInfo"
        ></SignUpInfo>
      </el-form>
      <el-table
        :show-overflow-tooltip="true"
        :data="competitionsList"
        height="377px"
        border
        style="width: 100%"
      >
        <el-table-column
          label="赛事"
          prop="competitionName"
>
        </el-table-column>
        <el-table-column
          prop="date"
          label="开赛日期"
        >
        </el-table-column>
        <el-table-column
          prop="result"
          label="结果"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="操作"
          width="270px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-ico-delete" @click="changeShowSignUpInfo(scope.row.id)">
              报名参赛
            </el-button>
            <el-button type="danger" size="mini" icon="el-ico-edit">角色禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[6, 10, 20, 50]"
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
  import { getAllCompetitions } from '../../api/competition'
  import SignUpInfo from '../user/SignUpInfo'

  export default {
    name: 'Competitions',
    components:{SignUpInfo},
    data () {
      return {
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
    },

    methods: {
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
        this.getAllUsers()
      },
      handleCurrentChange (val) {
        this.current = val
        this.getAllUsers()
      },
      async getAllCompetitions () {
        const { data } = await getAllCompetitions(this.competitionName,this.current, this.size)
        this.competitionsList = data.data.competitions
        this.total = data.data.total
      },
      //重置表单
      async reset () {
        this.competitionName="";
        this.getallRolesPageList()
        Message.closeAll()
        this.$message('已重置搜索条件！')
      },
    }
  }
</script>

<style scoped lang="less">

</style>
