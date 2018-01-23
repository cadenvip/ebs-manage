<template>
  <div class="app-container">
    <h3 class="title">角色信息详情</h3>
    <el-form label-width="120px">
      <el-form-item label="角色名称：" prop="rolename">
        <el-input v-model="roleForm.rolename" style="width: 600px;" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色类型：" prop="roletype">
        <el-select v-model="roleForm.roletype" clearable placeholder="请选择" style="width: 600px;" disabled >
          <el-option label="系统管理" value="1"></el-option>
          <el-option label="企业" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色描述：" prop="description">
        <el-input type="textarea" v-model="roleForm.description" style="width: 600px;" placeholder="请输入角色描述" disabled ></el-input>
      </el-form-item>
      <el-form-item label="权限绑定：" prop="permissions">
        <el-input v-model="roleForm.permissions" style="width: 600px;" disabled ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getRoleDetail } from '@/api/role'

export default {
  data() {
    return {
      roleForm: {
        rolename: '',
        roletype: '',
        description: '',
        permissions: ''
      }
    }
  },
  created() {
    this.getRoleInfo()
  },
  methods: {
    getRoleInfo() {
      return new Promise((resolve, reject) => {
        getRoleDetail(this.$route.query.id).then(response => {
          this.roleForm = response.data
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