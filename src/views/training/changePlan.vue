<template>
    <div style="width: 100px">
      <el-dialog :visible.sync=changePlanWindowVisable @close="close()" title="更改计划">
<el-form>
  <el-form-item label="请制定计划：">
        <el-select v-model="plan" placeholder="请选择计划">
          <el-option
            v-for="item in planList"
            :key="item.plan"
            :label="item.plan"
            :value="item.plan">
          </el-option>
        </el-select>
  </el-form-item>
</el-form>
        <div slot="footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { getPlans, updatePlanById } from '../../api/training'
  export default {
    name: 'ChangePlan',
    data(){
      return {
        plan:undefined,
        planList:undefined
      }
    },
    props:{
      changePlanWindowVisable:{
        type: Boolean,
        default: false
      },
      choosedRowId:undefined
    },
    created(){
      this.getPlans()
    },
    methods:{
      close(){
        this.$emit('changeShow', 'false')
      },
      async confirm(){
        await updatePlanById(this.choosedRowId,this.plan)
        await this.$emit('getWeekPlan')
        this.close()
      },
      //获取所有可选计划
      async getPlans(){
        const data = await getPlans();
        this.planList = data.data.data.planList;
      },
    },
    watch:{
      }
  }
</script>

<style scoped>

</style>
