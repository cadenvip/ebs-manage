<template>
  <div>
    <h3 style="padding-left: 20px;">接口日志查询条件</h3>
    <el-form ref="searchForm" :model="searchForm" label-width="130px" class="demo-ruleForm">
      <el-row :gutter="30">
        <el-col :span="7">
          <el-form-item label="日志时间：" prop="month_day">
            <el-date-picker v-model="searchForm.month_day" type="date" value-format="MMdd" style="width: 180px;" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="接口服务名：" prop="reqservice">
            <el-select v-model="searchForm.reqservice" clearable style="width: 180px;" placeholder="请选择接口服务名">
              <el-option label="EOrderService" value="EOrderService"></el-option>
              <el-option label="EOrderService3" value="EOrderService3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="接口消息标识：" prop="reqaction">
            <el-select v-model="searchForm.reqaction" clearable style="width: 180px;" placeholder="请选择接口消息标识">
              <el-option v-for="(item, key) in reqactionList" :key="key" :label="item.inter_name" :value="item.inter_method"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="7">
          <el-form-item label="流水号：" prop="reqseq">
            <el-input v-model="searchForm.reqseq" clearable style="width: 180px;" placeholder="请输入流水号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="发起方编码：" prop="reqcode">
            <el-input v-model="searchForm.reqcode" clearable style="width: 180px;" placeholder="请输入发起方编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="请求报文关键字：" prop="reqmessage">
            <el-input v-model="searchForm.reqmessage" clearable style="width: 180px;" placeholder="请输入请求报文关键字"></el-input>
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
      <el-table-column label='流水号' prop="reqseq" width="180" align="center"></el-table-column>
      <el-table-column label="接口服务名" prop="reqservice" width="120" align="center"></el-table-column>
      <el-table-column label="接口消息标志" prop="reqaction" width="150" align="center"></el-table-column>
      <el-table-column label="发起方编码" prop="reqcode" width="100" align="center"></el-table-column>
      <el-table-column label="接口协议" prop="protocol" width="80" align="center"></el-table-column>
      <el-table-column label="耗时（毫秒）" prop="timed" width="110" align="center"></el-table-column>
      <el-table-column label="创建时间" prop="createtime" width="160" align="center"></el-table-column>
      <el-table-column label="结果" prop="errormessage" :formatter="resultFormat" width="80" align="center"></el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small">详细</el-button>
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
    getAllILogs,
    getILogList,
    getReqactionList
  } from '@/api/log'

  export default {
    data() {
      return {
        list: [],
        reqactionList: [],
        searchForm: {
          month_day: '', // 月份日期，字符串
          reqservice: '', // 请求服务名
          reqaction: '', // 请求消息标志，取值为函数名
          reqseq: '', // 请求流水（由请求方生成）
          reqcode: '', // 请求方编码
          reqmessage: '' // 请求消息报文
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
        if (response.status === 200) {
          this.reqactionList = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    methods: {
      queryILogList() {
        this.loading = true
        getILogList(this.searchForm, this.currentPage, this.pagesize).then(response => {
          if (response.status === 200) {
            this.list = response.data.list
            this.total = response.data.total
          } else {
            this.$message.error(response.msg)
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.error(error)
        })
      },
      initILogList() {
        this.loading = true
        getAllILogs(this.currentPage, this.pagesize).then(response => {
          if (response.status === 200) {
            this.list = response.data.list
            this.total = response.data.total
          } else {
            this.$message.error(response.msg)
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.error(error)
        })
      },
      resetForm(formname) {
        this.searchForm.month_day = ''
        this.searchForm.reqservice = ''
        this.searchForm.reqaction = ''
        this.searchForm.reqseq = ''
        this.searchForm.reqcode = ''
        this.searchForm.reqmessage = ''
      },
      detail(ilog) {
        this.$router.push({
          path: '/log/ilog/detail',
          query: {
            id: ilog.id
          }
        })
      },
      resultFormat(row, column, cellValue) {
        if (cellValue === undefined || cellValue === null) {
          return '成功'
        } else {
          return '失败'
        }
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
