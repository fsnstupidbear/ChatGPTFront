<template>
<div style="height: 100%">
  <el-card style="height: 100%">
  <el-tabs>
    <el-tab-pane label="正在进行的比赛" router lazy><OnGoingCopetition></OnGoingCopetition></el-tab-pane>
    <el-tab-pane label="经典模式分组器" router lazy><DivideGroupTool></DivideGroupTool></el-tab-pane>
    <el-tab-pane label="训练记录" router lazy><FVFHistory></FVFHistory></el-tab-pane>
  </el-tabs>
    <div>

    </div>
  </el-card>
</div>
</template>

<script>
  import DivideGroupTool from './DivideGroupTool'
  import FVFHistory from './FVFHistory'
  import OnGoingCopetition from './OnGoingCompetition'
  export default {
    name: 'DivideGroupContest',
    components:{
      OnGoingCopetition,
      DivideGroupTool,
      FVFHistory
    }
  }
</script>

<style scoped>
  /deep/.el-table td, .el-table th{
    padding: 8px;
  }
</style>
