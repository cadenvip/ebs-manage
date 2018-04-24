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
    <el-table :data="tableData" style="width: 100%;margin-top: 15px;" @sort-change="handleSortChange" border>
      <el-table-column align="center" prop="id" label="ID" sortable="custom" width="70"></el-table-column>
      <el-table-column align="center" prop="orderTradeNo" label="交易编号" sortable="custom" width="150"></el-table-column>
      <el-table-column align="center" prop="orderNumber" label="订单编号" width="110"></el-table-column>
      <el-table-column align="center" prop="outTradeNo" label="外部交易编号" width="170"></el-table-column>
      <el-table-column align="center" label="支付方式">
        <template slot-scope="scope">{{scope.row.payType==='33'?'联动支付':scope.row.payType==='34'?'和包支付':scope.row.payType==='23'?'支付宝':scope.row.payType==='11'?'货到付款':'暂无'}}</template>        
      </el-table-column>
      <el-table-column align="center" label="金额">
        <template slot-scope="scope">{{'￥' + (scope.row.totalFee/100)}}</template>              
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">{{scope.row.state==='1'?'付款成功':scope.row.state==='2'?'申请退款':'暂无'}}</template>        
      </el-table-column>
      <el-table-column align="center" prop="createDate" label="付款时间" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="updateDate" label="最后更新" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="" label="操作">
        <template slot-scope="scope">
          <el-button @click="getDetail(scope.row.id)" type="text" size="mini">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: right;">
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
import { getTradeList } from '@/api/trading'
export default {
  created() {
    this._getTradeList()
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      tableData: [],
      defaultParams: {
        page: 1,
        limit: 10,
        order: 'desc',
        sort: 'id',
        search: ''
      }
    }
  },
  methods: {
    _getTradeList() {
      getTradeList(this.defaultParams).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    handleSortChange(val) {
      if (val.prop === null) {
        this.defaultParams.sort = null
        this.defaultParams.order = 'desc'
      } else if (val.prop === 'id' && val.order === 'ascending') {
        this.defaultParams.sort = 'id'
        this.defaultParams.order = 'asc'
      } else if (val.prop === 'id' && val.order === 'descending') {
        this.defaultParams.sort = 'id'
        this.defaultParams.order = 'desc'
      } else if (val.prop === 'orderTradeNo' && val.order === 'ascending') {
        this.defaultParams.sort = 'orderTradeNo'
        this.defaultParams.order = 'asc'
      } else if (val.prop === 'orderTradeNo' && val.order === 'descending') {
        this.defaultParams.sort = 'orderTradeNo'
        this.defaultParams.order = 'desc'
      }
      this._getTradeList()
    },
    handleCurrentChange(val) {
      this.defaultParams.page = val
      this._getTradeList()
    },
    search() {
      this._getTradeList()
    },
    getDetail(id) {
      this.$router.push({ name: 'tradedetail', query: { gid: id }})
    }
  }
}
</script>

<style>

</style>
