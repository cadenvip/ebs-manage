<template>
  <div class="app-container">
    <h3 class="title">人员信息详情</h3>
    <el-form label-width="120px">
      <el-form-item label="账号：">
        <el-input v-model="userForm.loginname" :disabled="true" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="userForm.name" :disabled="true" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：">
        <el-input v-model="userForm.name" :disabled="true" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item label="账号类型：">
        <el-input v-model="roletypes" :disabled="true" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item label="归属区域：">
        <el-input v-model="userForm.locationname" :disabled="true" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item label="邮件：">
        <el-input v-model="userForm.email" :disabled="true" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item label="地址：">
        <el-input v-model="userForm.address" :disabled="true" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item label="角色：">
        <el-input v-model="rolenames" :disabled="true" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getUserDetail } from '@/api/user'

export default {
  data() {
    return {
      roletypes: '',
      userForm: '',
      rolenames: ''
    }
  },
  created() {
    this.getUserForm()
  },
  methods: {
    setRoles(roles) {
      var arrRoleTypes = []
      var arrRoleNames = []
      for (var i = 0; i < roles.length; i++) {
        arrRoleNames.push(roles[i].rolename)
        switch (parseInt(roles[i].roletype)) {
          case 1:
            arrRoleTypes.push('系统管理')
            break
          case 2:
            arrRoleTypes.push('商务部')
            break
          case 3:
            arrRoleTypes.push('龙头企业')
            break
          case 4:
            arrRoleTypes.push('农家店')
            break
        }
      }
      this.roletypes = arrRoleTypes.join()
      this.rolenames = arrRoleNames.join()
    },
    getUserForm() {
      return new Promise((resolve, reject) => {
        getUserDetail(this.$route.query.id).then(response => {
          this.userForm = response.data
          this.setRoles(this.userForm.role)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    onCancel() {
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