<template>

  <div>
    <!--  用户列表卡片-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
      </div>
      <el-form :inline="true" :model="users" class="demo-form-inline">
        <insertUser :addVisible="addVisible" @changeShow="showAdd" @message="message" @getAllUsers="getAllUsers"
                    :allVocationsList="allVocationsList"></insertUser>
        <UpdateUser :updateVisible="updateVisible" @changeShow="showUpdate" @message="message"
                    @getAllUsers="getAllUsers"
                    :allVocationsList="allVocationsList" :choosedRowUserInfo="choosedRowUserInfo"></UpdateUser>
        <AuthorityAdmin :authorityVisible=authorityVisible @changeShow="closeAuthorityWindow"
                        :choosedRowUserInfo="choosedRowUserInfo"></AuthorityAdmin>
        <el-form-item label="ID：">
          <el-input clearable v-model="users.username" placeholder="请输入ID">请输入用户名</el-input>
        </el-form-item>
        <el-form-item label="分队/总队：">
          <el-select v-model="users.department" placeholder="请选择">
            <el-option label="分队" value="分队"></el-option>
            <el-option label="总队" value="总队"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业：">
          <el-cascader
            :show-all-levels="false"
            v-model="users.vocation"
            :options="allVocationsList"
            :props="{ expandTrigger: 'hover',
                 children:'vocationAfterChangeList',
                 value:'value',
                 label:'label',
                 emitPath:false}"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getAllUsers">查询</el-button>
          <el-button type="info" icon="el-icon-refresh" @click="resetUsers">重置</el-button>
          <el-button type="info" icon="el-icon-refresh" @click="showAddWindow">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :show-overflow-tooltip="true"
        :data="usersList"
        height="377px"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="60px">
        </el-table-column>
        <el-table-column
          prop="username"
          label="ID"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="vocation"
          label="职业"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="department"
          label="分队/总队"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="joinDate"
          label="入队时间"
        >
        </el-table-column>
        <el-table-column
          prop="qqnumber"
          label="QQ">
        </el-table-column>

        <el-table-column
          prop="phoneNumber"
          label="联系电话">
        </el-table-column>


        <el-table-column
          :show-overflow-tooltip="true"
          label="操作"
          width="270px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-ico-delete" @click="showUpdateWindow(scope.row)">
              信息更改
            </el-button>
            <el-button type="warning" size="mini" icon="el-ico-edit" @click="showAuthorityWindow(scope.row)">
              权限配置
            </el-button>
            <el-button type="danger" size="mini" icon="el-ico-edit">账号禁用</el-button>
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
  import { getAllUsers } from '../../api/users'
  import insertUser from '../../views/user/insertUser'
  import { getAllVocations } from '../../api/vocations'
  import { Message } from 'element-ui'
  import UpdateUser from './UpdateUser'
  import AuthorityAdmin from './AuthorityAdmin'

  export default {
    name: 'Users',
    data () {
      return {
        updateVisible: false,
        addVisible: false,
        authorityVisible:false,
        choosedRowUserInfo: [],
        formInline: {
          user: '',
          region: '',
          city: '',
        },
        usersList: [],
        cities: [],
        current: 1,
        total: undefined,
        size: 6,
        users: {
          username: '',
          department: '',
          vocation: '',
        },

        allVocationsList: undefined,
        vocation: '',
      }
    },

    /**
     * 创建组件时调用
     */
    created () {
      this.getAllUsers()
      this.getAllVocations()
    },
    components: {
      AuthorityAdmin,
      UpdateUser,
      insertUser
    },

    methods: {
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
      //获取全部职业
      async getAllVocations () {
        const { data } = await getAllVocations()
        this.allVocationsList = data.data.allVocationsList
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
        this.getAllUsers()
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
        this.getAllUsers()
      },
      handleSizeChange (val) {
        this.size = val
        this.getAllUsers()
      },
      handleCurrentChange (val) {
        this.current = val
        this.getAllUsers()
      },
      async getAllUsers () {
        const users = JSON.stringify(this.users)
        const { data } = await getAllUsers(this.current, this.size, users)
        this.usersList = data.data.records
        this.total = data.data.total
      },
      //重置表单
      async resetUsers () {
        this.users.username = ''
        this.users.department = ''
        this.users.vocation = ''
        this.getAllUsers()
        Message.closeAll()
        this.message('已重置搜索条件！')
      },
    }
  }
</script>

<style scoped lang="less">

</style>
