<template>
  <div style="padding-left: 20px;">
    <h4>接入方查询条件</h4>
    <el-form ref="searchForm" :model="searchForm" label-width="100px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="接入码：">
            <el-input v-model="searchForm.code" clearable style="width: 300px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="接入名称：">
            <el-input v-model="searchForm.si_name" clearable style="width: 300px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="13">
          <el-button type="primary" @click.native.prevent="queryAccessList">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click.native.prevent="addAccess">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <br/>
    <div class="list">接入方列表</div>    
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="width:100%">
      <el-table-column label='接入码' prop="code" align="center"></el-table-column>
      <el-table-column label="接入方名称" prop="si_name" align="center"></el-table-column>
      <el-table-column label="接入类别" prop="si_type" :formatter="typeFormat"align="center"></el-table-column>
      <el-table-column label="开始时间" prop="begin_time" align="center"></el-table-column>
      <el-table-column label="到期时间" prop="end_time" align="center"></el-table-column>
      <el-table-column label="联系人" prop="si_person" align="center"></el-table-column>
      <el-table-column label="联系电话" prop="si_phone" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small">详细</el-button>
          <el-button @click="updateAccess(scope.row)" type="text" size="small">修改</el-button>
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
    getAllAccesss,
    getAccessList
  } from '@/api/access'

  export default {
    data() {
      return {
        list: [],
        searchForm: {
          code: '',
          si_name: ''
        },
        pagesizes: [10, 20, 30, 50],
        pagesize: 10,
        currentPage: 1,
        total: 0,
        loading: true
      }
    },
    created() {
      this.initAccessList()
    },
    methods: {
      queryAccessList() {
        this.loading = true
        getAccessList(this.searchForm, this.currentPage, this.pagesize).then(response => {
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
      addAccess() {
        this.$router.push({
          path: '/system/access/add'
        })
      },
      initAccessList() {
        this.loading = true
        getAllAccesss(this.currentPage, this.pagesize).then(response => {
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
      updateAccess(access) {
        this.$router.push({
          path: '/system/access/update',
          query: {
            id: access.id
          }
        })
      },
      detail(access) {
        this.$router.push({
          path: '/system/access/detail',
          query: {
            id: access.id
          }
        })
      },
      resetForm(formname) {
        this.searchForm.code = ''
        this.searchForm.si_name = ''
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.queryAccessList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.queryAccessList()
      },
      typeFormat(row, column, cellValue) {
        if (cellValue === '1') {
          return '渠道门户'
        } else if (cellValue === '2') {
          return '业务平台'
        } else {
          return '未知'
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

