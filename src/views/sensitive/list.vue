<template>
  <div style="padding-left: 20px;">
    <h4>关键词查询条件</h4>
    <el-form ref="searchForm" :model="searchForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="关键词：">
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
    <br/>
    <div class="list">关键词列表</div>
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="width:100%">
      <el-table-column label='关键词' prop="sensitiveWord" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="deleteSensitive(scope.row)" type="text" size="small">删除</el-button>
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
    getAllSensitives,
    getSensitiveList,
    deleteSensitive
  } from '@/api/sensitive'

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
        getSensitiveList(this.searchForm.keyword, this.currentPage, this.pagesize).then(response => {
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
      addSensitive() {
        this.$router.push({
          path: '/system/sensitive/add'
        })
      },
      initSensitiveList() {
        this.loading = true
        getAllSensitives(this.currentPage, this.pagesize).then(response => {
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
      deleteSensitive(sensitive) {
        this.$confirm(`您确定删除吗, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSensitive(sensitive.id).then(response => {
            if (response.status === 200) {
              this.$message.success('删除成功!')
              this.querySensitiveList()
            } else {
              this.$message.error(response.msg)
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除')
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
