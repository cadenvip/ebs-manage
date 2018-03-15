<template>
  <div>
    <div style="margin:20px">
      <h5>所有财务账单</h5>
      <div v-for="(item, index) in billList" v-if="item !== undefined" style="margin-top:10px">
        <el-button @click="chechMonthBillDetail(item)" type="text">{{ formatYearMonth(item) }}</el-button>
        <el-button @click="downloadMonthBill(item)" type="text">下载</el-button>
      </div>
      <div v-for="(item, index) in historyBillList" v-if="item !== undefined" style="margin-top:10px">
        <el-button @click="chechMonthBillDetail(item)" type="text">{{ formatYearMonth(item) }}</el-button>
        <el-button @click="downloadHistoryMonthBill(item)" type="text">下载</el-button>
      </div>
    </div>
    <div style="text-align: center">
      <el-button @click="goback" type="primary" >返回</el-button>        
    </div>
  </div>
</template>

<script>

import { getThisYearAllBill, getHistoryBillsList, downloadBill } from '@/api/finance'
// import { getAllBills, getHistoryBill, downloadBill } from '@/api/finance'

export default {
  data() {
    return {
      billList: [],
      historyBillList: [],
      loading: false
    }
  },
  created() {
    this.initBillList()
  },
  methods: {
    initBillList() {
      this.loading = true
      // getAllBills().then(response => {
      getThisYearAllBill().then(response => {
        if (response.status === 200) {
          this.billList = response.data.list
        } else {
          this.$message.error(response.msg)
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })

      getHistoryBillsList().then(response => {
        if (response.status === 200) {
          this.historyBillList = response.data.list
        } else {
          this.$message.error(response.msg)
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    formatYearMonth(bill) {
      const billmonth = bill.billmonth.toString()
      if (billmonth !== undefined) {
        return billmonth.substr(0, 4) + '年' + billmonth.substr(4, 2) + '月'
      } else {
        return '年' + '月'
      }
    },
    chechMonthBillDetail(bill) {
      this.$router.push({ path: '/finance/detail', query: { id: bill.id }})
    },
    downloadMonthBill(bill) {
      downloadBill(bill, 1).then(response => {
        if (response.status === 200) {
          this.$message.success('下载成功')
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    downloadHistoryMonthBill(bill) {
      downloadBill(bill, 0).then(response => {
        if (response.status === 200) {
          this.$message.success('下载成功')
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>