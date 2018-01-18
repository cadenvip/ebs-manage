<template>
  <div class="app-container">
    <h3 class="title">修改人员信息</h3>
    <el-form :model="userinfo" label-width="120px">
      <el-form-item label="账号：">
        <el-input v-model="userinfo.loginname"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="pass">
        <el-input type="password" v-model="userinfo.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPass">
        <el-input type="password" v-model="userinfo.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="userinfo.name"></el-input>
      </el-form-item>
      <el-form-item label="归属区域：">
        <el-input v-model="userinfo.locationname"></el-input>
      </el-form-item>
      <el-form-item label="单位：">
        <el-input v-model="userinfo.unitname"></el-input>
      </el-form-item>
      <el-form-item label="邮件：">
        <el-input v-model="userinfo.email"></el-input>
      </el-form-item>
      <el-form-item label="地址：">
        <el-input v-model="userinfo.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getUserDetail, updateUser } from '@/api/user'

export default {
  data() {
    return {
      userinfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserDetail(this.$route.query.id).then(response => {
          this.userinfo = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    onSubmit() {
      return new Promise((resolve, reject) => {
        updateUser(this.userinfo).then(response => {
          this.userinfo = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    onCancel() {
      // this.$router.push({ path: '/user/list' })
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>