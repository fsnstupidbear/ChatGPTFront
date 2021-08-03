<template>
  <div>
    <!--  用户列表卡片-->
    <el-card class="box-card">
      <el-table
        :show-overflow-tooltip="true"
        :data="fvfHistory"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="时间"
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
          <el-button slot="reference" type="primary" size="mini" icon="el-ico-delete">
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
        :page-sizes="[6, 10, 20, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import { deleteCurrentRecord, getAllFVFHistory } from '../../../api/fvfPoints'

  export default {
    name: 'DivideGroupTool',
    data () {
      return {
        fvfHistory:undefined,
        total:undefined,
        current:1,
        size:6
      }
    },
    created () {
        this.getAllFVFHistory()
    },
    methods: {
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
