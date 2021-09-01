<template>
  <div style="width: 100%;height: 100%">
    <el-card style="width: 100%;height: 100%">
      <div slot="header">
        <span>我的积分</span>
      </div>
      <div>总积分：{{this.sumPoints}}</div>
      <br>
      <div>本月积分：{{this.currentMonthPoints}}</div>
      <div id="myPointsChart" :style="{width: '1350px', height: '500px'}"></div>
    </el-card>
  </div>
</template>

<script>
  import { getMyPointsChartCurrentMonthData } from '../../api/points'
  const echarts = require('echarts/lib/echarts');
  require('echarts/lib/component/grid');
  require('echarts/lib/chart/line');

  export default {
    name: 'MyPoints',
    data(){
      return{
        sumPoints:0,
        currentMonthPoints:0,
        xAxis: {
          type: 'category',
          data:undefined,
          name:"日"
        },
        yAxis: [
          {
            name:'积分',
    }
    ],
        series: [{
          data: undefined,
          type: 'line',
          smooth: true
        }]
      }
    },
    methods:{
      async getMyPointsChartCurrentMonthData() {
        const {data} = await getMyPointsChartCurrentMonthData();
        console.log(this.series[0].data)
        this.series[0].data = data.data.seriesData
        this.xAxis.data = data.data.xAxisData
        this.currentMonthPoints = data.data.currentMonthPoints
        this.sumPoints = data.data.sumPoints
      },
      async getMyPoints(){
        var myPointsChart = echarts.init(document.getElementById('myPointsChart'));
        var option;
        option = {
          xAxis: this.xAxis,
          yAxis: {
            type: 'value',
            name:'积分'
          },
          title:{
            text:'您的本月积分表',
            x:'center'
          },
          series: this.series,
        };

        option && myPointsChart.setOption(option);
      }
  },
    async mounted () {
      await this.getMyPointsChartCurrentMonthData()
      this.getMyPoints()
    },
    created () {
      }
  }
</script>

<style scoped>

</style>
