<template>
  <div style="width: 100%">
    <el-card>
      <div>
        点将战报
      </div>
      <el-divider><img src="../../../assets/images/FsnBlack.png"></el-divider>
      <el-row :gutter="80">
        <div class="points">
          <el-col :span="9">
            <div>
              <el-table
                style="width: 100%"
                align="center"
                :data="winnerPlayers"
                border
                :default-sort="{prop: 'killNum', order: 'descending'}"
              >
                <el-table-column label="胜方">
                  <el-table-column
                    label="ID"
                    prop="username"
                  >
                  </el-table-column>
                  <el-table-column
                    label="击杀数"
                    prop="killNum"
                  >
                  </el-table-column>
                  <el-table-column
                    label="账单"
                    prop="bill"
                  >
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </div>
        <div class="nameListPanel">
          <el-col :span="6">
            <el-form>
              <div style="text-align: center">
                <el-form-item><b>赞助:{{ this.sponsor }}</b></el-form-item>
                <el-form-item>赞助金额为:<b>{{ this.sponsorshipFunds }}元</b></el-form-item>
                <el-form-item>败方共需支付:<b>{{ this.failedTeamNeedPay }}元</b></el-form-item>
                <el-form-item>比分为<b>{{ this.firstRank }}:{{ this.secondRank }}</b></el-form-item>
                <el-form-item>败方击杀数超过<b>{{ this.freeChargeRuleNum }}</b>可免单</el-form-item>
                <el-form-item><b>{{ this.freeChargeRulePlayerList }}</b>可免单</el-form-item>
              </div>
            </el-form>
          </el-col>
        </div>


        <div class="points">
          <el-col :span="9">
            <div>
              <el-table
                style="width: 100%"
                align="center"
                :data="loserPlayers"
                border
                :default-sort="{prop: 'killNum', order: 'descending'}"
              >
                <el-table-column label="败方">
                  <el-table-column
                    label="ID"
                    prop="username"
                  >
                  </el-table-column>
                  <el-table-column
                    label="击杀数"
                    prop="killNum"
                  >
                  </el-table-column>
                  <el-table-column
                    label="账单"
                    prop="bill"
                  >
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { checkScore, clearAll, getPoints, getTeamMember, saveCurrentRound } from '../../../api/fvfPoints'
import { divideGroup } from '../../../api/fvfPoints'
import { getRecordBillInfo, getRecordInfo } from '../../../api/selectMemberModel'

export default {
  name: 'SelectMemberModelCheck',
  data () {
    return {
      freeChargeRuleNum:undefined,
      selectMemberModelRecordID:undefined,
      firstRank: undefined,
      secondRank: undefined,
      sponsor: undefined,
      sponsorshipFunds: undefined,
      failedTeamNeedPay: undefined,
      score: undefined,
      freeChargeRule: undefined,
      freeChargeRulePlayerList: undefined,
      winnerPlayers: [{}],
      loserPlayers: [{}],
    }
  },
  created () {
    this.selectMemberModelRecordID = this.$route.params.selectMemberModelRecordID
    this.isHasID()
    this.getRecordInfo()
  },
  mounted () {

  },
  methods: {
    isHasID(){
      console.log(this.selectMemberModelRecordID)
      if(this.selectMemberModelRecordID === undefined){
        this.$router.push({
          path: '/DivideGroupContest',
          name: 'DivideGroupContest',
          params: {
          }
        })
      }
    },
    async getRecordInfo () {
      const { data } = await getRecordBillInfo(this.selectMemberModelRecordID)
      this.firstRank = data.data.firstRank
      this.secondRank = data.data.secondRank
      this.sponsor = data.data.sponsor
      this.sponsorshipFunds = data.data.sponsorshipFunds
      this.failedTeamNeedPay = data.data.failedTeamNeedPay
      this.freeChargeRuleNum = data.data.freeChargeRuleNum
      this.freeChargeRulePlayerList = data.data.freeChargeRulePlayerList
      this.winnerPlayers = this.formatKillNum(data.data.winnerPlayers)
      this.loserPlayers = this.formatKillNum(data.data.loserPlayers)
    },

    formatKillNum(players){
      for (let i = 0; i < players.length; i++) {
        players[i].killNum = parseInt(players[i].killNum)
      }
      console.log(players)
      return players
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .redTeam th {
  color: red;
}

/deep/ .blueTeam th {
  color: blue;
}

/deep/ .el-table th > .cell {
  text-align: center;
}

/deep/ .el-table .cell {
  text-align: center;
  padding: 0 0;
}

.el-form-item {
  margin-bottom: 10px;
}

</style>
