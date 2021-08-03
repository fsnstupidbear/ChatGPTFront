<template>

  <div>
    <!--  用户列表卡片-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>每周训练计划制定</span>
      </div>
      <ChangePlan :changePlanWindowVisable="changePlanWindowVisable" :choosedRowId="choosedRowId"
                  @changeShow="changePlanWindow" @getWeekPlan="getWeekPlan"></ChangePlan>
      <el-table
        :show-overflow-tooltip="true"
        :data="weekPlan"
        border
        style="width: 100%"
      >
        <el-table-column
          width="200px"
          prop="day"
          label=""
        >
        </el-table-column>
        <el-table-column
          prop="plan"
          label="计划"
        >
        </el-table-column>

        <el-table-column
          :show-overflow-tooltip="true"
          label="操作"
          width="90px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-ico-delete" @click="changePlanWindow(scope.row.id)">
              更改计划
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import { getWeekPlan } from '../../api/training'
  import ChangePlan from './changePlan'

  export default {
    name: 'TrainingPlanSetting',
    data () {
      return {
        weekPlan:undefined,
        api:undefined,
        module:undefined,
        moduleOptions:undefined,
        changePlanWindowVisable: false,
        choosedRowId:undefined,
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
      this.getWeekPlan()
    },
    components: {
      ChangePlan
    },

    methods: {
      //控制角色配置界面是否显示
      changePlanWindow(data){
        if (data === 'false') {
          this.changePlanWindowVisable = false
        } else {
          this.choosedRowId = data
          this.changePlanWindowVisable = true
        }
      },
      async getWeekPlan () {
        const data = await getWeekPlan()
        this.weekPlan = data.data.data.weekPlan
      },
    }
  }
</script>

<style scoped lang="less">

</style>
