<template>

  <div style="width: 100%;height: 100%">
    <!--  用户列表卡片-->
    <el-card class="box-card" style="width: 100%;height: 100%">
      <div slot="header" class="clearfix">
        <span>队员名单</span>
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
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getAllUsers">查询</el-button>
          <el-button type="info" icon="el-icon-refresh" @click="resetUsers">重置</el-button>
          <el-button type="info" icon="el-icon-refresh" @click="showAddWindow">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :show-overflow-tooltip="true"
        :data="usersList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="60px">
        </el-table-column>
        <el-table-column
          prop="id"
          label="账号">
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
          prop="sumPoints"
          label="总积分">
        </el-table-column>
          <el-table-column
            prop="currentMonthPoints"
            label="当月积分">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="操作"
          width="360px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-ico-edit" @click="showAddOrMinusPointsWindowVisable(scope.row)">
              奖惩积分
            </el-button>
            <el-button type="primary" size="mini" icon="el-ico-edit" @click="showUpdateWindow(scope.row)">
              信息更改
            </el-button>
            <el-button type="warning" size="mini" icon="el-ico-edit" @click="showAuthorityWindow(scope.row)">
              角色配置
            </el-button>
              <el-popconfirm
                @onConfirm="isForbiddenUserById(scope.row.id,scope.row.isEnabled)"
                style="margin-left: 10px"
                icon="el-icon-info"
                icon-color="black"
                title="确定进行此操作吗？"
              >
                <el-button slot="reference" type="danger" size="mini" icon="el-ico-delete"
                v-if="scope.row.isEnabled==='1'">
                  禁用账号</el-button>
                <el-button slot="reference" type="danger" size="mini" icon="el-ico-delete"
                           v-if="scope.row.isEnabled==='0'">
                  启用账号</el-button>
              </el-popconfirm>
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
  import { getAllUsers, isForbiddenUserById } from '../../api/users'
  import insertUser from '../../views/user/insertUser'
  import { getAllVocations } from '../../api/vocations'
  import { Message } from 'element-ui'
  import UpdateUser from './UpdateUser'
  import AuthorityAdmin from './AuthorityAdmin'
  import AddOrMinusPoints from './AddOrMinusPoints'

  export default {
    name: 'Users',
    data () {
      return {
        addOrMinusPointsWindowVisable:false,
        updateVisible: false,
        addVisible: false,
        authorityVisible:false,
        choosedUserId:undefined,
        choosedUsername:undefined,
        choosedRowUserInfo: [],
        usersList: [],
        current: 1,
        total: undefined,
        size: 5,
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
      AddOrMinusPoints,
      AuthorityAdmin,
      UpdateUser,
      insertUser
    },

    methods: {
      async isForbiddenUserById(id,isForbidden){
        await isForbiddenUserById(id,isForbidden);
        await this.getAllUsers();
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
