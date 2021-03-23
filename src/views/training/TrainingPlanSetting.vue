<template>

  <div>
    <!--  用户列表卡片-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>每周训练计划制定</span>
      </div>
      <el-table
        :show-overflow-tooltip="true"
        :data="weekPlan"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="url"
          label=""
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="功能"
        >
        </el-table-column>
        <el-table-column
          prop="role"
          label="拥有权限的角色"
          >
        </el-table-column>

        <el-table-column
          :show-overflow-tooltip="true"
          label="操作"
          width="120px">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" icon="el-ico-delete" @click="changeShowApiRoleWindowVisible(scope.row.url)">
              更改可访问角色
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { getWeekPlan } from '../../api/training'

  export default {
    name: 'TrainingPlanSetting',
    data () {
      return {
        api:undefined,
        module:undefined,
        moduleOptions:undefined,
        apiRoleWindowVisible: false,
        choosedRowUrl:undefined,
        choosedRowUserInfo: [],
        apiList: [],
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
      this.getAllApi()
    },
    components: {
    },

    methods: {
      //控制角色配置界面是否显示
      changePlanWindow(data){
        if (data === 'false') {
          this.apiRoleWindowVisible = false
        } else {
          this.choosedRowUrl = data
          this.apiRoleWindowVisible = true
        }
      },
      async getWeekPlan () {
        const { data } = await getWeekPlan()
        this.weekPlan = data.data.weekPlan
      },
    }
  }
</script>

<style scoped lang="less">

</style>
