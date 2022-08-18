<template>
  <div>
    <!--  用户列表卡片-->
    <el-card class="box-card">
      <el-divider content-position="center">点将模式</el-divider>
      <el-table
        :show-overflow-tooltip="true"
        :data="fourVsFourSelectMemberModelHistory"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="endDate"
          label="结束时间"
          :width="200"
        >
        </el-table-column>
        <el-table-column
          prop="winnerPlayers"
          label="胜方"
        >
        </el-table-column>
        <el-table-column
          prop="loserPlayers"
          label="败方"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="操作"
          width="180px">
          <template slot-scope="scope">
            <el-popconfirm
              @onConfirm="resultPageDeleteCurrentRecord(scope.row.id)"
              icon="el-icon-info"
              icon-color="black"
              title="确定进行此操作吗？"
            >
              <el-button slot="reference" type="danger" size="mini" icon="el-ico-delete" :disabled="!hasCaptainAuthority">
                删除
              </el-button>
            </el-popconfirm>
            <el-button style="margin-left: 10px" slot="reference" type="primary" size="mini" icon="el-ico-delete"@click="getSpecificInfoOfSelectMemberModel(scope.row.id)">
              查看详情
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        @size-change="handleSelectMemberModelSizeChange"
        @current-change="handleSelectMemberModelCurrentChange"
        :current-page="selectMemberModelCurrent"
        :page-sizes="[10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="selectMemberModelTotal">
      </el-pagination>

      <el-divider content-position="center">经典模式</el-divider>
      <el-table
        :show-overflow-tooltip="true"
        :data="fvfHistory"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="时间"
          :width="200"
        >
        </el-table-column>
        <el-table-column
          prop="result"
          label="结果"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="操作"
          width="120px">
          <template slot-scope="scope">
          <el-popconfirm
            @onConfirm="deleteCurrentRecord(scope.row.id)"
            icon="el-icon-info"
            icon-color="black"
            title="确定进行此操作吗？"
          >
          <el-button slot="reference" type="danger" size="mini" icon="el-ico-delete" :disabled="!hasCaptainAuthority">
            删除
          </el-button>
          </el-popconfirm>
        </template>
        </el-table-column>

      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import { deleteCurrentRecord, getAllFVFHistory } from '../../../api/fvfPoints'
  import {
    getFourVsFourSelectMemberModelHistory,
    ifHasCaptainAuthority,
    resultPageDeleteCurrentRecord
  } from '../../../api/selectMemberModel'

  export default {
    name: 'FVFHistory',
    data () {
      return {
        fourVsFourSelectMemberModelHistory:undefined,
        selectMemberModelCurrent:undefined,
        selectMemberModelSize:undefined,
        selectMemberModelTotal:undefined,

        hasCaptainAuthority:false,
        fvfHistory:undefined,
        total:undefined,
        current:1,
        size:10
      }
    },
    created () {
      this.getFourVsFourSelectMemberModelHistory()
      this.getAllFVFHistory()
      this.ifHasCaptainAuthority()
    },
    methods: {
      //根据ID查看选中点将模式记录详情
      async getSpecificInfoOfSelectMemberModel(ID){
        this.$router.push({
          path: '/SelectMemberModelCheck',
          name: 'SelectMemberModelCheck',
          params: {
            selectMemberModelRecordID:ID
          }
        })
      },

      async getFourVsFourSelectMemberModelHistory(){
        const { data } = await getFourVsFourSelectMemberModelHistory(this.current, this.size)
        this.fourVsFourSelectMemberModelHistory = data.data.fourVsFourSelectMemberModelHistory
        this.selectMemberModelTotal = data.data.total
      },
      handleSelectMemberModelSizeChange (val) {
        this.selectMemberModelSize = val
        this.getFourVsFourSelectMemberModelHistory()
      },
      handleSelectMemberModelCurrentChange (val) {
        this.selectMemberModelCurrent = val
        this.getFourVsFourSelectMemberModelHistory()
      },
      async resultPageDeleteCurrentRecord(id){
        await resultPageDeleteCurrentRecord(id);
        await this.getFourVsFourSelectMemberModelHistory();
      },
      async ifHasCaptainAuthority(){
        const {data} = await ifHasCaptainAuthority()
        this.hasCaptainAuthority = data.data.ifHasCaptainAuthority
      },
      async getAllFVFHistory(){
        const { data } = await getAllFVFHistory(this.current, this.size)
        this.fvfHistory = data.data.fvfHistory
        this.total = data.data.total
      },
      handleSizeChange (val) {
        this.size = val
        this.getAllFVFHistory()
      },
      handleCurrentChange (val) {
        this.current = val
        this.getAllFVFHistory()
      },
      async deleteCurrentRecord(id){
        await deleteCurrentRecord(id);
        this.getAllFVFHistory();
      }
    }
  }
</script>

<style scoped lang="less">

</style>
