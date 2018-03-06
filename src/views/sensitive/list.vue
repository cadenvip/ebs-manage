<template>
  <div>
    <h3 style="padding-left: 20px;">关键词查询条件</h3>
    <el-form ref="searchForm" :model="searchForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="关键词：" >
        <el-input v-model="searchForm.keyword" clearable style="width: 300px;"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="2" :offset="8">
          <el-button type="primary" @click.native.prevent="querySensitiveList">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click.native.prevent="addSensitive">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <h3 style="padding-left: 20px;">关键词列表</h3>
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="padding-left:10px">
      <el-table-column label='关键词' prop="sensitiveWord" width="600px" align="center">
      </el-table-column>
      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <el-button @click="deleteSensitive(scope.row)" type="text" size="small">删除</el-button>
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
import { getAllSensitives, getSensitiveList, deleteSensitive } from '@/api/sensitive'

export default {
  data() {
    return {
      list: [],
      searchForm: {
        keyword: ''
      },
      pagesizes: [10, 20, 30, 50],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      loading: true
    }
  },
  created() {
    this.initSensitiveList()
  },
  methods: {
    querySensitiveList() {
      this.loading = true
      console.log(this.searchForm.keyword, this.currentPage, this.pagesize)
      getSensitiveList(this.searchForm.keyword, this.currentPage, this.pagesize).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    addSensitive() {
      this.$router.push({ path: '/system/sensitive/add' })
    },
    initSensitiveList() {
      this.loading = true
      getAllSensitives(this.currentPage, this.pagesize).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    deleteSensitive(sensitive) {
      this.$confirm(`您确定删除吗, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSensitive(sensitive.id).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.querySensitiveList()
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    resetForm(formname) {
      this.searchForm.keyword = ''
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.querySensitiveList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.querySensitiveList()
    }
  }
}
</script>