<template>
  <div class="app-container">
    <h4 class="title">新增人员</h4>
    <el-form ref="userForm" :model="userForm" :rules="rules" label-width="120px">
      <el-form-item label="角色：" prop="roleids">
        <el-checkbox-group v-model="userForm.roleids">
          <el-checkbox v-for="(item, index) in allRoles" v-if="item.roletype === '2' || item.roletype === '3'" :key="item.id" :label="item.id">{{item.rolename}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="账号：" prop="loginname">
        <el-input v-model="userForm.loginname" :maxlength=16 clearable style="width: 220px;" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="手机号：" prop="phoneno">
            <el-input v-model="userForm.phoneno" :maxlength=11 clearable style="width: 220px;" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">手机号必须为11位中国移动手机号码</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="userForm.password" :minlength=8 :maxlength=20 clearable style="width: 220px;" placeholder="请输入密码"></el-input>
            <PasswordStrength :password="userForm.password" @pwdInfo="getPwdInfo"></PasswordStrength>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">请输入8-20位由英文大写、英文小写、数字、特殊字符中任意至少三种类型构成的密码信息</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="确认密码：" prop="repassword">
            <el-input type="password" v-model="userForm.repassword" :minlength=8 :maxlength=20 clearable style="width: 220px;" placeholder="请再次输入密码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">请输入8-20位由英文大写、英文小写、数字、特殊字符中任意至少三种类型构成的密码信息</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="userForm.name" :maxlength=16 clearable style="width: 220px;" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">姓名必须为1-20位，可以是字母或中文</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="归属区域：" prop="locationname">
            <el-input v-model="userForm.locationname" style="width: 220px;" placeholder="请输入地址" @focus="regionDialogVisible = true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="邮件：" prop="email">
            <el-input v-model="userForm.email" :maxlength=32 clearable style="width: 220px;" placeholder="请输入邮件"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">请输入有效电子邮箱地址，如：linux@139.com</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="地址：" prop="address">
            <el-input v-model="userForm.address" :maxlength=32 clearable style="width: 220px;" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <br/>
      <div style="text-align: center;font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #f30">
        <span>
          温馨提示：请避免设置与其他系统相同的密码
        </span>
      </div>
      <br/>
      <div style="text-align: center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="primary" @click="onCancel">返回</el-button>
      </div>
    </el-form>
    <el-dialog title="请选择区域" :visible.sync="regionDialogVisible" width="40%">
      <LocationSelector @locationSelected="getLocationInfo"></LocationSelector>
      <span slot="footer" class="dialog-footer">
        <el-button @click="regionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectedRegion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addBusinessUser
  } from '@/api/user'
  import { getAllRoles } from '@/api/role'
  import LocationSelector from '@/components/LocationSelector/index'
  import PasswordStrength from '@/components/PasswordStrength/index'
  import {
    encryptPassword
  } from '@/utils/index'
  import {
    validateCMMobilePhone,
    containSymbol,
    validateEmail
  } from '@/utils/validate'

  export default {
    data() {
      // 必填
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'))
        } else {
          if (value.indexOf(' ') >= 0) {
            callback(new Error('不能包含空格'))
          } else if (containSymbol(value.trim())) {
            callback(new Error('不能包含特殊字符'))
          } else {
            callback()
          }
        }
      }
      var validateCellphone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else {
          if (!validateCMMobilePhone(value.trim())) {
            callback(new Error('请输入有效的手机号码'))
          }
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.userForm.password.length < 8) {
            callback(new Error('请密码长度不足8位'))
          } else if (this.pwdInfo.score < 4) {
            callback(new Error('密码强度不够'))
          } else if (this.userForm.repassword !== '') {
            this.$refs.userForm.validateField('repassword')
            callback()
          }
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
      var validateMail = (rule, value, callback) => {
        if (value !== null && value !== '') {
          if (!validateEmail(value.trim())) {
            callback(new Error('请输入有效的邮箱地址'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        allRoles: [],
        userForm: {
          roleids: [],
          loginname: '',
          password: '',
          repassword: '',
          phoneno: '',
          name: '',
          locationid: '',
          locationname: '',
          email: '',
          address: ''
        },
        rules: {
          roleids: [{ required: true, message: '请选择角色', trigger: 'change' }],
          phoneno: [{
            required: true,
            trigger: 'blur',
            validator: validateCellphone
          }],
          loginname: [{
            required: true,
            trigger: 'change',
            validator: validateName
          }],
          password: [{
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }],
          repassword: [{
            required: true,
            validator: validateRepass,
            trigger: 'blur'
          }],
          name: [{
            required: true,
            trigger: 'change',
            validator: validateName
          }],
          locationname: [{
            required: true,
            message: '请选择归属区域',
            trigger: 'change'
          }],
          email: [{
            required: false,
            validator: validateMail,
            trigger: 'blur'
          }],
          address: [{
            required: false,
            message: '请输入地址',
            trigger: 'blur'
          }]
        },
        regionDialogVisible: false,
        locationInfo: {},
        pwdInfo: {}
      }
    },
    components: {
      LocationSelector,
      PasswordStrength
    },
    mounted () {
      this.getRoleList()
    },
    methods: {
      getLocationInfo(data) {
        this.locationInfo = data
      },
      confirmSelectedRegion() {
        this.userForm.locationid = this.locationInfo.id
        this.userForm.locationname = this.locationInfo.label
        this.regionDialogVisible = false
        this.locationInfo = {}
      },
      getPwdInfo(data) {
        this.pwdInfo = data
      },
      getRoleList() {
        // 角色应该不会超过100个吧！
        getAllRoles('1', '100').then(response => {
          if (response.status === 200) {
            this.allRoles = response.data.list
            // debugger
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      onSubmit() {
        this.$refs.userForm.validate(valid => {
          if (valid) {
            var params = {
              'loginname': `${this.userForm.loginname}`,
              'password': encryptPassword(this.userForm.password),
              'name': `${this.userForm.name}`,
              'phoneno': `${this.userForm.phoneno}`,
              'unitid': '',
              'locationid': `${this.userForm.locationid}`,
              'roleids': `${this.userForm.roleids.join(',')}`,
              'email': `${this.userForm.email}`,
              'address': `${this.userForm.address}`
            }
            addBusinessUser(params).then(response => {
              if (response.status === 200) {
                this.$message.success('新增人员成功')
                this.$router.push({
                  path: '/user/blist'
                })
              } else {
                this.$message.error(response.msg)
              }
            }).catch(error => {
              this.$message.error(error.msg)
            })
          } else {
            this.$message.error('填写内容不规范，提交失败！')
          }
        })
      },
      onCancel() {
        this.$router.push({
          path: '/user/blist'
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
