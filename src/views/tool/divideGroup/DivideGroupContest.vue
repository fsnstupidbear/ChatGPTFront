<template>
<div style="height: 100%">
  <el-card style="height: 100%">
  <el-tabs>
    <el-tab-pane label="分组器" router><DivideGroupTool></DivideGroupTool></el-tab-pane>
    <el-tab-pane label="历史记录" router></el-tab-pane>
    <el-tab-pane label="活动规则" router></el-tab-pane>
  </el-tabs>
    <div>

    </div>
  </el-card>
</div>
</template>

<script>
  import DivideGroupTool from './DivideGroupTool'
  export default {
    name: 'DivideGroupContest',
    components:{
      DivideGroupTool
    }
  }
</script>

<style scoped>
  /deep/.el-table td, .el-table th{
    padding: 8px;
  }
</style>
