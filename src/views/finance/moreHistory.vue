<template>
  <div>
    <div style="margin:20px">
      <h5>所有财务账单</h5>
      <span v-for="(item, index) in historyBillList" v-if="item !== undefined" style="margin-top:10px;margin-left:50px">
        <el-button @click="chechMonthBillDetail(item)" type="text">{{ formatYearMonth(item) }}</el-button>
        <el-button @click="downloadHistoryMonthBill(item)" type="primary" icon="el-icon-download" size="mini"></el-button>
      </span>
    </div>
    <div style="text-align: center">
      <el-button @click="goback" type="primary">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {
    getHisBillYearmonthList,
    downloadBillList
  } from '@/api/finance'

  export default {
    data() {
      return {
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
        getHisBillYearmonthList().then(response => {
          if (response.status === 200) {
            this.historyBillList = response.data
          } else {
            this.$message.error(response.msg)
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.error(error.msg)
        })
      },
      formatYearMonth(bill) {
        if (bill !== undefined && bill !== null && bill !== '') {
          return bill.substr(0, 4) + '年' + bill.substr(4, 2) + '月'
        } else {
          return '年' + '月'
        }
      },
      chechMonthBillDetail(bill) {
        this.$router.push({
          path: '/finance/monthHistory',
          query: {
            yearmonth: bill
          }
        })
      },
      downloadHistoryMonthBill(bill) {
        var params = {
          'yearmonth': bill,
          'history': '1'
        }
        downloadBillList(params).then(response => {
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
