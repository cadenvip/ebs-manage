<template>
  <div>
    <h3 style="padding-left: 20px;">人员查询条件</h3>
    <el-form ref="searchForm" :model="searchForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="10">
          <el-form-item label="账号：">
            <el-input v-model="searchForm.loginname" clearable style="width: 300px;"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="10">
          <el-form-item label="手机号码：">
            <el-input v-model="searchForm.phoneno" clearable style="width: 300px;"></el-input>
          </el-form-item>  
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="姓名：">
            <el-input v-model="searchForm.name" clearable style="width: 300px;"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="10">
          <el-form-item label="归属区域：">
            <el-input v-model="searchForm.locationname" clearable style="width: 300px;" @focus="handleLocationFocus"></el-input>
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
    <el-dialog
      title="请选择区域"
      :visible.sync="dialogVisible"
      width="440px"
      :before-close="handleClose">
      <locationselector @locationSelected="getLocationInfo"></locationselector>
    </el-dialog>
    <h3 style="padding-left: 20px;">人员列表</h3>
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="padding-left:10px">
      <el-table-column label='账号' prop="loginname" width="110" align="center">
      </el-table-column>
      <el-table-column label="姓名" prop="name" width="150" align="center">
      </el-table-column>
      <el-table-column label="手机号码" prop="phoneno" width="110" align="center">
      </el-table-column>
      <el-table-column label="角色" prop="role" :formatter="joinRoleName" width="110" align="center">
      </el-table-column>
      <el-table-column label="归属区域" prop="locationname" width="200" align="center">
      </el-table-column>
      <el-table-column label="所属单位" prop="unitname" width="200" align="center">
      </el-table-column>
      <el-table-column label="操作" width="190" align="center">
      <template slot-scope="scope">
        <el-button @click="updateUser(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="resetPassword(scope.row)" type="text" size="small">重置密码</el-button>
        <el-button @click="detail(scope.row)" type="text" size="small">详细</el-button>
      </template>
      </el-table-column>
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
  </div>
</template>

<script>
import { getAllUsers, getUserList, resetUserPassword } from '@/api/user'
import locationselector from '@/components/LocationSelector/index'

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
      getUserList(this.searchForm, this.currentPage, this.pagesize).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    addUser() {
      this.$router.push({ path: '/system/user/add' })
    },
    initUserList() {
      this.loading = true
      getAllUsers(this.currentPage, this.pagesize).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    joinRoleName(row, column, cellValue) {
      var arrRoleNames = []
      if (cellValue === undefined) {
        return ''
      }
      cellValue.forEach(function(v) {
        arrRoleNames.push(v.rolename)
      })
      return arrRoleNames.join()
    },
    updateUser(user) {
      this.$router.push({ path: '/system/user/update', query: { id: user.id }})
    },
    resetPassword(user) {
      this.$confirm(`您确定重置[${user.loginname}]的密码吗, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetUserPassword(user).then(response => {
          this.$message({ type: 'success', message: '重置成功!' })
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消重置' })
      })
    },
    detail(user) {
      this.$router.push({ path: '/system/user/detail', query: { id: user.id }})
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.queryUserList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryUserList()
    },
    getLocationInfo: function(data) {
      this.searchForm.locationid = data.id
      this.searchForm.locationname = data.label
    },
    handleClose(done) {
      // this.$confirm('确认关闭？').then(_ => {
      done()
      // }).catch(_ => {})
    },
    handleLocationFocus() {
      this.dialogVisible = true
      this.searchForm.locationid = ''
      this.searchForm.locationname = ''
    }
  }
}
</script>