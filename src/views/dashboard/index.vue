<template>
  <div class="app-container">
    <h3 class="title">修改个人信息</h3>
    <el-form ref="userForm" :model="userForm" :rules="userRules" label-width="120px">
      <el-form-item label="账号：" prop="loginname">
        <el-input v-model="userForm.loginname" :maxlength=16 style="width: 220px;" placeholder="请输入账号" disabled></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="手机号：" prop="phoneno">
            <el-input v-model="userForm.phoneno" :maxlength=11 style="width: 220px;" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">账号必须为11位中国移动手机号码</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="userForm.name" :maxlength=20 style="width: 220px;" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">姓名必须为4-20位，可以是字母或中文</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="归属区域：" prop="locationid">
            <el-input v-model="userForm.locationname" style="width: 220px;" placeholder="请选择地址" @focus="dialogVisible = true" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单位：" prop="unitname">
            <el-input v-model="userForm.unitname" :maxlength=16 style="width: 220px;" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="邮件：" prop="email">
            <el-input v-model="userForm.email" :maxlength=32 style="width: 220px;" placeholder="请输入邮件"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">请输入有效电子邮箱地址，如：linux@139.com</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="地址：" prop="address">
            <el-input v-model="userForm.address" :maxlength=32 style="width: 220px;" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <br/>
      <br/>
      <div style="text-align: center">
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
        <el-button type="primary" @click="modifyPwd">修改密码</el-button>
        <el-button type="primary" @click="onCancel">返 回</el-button>
      </div>
    </el-form>
    <el-dialog title="修改密码" :visible.sync="dialogVisible">
      <el-form ref="modifyPwdForm" :model="modifyPwdForm" :rules="modifyPwdRules" label-width="120px">
        <el-form-item label="原密码：" prop="opassword">
          <el-input type="password" v-model="modifyPwdForm.opassword" :minlength=8 :maxlength=20 style="width: 220px;" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="password">
          <el-input type="password" v-model="modifyPwdForm.password" :minlength=8 :maxlength=20 style="width: 220px;" placeholder="请输入新密码"></el-input>
          <PasswordStrength :password="modifyPwdForm.password" @pwdInfo="getPwdInfo"></PasswordStrength>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="repassword">
          <el-input type="password" v-model="modifyPwdForm.repassword" :minlength=8 :maxlength=20 style="width: 220px;" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center;font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #f30">
        <span>
          请输入8-20位由英文大写、英文小写、数字、特殊字符中任意至少三种类型构成的密码信息
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmModify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    updateUser,
    updateBusinessUser,
    modifyPassword
  } from '@/api/user'
  import {
    validateMobilePhone,
    validateEmail
  } from '@/utils/validate'
  import PasswordStrength from '@/components/PasswordStrength/index'
  import {
    encryptPassword
  } from '@/utils/index'
  import {
    getRoleType
  } from '@/utils/auth'
  export default {
    data() {
      var validateCellphone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else {
          if (!validateMobilePhone(value.trim())) {
            callback(new Error('请输入有效的手机号码'))
          }
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.modifyPwdForm.password.length < 8) {
            callback(new Error('请密码长度不足8位'))
          } else if (this.pwdInfo.score < 4) {
            callback(new Error('请密码强度不够'))
          } else if (this.modifyPwdForm.repassword !== '') {
            this.$refs.modifyPwdForm.validateField('repassword')
            callback()
          }
        }
      }
      var validateRepass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.modifyPwdForm.password) {
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
        userForm: {
          id: '',
          loginname: '',
          name: '',
          locationid: '',
          locationname: '',
          phoneno: '',
          unitid: '',
          unitname: '',
          email: '',
          address: ''
        },
        dialogVisible: false,
        userRules: {
          loginname: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          phoneno: [{
            required: true,
            trigger: 'blur',
            validator: validateCellphone
          }],
          locationname: [{
            required: true,
            message: '请选择归属区域',
            trigger: 'blur'
          }],
          unitname: [{
            required: true,
            message: '请选输入单位',
            trigger: 'blur'
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
        modifyPwdForm: {
          opassword: '',
          password: '',
          repassword: ''
        },
        modifyPwdRules: {
          opassword: [{
            required: true,
            message: '请输入原密码',
            trigger: 'blur'
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
          }]
        },
        pwdInfo: {}
      }
    },
    components: {
      PasswordStrength
    },
    created() {
      var userInfo = window.sessionStorage.getItem('userInfo')
      if (userInfo !== undefined && userInfo !== '') {
        userInfo = JSON.parse(userInfo)
        this.userForm = userInfo
      }
    },
    methods: {
      getPwdInfo(data) {
        this.pwdInfo = data
      },
      onSubmit() {
        if (this.userForm.name === undefined || this.userForm.name === null || this.userForm.name === '') {
          this.$message.error('请输入姓名！')
          return
        }
        var params = {
          'id': `${this.userForm.id}`,
          'loginname': this.userForm.loginname,
          'name': this.userForm.name,
          'locationid': this.userForm.locationid,
          'phoneno': this.userForm.phoneno,
          'unitid': this.userForm.unitid,
          'email': this.userForm.email !== null ? this.userForm.email : '',
          'address': this.userForm.address !== null ? this.userForm.address : ''
        }
        var roletype = getRoleType()
        debugger
        if (roletype !== '1') {
          // 商家
          updateBusinessUser(params).then(response => {
            if (response.status === 200) {
              this.$message.success('修改个人信息成功！')
            } else {
              this.$message.error(response.msg)
            }
          }).catch(error => {
            this.$message.error(error.msg)
          })
        } else {
          // 管理员
          updateUser(params).then(response => {
            if (response.status === 200) {
              this.$message.success('修改个人信息成功！')
            } else {
              this.$message.error(response.msg)
            }
          }).catch(error => {
            this.$message.error(error.msg)
          })
        }
      },
      modifyPwd() {
        this.dialogVisible = true
        this.modifyPwdForm.opassword = ''
        this.modifyPwdForm.password = ''
        this.modifyPwdForm.repassword = ''
      },
      confirmModify() {
        var params = {
          'userid': `${this.userForm.id}`,
          'oldPassword': encryptPassword(this.modifyPwdForm.opassword),
          'newPassword': encryptPassword(this.modifyPwdForm.password)
        }
        modifyPassword(params).then(response => {
          if (response.status === 200) {
            this.$message.success('修改密码成功！')
            this.dialogVisible = false
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      onCancel() {
        this.$router.go(-1)
      }
    }
  }

</script>

<style scoped>
  .line {
    text-align: center;
  }

</style>
