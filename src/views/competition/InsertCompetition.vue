<template>
  <div>
    <el-dialog :visible.sync="insertCompetitionVisiable" @close="close" title="添加赛事信息">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-col :span="12">
            <el-form-item label="赛事名称：" prop="competitionName">
              <el-input v-model="formData.competitionName" placeholder="请输入赛事名称" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赛事类型：" prop="type">
              <el-select v-model="formData.type" placeholder="请选择赛事类型" clearable
                :style="{width: '100%'}">
                <el-option
                  v-for="item in allCompetitionClassifyList"
                  :key="item.competitionClassify"
                  :label="item.competitionClassify"
                  :value="item.competitionClassify">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开赛时间：" prop="startDate">
              <el-date-picker v-model="formData.startDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                :style="{width: '100%'}" placeholder="请选择开赛时间" clearable></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发起人：" prop="sponsor">
              <el-input v-model="formData.sponsor" placeholder="请输入赛事发起人" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="赛事奖金：" prop="reward">
            <el-input v-model="formData.reward" type="textarea" placeholder="请输入赛事奖金" :maxlength="100"
                      show-word-limit :autosize="{minRows: 4, maxRows: 8}" :style="{width: '100%'}"></el-input>
          </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  import { getAllCompetitionClassify, insertCompetition } from '../../api/competition'

export default {
  props:{
    insertCompetitionVisiable:{
      type: Boolean,
      default: false
    },
    },
  components: {},

  data() {
    return {
      formData: {
        competitionName: undefined,
        type: undefined,
        reward:undefined,
        sponsor:undefined,
        startDate: new Date(),
      },
      rules: {
        competitionName: [{
          required: true,
          message: '请输入ID',
          trigger: 'change'
        }],
        type: [{
          required: true,
          message: '请选择赛事种类',
          trigger: 'change'
        }],
        reward: [{
          required: true,
          message: '请输入赛事奖金',
          trigger: 'change'
        }],
        sponsor: [{
          required: true,
          message: '请输入赛事发起人',
          trigger: 'change'
        }],
        startDate: [{
          required: true,
          message: '请选择开始时间',
          trigger: 'change'
        }],
      },
      allCompetitionClassifyList: [],
    }
  },
  computed: {},
  created() {
    this.getAllCompetitionClassifyList()
  },
  mounted() {},

  methods: {
    async getAllCompetitionClassifyList () {
      const { data } = await getAllCompetitionClassify()
      this.allCompetitionClassifyList = data.data.allCompetitionClassifyList
    },
    message(tip){
      this.$message(tip)
    },
    close() {
      this.$emit('changeShow', 'false')
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return;
        this.insertCompetition()
        this.$emit('success','添加赛事完成')
        this.$emit('getAllCompetitions')
        this.close()
      })
    },
    async insertCompetition(){
      await insertCompetition(this.formData)
    }
  },

  watch: {
  }
}
</script>
<style>
</style>
