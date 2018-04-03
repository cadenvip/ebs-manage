<template>
  <div class="app-container">
    <h4 class="title">新增敏感词</h4>
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
  import {
    addSensitive
  } from '@/api/sensitive'

  export default {
    data() {
      return {
        sensitiveForm: {
          word: ''
        },
        rules: {
          word: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs.sensitiveForm.validate(valid => {
          if (valid) {
            addSensitive(this.sensitiveForm.word).then(response => {
              if (response.status === 200) {
                this.$router.push({
                  path: '/system/sensitive/list'
                })
                this.$message.success('新增敏感词成功！')
              } else {
                this.$message.error(response.msg)
              }
            }).catch(error => {
              this.$message.error(error.msg)
            })
          } else {
            this.$message.error('error submit!!')
          }
        })
      },
      resetForm(formname) {
        this.searchForm.word = ''
      },
      onCancel() {
        this.$router.push({
          path: '/system/sensitive/list'
        })
      }
    }
  }

</script>

<style scoped>
  .line {
    text-align: center;
  }

</style>
