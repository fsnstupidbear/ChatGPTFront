<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span>发起一场4V4点将模式！</span>
      </div>
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="30px"
               label-position="right">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="赞助人" prop="sponsor" label-width="108px">
              <el-input v-model="formData.sponsor" placeholder="向老板致敬！请规范输入赞助人的ID，如“樊原江”" :maxlength="20"
                        show-word-limit
                        clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赞助资金" prop="sponsorshipFunds" label-width="108px">
              <el-input v-model="formData.sponsorshipFunds" placeholder="请输入赞助费用，单位“元”" :maxlength="4" show-word-limit
                        clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="败方共需支付" prop="failedTeamNeedPay" label-width="108px">
              <el-input v-model="formData.failedTeamNeedPay" placeholder="请输入赞助费用，单位“元”" :maxlength="4" show-word-limit
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="败方选手免单需要击杀数超过" label-width="210px" prop="isUseFixedKillNum">
              <el-radio-group v-model="formData.isUseFixedKillNum">
                <el-radio label="1">
                  <el-input style="width: 50px" v-model="formData.fixedKillNum" :maxlength="2"
                            :disabled="formData.isUseFixedKillNum==1?false:true"></el-input>
                  个
                </el-radio>
                <el-radio label="0">总场数的百分之
                  <el-input style="width: 60px" v-model="formData.baseOnRoundSumNum" :maxlength="3"
                            :disabled="formData.isUseFixedKillNum==0?false:true"></el-input>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="center"><i class="el-icon-user"></i>参加队员名单</el-divider>
        <el-row :gutter="0">
          <el-col :span="6">

            <el-form-item prop="attendPlayer0" required label=" ">
              <el-select v-model="formData.attendPlayer0" placeholder="请输入并选择选手ID"
                         filterable style="width:100%" clearable>
                <el-option
                  v-for="item in teamMember"
                  :key="item.id"
                  :label="item.username"
                  :value="item.username">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="attendPlayer1" required label=" ">
              <el-select v-model="formData.attendPlayer1" placeholder="请输入并选择选手ID"
                         filterable style="width:100%" clearable>
                <el-option
                  v-for="item in teamMember"
                  :key="item.id"
                  :label="item.username"
                  :value="item.username">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="attendPlayer2" required label=" ">
              <el-select v-model="formData.attendPlayer2" placeholder="请输入并选择选手ID"
                         filterable style="width:100%" clearable>
                <el-option
                  v-for="item in teamMember"
                  :key="item.id"
                  :label="item.username"
                  :value="item.username">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="attendPlayer3" required label=" ">
              <el-select v-model="formData.attendPlayer3" placeholder="请输入并选择选手ID"
                         filterable style="width:100%" clearable>
                <el-option
                  v-for="item in teamMember"
                  :key="item.id"
                  :label="item.username"
                  :value="item.username">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="attendPlayer4" required label=" ">
              <el-select v-model="formData.attendPlayer4" placeholder="请输入并选择选手ID"
                         clearable
                         filterable style="width:100%">
                <el-option
                  v-for="item in teamMember"
                  :key="item.id"
                  :label="item.username"
                  :value="item.username">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="attendPlayer5" required label=" ">
              <el-select v-model="formData.attendPlayer5" placeholder="请输入并选择选手ID"
                         filterable style="width:100%" clearable>
                <el-option
                  v-for="item in teamMember"
                  :key="item.id"
                  :label="item.username"
                  :value="item.username">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="attendPlayer6" required label=" ">
              <el-select v-model="formData.attendPlayer6" placeholder="请输入并选择选手ID"
                         filterable style="width:100%" clearable>
                <el-option
                  v-for="item in teamMember"
                  :key="item.id"
                  :label="item.username"
                  :value="item.username">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="attendPlayer7" required label=" ">
              <el-select v-model="formData.attendPlayer7" placeholder="请输入并选择选手ID"
                         filterable style="width:100%" clearable>
                <el-option
                  v-for="item in teamMember"
                  :key="item.id"
                  :label="item.username"
                  :value="item.username">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item style="text-align: center">
              <el-button type="primary" style="text-align: center" :disabled="startButtonDisabled" @click="handelConfirm">开始抽签</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>

import { getTeamMember } from '../../../api/fvfPoints'
import { submitConfigNewSelectMemberModel } from '../../../api/selectMemberModel'

export default {
  name: 'ConfigNewSelectMemberModel',
  components: {},
  props: [],
  data () {
    var isUseFixedKillNum = (rule, value, callback) => {
      if(this.formData.isUseFixedKillNum == undefined){
        return callback(new Error('请选择一种败方免单方式'))
      }
      var reg = '^[+]{0,1}(\\d+)$'
      if (this.formData.isUseFixedKillNum == 1) {
        this.formData.baseOnRoundSumNum = ''
        var verifyResult = this.formData.fixedKillNum.match(reg)
        if (verifyResult == null) {
          return callback(new Error('请输入非负整数'))
        }
      }

      if (this.formData.isUseFixedKillNum == 0) {
        this.formData.fixedKillNum = ''
        var verifyResult = this.formData.baseOnRoundSumNum.match(reg)
        if (verifyResult == null) {
          return callback(new Error('请输入非负整数，建议100以上'))
        }
      }
      callback()
    }
    return {
      startButtonDisabled:false,
      teamMember: undefined,
      selectMemberModelRecordId:undefined,
      formData: {
        //赞助人
        sponsor:undefined,
        //赞助奖金
        sponsorshipFunds:undefined,
        //败方共需支付
        failedTeamNeedPay: undefined,
        //是否使用固定击杀数，1是，0不是
        isUseFixedKillNum: undefined,
        //固定免单需要超出的人头数
        fixedKillNum: undefined,
        //基于总场数的百分比计算需要达到人头数指标
        baseOnRoundSumNum: undefined,
        //队员名单
        attendPlayer0: undefined,
        attendPlayer1: undefined,
        attendPlayer2: undefined,
        attendPlayer3: undefined,
        attendPlayer4: undefined,
        attendPlayer5: undefined,
        attendPlayer6: undefined,
        attendPlayer7: undefined,
      },
      rules: {
        sponsor: [{
          required: true,
          pattern: '^.{1,20}$',
          message: '至少输入1个字符，如没有赞助请填写“无”',
          trigger: 'change'
        }],
        sponsorshipFunds: [{
          required: true,
          pattern: '^[+]{0,1}(\\d+)$',
          message: '请输入非负整数',
          trigger: 'change'
        }],
        isUseFixedKillNum: [{
          validator: isUseFixedKillNum,
          trigger: 'change'
        }],
        failedTeamNeedPay: [{
          required: true,
          pattern: '^[+]{0,1}(\\d+)$',
          message: '请输入非负整数',
          trigger: 'change'
        }],
        attendPlayer0: [{
          required: true,
          pattern: '.',
          message: '请选择一个参赛选手',
          trigger: 'change',
        }],
        attendPlayer1: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change'
        }],
        attendPlayer2: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change'
        }],
        attendPlayer3: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change'
        }],
        attendPlayer4: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change'
        }],
        attendPlayer5: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change'
        }],
        attendPlayer6: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change'
        }],
        attendPlayer7: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getTeamMember()
  },
  mounted () {
  },
  methods: {
    async getTeamMember () {
      const { data } = await getTeamMember()
      this.teamMember = data.data.teamMember
    },
     handelConfirm () {
      this.$refs['elForm'].validate(async valid => {
        if (!valid) return
        //传输配置数据
        this.startButtonDisabled = true
        await this.submitConfigNewSelectMemberModel()
        this.$router.push({
          path: '/InputCompetitionData',
          name: 'InputCompetitionData',
          params: {
            selectMemberModelRecordId: this.selectMemberModelRecordId,
            randomCaptain: this.randomCaptain
          }
        })
      })
    },
    async submitConfigNewSelectMemberModel () {
      const {data} = await submitConfigNewSelectMemberModel(this.formData)
      this.selectMemberModelRecordId=data.data.selectMemberModelRecordId
      this.randomCaptain = data.data.randomCaptain
    }
  }
}

</script>
<style>
</style>
