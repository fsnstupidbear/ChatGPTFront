<template>

  <div>
    <!--  用户列表卡片-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>比赛类别管理</span>
      </div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="查询比赛类别：">
          <el-input clearable v-model="competitionClassify" placeholder="输入比赛类别"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getAllCompetitionClassifyList">查询</el-button>
          <el-button type="info" icon="el-icon-refresh" @click="addCompetitionClassify">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :show-overflow-tooltip="true"
        :data="allCompetitionClassifyList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="60px">
        </el-table-column>
        <el-table-column
          prop="competitionClassify"
          label="赛事类别"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="操作"
          width="120px">
          <template slot-scope="scope">
            <el-popconfirm
              @onConfirm="deleteCompetitionClassifyById(scope.row.id)"
              style="margin-left: 10px"
              icon="el-icon-info"
              icon-color="black"
              title="确定进行此操作吗？"
            >
              <el-button slot="reference" type="danger" size="mini" icon="el-ico-delete">
                删除</el-button>
            </el-popconfirm>
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
  import { Message } from 'element-ui'
  import {
    addCompetitionClassify,
    deleteCompetitionClassifyById,
    getAllCompetitionClassifyList
  } from '../../api/competition'

  export default {
    name: 'Users',
    data () {
      return {
        competitionClassify:undefined,
        updateVisible: false,
        addVisible: false,
        authorityVisible:false,
        choosedRowUserInfo: [],
        formInline: {
          user: '',
          region: '',
          city: '',
        },
        rolesList: [],
        current: 1,
        total: undefined,
        size: 6,
        allCompetitionClassifyList:undefined,
        allVocationsList: undefined,
        vocation: '',
      }
    },

    /**
     * 创建组件时调用
     */
    created () {
      this.getAllCompetitionClassifyList()
    },
    components: {

    },

    methods: {
      async addCompetitionClassify(){
        if(this.competitionClassify.trim()!="") {
          await addCompetitionClassify(this.competitionClassify);
          this.competitionClassify="";
          this.getAllCompetitionClassifyList();
        }else {
          this.$message("赛事类别名不能为空！")
        }
      },
      async deleteCompetitionClassifyById(id){
        await deleteCompetitionClassifyById(id);
        await this.getAllCompetitionClassifyList();
      },
      showAuthorityWindow (data) {
        this.authorityVisible = true
        this.choosedRowUserInfo = data
      },
      closeAuthorityWindow(data){
        if (data === 'false') {
          this.authorityVisible = false
        } else {
          this.authorityVisible = true
        }
      },
      //获取全部比赛类别
      async getAllCompetitionClassifyList () {
        const { data } = await getAllCompetitionClassifyList(this.competitionClassify,this.size,this.current)
        this.allCompetitionClassifyList = data.data.competitionClassifyList
      },
      //悬浮窗提示
      message (tip) {
        this.$message(tip)
      }
      ,
      //显示更改信息窗口
      showUpdateWindow (data) {
        this.updateVisible = true
        this.choosedRowUserInfo = data
      },
      //更改是否显示信息窗口
      showUpdate (data) {
        this.updateVisible = true
        if (data === 'false') {
          this.updateVisible = false
        } else {
          this.updateVisible = true
        }
        this.getAllCompetitionClassifyList()
      },
      //显示增加用户窗口
      showAddWindow () {
        this.addVisible = true
      },
      // 监听 子组件弹窗关闭后触发，有子组件调用
      showAdd (data) {
        if (data === 'false') {
          this.addVisible = false
        } else {
          this.addVisible = true
        }
        this.getAllCompetitionClassifyList()
      },
      handleSizeChange (val) {
        this.size = val
        this.getAllCompetitionClassifyList()
      },
      handleCurrentChange (val) {
        this.current = val
        this.getAllCompetitionClassifyList()
      },
    }
  }
</script>

<style scoped lang="less">

</style>
