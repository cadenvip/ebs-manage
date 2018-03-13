<template>
  <div>
    <h3 style="padding-left: 20px;">账目查询条件</h3>
    <el-form ref="searchForm" :model="searchForm" label-width="130px" class="demo-ruleForm">
      <el-row :gutter="30">
        <el-col :span="7">
          <el-form-item label="企业名称：" prop="month_day">
            <el-input v-model="searchForm.reqseq" clearable style="width: 180px;" placeholder="请输入企业名称"></el-input>
          </el-form-item>   
        </el-col>
        <el-col :span="7">
          <el-form-item label="归属区域：">
            <el-input v-model="searchForm.locationname" clearable style="width: 180px;" @focus="handleLocationFocus" placeholder="请选择所属区域"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="7">
          <el-form-item label="对账状态：" prop="reqservice">
            <el-select v-model="searchForm.reqservice" clearable style="width: 180px;" placeholder="请选择对账状态">
              <!-- // 对账状态(0 待确认 1 已确认 2 待调账 3 已结算 ) -->
              <el-option label="待确认" value="0"></el-option>
              <el-option label="已确认" value="1"></el-option>
              <el-option label="待调账" value="2"></el-option>
              <el-option label="已结算" value="3"></el-option>
            </el-select>
          </el-form-item>   
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="7">
          <el-form-item label="到账时间：" prop="reqseq">
            <el-date-picker v-model="searchForm.month_day" type="date" value-format="MMdd" style="width: 180px;" placeholder="请选择到账时间">
            </el-date-picker>
          </el-form-item>   
        </el-col>
        <el-col :span="7">
          <el-form-item label="" prop="less500Check">
            <el-checkbox v-model="searchForm.less500Check">显示不足500的</el-checkbox>
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
    <h3 style="padding-left: 20px;">账目列表</h3>
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="padding-left:10px">
      <el-table-column label='企业名称' prop="reqseq" width="180" align="center"></el-table-column>
      <el-table-column label="区域" prop="reqservice" width="120" align="center"></el-table-column>
      <el-table-column label="出账周期" prop="reqaction" width="150" align="center"></el-table-column>
      <el-table-column label="应结算合计" prop="reqcode" width="100" align="center"></el-table-column>
      <el-table-column label="对账状态" prop="protocol" :formatter="formatStatus" width="80" align="center"></el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small">对账明细</el-button>
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
    <br/>
    <el-row :gutter="20" style="margin-left:0px;margin-right:0px;margin-top:20px;">
      <el-col :span="3" :offset="6" style="text-align:right">
        <span>
          <el-button @click="downloadSettlement" type="text">下载结算总结</el-button>
        </span> 
      </el-col>
      <el-col :span="3">
        <span>
          <el-button @click="checkHistorySettlement" type="text">更多历史结算总结</el-button>
        </span> 
      </el-col>
    </el-row>
    <el-dialog
      title="请选择区域"
      :visible.sync="dialogVisible"
      width="440px"
      :before-close="handleClose">
      <locationselector @locationSelected="getLocationInfo"></locationselector>
    </el-dialog>
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
        month_day: '', 	// 月份日期，字符串
        reqservice: '',	// 请求服务名
        reqaction: '',	// 请求消息标志，取值为函数名
        reqseq: '',	// 请求流水（由请求方生成）
        reqcode: '',	// 请求方编码
        reqmessage: '', // 请求消息报文
        less500Check: false,
        locationid: '',
        locationname: ''
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
      console.log(error)
    })
  },
  methods: {
    queryILogList() {
      this.loading = true
      console.log(this.searchForm)
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
        console.log(error)
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
        console.log(error)
      })
    },
    getLocationInfo: function(data) {
      this.searchForm.locationid = data.id
      this.searchForm.locationname = data.label
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
      this.$router.push({ path: '/log/ilog/detail', query: { id: ilog.id }})
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
    },
    handleClose(done) {
      // this.$confirm('确认关闭？').then(_ => {
      done()
      // }).catch(_ => {})
    },
    handleLocationFocus() {
      this.dialogVisible = true
      this.searchForm.locationid = ''
      this.searchForm.locationname = ''
    },
    formatStatus(row, column, cellValue) {
      // 对账状态(0 待确认 1 已确认 2 待调账 3 已结算 )
      var type = ''
      switch (cellValue) {
        case 0:
          type = '待确认'
          break
        case 1:
          type = '已确认'
          break
        case 2:
          type = '待调账'
          break
        case 3:
          type = '已结算'
          break
        default:
          type = ''
          break
      }
      return type
    },
    downloadSettlement() {
      alert('下载结算总结')
    },
    checkHistorySettlement() {
      alert('更多历史结算总结')
    }
  }
}
</script>