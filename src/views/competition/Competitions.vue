<template>
<div>
<!--  赛事总览卡片-->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>赛事总览</span>
    </div>
    <el-form :inline="true" :model="users" class="demo-form-inline">
      <el-form-item label="ID：">
        <el-input clearable v-model="users.username" placeholder="请输入赛事名称">请输入赛事信息</el-input>
      </el-form-item>
      <el-form-item label="分队/总队：">
        <el-select v-model="users.department" placeholder="请选择">
          <el-option label="分队" value="分队"></el-option>
          <el-option label="总队" value="总队"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职业：">
        <el-select v-model="users.vocation" placeholder="请选择职业">
        <el-option-group
          v-for="group in cities"
          :key="group.label"
          :label="group.label">
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getAllUsers">查询</el-button>
      <el-button type="info" icon="el-icon-refresh" @click="resetUsers">重置</el-button>
        <el-button type="info" icon="el-icon-refresh" @click="show">添加</el-button>
        <insertUser :addVisible="addVisible" @changeShow="showAdd"></insertUser>
      </el-form-item>
    </el-form>
    <el-table
      :show-overflow-tooltip="true"
      :data="usersList"
      height="380px"
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
        prop="address"
        label="入队时间">
      </el-table-column>
      <el-table-column
        prop="QQ"
        label="QQ">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="联系电话">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
      label="操作"
      width="220px">
        <el-button type="primary" size="mini" icon="el-ico-edit">编辑</el-button>
        <el-button type="danger" size="mini" icon="el-ico-delete">删除</el-button>
        <el-button type="warning" size="mini" icon="el-ico-edit">禁用</el-button>
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
  import {getAllUsers} from '../../api/users'
  import insertUser from '../../views/user/insertUser'

  export default {
    name: 'Users',
    data () {
      return {
        addVisible: false,
        formInline: {
          user: '',
          region: '',
          city:'',
        },
        usersList:[],
        cities:[
        ],
        current: 1,
        total:"",
        size:5,
        users: {
          username: '',
          department: '',
          vocation: '',
        }
      }
    },

    /**
     * 创建组件时调用
     */
    created(){
      this.getAllUsers();
    },
    components:{
      insertUser
    },

    methods: {
      show () {
        this.addVisible = true
      },
      // 监听 子组件弹窗关闭后触发，有子组件调用
      showAdd (data) {
        if (data === 'false') {
          this.addVisible = false
        } else {
          this.addVisible = true
        }
      }
      ,
      onSubmit () {
        console.log('submit!');
      },
      handleSizeChange(val) {
        this.size = val;
        this.getAllUsers();
      },
      handleCurrentChange(val) {
        this.current = val;
        this.getAllUsers();
      },
       async getAllUsers(){
        const users = JSON.stringify(this.users)
        const{data} = await getAllUsers(this.current,this.size,users);
        this.usersList=data.data.records;
        this.total = data.data.total;
      },
      //重置表单
      async resetUsers(){
        this.users.username='';
        this.users.department='';
        this.users.vocation='';
        this.getAllUsers()
      }
    }
  }
</script>

<style scoped lang="less">

</style>
