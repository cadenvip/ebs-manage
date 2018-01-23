<template>
  <div>
    <h3 style="padding-left: 20px;">角色查询条件</h3>
    <el-form ref="searchForm" :model="searchForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="10">
          <el-form-item label="角色名称：">
            <el-input v-model="searchForm.rolename" style="width: 300px;"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="10">
          <el-form-item label="系统角色：">
            <el-input v-model="searchForm.issystem" style="width: 300px;"></el-input>
          </el-form-item>  
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="角色类型：">
            <el-input v-model="searchForm.roletype" style="width: 300px;"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="10">
          <el-form-item label="隐藏角色：">
            <el-input v-model="searchForm.ishidden" style="width: 300px;"></el-input>
          </el-form-item>  
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="16">
          <el-button type="primary" @click.native.prevent="queryRoleList">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click.native.prevent="resetForm">重置</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click.native.prevent="addRole">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <h3 style="padding-left: 20px;">角色列表</h3>
    <el-table :data="list" border stripe fit highlight-current-row style="padding-left:10px">
      <el-table-column label='角色名称' prop="rolename" width="110">
      </el-table-column>
      <el-table-column label="系统角色" prop="issystem" width="150">
      </el-table-column>
      <el-table-column label="隐藏角色" prop="ishidden" width="110" align="center">
      </el-table-column>
      <el-table-column label="角色类型" prop="roletype" width="110" align="center">
      </el-table-column>
      <el-table-column label="角色描述" prop="description" width="200" align="center">
      </el-table-column>
      <el-table-column align="center" label="操作" width="190">
      <template slot-scope="scope">
        <el-button @click="detail(scope.row)" type="text" size="small">详细</el-button>
        <el-button @click="updateRole(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="delete(scope.row)" type="text" size="small">删除</el-button>
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
      total: 0
    }
  },
  created() {
    this.initRoleList()
  },
  methods: {
    queryRoleList() {
      getRoleList(this.searchForm).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.pagesize = response.data.pagesize
        this.current = response.data.pages
      })
    },
    addRole() {
      this.$router.push({ path: '/account/role/add' })
    },
    initRoleList() {
      getAllRoles().then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.pagesize = response.data.pagesize
        this.current = response.data.pages
      })
    },
    updateRole(role) {
      this.$router.push({ path: '/account/role/update', query: { id: role.id }})
    },
    delete(role) {
      this.$confirm(`您确定删除名称为[${role.rolename}]的角色吗, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(role)
        this.$message({
          type: 'success',
          message: '删除成功!'
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
    resetForm() {
      this.$refs[this.searchForm].resetFields()
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