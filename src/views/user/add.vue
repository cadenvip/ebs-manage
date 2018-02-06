<template>
  <div class="app-container">
    <h3 class="title">新增人员</h3>
    <el-form ref="userForm" :model="userForm" :rules="rules" label-width="120px">
      <el-form-item label="类型：" prop="roletype">
        <el-radio-group v-model="userForm.roletype">
          <el-radio :label="1">移动管理员</el-radio>
          <el-radio :label="2">代运营管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色：" prop="roleids">
        <el-radio-group v-model="userForm.roleids">
          <el-row v-show="userForm.roletype === 1">
            <el-radio v-for="(item, index) in roles" v-if="item.roletype === '1'" :key="item.id" :label="item.id">{{item.rolename}}</el-radio>
          </el-row>
          <el-row v-show="userForm.roletype === 2">
            <el-radio v-for="(item, index) in roles" v-if="item.roletype === '2'" :key="item.id" :label="item.id">{{item.rolename}}</el-radio>
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
        <el-input v-model="userForm.locationname" style="width: 600px;" placeholder="请输入地址" @focus="dialogVisible = true"></el-input>
      </el-form-item>
      <el-form-item label="邮件：" prop="email">
        <el-input v-model="userForm.email" style="width: 600px;" placeholder="请输入邮件"></el-input>
      </el-form-item>
      <el-form-item label="地址：" prop="address">
        <el-input v-model="userForm.address" style="width: 600px;" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="请选择区域"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <LocationSelector @locationSelected="getLocationInfo"></LocationSelector>
    </el-dialog>
  </div>
</template>

<script>

import { addUser } from '@/api/user'
import { getAllRoles } from '@/api/role'
import LocationSelector from '@/components/LocationSelector/index'

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
      roles: [],
      userForm: {
        roletype: 1,
        roleids: '',
        loginname: '',
        password: '',
        repassword: '',
        name: '',
        locationid: '',
        locationname: '',
        email: '',
        address: ''
      },
      rules: {
        roletype: [{ required: true, message: '请选择类型', trigger: 'change' }],
        roleids: [{ required: true, message: '请选择角色', trigger: 'change' }],
        loginname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        repassword: [{ required: true, validator: validateRepass, trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        locationname: [{ required: true, message: '请选择归属区域', trigger: 'blur' }],
        email: [{ required: false, message: '请输入邮件', trigger: 'blur' }],
        address: [{ required: false, message: '请输入地址', trigger: 'blur' }]
      },
      dialogVisible: false
    }
  },
  components: {
    LocationSelector
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    handleClose(done) {
      // this.$confirm('确认关闭？').then(_ => {
      done()
      // }).catch(_ => {})
    },
    getLocationInfo: function(data) {
      this.userForm.locationid = data.id
      this.userForm.locationname = data.label
    },
    getRoleList() {
      return new Promise((resolve, reject) => {
        // 角色应该不会超过100个吧！
        getAllRoles('1', '100').then(response => {
          this.roles = response.data.list
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
            addUser(this.userForm).then(response => {
              resolve(response)
              this.$router.push({ path: '/account/user/list' })
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