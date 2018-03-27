<template>
  <div class="app-container">
    <h3 class="title">新增人员</h3>
    <el-form ref="userForm" :model="userForm" :rules="rules" label-width="120px">
      <el-form-item label="账号类型：" prop="roletype">
        <el-select v-model="userForm.roletype">
          <el-option label="移动人员" value="1"></el-option>
          <el-option label="商家人员" value="2"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item v-show="item.roletype === '2'" label="商家：" prop="unitname">
        <el-input v-model="userForm.unitname" style="width: 220px;" placeholder="请选择商家" @focus="unitDialogVisible = true"></el-input>
      </el-form-item> -->
      <!-- 目前每个人仅一种角色 -->
      <el-form-item label="角色：" prop="roleids">
        <el-select v-model="userForm.roleids">
          <el-option v-for="(item, index) in roles" v-show="item.roletype === userForm.roletype" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="账号：" prop="loginname">
            <el-input v-model="userForm.loginname" :maxlength=11 style="width: 220px;" placeholder="请输入账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">账号必须为11位中国移动手机号码</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
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
      </el-row>      
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
            <el-input v-model="userForm.locationname" style="width: 220px;" placeholder="请输入地址" @focus="regionDialogVisible = true"></el-input>
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
    <el-dialog title="请选择区域" :visible.sync="regionDialogVisible" width="40%">
      <LocationSelector @locationSelected="getLocationInfo"></LocationSelector>
    </el-dialog>
    <!-- 
    <el-dialog title="请选择商家" :visible.sync="unitDialogVisible" width="770px">
      <el-form ref="businessSearchForm" :model="businessSearchForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6" :offset="6">
            <el-form-item label="商家名称">
              <el-input v-model="businessSearchForm.businessesName" style="width: 220px;" placeholder="请输入商家名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button @click="queryBusinessesList()" type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <br/>
      <el-table :data="businessList" ref="businessTable" tooltip-effect="dark" @selection-change="businessSelectionChange" highlight-current-row>
        <el-table-column label='商家名称' prop="businessesName" width="280" align="center"></el-table-column>
        <el-table-column label="商家类型" prop="validdate" :formatter="timedateFormat" width="110" align="center"></el-table-column>
      </el-table>
      <div class="block" align="right" style="padding-right:20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="currentPage"
          :page-sizes="pagesizes"
          :page-size="pagesize"
          :total="total">
        </el-pagination>
      </div>
      <br/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unitDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelected">确 定</el-button>
      </span>
    </el-dialog>
    -->
  </div>
</template>

<script>

import { addUser } from '@/api/user'
import { getAllRoles } from '@/api/role'
import LocationSelector from '@/components/LocationSelector/index'
import PasswordStrength from '@/components/PasswordStrength/index'
import { validateMobilePhone, validateEmail } from '@/utils/validate'
// import { getBusinessesList } from '@/api/businesses'

export default {
  data() {
    var validateLoginname = (rule, value, callback) => {
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
        if (this.userForm.password.length < 8) {
          callback(new Error('请密码长度不足8位'))
        } else if (this.pwdInfo.score < 4) {
          callback(new Error('请密码强度不够'))
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
      roles: [],
      userForm: {
        roletype: '1',
        roleids: '',
        loginname: '',
        password: '',
        repassword: '',
        name: '',
        locationid: '',
        locationname: '',
        // unitname: '',
        // unitid: '',
        email: '',
        address: ''
      },
      rules: {
        roletype: [{ required: true, message: '请选择类型', trigger: 'change' }],
        roleids: [{ required: true, message: '请选择角色', trigger: 'change' }],
        loginname: [{ required: true, trigger: 'blur', validator: validateLoginname }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        repassword: [{ required: true, validator: validateRepass, trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        locationname: [{ required: true, message: '请选择归属区域', trigger: 'blur' }],
        // unitname: [{ required: true, message: '请选择商家', trigger: 'blur' }],
        email: [{ required: false, validator: validateMail, trigger: 'blur' }],
        address: [{ required: false, message: '请输入地址', trigger: 'blur' }]
      },
      regionDialogVisible: false,
      // businessSearchForm: {
      //   businessesName: ''
      // },
      // businessList: [],
      // pagesizes: [10, 20, 30, 50],
      // pagesize: 10,
      // currentPage: 1,
      // total: 0,
      // unitDialogVisible: false,
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
      this.userForm.locationid = data.id
      this.userForm.locationname = data.label
    },
    getPwdInfo(data) {
      this.pwdInfo = data
    },
    getRoleList() {
      // 角色应该不会超过100个吧！
      getAllRoles('1', '100').then(response => {
        if (response.status === 200) {
          this.roles = response.data.list
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    // queryBusinessesList() {
    //   this.loading = true
    //   getBusinessesList(this.businessSearchForm, this.currentPage, this.pagesize).then(response => {
    //     if (response.status === 200) {
    //       this.businessList = response.data.list
    //       this.total = response.data.total
    //     } else {
    //       this.$message.error(response.msg)
    //     }
    //     this.loading = false
    //   }).catch(error => {
    //     this.loading = false
    //     this.$message.error(error)
    //   })
    // },
    // handleSizeChange(val) {
    //   this.pagesize = val
    //   this.queryBusinessesList()
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val
    //   this.queryBusinessesList()
    // },
    onSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          addUser(this.userForm).then(response => {
            if (response.status === 200) {
              this.$message.success('新增人员成功')
              this.$router.push({ path: '/system/user/list' })
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
      this.$router.push({ path: '/system/user/list' })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>