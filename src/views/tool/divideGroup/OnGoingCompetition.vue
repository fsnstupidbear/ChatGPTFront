<template>
  <div>
    <!--  用户列表卡片-->
    <el-form>
    <el-form-item>
      <el-button type="primary" icon="el-icon-circle-plus" @click="ConfigNewSelectMemberModel">开始一场新4V4点将模式</el-button>
    </el-form-item>
    </el-form>
    <el-card class="box-card">
      <el-table
        :show-overflow-tooltip="true"
        :data="OnGoingCompetition"
        border
        style="width: 100%"
      >
        <el-table-column :width="200"
          prop="startDate"
          label="开始时间"
        >
        </el-table-column>
        <el-table-column
          prop="sponsor"
          label="赞助人"
        >
        </el-table-column>
        <el-table-column :width="100"
          prop="initiator"
          label="发起人"
        >
        </el-table-column>
        <el-table-column :width="350"
          prop="playerLineup"
          label="选手阵容"
        >
        </el-table-column>
        <el-table-column
          :width="100"
          prop="randomCaptain"
          label="随机队长"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          :show-overflow-tooltip="true"
          label="操作"
          :width="170"
          >
<!--          更改为新版v-slot,原为slot-scope-->
          <template v-slot="scope">
            <el-popconfirm
              @onConfirm="deleteCurrentRecord(scope.row.id)"
              icon="el-icon-info"
              icon-color="black"
              title="确定进行此操作吗？"
            >
              <el-button slot="reference" type="danger" size="mini" v-if="HasCaptainAuthority">
                删除
              </el-button>
            </el-popconfirm>
            <el-button style="margin-left: 10px;" slot="reference" type="primary" size="mini"
                       @click="goToCheckBillOfCurrentChoosedRound(scope.row.id,scope.row.randomCaptain)"
                       :disabled="(currentAccountID!==scope.row.initiatorID)&&HasCaptainAuthority==false">
              去结账
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { deleteCurrentRecord } from '../../../api/fvfPoints'
import {
  deleteCurrentSelectMemberModelRecord, getCurrentAccountID,
  getOnGoingCompetition,
  ifHasCaptainAuthority
} from '../../../api/selectMemberModel'
import { ifHasAuthority } from '../../../api/competition'

export default {
  name: 'OnGoingCompetition',
  data () {
    return {
      currentAccountID:undefined,
      HasCaptainAuthority:false,
      OnGoingCompetition:undefined,
      fvfHistory: undefined,
      total: undefined,
      current: 1,
      size: 5
    }
  },
   created () {
     this.ifHasCaptainAuthority()
     this.getCurrentAccountID()
     this.getOnGoingCompetition()
  },
  methods: {
    async getOnGoingCompetition () {
      const { data } = await getOnGoingCompetition(this.current, this.size)
      this.OnGoingCompetition = data.data.selectMemberModelRecordList
      this.total = data.data.total
    },
    handleSizeChange (val) {
      this.size = val
      this.getOnGoingCompetition()
    },
    handleCurrentChange (val) {
      this.current = val
      this.getOnGoingCompetition()
    },
    async deleteCurrentRecord (id) {
      await deleteCurrentSelectMemberModelRecord(id)
      await this.getOnGoingCompetition()
    },
    //创建新的4V4分组器
    async ConfigNewSelectMemberModel(){
      await this.$router.push({
        path: '/ConfigNewSelectMemberModel',
        name: 'ConfigNewSelectMemberModel',
        params: {}
      })
    },
//查询当前登录账户是否拥有队长权限
    async ifHasCaptainAuthority(){
      const {data} = await ifHasCaptainAuthority()
      this.HasCaptainAuthority = data.data.ifHasCaptainAuthority
    },

    async getCurrentAccountID(){
      const {data} = await getCurrentAccountID()
        this.currentAccountID = data.data.currentAccountID
    },

    goToCheckBillOfCurrentChoosedRound(selectMemberModelRecordId,randomCaptain){
      this.$router.push({
        path: '/InputCompetitionData',
        name: 'InputCompetitionData',
        params: {
          selectMemberModelRecordId:selectMemberModelRecordId,
          randomCaptain:randomCaptain
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
