<template>
  <div>
    <h3 style="padding-left: 20px;">角色查询条件</h3>
    <el-form ref="searchForm" :model="searchForm" label-width="100px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="角色名称：">
            <el-input v-model="searchForm.rolename" style="width: 300px;"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="10">
          <el-form-item label="系统角色：">
            <el-select v-model="searchForm.issystem" clearable placeholder="请选择" style="width: 300px;">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>  
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="角色类型：">
            <el-select v-model="searchForm.roletype" clearable placeholder="请选择" style="width: 300px;">
              <el-option label="系统管理" value="1"></el-option>
              <el-option label="商家" value="2"></el-option>
            </el-select>
          </el-form-item>  
        </el-col>
        <el-col :span="10">
          <el-form-item label="隐藏角色：">
            <el-select v-model="searchForm.ishidden" clearable placeholder="请选择" style="width: 300px;">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>  
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="16">
          <el-button type="primary" @click.native.prevent="queryRoleList">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click.native.prevent="addRole">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <h3 style="padding-left: 20px;">角色列表</h3>
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="padding-left:10px">
      <el-table-column label='角色名称' prop="rolename" width="110" align="center">
      </el-table-column>
      <el-table-column label="系统角色" prop="issystem" :formatter="transformIsSystem" width="150" align="center">
      </el-table-column>
      <el-table-column label="隐藏角色" prop="ishidden" :formatter="transformIsHidden" width="110" align="center">
      </el-table-column>
      <el-table-column label="角色类型" prop="roletype" :formatter="transformRoleType" width="110" align="center">
      </el-table-column>
      <el-table-column label="角色描述" prop="description" width="200" align="center">
      </el-table-column>
      <el-table-column label="操作" width="190" align="center">
      <template slot-scope="scope">
        <el-button @click="detail(scope.row)" type="text" size="small">详细</el-button>
        <el-button @click="updateRole(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="deleteRole(scope.row)" type="text" size="small">删除</el-button>
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
import { getAllRoles, getRoleList, deleteRole } from '@/api/role'

export default {
  data() {
    return {
      list: [],
      searchForm: {
        rolename: '',
        issystem: '',
        roletype: '',
        ishidden: ''
      },
      pagesizes: [10, 20, 30, 50],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      loading: true
    }
  },
  created() {
    this.initRoleList()
  },
  methods: {
    queryRoleList() {
      this.loading = true
      getRoleList(this.searchForm, this.currentPage, this.pagesize).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    addRole() {
      this.$router.push({ path: '/account/role/add' })
    },
    initRoleList() {
      this.loading = true
      getAllRoles(this.currentPage, this.pagesize).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    updateRole(role) {
      this.$router.push({ path: '/account/role/update', query: { id: role.id }})
    },
    deleteRole(role) {
      this.$confirm(`您确定删除名称为[${role.rolename}]的角色吗, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(role.id).then(response => {
          // 页面删除处理
          var index = this.list.indexOf(role)
          if (index > -1) {
            this.list.splice(index, 1)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '删除失败'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    detail(role) {
      this.$router.push({ path: '/account/role/detail', query: { id: role.id }})
    },
    resetForm(formname) {
      // this.$refs[formname].resetFields()
      this.searchForm.rolename = ''
      this.searchForm.issystem = ''
      this.searchForm.roletype = ''
      this.searchForm.ishidden = ''
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.queryRoleList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryRoleList()
    },
    transformIsSystem(row, column, cellValue) {
      if (cellValue === '1') {
        return '是'
      } else {
        return '否'
      }
    },
    transformIsHidden(row, column, cellValue) {
      if (cellValue === '1') {
        return '是'
      } else {
        return '否'
      }
    },
    transformRoleType(row, column, cellValue) {
      if (cellValue === '1') {
        return '系统管理'
      } else if (cellValue === '2') {
        return '商家'
      } else {
        return '未知'
      }
    }
  }
}
</script>