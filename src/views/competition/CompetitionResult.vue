<template>
  <div>
    <el-dialog :visible.sync="competitionResultVisible" @close="close" title="录入成绩">
      <el-form :rules="rules" size="mini" label-width="100px"
        label-position="left">
        <el-form-item label="比赛成绩：" prop="result">
          <el-input v-model="result" type="textarea" placeholder="请输入比赛成绩" :maxlength="100"
            show-word-limit :autosize="{minRows: 4, maxRows: 8}" :style="{width: '100%'}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { commitResult } from '../../api/competition'

export default {
  inheritAttrs: false,
  components: {},
  props:{
    competitionResultVisible:{
      type:Boolean,
      default:false
    },
    choosedRowCompetitionId:undefined
  },
  data() {
    return {
        result: "冠军-\n亚军-\n季军-\n殿军-",
    }
  },

  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    close() {
      this.$emit('changeShow', 'false')
    },
    async handelConfirm() {
     await commitResult(this.choosedRowCompetitionId,this.result)
      this.$emit('getAllCompetitions')
      this.close()
    },
  }
}

</script>
<style>
</style>
