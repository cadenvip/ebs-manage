<template>
  <div class="app-container">
    <h3 class="title">修改人员信息</h3>
    <el-form ref="userForm" :model="userForm" :rules="rules" label-width="120px">
      <el-form-item label="账号类型：" prop="roletype">
        <el-select v-model="userForm.roletype" disabled>
          <el-option label="移动人员" value="1"></el-option>
          <el-option label="商家人员" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色：" prop="roleids">
        <!-- <el-select v-model="userForm.roleids" multiple placeholder="请选择角色" style="width:320px">
          <el-option v-for="(item, index) in allRoles" v-show="item.roletype === userForm.roletype" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
        </el-select> -->
        <el-checkbox-group v-model="userForm.roleids">
          <el-checkbox v-for="(item, index) in allRoles" v-if="item.roletype === userForm.roletype" :key="item.id" :label="item.id">{{item.rolename}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="账号：" prop="loginname">
        <el-input v-model="userForm.loginname" :maxlength=11 style="width: 220px;" placeholder="请输入账号" disabled></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="手机号：" prop="phoneno">
            <el-input v-model="userForm.phoneno" :maxlength=11 style="width: 220px;" placeholder="请输入手机号" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">账号必须为11位中国移动手机号码</span>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="userForm.password" :minlength=8 style="width: 220px;" placeholder="请输入密码"></el-input>
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
            <el-input type="password" v-model="userForm.repassword" :minlength=8 style="width: 220px;" placeholder="请再次输入密码"></el-input>
          </el-form-item>         
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">请输入8-20位由英文大写、英文小写、数字、特殊字符中任意至少三种类型构成的密码信息</span>
        </el-col>  
      </el-row>       -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="userForm.name" style="width: 220px;" placeholder="请输入姓名"></el-input>
          </el-form-item>        
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">姓名必须为4-20位，可以是字母或中文</span>
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
            <el-input v-model="userForm.unitname" style="width: 220px;" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="邮件：" prop="email">
            <el-input v-model="userForm.email" style="width: 220px;" placeholder="请输入邮件"></el-input>
          </el-form-item>        
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">请输入有效电子邮箱地址，如：linux@139.com</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="地址：" prop="address">
            <el-input v-model="userForm.address" style="width: 220px;" placeholder="请输入地址"></el-input>
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

import { getUserDetail, updateUser } from '@/api/user'
import { validateEmail } from '@/utils/validate'
import PasswordStrength from '@/components/PasswordStrength/index'
import { getAllRoles } from '@/api/role'

export default {
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'))
    //   } else {
    //     if (this.userForm.password.length < 8) {
    //       callback(new Error('请密码长度不足8位'))
    //     } else if (this.pwdInfo.score < 4) {
    //       callback(new Error('请密码强度不够'))
    //     } else if (this.userForm.repassword !== '') {
    //       this.$refs.userForm.validateField('repassword')
    //       callback()
    //     }
    //   }
    // }
    // var validateRepass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入密码'))
    //   } else if (value !== this.userForm.password) {
    //     callback(new Error('两次输入密码不一致!'))
    //   } else {
    //     callback()
    //   }
    // }
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
        loginname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        // password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        // repassword: [{ required: true, validator: validateRepass, trigger: 'blur' }],
        roleids: [{ required: true, message: '请选择角色', trigger: 'change' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        locationname: [{ required: true, message: '请选择归属区域', trigger: 'blur' }],
        unitname: [{ required: true, message: '请选输入单位', trigger: 'blur' }],
        email: [{ required: false, validator: validateMail, trigger: 'blur' }],
        address: [{ required: false, message: '请输入地址', trigger: 'blur' }]
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
          console.log(this.userForm)
          debugger
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
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
        this.$message.error(error)
      })
    },
    onSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          var params = { 'id': `${this.userForm.id}`,
            // 'password': `${this.userForm.password}`,
            'name': `${this.userForm.name}`,
            'email': `${this.userForm.email !== null ? this.userForm.email : ''}`,
            'address': `${this.userForm.address !== null ? this.userForm.address : ''}`,
            // 'locationid': `${this.userForm.locationid}`,
            // 'loginname': `${this.userForm.loginname}`,
            // 'phoneno': `${this.userForm.phoneno}`
            'roleids': `${this.userForm.roleids.join(',')}`
          }
          console.log(params)
          updateUser(params).then(response => {
            if (response.status === 200) {
              this.$message.success('修改人员成功！')
              this.$router.push({ path: '/system/user/alist' })
            } else {
              this.$message.error(response.msg)
            }
          }).catch(error => {
            this.$message.error(error)
          })
        } else {
          this.$message.error('error submit!!')
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