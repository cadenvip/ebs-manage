<template>
  <div style="margin:20px">
    <el-tabs type="border-card">
      <el-tab-pane label="本月账单">
        <el-table :data="thisMonthSumery" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="padding-left:10px">
          <el-table-column label="交易日期" prop="dealmonth" width="180" align="center"></el-table-column>
          <el-table-column label="交易笔数" prop="ordercount" width="120" align="center"></el-table-column>
          <el-table-column label="交易金额" prop="totalpay" width="150" align="center"></el-table-column>
          <el-table-column label="手续费" prop="transferfee" width="100" align="center"></el-table-column>
          <el-table-column label="总收入款项" prop="turnover" width="80" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="历时月账单">历时月账单</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import { getThisMonthSummary, getHistorySummary } from '@/api/finance'

export default {
  data() {
    return {
      thisMonthSumery: [],
      historySumery: []
    }
  },
  created() {
    this.initILogList()
  },
  methods: {
    initILogList() {
      this.loading = true
      getThisMonthSummary(this.currentPage, this.pagesize).then(response => {
        if (response.status === 200) {
          this.thisMonthSumery = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
      getHistorySummary(this.currentPage, this.pagesize).then(response => {
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
      this.loading = false
    },
    detail(ilog) {
      this.$router.push({ path: '/log/ilog/detail', query: { id: ilog.id }})
    }
  }
}
</script>
