<template>
  <div class="app-container">
    <h3 class="title">新增人员</h3>
    <el-form ref="userForm" :model="userForm" :rules="rules" label-width="120px">
      <el-form-item label="类型：" prop="roletype">
        <el-radio-group v-model="roletype">
          <el-radio label="移动管理员"></el-radio>
          <el-radio label="代运营管理员" ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色：" prop="roleids">
        <el-radio-group v-model="userForm.roleids">
          <el-row v-if="roletype === '移动管理员'">
            <el-radio label="商企管理"></el-radio>
            <el-radio label="财务管理"></el-radio>
            <el-radio label="信息审核"></el-radio>
            <el-radio label="财务对账"></el-radio>
            <el-radio label="电商管理"></el-radio>
            <el-radio label="内容管理"></el-radio>
          </el-row>
          <el-row v-if="roletype === '移动管理员'">
            <el-radio label="企业管理"></el-radio>
            <el-radio label="总经销商"></el-radio>
            <el-radio label="经销商"></el-radio>
            <el-radio label="分公司管理员"></el-radio>
            <el-radio label="系统管理员"></el-radio>
          </el-row>
          <el-row v-if="roletype === '代运营管理员'">
            <el-radio label="信息审核员"></el-radio>
            <el-radio label="信息发布员"></el-radio>
            <el-radio label="企业管理员"></el-radio>
          </el-row>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账号：" prop="loginname">
        <el-input v-model="userForm.loginname" style="width: 600px;" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model="userForm.password" style="width: 600px;" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="repassword">
        <el-input type="password" v-model="userForm.repassword" style="width: 600px;" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="userForm.name" style="width: 600px;" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="归属区域：" prop="locationid">
        <el-input v-model="userForm.locationid" style="width: 600px;" placeholder="请选择归属区域"></el-input>
      </el-form-item>
      <el-form-item label="单位：" prop="unitname">
        <el-input v-model="userForm.unitname" style="width: 600px;" placeholder="请输入单位"></el-input>
      </el-form-item>
      <el-form-item label="邮件：" prop="email">
        <el-input v-model="userForm.email" style="width: 600px;" placeholder="请输入邮件"></el-input>
      </el-form-item>
      <el-form-item label="地址：" prop="regioncode">
        <regionselector :grade="6" v-on:regionCodeChanged="getRegionCode" :showCountry="false"></regionselector>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
    <p>{{userForm.regioncode}}</p>
  </div>
</template>

<script>

import { addUser } from '@/api/user'
import regionselector from '@/components/RegionSelector/index'

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
      roletype: '移动管理员',
      userForm: {
        roleids: '',
        loginname: '',
        password: '',
        repassword: '',
        name: '',
        locationid: '',
        unitname: '',
        email: '',
        regioncode: ''
      },
      rules: {
        roletype: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        roleids: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        loginname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        repassword: [{ required: true, validator: validateRepass, trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        locationid: [{ required: true, message: '请选择归属区域', trigger: 'blur' }],
        unitname: [{ required: true, message: '请选输入单位', trigger: 'blur' }],
        email: [{ required: false, message: '请输入邮件', trigger: 'blur' }],
        regioncode: [{ required: false, message: '请输入地址', trigger: 'blur' }]
      }
    }
  },
  components: {
    regionselector
  },
  methods: {
    getRegionCode: function(data) {
      this.userForm.regioncode = data
    },
    onSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          return new Promise((resolve, reject) => {
            addUser(this.userForm).then(response => {
              this.userForm = response.data
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
      this.$router.push({ path: '/account/user/list' })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>