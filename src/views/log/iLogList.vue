<template>
  <div>
    <h3 style="padding-left: 20px;">接口日志查询条件</h3>
    <el-form ref="searchForm" :model="searchForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="30">
        <el-col :span="7">
          <el-form-item label="日志时间：" prop="logdate">
            <el-date-picker v-model="SearchForm.logdate" type="date" value-format="yyyy-MM-dd" style="width: 200px;" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>   
        </el-col>
        <el-col :span="7">
          <el-form-item label="接口服务名：" prop="reqservice">
            <el-select v-model="searchForm.reqservice" clearable placeholder="请选择接口服务名" style="width: 200px;">
              <el-option label="EOrderService" value="1"></el-option>
              <el-option label="EOrderService3" value="2"></el-option>
            </el-select>
          </el-form-item>  
        </el-col>
        <el-col :span="7">
          <el-form-item label="接口消息标识：" prop="reqaction">
            <el-select v-model="searchForm.reqaction" clearable placeholder="请选择接口消息标识" style="width: 200px;">
              <el-option v-for="(item, key) in reqactionList" :key="key" :label="item.locationName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>  
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="7">
          <el-form-item label="流水号：" prop="reqseq">
            <el-input v-model="registerForm.reqseq" clearable style="width: 200px;" placeholder="请输入流水号"></el-input>
          </el-form-item>   
        </el-col>
        <el-col :span="7">
          <el-form-item label="发起方编码：" prop="reqcode">
            <el-input v-model="registerForm.reqcode" clearable style="width: 200px;" placeholder="请输入发起方编码"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="7">
          <el-form-item label="请求报文关键字：" prop="reqmessage">
            <el-input v-model="registerForm.reqmessage" clearable style="width: 200px;" placeholder="请输入请求报文关键字"></el-input>
          </el-form-item>  
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="3" :offset="8">
          <el-button type="primary" @click.native.prevent="queryILogList">查询</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <h3 style="padding-left: 20px;">接口日志列表</h3>
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="padding-left:10px">
      <el-table-column label='流水号' prop="reqseq" width="280" align="center"></el-table-column>
      <el-table-column label="接口服务名" prop="reqservice" width="110" align="center"></el-table-column>
      <el-table-column label="接口消息标志" prop="reqaction" width="110" align="center"></el-table-column>
      <el-table-column label="发起方编码" prop="reqcode" width="100" align="center"></el-table-column>
      <el-table-column label="接口协议" prop="createsource" width="100" align="center"></el-table-column>
      <el-table-column label="耗时（毫秒）" prop="createsource" width="100" align="center"></el-table-column>
      <el-table-column label="创建时间" prop="createsource" width="100" align="center"></el-table-column>
      <el-table-column label="结果" prop="createsource" width="100" align="center"></el-table-column>
      <el-table-column label="操作" width="190" align="center">
        <template slot-scope="scope">
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

import { getAllILogs, getILogList, getReqactionList } from '@/api/log'

export default {
  data() {
    return {
      list: [],
      reqactionList: [],
      searchForm: {
        logdate: '', 	// 月份日期，字符串
        month: '',
        day: '',
        reqservice: '',	// 请求服务名
        reqaction: '',	// 请求消息标志，取值为函数名
        reqseq: '',	// 请求流水（由请求方生成）
        reqcode: '',	// 请求方编码
        reqmessage: ''// 请求消息报文
      },
      pagesizes: [10, 20, 30, 50],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      dialogVisible: false,
      loading: true
    }
  },
  created() {
    this.initILogList()
    getReqactionList().then(response => {
      this.reqactionList = response.data.list
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    queryILogList() {
      this.loading = true
      getILogList(this.searchForm, this.currentPage, this.pagesize).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    initILogList() {
      this.loading = true
      debugger
      getAllILogs(this.currentPage, this.pagesize).then(response => {
        console.log(response.data)
        this.list = response.data.list
        this.total = response.data.total
        this.loading = false
        debugger
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    resetForm(formname) {
      this.searchForm.logdate = ''
      this.searchForm.reqservice = ''
      this.searchForm.reqaction = ''
      this.searchForm.reqseq = ''
      this.searchForm.reqcode = ''
      this.searchForm.reqmessage = ''
    },
    detail(ilog) {
      this.$router.push({ path: '/system/log/ilog/detail', query: { id: ilog.id }})
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.queryILogList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryILogList()
    }
  }
}
</script>