<template>
  <div class="app-container">
    <h4 class="title">修改人员信息</h4>
    <el-form ref="userForm" :model="userForm" :rules="rules" label-width="120px">
      <el-form-item label="账号类型：" prop="roletype">
        <el-select v-model="userForm.roletype" disabled>
          <el-option label="移动人员" value="1"></el-option>
          <el-option label="商家人员" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色：" prop="roleids">
        <el-checkbox-group v-model="userForm.roleids">
          <el-checkbox v-for="(item, index) in allRoles" v-if="item.roletype === userForm.roletype && item.ishidden !== '1'" :key="item.id" :label="item.id">{{item.rolename}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="账号：" prop="loginname">
        <el-input v-model="userForm.loginname" :maxlength=16 style="width: 220px;" placeholder="请输入账号" disabled></el-input>
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
  </div>
</template>

<script>
  import {
    getUserDetail,
    updateUser
  } from '@/api/user'
  import {
    validateCMMobilePhone,
    containSymbol,
    validateEmail
  } from '@/utils/validate'
  import PasswordStrength from '@/components/PasswordStrength/index'
  import {
    getAllRoles
  } from '@/api/role'

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
          } else {
            callback()
          }
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
          roletype: '',
          roleids: [],
          loginname: '',
          phoneno: '',
          password: '',
          repassword: '',
          name: '',
          locationname: '',
          unitname: '',
          email: '',
          address: ''
        },
        rules: {
          loginname: [{
            required: true,
            trigger: 'change',
            validator: validateName
          }],
          roleids: [{
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }],
          name: [{
            required: true,
            trigger: 'change',
            validator: validateName
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
        pwdInfo: {},
        pwdBack: ''
      }
    },
    components: {
      PasswordStrength
    },
    created() {
      this.getUserInfo()
      this.getRoleList()
    },
    methods: {
      getUserInfo() {
        getUserDetail(this.$route.query.id).then(response => {
          if (response.status === 200) {
            this.userForm = response.data
            this.userForm.repassword = this.userForm.password
            this.pwdBack = response.data.password
            this.userForm.roleids = response.data.roleIds
            if (response.data.role.length > 0) {
              this.userForm.roletype = response.data.role[0].roletype
            }
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      getPwdInfo(data) {
        this.pwdInfo = data
      },
      getRoleList() {
        // 角色应该不会超过100个吧！
        getAllRoles('1', '100').then(response => {
          if (response.status === 200) {
            this.allRoles = response.data.list
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
              'id': `${this.userForm.id}`,
              'name': `${this.userForm.name}`,
              'phoneno': `${this.userForm.phoneno}`,
              'email': `${this.userForm.email !== null ? this.userForm.email : ''}`,
              'address': `${this.userForm.address !== null ? this.userForm.address : ''}`,
              'roleids': `${this.userForm.roleids.join(',')}`
            }
            updateUser(params).then(response => {
              if (response.status === 200) {
                this.$message.success('修改人员成功！')
                this.$router.push({
                  path: '/system/user/alist'
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
          path: '/system/user/alist'
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
