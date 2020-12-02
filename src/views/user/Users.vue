<template>
<div>
<!--  用户列表卡片-->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户列表</span>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="ID">
        <el-select v-model="formInline.city" placeholder="请选择">
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
      <el-form-item label="分队/总队">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职业">
        <el-input clearable v-model="formInline.user" placeholder="请输入用户名">请输入用户名</el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      <el-button type="info" icon="el-icon-refresh">信息按钮</el-button>
      <el-button >默认按钮</el-button>
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
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </el-card>
</div>
</template>

<script>
  import {getAllUsers} from '../../api/users'

  export default {
    name: 'Users',
    data () {
      return {
        formInline: {
          user: '',
          region: '',
          city:'',
        },
        usersList:[],
        cities:[
          {
            label: '热门城市',
            options: [{
              value: 'Shanghai',
              label: '上海'
            }, {
              value: 'Beijing',
              label: '北京'
            }]
          }, {
            label: '城市名',
            options: [{
              value: 'Chengdu',
              label: '成都'
            }, {
              value: 'Shenzhen',
              label: '深圳'
            }, {
              value: 'Guangzhou',
              label: '广州'
            }, {
              value: 'Dalian',
              label: '大连'
            }]
          }
        ],
        current: 1,
        total:100,
        size:5
      }
    },

    /**
     * 创建组件时调用
     */
    created(){
      this.getAllUsers();
    },

    methods: {
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
        const{data} = await getAllUsers(this.current,this.size);
        this.usersList=data.data.records;
      },
    }
  }
</script>

<style scoped lang="less">

</style>
