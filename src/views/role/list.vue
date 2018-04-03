<template>
  <div style="padding-left: 20px;">
    <h4>角色查询条件</h4>
    <el-form ref="searchForm" :model="searchForm" label-width="120px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="角色名称：">
            <el-input v-model="searchForm.rolename" clearable style="width: 300px;" placeholder="请输入角色名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="是否系统角色：">
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
            <el-select v-model="searchForm.roletype" clearable placeholder="请选择角色类型" style="width: 300px;">
              <el-option label="管理角色" value="1"></el-option>
              <el-option label="商家角色" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="是否隐藏角色：">
            <el-select v-model="searchForm.ishidden" clearable placeholder="请选择" style="width: 300px;">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="14">
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
    <br/>
    <div class="list">角色列表</div>    
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="width:100%">
      <el-table-column label='角色名称' prop="rolename" align="center">
      </el-table-column>
      <el-table-column label="系统角色" prop="issystem" :formatter="transformIsSystem" align="center">
      </el-table-column>
      <el-table-column label="隐藏角色" prop="ishidden" :formatter="transformIsHidden" align="center">
      </el-table-column>
      <el-table-column label="角色类型" prop="roletype" :formatter="transformRoleType" align="center">
      </el-table-column>
      <el-table-column label="角色描述" prop="description" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small">详细</el-button>
          <el-button @click="updateRole(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteRole(scope.row)" type="text" size="small">删除</el-button>
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
    getAllRoles,
    getRoleList,
    deleteRole
  } from '@/api/role'

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
      addRole() {
        this.$router.push({
          path: '/system/role/add'
        })
      },
      initRoleList() {
        this.loading = true
        getAllRoles(this.currentPage, this.pagesize).then(response => {
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
      updateRole(role) {
        this.$router.push({
          path: '/system/role/update',
          query: {
            id: role.id
          }
        })
      },
      deleteRole(role) {
        this.$confirm(`您确定删除名称为[${role.rolename}]的角色吗, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRole(role.id).then(response => {
            if (response.status === 200) {
              // 页面删除处理
              var index = this.list.indexOf(role)
              if (index > -1) {
                this.list.splice(index, 1)
              }
              this.$message.success('删除成功!')
            } else {
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.$message.error('删除失败')
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
      detail(role) {
        this.$router.push({
          path: '/system/role/detail',
          query: {
            id: role.id
          }
        })
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
          return '管理角色'
        } else if (cellValue === '2' || cellValue === '3') {
          return '商家角色'
        } else {
          return ''
        }
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
