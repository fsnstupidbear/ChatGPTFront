<template>
  <div>
    <el-dialog v-bind="$attrs" :visible.sync="showDialog" v-on="$listeners" @open="onOpen" @close="onClose" title="添加队员">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-col :span="12">
            <el-form-item label="ID" prop="ID">
              <el-input v-model="formData.ID" placeholder="请输入ID" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职业" prop="vocation">
              <el-select v-model="formData.vocation" placeholder="请选择职业" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in vocationOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分队/总队" prop="department">
              <el-select v-model="formData.department" placeholder="请选择分队/总队" clearable
                :style="{width: '100%'}">
                <el-option v-for="(item, index) in departmentOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="QQ" prop="QQNumber">
              <el-input v-model="formData.QQNumber" placeholder="请输入QQ" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phoneNumber">
              <el-input v-model="formData.phoneNumber" placeholder="请输入联系电话" clearable
                :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入队时间" prop="joinDate">
              <el-date-picker v-model="formData.joinDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                :style="{width: '100%'}" placeholder="请选择入队时间" clearable></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props:{
    addOrUpdateVisible:{
      type: Boolean,
      default: false
    }
  },
  inheritAttrs: false,
  components: {},

  data() {
    return {
      showDialog:false,
      formData: {
        ID: undefined,
        vocation: undefined,
        department: undefined,
        QQNumber: undefined,
        phoneNumber: undefined,
        joinDate: "2020-12-08",
      },
      rules: {
        ID: [{
          required: true,
          message: '请输入ID',
          trigger: 'blur'
        }],
        vocation: [{
          required: true,
          message: '请选择职业',
          trigger: 'change'
        }],
        department: [{
          required: true,
          message: '请选择分队/总队',
          trigger: 'change'
        }],
        QQNumber: [{
          required: true,
          message: '请输入QQ',
          trigger: 'blur'
        }],
        phoneNumber: [],
        joinDate: [{
          required: true,
          message: '请选择入队时间',
          trigger: 'change'
        }],
      },
      vocationOptions: [{
        "label": "选项一",
        "value": 1
      }],
      departmentOptions: [{
        "label": "分队",
        "value": "分队"
      }, {
        "label": "总队",
        "value": "总队"
      }],
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClose () {
      // 子组件调用父组件方法，并传递参数
      this.$emit('changeShow', 'false')
    },
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
      this.$emit('changeShow', 'false')
    },
    close() {
      this.$emit('changeShow', 'false')
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.close()
      })
    },
  },

  watch: {
    // 监听 addOrUpdateVisible 改变
    addOrUpdateVisible () {
      this.showDialog = this.addOrUpdateVisible
      console.log("addOrUpdateVisible")
    }
  }
}

</script>
<style>
</style>
