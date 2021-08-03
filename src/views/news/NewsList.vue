<template>

  <div>
    <!--  用户列表卡片-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新闻管理</span>
      </div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="查询新闻：">
          <el-input clearable v-model="title" placeholder="输入新闻标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getNewsList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="insertNews('1')">撰写新闻</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :show-overflow-tooltip="true"
        :data="newsList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
        >
        </el-table-column>
        <el-table-column
          prop="createdDate"
          label="写作日期"
        >
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="最后修改日期"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="操作"
          width="210px">
          <template slot-scope="scope">
            <el-button slot="reference" type="primary" size="mini" icon="el-ico-delete" @click="scanNews(scope.row.id)">
              查看</el-button>
            <el-button slot="reference" type="primary" size="mini" icon="el-ico-delete" @click="updateNews(scope.row)">
              编辑</el-button>
            <el-popconfirm
              @onConfirm="deleteNewsById(scope.row.id)"
              style="margin-left: 10px"
              icon="el-icon-info"
              icon-color="black"
              title="确定进行此操作吗？"
            >
              <el-button slot="reference" type="danger" size="mini" icon="el-ico-delete">
                删除</el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import { deleteNewsById, getNewsList } from '../../api/news'

  export default {
    name: 'NewsList',
    data () {
      return {
        title:undefined,
        competitionClassify:undefined,
        updateVisible: false,
        addVisible: false,
        authorityVisible:false,
        choosedRowUserInfo: [],
        rolesList: [],
        current: 1,
        total: undefined,
        size: 5,
        newsList:undefined,
      }
    },

    /**
     * 创建组件时调用
     */
    created () {
      this.getNewsList()
    },
    components: {

    },

    methods: {
      insertNews(type){
        this.$router.push({
          path: '/NewsEditor',
          name: 'NewsEditor',
          params: {
            type:type
          }
        })
      },
      updateNews(news){
        this.$router.push({
          path: '/NewsEditor',
          name: 'NewsEditor',
          params: {
            news:news
          }
        })
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
      async deleteNewsById(id){
        await deleteNewsById(id);
        await this.getNewsList();
      },
      //获取全部新闻
      async getNewsList () {
        const { data } = await getNewsList(this.title,this.current,this.size)
        this.newsList = data.data.newsList
      },
      //悬浮窗提示
      message (tip) {
        this.$message(tip)
      }
      ,
      handleSizeChange (val) {
        this.size = val
        this.getNewsList()
      },
      handleCurrentChange (val) {
        this.current = val
        this.getNewsList()
      },
    }
  }
</script>

<style scoped lang="less">

</style>
