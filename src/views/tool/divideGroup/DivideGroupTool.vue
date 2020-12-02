<template>
  <div style="width: 100%">

    <el-row :gutter="80">

      <div class="nameListPanel">
    <el-col :span="6">
    <el-form style="margin-bottom: 5px" ref="form" :model="form">
      <el-form-item>
        <el-input placeholder="请输入选手ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入选手ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入选手ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入选手ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入选手ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入选手ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入选手ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入选手ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%" type="primary">分组</el-button>
      </el-form-item>
    </el-form>
    </el-col>
      </div>

      <div class="divideResult">
        <form>
      <el-col :span="9">
        <div>
    <el-table
      class="redTeam"
      :data="tableRed"
      align="center"
      border
    >
      <el-table-column
        label="红队"
        prop="red"
      >
      </el-table-column>

    </el-table>
          <el-table
            style="width: 100%"
            class="blueTeam"
            align="center"
            :data="tableRed"
            border
          >
            <el-table-column
              label="蓝队"
              prop="red"
              class="blueTeam"
            >
            </el-table-column>
          </el-table>
          <el-form
          :inline="true">
          <div style="padding-top: 10px;">
            <span style="display: inline-block;width: 15%">比分：</span><el-select style="width: 60%;margin-right: 5%"></el-select>
            <el-button type="primary" style="width: 20%">结算</el-button>
          </div>
          </el-form>
        </div>
      </el-col>
        </form>
      </div>

      <div class="points">
        <el-col :span="9">
          <div>
          <el-table
            style="width: 100%"
            align="center"
            :data="tableRed"
            border
          >
            <el-table-column
              type="index"
              label="排名"
              prop="red"
            >
            </el-table-column>
            <el-table-column
              label="ID"
              prop="red"
            >
            </el-table-column>
            <el-table-column
              label="积分"
              prop="red"
            >
            </el-table-column>
            <el-table-column
              label="账单"
              prop="red"
            >
            </el-table-column>
          </el-table>
          </div>
          <el-button style="margin-top: 5px;width: 100%;" type="primary">全部清空</el-button>
        </el-col>
      </div>

    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'DivideGroupTool',
    data () {
      return {
        tableRed:[{
          red:1
        },
          {
            red:2
          },
          {
            red:3
          },
          {
            red:4
          },],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>

<style scoped lang="less">
  /deep/.redTeam th{
    color:red;
  }

  /deep/.blueTeam th{
    color:blue;
  }

  /deep/.el-table th > .cell {
    text-align: center;
  }

  /deep/.el-table .cell {
    text-align: center;
    padding: 0 0;
  }

  .el-form-item {
    margin-bottom: 10px;
  }

</style>
