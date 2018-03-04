<template>
  <div>
    <h3 style="padding-left: 20px;">接入方查询条件</h3>
    <el-form ref="searchForm" :model="searchForm" label-width="100px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="接入码：">
            <el-input v-model="searchForm.code" style="width: 300px;"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="10">
          <el-form-item label="接入名称：">
            <el-input v-model="searchForm.si_name" style="width: 300px;"></el-input>
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
    <h3 style="padding-left: 20px;">接入方列表</h3>
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="padding-left:10px">
      <el-table-column label='接入码' prop="code" width="90" align="center"></el-table-column>
      <el-table-column label="接入方名称" prop="si_name" width="150" align="center"></el-table-column>
      <el-table-column label="接入类别" prop="si_type" :formatter="typeFormat" width="90" align="center"></el-table-column>
      <el-table-column label="开始时间" prop="begin_time" width="220" align="center"></el-table-column>
      <el-table-column label="到期时间" prop="end_time" width="220" align="center"></el-table-column>
      <el-table-column label="联系人" prop="si_person" width="150" align="center"></el-table-column>
      <el-table-column label="联系电话" prop="si_phone" width="150" align="center"></el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small">详细</el-button>
          <el-button @click="updateAccess(scope.row)" type="text" size="small">修改</el-button>
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
import { getAllAccesss, getAccessList } from '@/api/access'

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
        this.list = response.data.list
        this.total = response.data.total
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    addAccess() {
      this.$router.push({ path: '/system/access/add' })
    },
    initAccessList() {
      this.loading = true
      getAllAccesss(this.currentPage, this.pagesize).then(response => {
        console.log(response)
        this.list = response.data.list
        this.total = response.data.total
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    updateAccess(access) {
      this.$router.push({ path: '/system/access/update', query: { id: access.id }})
    },
    detail(access) {
      this.$router.push({ path: '/system/access/detail', query: { id: access.id }})
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