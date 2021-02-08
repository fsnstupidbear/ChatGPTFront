<template>
  <div style="width: 100%">

    <el-row :gutter="80">

      <div class="nameListPanel">
        <el-col :span="6">
          <el-form style="margin-bottom: 5px">
            <el-form-item>
              <el-input placeholder="请输入选手ID" v-model="pointsList[0].username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入选手ID" v-model="pointsList[1].username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入选手ID" v-model="pointsList[2].username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入选手ID" v-model="pointsList[3].username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入选手ID" v-model="pointsList[4].username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入选手ID" v-model="pointsList[5].username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入选手ID" v-model="pointsList[6].username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入选手ID" v-model="pointsList[7].username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width:100%" type="primary" @click="divideGroup" :disabled="divideGroupNotComplete">分组</el-button>
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
                :data="redTeam"
                align="center"
                border
              >
                <el-table-column
                  label="红队"
                >
                  <template slot-scope="scope">
                    <span>{{pointsList[scope.row].username}}</span>
                  </template>
                </el-table-column>

              </el-table>
              <el-table
                style="width: 100%"
                class="blueTeam"
                :data="blueTeam"
                align="center"
                border
              >
                <el-table-column
                  label="蓝队"
                  class="blueTeam"
                >
                  <template slot-scope="scope">
                    <span>{{pointsList[scope.row].username}}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-form
                :inline="true">
                <div style="padding-top: 10px;">
                  <span style="display: inline-block;width: 15%">比分：</span>
                  <el-select style="width: 60%;margin-right: 5%" v-model="score">
                    <el-option v-for="(item, index) in scoreOption" :key="index" :label="item.label"
                               :value="item.value" ></el-option>
                  </el-select>
                  <el-button type="primary" style="width: 20%" @click="checkScore()" :disabled="checkScoreNotComplete">结算</el-button>
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
              :data="pointsDesc"
              border
            >
              <el-table-column
                type="index"
                label="排名"
              >
              </el-table-column>
              <el-table-column
                label="ID"
                prop="username"
              >
              </el-table-column>
              <el-table-column
                label="积分"
                prop="points"
              >
              </el-table-column>
              <el-table-column
                label="账单"
                prop="checkMoney"
              >
              </el-table-column>
            </el-table>
          </div>
          <el-button style="margin-top: 5px;width: 100%;" type="primary" @click="clearAll">全部清空</el-button>
        </el-col>
      </div>
    </el-row>

  </div>
</template>

<script>
  import { checkScore, clearAll, getPoints } from '../../../api/fvfPoints'
  import {divideGroup} from '../../../api/fvfPoints'

  export default {
    name: 'DivideGroupTool',
    data () {
      return {
        score:'20',
        scoreOption: [{
          "label": "红  :  蓝   ＝   2  :  0",
          "value": "20"
        }, {
          "label": "红  :  蓝   ＝   0  :  2",
          "value": "02"
        },{
          "label": "红  :  蓝   ＝   2  :  1",
          "value": "21"
        },{
          "label": "红  :  蓝   ＝   1  :  2",
          "value": "12"
        }],
        persons:[

        ],
        redTeam: [],
        blueTeam: [],
        pointsDesc: [{}
        ],
        pointsList: [{
          username: '',
        }],
        divideGroupNotComplete:false,
        checkScoreNotComplete:false
      }
    },
    created () {
      this.getPoints()
    },
    methods: {
      async checkScore(){
        this.checkScoreNotComplete=true
        await checkScore(this.score)
        await this.getPoints()
        this.checkScoreNotComplete=false
      },
     async divideGroup () {
        this.divideGroupNotComplete=true
        const pointsList = JSON.stringify(this.pointsList)
        await divideGroup(pointsList)
        await this.getPoints()
        this.divideGroupNotComplete=false
      },
      async getPoints () {
        const { data } = await getPoints()
        this.redTeam = data.data.redTeam
        this.blueTeam = data.data.blueTeam
        this.pointsDesc = data.data.pointsDesc
        this.pointsList = data.data.pointsList
      },
      async clearAll(){
        await clearAll()
        await this.getPoints()
      }
    }
  }
</script>

<style scoped lang="less">
  /deep/ .redTeam th {
    color: red;
  }

  /deep/ .blueTeam th {
    color: blue;
  }

  /deep/ .el-table th > .cell {
    text-align: center;
  }

  /deep/ .el-table .cell {
    text-align: center;
    padding: 0 0;
  }

  .el-form-item {
    margin-bottom: 10px;
  }

</style>
