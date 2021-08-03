<template>
  <div>
    <el-row :gutter="15">
      <el-form :model="formData" :rules="rules" size="medium" label-width="100px"
        label-position="left">
        <el-col :span="12">
          <el-form-item label="卧底词：" prop="undercover">
            <el-input v-model="formData.undercover" placeholder="请输入卧底词" :maxlength="20" show-word-limit
              clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="平民词：" prop="civilian">
            <el-input v-model="formData.civilian" placeholder="请输入平民词" :maxlength="20" show-word-limit
              clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="卧底数量：" prop="undercoverNum">
            <el-input v-model="formData.undercoverNum" placeholder="请输入卧底数量" :maxlength="2" show-word-limit
              clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="平民数量：" prop="civilianNum">
            <el-input v-model="formData.civilianNum" placeholder="请输入平民数量" :maxlength="2" show-word-limit
              clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="白板数量：" prop="blankNum">
            <el-input v-model="formData.blankNum" placeholder="请输入白板数量" :maxlength="2" show-word-limit
              clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item size="mini">
            <el-button type="primary" @click="submitForm">确认</el-button>
            <el-button @click="resetForm">重置</el-button>
            <el-button @click="controllerGetCurrentGameInfo">刷新玩家列表</el-button>
            <el-button @click="clearAllGamerInfo">此局结束</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-table
      :show-overflow-tooltip="true"
      :data="controllerGetInfoList"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="number"
        label="编号"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        prop="identify"
        label="身份"
      >
      </el-table-column>
      <el-table-column
        prop="word"
        label="词"
      >
      </el-table-column>
      <el-table-column
        prop="word"
        label="操作"
        width="90px"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-ico-edit" @click="out(scope.row.id)">
            出局
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {
    clearAllGamerInfo,
    configUndercover,
    controllerGetCurrentGameInfo, out,
  } from '../../api/game'

export default {
  components: {},
  props: [],
  data() {
    return {
      controllerGetInfoList:undefined,
      formData: {
        undercover: undefined,
        civilian: undefined,
        undercoverNum: undefined,
        civilianNum: undefined,
        blankNum: undefined,
      },
      rules: {
        undercover: [{
          required: true,
          pattern:"^.{1,20}$",
          message: '至少输入1个字符，仅允许输入字符',
          trigger: 'change'
        }],
        civilian: [{
          required: true,
          pattern: "^.{1,20}$",
          message: '至少输入1个字符，仅允许输入字符',
          trigger: 'change'
        }],
        undercoverNum: [{
          required: true,
          pattern: "^[0-9]*$",
          message: '请输入数字',
          trigger: 'change'
        }],
        civilianNum: [{
          required: true,
          pattern: "^[0-9]*$",
          message: '请输入数字',
          trigger: 'change'
        }],
        blankNum: [{
          required: true,
          pattern: "^[0-9]*$",
          message: '请输入数字',
          trigger: 'change'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    this.controllerGetCurrentGameInfo();
  },
  mounted() {},
  methods: {
    async out(id){
      await out(id)
      this.controllerGetCurrentGameInfo()
    },
    async clearAllGamerInfo(){
      await clearAllGamerInfo();
      this.controllerGetCurrentGameInfo()
      this.$message("本局已结束")
    },
    refreshGameInfoList(){
      this.controllerGetCurrentGameInfo()
      this.$message("已获取最新列表")
    }
    ,
    async controllerGetCurrentGameInfo() {
      //以控制者身份获取对局信息：玩家的编号，ID，身份
      const playerInfo = await controllerGetCurrentGameInfo();
      this.controllerGetInfoList = playerInfo.data.data.controllerGetCurrentGameInfo;
      this.total = playerInfo.data.data.total;
    },
     submitForm() {
        this.submitData()
    },
    resetForm() {
      this.$refs['whoIsUnderCover'].resetFields()
    },
    async submitData(){
       await configUndercover(this.formData)
      this.$message("配置已完成")
    }
  }
}

</script>
<style>
</style>
