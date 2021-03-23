<template>
  <div>
    <el-dialog :visible.sync="showUpdatePassword" @close="close" title="更改密码">
      <el-form ref="updatePassword" :model="formData" :rules="rules" size="mini" label-width="100px"
               label-position="left">
        <el-form-item label="旧密码：" prop="field101">
          <el-input v-model="formData.field101" placeholder="请输入旧密码" clearable show-password
                    :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="field102">
          <el-input v-model="formData.field102" placeholder="请输入新密码" clearable show-password
                    :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="再次输入：" prop="field103">
          <el-input v-model="formData.field103" placeholder="请输入再次输入新密码" clearable show-password
                    :style="{width: '100%'}"></el-input>
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
  export default {
    inheritAttrs: false,
    components: {},
    props: {
      showUpdatePassword: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showDialog: false,
        formData: {
          field101: undefined,
          field102: undefined,
          field103: undefined,
          field104: undefined,
        },
        rules: {
          field101: [{
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          }],
          field102: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          }],
          field103: [{
            required: true,
            message: '请输入再次输入新密码',
            trigger: 'blur'
          }],
        },
      }
    },
    computed: {},
    watch: {},
    created () {
    },
    mounted () {
    },
    methods: {
      close () {
        this.$emit('changeShow', 'false')
      },
      handelConfirm () {

        this.$emit('changeShow', 'false')
      },
    }
  }

</script>
<style>
</style>
