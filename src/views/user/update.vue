<template>
  <div class="app-container">
    <h3 class="title">修改人员信息</h3>
    <el-form ref="userForm" :model="userForm" :rules="rules" label-width="120px">
      <el-form-item label="账号：" prop="loginname">
        <el-input v-model="userForm.loginname" style="width: 300px;" :disabled="true"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="userForm.password" style="width: 300px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="确认密码：" prop="repassword">
            <el-input type="password" v-model="userForm.repassword" style="width: 300px;"></el-input>
          </el-form-item>          
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="userForm.name" style="width: 300px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属区域：" prop="locationname">
            <el-input v-model="userForm.locationname" style="width: 300px;" :disabled="true"></el-input>
          </el-form-item>          
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="单位：" prop="unitname">
            <el-input v-model="userForm.unitname" style="width: 300px;" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮件：" prop="email">
            <el-input v-model="userForm.email" style="width: 300px;"></el-input>
          </el-form-item>          
        </el-col>
      </el-row>
      <el-form-item label="地址：" prop="address">
        <el-input v-model="userForm.address" style="width: 300px;"></el-input>
      </el-form-item>
      <br/>
      <div style="text-align: center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

import { getUserDetail, updateUser } from '@/api/user'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userForm.repassword !== '') {
          this.$refs.userForm.validateField('repassword')
        }
        callback()
      }
    }
    var validateRepass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userForm: {
        loginname: '',
        password: '',
        repassword: '',
        name: '',
        locationname: '',
        unitname: '',
        email: '',
        address: ''
      },
      rules: {
        loginname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        repassword: [{ required: true, validator: validateRepass, trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        locationname: [{ required: true, message: '请选择归属区域', trigger: 'blur' }],
        unitname: [{ required: true, message: '请选输入单位', trigger: 'blur' }],
        email: [{ required: false, message: '请输入邮件', trigger: 'blur' }],
        address: [{ required: false, message: '请输入地址', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserDetail(this.$route.query.id).then(response => {
          console.log(response.data)
          this.userForm = response.data
          this.userForm.repassword = this.userForm.password
          console.log(this.userForm)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    onSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          return new Promise((resolve, reject) => {
            updateUser(this.userForm).then(response => {
              this.$router.go(-1)
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