<template>
  <div class="app-container">
    <h4 class="title">新增人员</h4>
    <el-form ref="userForm" :model="userForm" :rules="rules" label-width="120px">
      <!-- <el-form-item label="账号类型：" prop="roletype">
        <el-select v-model="userForm.roletype" @change="roletypeChanged">
          <el-option label="移动人员" value="1"></el-option>
          <el-option label="商家人员" value="3"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item v-show="userForm.roletype === '2' || userForm.roletype === '3'" label="商家：" prop="unitname">
        <el-input v-model="userForm.unitname" style="width: 220px;" placeholder="请选择商家" @focus="unitDialogVisible = true"></el-input>
      </el-form-item> -->
      <el-form-item label="角色：" prop="roleids">
        <el-checkbox-group v-model="userForm.roleids">
          <el-checkbox v-for="(item, index) in allRoles" v-if="item.roletype === userForm.roletype && item.ishidden !== '1'" :key="item.id" :label="item.id">{{item.rolename}}</el-checkbox>
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
      <div style="text-align: center;font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #f30">
        <span>
          温馨提示：请避免设置与其他系统相同的密码
        </span>
      </div>
      <br/>
      <div style="width:1000px;">
        <h5>运营的商家</h5>
        <el-button type="primary" @click="selectBusiness">选择商家</el-button>
        <el-table :data="selectedList" border stripe fit highlight-current-row style="width:100%;margin-top:10px" align="center">
          <el-table-column label='商家名称' prop="businessesName" align="center"></el-table-column></el-table-column>
          <el-table-column label="区域" prop="locationName" align="center"></el-table-column>
          <el-table-column label="企业状态" prop="state" :formatter="stateFormat" align="center"></el-table-column>
          <el-table-column label="商家类型" prop="businessType" :formatter="businessTypeFormat" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="deleteBusiness(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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

    <el-dialog title="请选择商家" :visible.sync="unitDialogVisible" width="770px">
      <el-form ref="businessSearchForm" :model="businessSearchForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="商家名称: ">
              <el-input v-model="businessSearchForm.businessesName" style="width: 220px;" placeholder="请输入商家名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button @click="queryBusinessesList()" type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <br/>
      <el-table :data="businessList" ref="businessTable" tooltip-effect="dark" @selection-change="businessSelectionChange" border highlight-current-row style="width:100%">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label='商家名称' prop="businessesName" align="center"></el-table-column></el-table-column>
        <el-table-column label="区域" prop="locationName" align="center"></el-table-column>
        <el-table-column label="企业状态" prop="state" :formatter="stateFormat" align="center"></el-table-column>
        <el-table-column label="商家类型" prop="businessType" :formatter="businessTypeFormat" align="center"></el-table-column>
      </el-table>
      <div class="block" align="right" style="padding-right:20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
          :current-page="currentPage" :page-sizes="pagesizes" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
      <br/>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="unitDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelected">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
  import {
    addProxyUser
  } from '@/api/user'
  import {
    getAllRoles
  } from '@/api/role'
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
  import {
    getBusinessesList
  } from '@/api/businesses'

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
          roletype: '3',
          roleids: [],
          loginname: '',
          password: '',
          repassword: '',
          phoneno: '',
          name: '',
          locationid: '',
          locationname: '',
          unitname: '',
          // unitidList: [],
          email: '',
          address: ''
        },
        rules: {
          // roletype: [{
          //   required: true,
          //   message: '请选择类型',
          //   trigger: 'change'
          // }],
          roleids: [{
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }],
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
          // unitname: [{ required: true, message: '请选择商家', trigger: 'blur' }],
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
        locationInfo: {},
        regionDialogVisible: false,
        businessSearchForm: {
          businessesName: '',
          state: '',
          createsource: '',
          locationCode: ''
        },
        businessList: [],
        // preSelectedBusiness: [],
        selectedList: [],
        pagesizes: [10, 20, 30, 50],
        pagesize: 10,
        currentPage: 1,
        total: 0,
        unitDialogVisible: false,
        pwdInfo: {}
      }
    },
    components: {
      LocationSelector,
      PasswordStrength
    },
    mounted() {
      this.getRoleList()
      this.queryBusinessesList()
    },
    methods: {
      getLocationInfo(data) {
        this.locationInfo = data
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
      queryBusinessesList() {
        this.loading = true
        getBusinessesList(this.businessSearchForm, this.currentPage, this.pagesize).then(response => {
          if (response.status === 200) {
            this.businessList = response.data.list
            this.total = response.data.total
          } else {
            this.$message.error(response.msg)
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.error(error.msg)
        })
      },
      // roletypeChanged() {
      //   this.userForm.roleids = []
      // },
      handleSizeChange(val) {
        this.pagesize = val
        this.queryBusinessesList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.queryBusinessesList()
      },
      businessSelectionChange(val) {
        // this.preSelectedBusiness = val
        this.selectedList = val
      },
      confirmSelectedRegion() {
        this.userForm.locationid = this.locationInfo.id
        this.userForm.locationname = this.locationInfo.label
        this.regionDialogVisible = false
        this.locationInfo = {}
      },
      deleteBusiness(business) {
        var index = this.selectedList.indexOf(business)
        if (index > -1) {
          this.selectedList.splice(index, 1)
        }
      },
      selectBusiness() {
        this.unitDialogVisible = true
      },
      // confirmSelected() {
      //   this.userForm.unitid = this.preSelectedBusiness.id
      //   this.userForm.unitname = this.preSelectedBusiness.businessesName
      //   this.unitDialogVisible = false
      //   this.preSelectedBusiness = []
      // },
      stateFormat(row, column, cellValue) {
        var state = ''
        switch (cellValue) {
          case '0':
            state = '企业待审核'
            break
          case '1':
            state = '正常'
            break
          case '2':
            state = '驳回'
            break
          case '3':
            state = '暂停'
            break
            // case '4':
            //   state = '过期'
            //   break
            // case '5':
            //   state = '网店待审核'
            //   break
            // case '6':
            //   state = '待付款'
            //   break
          default:
            break
        }
        return state
      },
      businessTypeFormat(row, column, cellValue) {
        var businessType = ''
        if (cellValue !== null) {
          switch (cellValue) {
            case '1':
              businessType = '合作商家'
              break
            default:
              break
          }
        }
        return businessType
      },
      onSubmit() {
        this.$refs.userForm.validate(valid => {
          if (valid) {
            var unitidList = []
            this.selectedList.forEach(item => {
              unitidList.push(item.id)
            })
            var params = {
              'loginname': `${this.userForm.loginname}`,
              'password': encryptPassword(this.userForm.password),
              'name': `${this.userForm.name}`,
              'phoneno': `${this.userForm.phoneno}`,
              'unitidList': unitidList,
              'locationid': `${this.userForm.locationid}`,
              'email': `${this.userForm.email}`,
              'address': `${this.userForm.address}`,
              'roleids': `${this.userForm.roleids.join(',')}`
            }
            addProxyUser(params).then(response => {
              if (response.status === 200) {
                this.$message.success('新增代运营人员成功！')
                this.$router.push({
                  path: '/system/user/plist'
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
          path: '/system/user/plist'
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
