<template>
  <el-table width="30px"
    :data="tableData">
    <el-table-column
      prop="date"
      label="已报名"
      >
    </el-table-column>
  </el-table>

</template>

<script>
  export default {
    name: 'SignUpContest'
  }
</script>

<style scoped>

</style>
