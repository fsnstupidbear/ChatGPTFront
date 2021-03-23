<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>谁是卧底？</span>
    </div>
  <div style="width: 100%;height: 100%; margin:auto;text-align: center;top: 50%;" v-if="this.isShowButton">
    <el-button style="position: absolute;top: 50%;left: 50%;margin-top: -50px;margin-left: -50px;"
               @click="joinCurrentGame" type="primary" :disabled="isJoinCurrentGameComplete">参与当前场次</el-button>
  </div>
  <div v-else>
    <el-form>
    <el-form-item>
    <el-button size="mini" style="margin-right: 10px" @click="refreshTable">刷新列表</el-button>
    </el-form-item>
    </el-form>
    你的词为：{{word}}
    <el-table
      :show-overflow-tooltip="true"
      :data="playerInfoList"
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
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[10, 20, 50]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </el-card>
</div>
</template>

<script>
  import { isFullOfLength, isInCurrentRound, joinCurrentGame, playerGetCurrentGameInfo } from '../../api/game'

  export default {
    name: 'UnderCoverGamerUI',
    data(){
      return{
        playerInfoList:undefined,
        isShowButton:false,
        current:1,
        total:0,
        size:10,
        word:"",
        number:"",
        isInCurrentRound:true,
        isJoinCurrentGameComplete:false,
      }
    },
    methods:{
      async joinCurrentGame(){
        //把当前玩家加入对局
        this.isJoinCurrentGameComplete = true;
         const data = await isFullOfLength();
         if(data.data.data.isFullOfLength === false){
           await joinCurrentGame();
           this.isInCurrentRoundMethod()
           this.playerGetCurrentGameInfo()
           this.isJoinCurrentGameComplete = false
         }else {
           this.$message("本场游戏未开始或已满员，请等待下一场")
           this.isJoinCurrentGameComplete = false
           return
         }

         //判断当前人数是否已满，如果满员则开始分配身份
      },

      refreshTable(){
        this.playerGetCurrentGameInfo()
        this.isInCurrentRoundMethod()
        this.$message("刷新列表完成")
      },
      async playerGetCurrentGameInfo(){
        //以玩家身份获取对局信息：其他玩家的编号和ID
        const playerInfo = await playerGetCurrentGameInfo(this.current,this.size);
        this.playerInfoList = playerInfo.data.data.playerGetCurrentGameInfo;
        this.word = playerInfo.data.data.word
        this.total = playerInfo.data.data.total;
      },
      async isInCurrentRoundMethod(){
        const data = await isInCurrentRound();
        this.isInCurrentRound = data.data.data.isInCurrentRound
        return this.isInCurrentRound
      },
      handleSizeChange (val) {
        this.size = val
        this.playerGetCurrentGameInfo();
      },
      handleCurrentChange (val) {
        this.current = val
        this.playerGetCurrentGameInfo();
      },
    },
    created () {
      //判断当前用户是否在此局中
      const isInCurrentRound = this.isInCurrentRoundMethod();
      if(isInCurrentRound===false){
        return
      }else {
        //如果当前玩家已在游戏中，获取当前对局信息
        this.playerGetCurrentGameInfo();
      }
    },
    watch:{
      isInCurrentRound(){
        this.isShowButton = !this.isInCurrentRound
      }
    }
  }
</script>

<style scoped lang="less">
  /deep/ .el-table th > .cell {
    text-align: center;
  }

  /deep/ .el-table .cell {
    text-align: center;
    padding: 0 0;
  }
</style>
