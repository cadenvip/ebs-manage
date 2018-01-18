<template>
  <div class="app-container">
    <h3 class="title">修改人员信息</h3>
    <el-form :model="userForm" label-width="120px">
      <el-form-item label="账号：">
        <el-input v-model="userForm.loginname"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="pass">
        <el-input type="password" v-model="userForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPass">
        <el-input type="password" v-model="userForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="userForm.name"></el-input>
      </el-form-item>
      <el-form-item label="归属区域：">
        <el-input v-model="userForm.locationname"></el-input>
      </el-form-item>
      <el-form-item label="单位：">
        <el-input v-model="userForm.unitname"></el-input>
      </el-form-item>
      <el-form-item label="邮件：">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item label="地址：">
        <el-input v-model="userForm.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { addUser } from '@/api/user'

export default {
  data() {
    return {
      userForm: {
        loginname: '',
        password: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      return new Promise((resolve, reject) => {
        addUser(this.userForm).then(response => {
          this.userForm = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    onCancel() {
      this.$router.push({ path: '/user/list' })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>