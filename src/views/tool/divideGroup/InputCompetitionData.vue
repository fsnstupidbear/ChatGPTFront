<template>
<el-card>
  <div slot="header" style="text-align: center">
    随机抽取的第一位队长是：{{this.randomCaptain}}
  </div>
  <span>整场结束后请在下方填写表格结算账单</span>
  <el-form :rules="rules" ref="elForm" :model="formData">
    <el-divider>胜方选手及击杀数</el-divider>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-form-item prop="winnerList0">
          <el-select v-model="formData.winnerList0" ref="ifInputWinner" placeholder="请输入并选择选手ID"
                     filterable style="width:100%" clearable>
            <el-option
              v-for="item in currentRoundPlayers"
              :key="item.id"
              :label="item.username"
              :value="item.username">
            </el-option>
          </el-select>
        </el-form-item>
       </el-col>
      <el-col :span="2">
        <el-form-item prop="winnerKillList0">
          <el-input v-model="formData.winnerKillList0" placeholder="击杀数"
                     filterable style="width:100%">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="winnerList1">
          <el-select v-model="formData.winnerList1" placeholder="请输入并选择选手ID"
                     filterable style="width:100%" clearable>
            <el-option
              v-for="item in currentRoundPlayers"
              :key="item.id"
              :label="item.username"
              :value="item.username">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item prop="winnerKillList1">
          <el-input v-model="formData.winnerKillList1" placeholder="击杀数"
                    filterable style="width:100%">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="winnerList2">
          <el-select v-model="formData.winnerList2" placeholder="请输入并选择选手ID"
                     filterable style="width:100%" clearable>
            <el-option
              v-for="item in currentRoundPlayers"
              :key="item.id"
              :label="item.username"
              :value="item.username">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item prop="winnerKillList2">
          <el-input v-model="formData.winnerKillList2" placeholder="击杀数"
                    filterable style="width:100%">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="winnerList3">
          <el-select v-model="formData.winnerList3" placeholder="请输入并选择选手ID"
                     filterable style="width:100%" clearable>
            <el-option
              v-for="item in currentRoundPlayers"
              :key="item.id"
              :label="item.username"
              :value="item.username">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item prop="winnerKillList3">
          <el-input v-model="formData.winnerKillList3" placeholder="击杀数"
                    filterable style="width:100%">
          </el-input>
        </el-form-item>
      </el-col>
      </el-row>
    <el-divider>败方选手及击杀数</el-divider>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-form-item prop="loserList0">
          <el-select v-model="formData.loserList0" placeholder="请输入并选择选手ID"
                     filterable style="width:100%" clearable>
            <el-option
              v-for="item in currentRoundPlayers"
              :key="item.id"
              :label="item.username"
              :value="item.username">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item prop="loserKillList0">
          <el-input v-model="formData.loserKillList0" placeholder="击杀数"
                    filterable style="width:100%">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="loserList1">
          <el-select v-model="formData.loserList1" placeholder="请输入并选择选手ID"
                     filterable style="width:100%" clearable>
            <el-option
              v-for="item in currentRoundPlayers"
              :key="item.id"
              :label="item.username"
              :value="item.username">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item prop="loserKillList1">
          <el-input v-model="formData.loserKillList1" placeholder="击杀数"
                    filterable style="width:100%">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="loserList2">
          <el-select v-model="formData.loserList2" placeholder="请输入并选择选手ID"
                     filterable style="width:100%" clearable>
            <el-option
              v-for="item in currentRoundPlayers"
              :key="item.id"
              :label="item.username"
              :value="item.username">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item prop="loserKillList2">
          <el-input v-model="formData.loserKillList2" placeholder="击杀数"
                    filterable style="width:100%">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="loserList3">
          <el-select v-model="formData.loserList3" placeholder="请输入并选择选手ID"
                     filterable style="width:100%" clearable>
            <el-option
              v-for="item in currentRoundPlayers"
              :key="item.id"
              :label="item.username"
              :value="item.username">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item prop="loserKillList3">
          <el-input v-model="formData.loserKillList3" placeholder="击杀数"
                    filterable style="width:100%">
          </el-input>
        </el-form-item>
      </el-col>

    </el-row>
    <el-divider>双方队伍比分</el-divider>
    <div style="text-align: center">
<el-row>
  <el-col :span="8"><el-form-item></el-form-item></el-col>
  <el-col :span="3">
      <el-form-item prop="firstRank" style="">
      <el-input v-model="formData.firstRank" :maxlength="2"></el-input>
      </el-form-item>
  </el-col>
  <el-col :span="2">
      <el-form-item><span> ：</span></el-form-item>
  </el-col>
  <el-col :span="3">
      <el-form-item prop="secondRank">
      <el-input v-model="formData.secondRank" :maxlength="2"></el-input>
      </el-form-item>
  </el-col>
  <el-col :span="8"><el-form-item></el-form-item></el-col>
</el-row>
    </div>

    <el-form-item style="text-align: center">
    <el-button type="primary" style="text-align: center" @click="handleConfirm" :disabled="this.startButtonDisabled">
      结算并查看账单
    </el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script>
import { getCurrentRoundPlayers, selectMemberModelCheckScore } from '../../../api/selectMemberModel'

export default {
  name: 'InputCompetitionData',
  data () {
    return {
      startButtonDisabled:false,
      competitionID:undefined,
      selectMemberModelRecordId:undefined,
      currentRoundPlayers:undefined,
      randomCaptain:undefined,
      formData: {
        winnerList0:undefined,winnerList1:undefined,winnerList2:undefined,winnerList3:undefined,
        winnerKillList0:undefined,winnerKillList1:undefined,winnerKillList2:undefined,winnerKillList3:undefined,
        loserList0:undefined,loserList1:undefined,loserList2:undefined,loserList3:undefined,
        loserKillList0:undefined,loserKillList1:undefined,loserKillList2:undefined,loserKillList3:undefined,
        firstRank:undefined,
        secondRank:undefined,
      },

      rules: {
        ifInputWinner: [{
          required: true,
          pattern: '^.{1,20}$',
          message: '至少输入1个字符，如没有赞助请填写“无”',
          trigger: 'change'
        }],
        winnerList0: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change',
        }],
        winnerList1: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change',
        }],
        winnerList2: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change',
        }],
        winnerList3: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change',
        }],
        loserList0: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change',
        }],
        loserList1: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change',
        }],
        loserList2: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change',
        }],
        loserList3: [{
          required: true,
          message: '请选择一个参赛选手',
          trigger: 'change',
        }],
        winnerKillList0: [{
          required: true,
          pattern: '^[+]{0,1}(\\d+)$',
          message: '请输入非负整数',
          trigger: 'change'
        }],
        winnerKillList1: [{
          required: true,
          pattern: '^[+]{0,1}(\\d+)$',
          message: '请输入非负整数',
          trigger: 'change'
        }],
        winnerKillList2: [{
          required: true,
          pattern: '^[+]{0,1}(\\d+)$',
          message: '请输入非负整数',
          trigger: 'change'
        }],
        winnerKillList3: [{
          required: true,
          pattern: '^[+]{0,1}(\\d+)$',
          message: '请输入非负整数',
          trigger: 'change'
        }],
        loserKillList0: [{
          required: true,
          pattern: '^[+]{0,1}(\\d+)$',
          message: '请输入非负整数',
          trigger: 'change'
        }],
        loserKillList1: [{
          required: true,
          pattern: '^[+]{0,1}(\\d+)$',
          message: '请输入非负整数',
          trigger: 'change'
        }],
        loserKillList2: [{
          required: true,
          pattern: '^[+]{0,1}(\\d+)$',
          message: '请输入非负整数',
          trigger: 'change'
        }],
        loserKillList3: [{
          required: true,
          pattern: '^[+]{0,1}(\\d+)$',
          message: '请输入非负整数',
          trigger: 'change'
        }],
        firstRank: [{
          required: true,
          pattern: '^[+]{0,1}(\\d+)$',
          message: '请输入非负整数',
          trigger: 'change'
        }],
        secondRank: [{
          required: true,
          pattern: '^[+]{0,1}(\\d+)$',
          message: '请输入非负整数',
          trigger: 'change'
        }],
      }
    }
  },
  created () {
    this.randomCaptain = this.$route.params.randomCaptain
    this.selectMemberModelRecordId = this.$route.params.selectMemberModelRecordId
    this.getCurrentRoundPlayers()
    this.isHasID()
  },
  mounted () {

  },
  methods:{
    isHasID(){
      if(this.selectMemberModelRecordId == undefined){
        this.$router.push({
          path: '/DivideGroupContest',
          name: 'DivideGroupContest',
          params: {
          }
        })
      }
    },
    handleConfirm(){
      this.$refs['elForm'].validate(async valid => {
        if (!valid) return;
        this.startButtonDisabled = true
        await this.selectMemberModelCheckScore()
        this.$router.push({
          path: '/SelectMemberModelCheck',
          name: 'SelectMemberModelCheck',
          params: {
            selectMemberModelRecordID:this.selectMemberModelRecordId
          }
        })
      })
    },
    async getCurrentRoundPlayers () {
      const { data } = await getCurrentRoundPlayers(this.selectMemberModelRecordId)
      this.currentRoundPlayers = data.data.currentRoundPlayers
    },
    async selectMemberModelCheckScore(){
      const {data} = await selectMemberModelCheckScore(this.formData,this.selectMemberModelRecordId)
      this.winnerList = data.data.winnerList
      this.loserList = data.data.loserList
    },
  }
}
</script>

<style scoped>

</style>
