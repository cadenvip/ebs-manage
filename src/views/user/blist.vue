<template>
  <div style="padding-left: 20px;">
    <h4>人员查询条件</h4>
    <el-form ref="searchForm" :model="searchForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="10">
          <el-form-item label="账号：">
            <el-input v-model="searchForm.loginname" clearable style="width: 300px;" placeholder="请输入账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="手机号码：">
            <el-input v-model="searchForm.phoneno" clearable style="width: 300px;" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="姓名：">
            <el-input v-model="searchForm.name" clearable style="width: 300px;" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="归属区域：">
            <el-input v-model="searchForm.locationname" clearable style="width: 300px;" @focus="handleLocationFocus" placeholder="请选择归属区域"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="16">
          <el-button type="primary" @click.native.prevent="queryUserList">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click.native.prevent="addUser">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="请选择区域" :visible.sync="dialogVisible" width="440px">
      <locationselector @locationSelected="getLocationInfo"></locationselector>
    </el-dialog>
    <br/>
    <div class="list">人员列表</div>
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="width:100%">
      <el-table-column label='账号' prop="loginname" align="center"></el-table-column>
      <el-table-column label="姓名" prop="name" :formatter="nameFormat" align="center"></el-table-column>
      <el-table-column label="手机号码" prop="phoneno" :formatter="phonenoFormat" align="center"></el-table-column>
      <el-table-column label="归属区域" prop="locationname" align="center"></el-table-column>
      <el-table-column label="商家" prop="unitname" align="center"></el-table-column>
      <el-table-column label="状态" prop="locked" :formatter="lockedFormat" align="center"></el-table-column>
      <el-table-column label="最近登录时间" prop="logintime" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="updateUser(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="resetPassword(scope.row)" type="text" size="small">重置密码</el-button>
          <el-button @click="detail(scope.row)" type="text" size="small">详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" align="right" style="padding-right:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
        :current-page="currentPage" :page-sizes="pagesizes" :page-size="pagesize" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getBusinessAllUsers,
    getBusinessUserList,
    resetBusinessUserPassword
  } from '@/api/user'
  import locationselector from '@/components/LocationSelector/index'
  import {
    phoneCutSensitive,
    nameCutSensitive
  } from '@/utils/index'

  export default {
    data() {
      return {
        list: [],
        searchForm: {
          loginname: '',
          phoneno: '',
          name: '',
          locationid: '',
          locationname: ''
        },
        pagesizes: [10, 20, 30, 50],
        pagesize: 10,
        currentPage: 1,
        total: 0,
        loading: true,
        dialogVisible: false
      }
    },
    components: {
      locationselector
    },
    created() {
      this.initUserList()
    },
    methods: {
      queryUserList() {
        this.loading = true
        getBusinessUserList(this.searchForm, this.currentPage, this.pagesize).then(response => {
          if (response.status === 200) {
            this.list = response.data.list
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
      addUser() {
        this.$router.push({
          path: '/user/badd'
        })
      },
      initUserList() {
        this.loading = true
        getBusinessAllUsers(this.currentPage, this.pagesize).then(response => {
          if (response.status === 200) {
            this.list = response.data.list
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
      nameFormat(row, column, cellValue) {
        return nameCutSensitive(cellValue)
      },
      phonenoFormat(row, column, cellValue) {
        return phoneCutSensitive(cellValue)
      },
      lockedFormat(row, column, cellValue) {
        var lockStatus = ''
        if (cellValue !== undefined && cellValue !== null) {
          switch (cellValue) {
            case '0':
              lockStatus = '正常'
              break
            case '1':
              lockStatus = '锁定正常'
              break
            default:
              break
          }
        }
        return lockStatus
      },
      updateUser(user) {
        this.$router.push({
          path: '/user/bupdate',
          query: {
            id: user.id
          }
        })
      },
      resetPassword(user) {
        this.$confirm(`您确定重置[${user.loginname}]的密码吗, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetBusinessUserPassword(user).then(response => {
            if (response.status === 200) {
              this.$message.success('重置成功!')
            } else {
              this.$message.error(response.msg)
            }
          })
        }).catch(() => {
          this.$message.info('已取消重置')
        })
      },
      detail(user) {
        this.$router.push({
          path: '/user/bdetail',
          query: {
            id: user.id
          }
        })
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.queryUserList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.queryUserList()
      },
      getLocationInfo: function (data) {
        this.searchForm.locationid = data.id
        this.searchForm.locationname = data.label
      },
      handleLocationFocus() {
        this.dialogVisible = true
        this.searchForm.locationid = ''
        this.searchForm.locationname = ''
      }
    }
  }

</script>

<style scoped>
  .list{
    height: 30px;
    line-height: 30px;
    background: #6ebfec;
    font-size: 14px;
    color:#fff;
    padding-left: 20px;
    font-weight: bold;
  }
</style>
