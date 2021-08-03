<template>
  <div>
  <el-card>
    <div slot="header">
    <span>本周训练计划</span>
  </div>
  <el-steps :active="weekday-1" finish-status="success">
    <el-step :title="item.day" :description="item.plan" v-for="item in plans"></el-step>
  </el-steps>
  </el-card>
    <el-card style="margin-top: 20px">
    <div slot="header">
      <span>最新消息</span>
    </div>
      <el-table
        style="width: 100%"
        :data="messageList"
        align="left"
      >
        <el-table-column
          width="200px"
          fixed="left"
        >
          <template slot-scope="scope">
            <div v-if="(scope.row.type=='1')">
            <span>{{'新闻'}}</span>
            </div>
            <div v-else-if="scope.row.type=='2'">
              <span>{{'赛事规则'}}</span>
            </div>
            <div v-else>
              <span>{{'其他'}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
        >
          <template slot-scope="scope">
            <span @click="scanNews(scope.row.id)" style="cursor: pointer"><u>{{scope.row.title}}</u></span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="200px"
        >
          <template slot-scope="scope">
            <span>{{scope.row.updateDate}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import { getWeekPlan } from '../api/training'
  import { getMessageList, getNewestMessageList } from '../api/news'

  export default {
    name: 'Welcome',
    data(){
      return{
        messageList:undefined,
        weekday:undefined,
        plans:undefined
      }
    },
    async created () {
      this.getWeekPlan()
      this.getNewestMessageList()
    },
    methods:{
      async getWeekPlan(){
        const {data} = await getWeekPlan()
        this.plans = data.data.weekPlan
        this.weekday = data.data.weekday
      },
      async getNewestMessageList(){
        const {data} = await getNewestMessageList()
        this.messageList = data.data.messageList
        console.log(this.messageList)
      },
      scanNews(id){
        this.$router.push({
          path: '/News',
          name: 'News',
          params: {
            id:id
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
