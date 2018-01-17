<template>
  <div>
    <div>
      <label>账号：</label>
      <el-input name="loginname" type="text" style="width:20%" v-model="searchForm.account" autoComplete="on"/>
      <label>手机号码：</label>
      <el-input name="phoneno" type="text" style="width:20%" v-model="searchForm.phone" autoComplete="on"/>
    </div>
    <div>
      <label>姓名：</label>
      <el-input name="name" type="text" style="width:20%" v-model="searchForm.username" autoComplete="on"/>
      <label>归属区域：</label>
      <el-input name="locationname" type="text" style="width:20%" v-model="searchForm.region" autoComplete="on"/>
    </div>
    <div align="right">
      <el-button type="primary" @click.native.prevent="queryUserList">
        查询
      </el-button>
      <el-button type="primary" @click.native.prevent="addUser">
        新增
      </el-button>
    </div>
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column align="center" prop="loginname" label='账号' width="95">
      </el-table-column>
      <el-table-column label="姓名" prop="name">
      </el-table-column>
      <el-table-column label="手机号码" prop="phoneno" width="110" align="center">
      </el-table-column>
      <el-table-column label="角色" prop="role" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.role">{{scope.row.role[0].rolename}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="locationname" label="归属区域" width="110" align="center">
      </el-table-column>
      <el-table-column align="center" prop="unitname" label="所属单位" width="200">
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
      <template slot-scope="scope">
        <el-button @click="updateUser(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">重置密码</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">详细</el-button>
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
import { getUserList } from '@/api/user'

export default {
  name: 'login',
  data() {
    return {
      list: null,
      searchForm: {
        loginname: '',
        phoneno: '',
        name: '',
        locationname: ''
      },
      currentPage: 4
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getAllUsers()
  },
  methods: {
    queryUserList() {
      getUserList(this.searchForm).then(response => {
        this.list = response.data.items
      })
    },
    addUser() {
      this.$router.push({ path: '/user/add' })
    },
    getAllUsers() {
      getUserList().then(response => {
        this.list = response.data.list
      })
    },
    updateUser(user) {
      this.$store.dispatch('UpdateUser', user)
      this.$router.push({ path: '/user/update' })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>