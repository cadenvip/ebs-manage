<template>
  <div class="app-container">
    <h3 class="title">新增角色</h3>
    <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
      <el-form-item label="角色名称：" prop="rolename">
        <el-input v-model="roleForm.rolename" style="width: 600px;" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色类型：" prop="roletype">
        <el-select v-model="roleForm.roletype" clearable placeholder="请选择" style="width: 600px;">
          <el-option label="系统管理" value="1"></el-option>
          <el-option label="企业" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色描述：" prop="description">
        <el-input type="textarea" v-model="roleForm.description" style="width: 600px;" placeholder="请输入角色描述"></el-input>
      </el-form-item>
      <el-form-item label="权限绑定：" prop="permissions">
        <el-input v-model="roleForm.permissions" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getRoleDetail, updateRole } from '@/api/role'

export default {
  data() {
    return {
      roleForm: {
        rolename: '',
        roletype: '',
        description: '',
        permissions: ''
      },
      rules: {
        rolename: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roletype: [{ required: true, message: '请选择角色类型', trigger: 'blur' }],
        description: [{ required: false, message: '请输入角色描述', trigger: 'blur' }]
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
    onSubmit() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          return new Promise((resolve, reject) => {
            updateRole(this.roleForm).then(response => {
              this.roleForm = response.data
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