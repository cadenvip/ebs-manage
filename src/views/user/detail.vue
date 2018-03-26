<template>
  <div class="app-container">
    <h3 class="title">人员信息详情</h3>
    <div style="color: #606266;font-size:14px;width:960px;height:140px;overflow:auto;border:#E6E6E6 solid 1px;">
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
        <el-col :span="4" style="text-align:right">
          <span>
            账号：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.loginname }}
          </span> 
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            姓名：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.name }}
          </span> 
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            手机号码：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.loginname }}
          </span> 
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            账号类型：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ roletypes }}
          </span> 
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            归属区域：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.locationname }}
          </span> 
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            邮件：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.email }}
          </span> 
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            地址：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.address ? userForm.address : '&nbsp;' }}
          </span> 
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            角色：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ rolenames }}
          </span> 
        </el-col>
      </el-row>                                                   
    </div>
    <br/>
    <div style="text-align: center">
      <el-button @click="onCancel">返回</el-button>
    </div>
  </div>
</template>

<script>

import { getUserDetail } from '@/api/user'

export default {
  data() {
    return {
      roletypes: '',
      userForm: '',
      rolenames: ''
    }
  },
  created() {
    this.getUserForm()
  },
  methods: {
    setRoles(roles) {
      var arrRoleTypes = []
      var arrRoleNames = []
      for (var i = 0; i < roles.length; i++) {
        arrRoleNames.push(roles[i].rolename)
        switch (parseInt(roles[i].roletype)) {
          case 1:
            arrRoleTypes.push('系统管理')
            break
          case 2:
            arrRoleTypes.push('商务部')
            break
          case 3:
            arrRoleTypes.push('龙头企业')
            break
          case 4:
            arrRoleTypes.push('农家店')
            break
        }
      }
      this.roletypes = arrRoleTypes.join()
      this.rolenames = arrRoleNames.join()
    },
    getUserForm() {
      getUserDetail(this.$route.query.id).then(response => {
        if (response.status === 200) {
          this.userForm = response.data
          this.setRoles(this.userForm.role)
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
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