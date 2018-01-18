<template>
  <div>
    <el-form ref="searchForm" :model="searchForm" label-width="120px">
      <div>
        <label>账号：</label>
        <el-input name="loginname" type="text" style="width:20%" v-model="searchForm.loginname" autoComplete="on"/>
        <label>手机号码：</label>
        <el-input name="phoneno" type="text" style="width:20%" v-model="searchForm.phoneno" autoComplete="on"/>
      </div>
      <div>
        <label>姓名：</label>
        <el-input name="name" type="text" style="width:20%" v-model="searchForm.name" autoComplete="on"/>
        <label>归属区域：</label>
        <el-input name="locationid" type="text" style="width:20%" v-model="searchForm.locationid" autoComplete="on"/>
      </div>
      <div align="right">
        <el-button type="primary" @click.native.prevent="queryUserList">
          查询
        </el-button>
        <el-button type="primary" @click.native.prevent="addUser">
          新增
        </el-button>
      </div>
    </el-form>
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label='账号' prop="loginname" width="110">
      </el-table-column>
      <el-table-column label="姓名" prop="name" width="150">
      </el-table-column>
      <el-table-column label="手机号码" prop="phoneno" width="110" align="center">
      </el-table-column>
      <el-table-column label="角色" prop="role" :formatter="joinRoleName" width="110" align="center">
      </el-table-column>
      <el-table-column label="归属区域" prop="locationname" width="200" align="center">
      </el-table-column>
      <el-table-column prop="unitname" align="center" label="所属单位" width="200">
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
      <template slot-scope="scope">
        <el-button @click="updateUser(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="resetPassword(scope.row)" type="text" size="small">重置密码</el-button>
        <el-button @click="detail(scope.row)" type="text" size="small">详细</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="block" align="right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="213">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllUsers, getUserList, resetUserPassword } from '@/api/user'

export default {
  data() {
    return {
      list: [],
      searchForm: {
        loginname: '',
        phoneno: '',
        name: '',
        locationid: ''
      },
      currentPage: 4
    }
  },
  created() {
    this.initUserList()
  },
  methods: {
    queryUserList() {
      getUserList(this.searchForm).then(response => {
        this.list = response.data.list
      })
    },
    addUser() {
      this.$router.push({ path: '/user/add' })
    },
    initUserList() {
      getAllUsers().then(response => {
        this.list = response.data.list
      })
    },
    joinRoleName(row, column, cellValue) {
      var arrRoleNames = []
      if (arrRoleNames === undefined) {
        return ''
      }
      row[column.property].forEach(function(v) {
        arrRoleNames.push(v.rolename)
      })
      return arrRoleNames.join()
    },
    updateUser(user) {
      this.$router.push({ path: '/user/update', query: { id: user.id }})
    },
    resetPassword(user) {
      this.$confirm(`您确定重置[${user.loginname}]的密码吗, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetUserPassword(user)
        this.$message({
          type: 'success',
          message: '重置成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    },
    detail(user) {
      this.$router.push({ path: '/user/detail', query: { id: user.id }})
    },
    handleSizeChange(val) {
      return
    },
    handleCurrentChange(val) {
      return
    }
  }
}
</script>