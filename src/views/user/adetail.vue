<template>
  <div class="app-container">
    <h4 class="title">人员信息详情</h4>
    <div style="color: #606266;font-size:14px;width:960px;overflow:auto;border:#E6E6E6 solid 1px;">
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
            {{ nameFormat }}
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
            {{ phonenoFormat }}
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
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;margin-bottom:20px">
        <el-col :span="4" style="text-align:right">
          <span>
            最近登录时间：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.logintime ? userForm.logintime : '&nbsp;' }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right" v-if="roletypes === '商家人员'">
          <span>
            商家：
          </span>
        </el-col>
        <el-col :span="8" v-if="roletypes === '商家人员'">
          <span>
            {{ userForm.unitname }}
          </span>
        </el-col>
      </el-row>
    </div>
    <br/>
    <div style="text-align: center">
      <el-button type="primary" @click="onCancel">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {
    getUserDetail
  } from '@/api/user'
  import {
    phoneCutSensitive,
    nameCutSensitive
  } from '@/utils/index'

  export default {
    data() {
      return {
        roletypes: '',
        userForm: {},
        rolenames: ''
      }
    },
    created() {
      this.getUserForm()
    },
    computed: {
      phonenoFormat: function() {
        return phoneCutSensitive(this.userForm.phoneno)
      },
      nameFormat: function() {
        return nameCutSensitive(this.userForm.name)
      }
    },
    methods: {
      setRoles(roles) {
        var arrRoleNames = []
        if (roles.length > 0) {
          switch (roles[0].roletype) {
            case '1':
              this.roletypes = '移动人员'
              break
            case '2':
              this.roletypes = '商家人员'
              break
            case '3':
              this.roletypes = '商家人员'
              break
            default:
              break
          }
        }
        for (var i = 0; i < roles.length; i++) {
          arrRoleNames.push(roles[i].rolename)
        }
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
          this.$message.error(error.msg)
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
