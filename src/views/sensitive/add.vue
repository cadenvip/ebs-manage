<template>
  <div class="app-container">
    <h3 class="title">新增敏感词</h3>
    <el-form ref="sensitiveForm" :model="sensitiveForm" :rules="rules" label-width="120px">
      <el-form-item label="敏感词：" prop="word">
        <el-input v-model="sensitiveForm.word" style="width: 300px;" placeholder="请输入账号"></el-input>
      </el-form-item>
      <br/>
      <div style="text-align: center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
        <el-button @click="onCancel">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

import { addSensitive } from '@/api/sensitive'

export default {
  data() {
    return {
      sensitiveForm: {
        word: ''
      },
      rules: {
        word: [{ required: true, message: '请输入账号', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.sensitiveForm.validate(valid => {
        if (valid) {
          return new Promise((resolve, reject) => {
            addSensitive(this.sensitiveForm.word).then(response => {
              this.$router.push({ path: '/system/sensitive/list' })
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formname) {
      this.searchForm.word = ''
    },
    onCancel() {
      this.$router.push({ path: '/system/sensitive/list' })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>