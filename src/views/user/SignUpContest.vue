<template>
  <div style="height: 100%">
    <el-card class="box-card" style="height: 100%">
  <el-table>
    <el-table-column
      type="index"
      label="序号"
    ></el-table-column>
    <el-table-column
      prop="date"
      label="已报名"
      >
    </el-table-column>
  </el-table>
      <div style="margin:10px 0 auto;text-align: center">
    <el-button type="primary" style="width:40%">报名</el-button>
    <el-button style="width:40%">取消报名</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'SignUpContest'
  }
</script>

<style scoped lang="less">
  /deep/.el-table th > .cell {
    text-align: center;
  }

  /deep/.el-table .cell {
    text-align: center;
    padding: 0px 0;
  }
</style>
