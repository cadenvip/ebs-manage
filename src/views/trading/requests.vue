<template>
  <div style="padding: 15px;">
    <el-row>
      <el-col :span="10">
        <el-input placeholder="请输入内容" v-model="defaultParams.search" class="input-with-select">
          <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="14"></el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%;margin-top: 15px;" border>
      <el-table-column align="center" prop="id" label="ID" width="70"></el-table-column>
      <el-table-column align="center" prop="orderTradeNo" label="交易编号" width="150"></el-table-column>
      <el-table-column align="center" prop="orderNumber" label="订单编号" width="110"></el-table-column>
      <el-table-column align="center" prop="outTradeNo" label="外部交易编号" width="170"></el-table-column>
      <el-table-column align="center" label="支付方式">
        <template slot-scope="scope">{{scope.row.payType==='33'?'联动支付':scope.row.payType==='34'?'和包支付':scope.row.payType==='23'?'支付宝':scope.row.payType==='11'?'货到付款':scope.row.payType}}</template>        
      </el-table-column>
      <el-table-column align="center" label="金额">
        <template slot-scope="scope">{{'￥' + (scope.row.totalFee/100)}}</template>              
      </el-table-column>
      <el-table-column align="center" label="请求类型">
        <template slot-scope="scope">{{scope.row.isRef==='1'?'退款':scope.row.isRef==='0'?'支付':'暂无'}}</template>        
      </el-table-column>
      <el-table-column align="center" prop="updateDate" label="更新时间" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="" label="操作">
        <template slot-scope="scope">
          <el-button @click="getDetail(scope.row.id)" type="text" size="mini">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align:right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getRequestList } from '@/api/trading'
export default {
  created() {
    this._getRequestList()
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      defaultParams: {
        page: 1,
        limit: 10,
        order: 'desc',
        sort: 'order_trade_no',
        search: ''
      },
      tableData: []
    }
  },
  methods: {
    _getRequestList() {
      getRequestList(this.defaultParams).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    handleCurrentChange(val) {
      this.defaultParams.page = val
      this._getRequestList()
    },
    search() {
      this._getRequestList()
    },
    getDetail(id) {
      this.$router.push({ name: 'requestsdetail', query: { gid: id }})
    }
  }
}
</script>

<style>

</style>
