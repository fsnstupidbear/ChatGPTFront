<template>
    <div>
      <el-card>
      <div style="margin:10px 0 auto;text-align: center">
        <span style="color: #f1c40f;font-weight:bold;font-size: 30px">{{title}}</span>
      </div>
      <div style="text-align: right">
        <span>编者：Fsn丶</span>
        <span>{{author}}</span>
      </div>
        <div style="text-align: right">
          <span>{{updateDate}}</span>
        </div>
<div v-html="content"></div>
      </el-card>
    </div>
</template>

<script>
  import { getNewsContentById } from '../../api/news'

  export default {
    name: 'News',
    data(){
      return{
        newsId:'',
        title:undefined,
        content:undefined,
        updateDate:undefined,
        author:undefined
      }
    },
    mounted () {
      this.newsId = this.$route.params.id
    },
    created () {

    },
    methods:{
      async getNewsContent(){
        if(this.newsId===undefined){
          this.$router.push({
            path: '/NewsList',
            name: 'NewsList',
          })
        }
       const {data} = await getNewsContentById(this.newsId)
        this.title = data.data.news.title
        this.content = data.data.news.content
        this.author = data.data.news.author
        this.updateDate = data.data.news.updateDate
      }
    },
    watch:{
      newsId(){
        this.getNewsContent()
      }
    }
  }
</script>

<style scoped>

</style>
