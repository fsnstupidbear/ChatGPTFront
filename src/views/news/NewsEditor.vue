<template>
  <div>
    <el-form ref="NewsEditor" :model="newsData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsData.title" placeholder="请输入标题" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <vue-tinymce v-model="newsData.content" placeholder="请输入内容" style="height: 500px" :setting="setting"></vue-tinymce>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { commitNews, updateNews } from '../../api/news'

export default {
  components: {},
  props: [],
  data() {
    return {
      newsId:undefined,
      type:undefined,
      newsData: {
        title: undefined,
        content: "",
        commit: undefined,
      },
      setting: {
        // 富文本编辑器setting配置
        menubar: false,
        toolbar:
          "undo redo | bold italic underline strikethrough | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist |   fontselect fontsizeselect forecolor backcolor  | indent outdent | superscript subscript | removeformat  ",
        toolbar_drawer: "sliding",
        language: "zh_CN",
        height: 420,
        branding: false
      },
      rules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入编辑器新闻内容',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {
    newsId(){

    }
  },
  created() {},
  mounted() {
    this.type = this.$route.params.type
    this.newsId = this.$route.params.news.id
    this.newsData.title = this.$route.params.news.title
    this.newsData.content = this.$route.params.news.content
  },
  methods: {
    async commitNews(){
      await commitNews(this.newsData.title,this.newsData.content,this.type)
    },
    async updateNews(){
      await updateNews(this.newsId,this.newsData.title,this.newsData.content)
    },
    submitForm() {
      this.$refs['NewsEditor'].validate(valid => {
        if (!valid) return
        if(this.newsId != undefined){
          this.updateNews()
        }else {
          this.commitNews()
        }
        this.$message("保存新闻完成！")
        this.$router.push({
          path: '/NewsList',
          name: 'NewsList',
        })
      })
    },
  }
}
</script>
<style>
</style>
