<template>
  <div style="margin:20px">
    <el-tabs type="border-card">
      <el-tab-pane label="本月账单">
        <el-table :data="thisMonthSumery" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="padding-left:10px">
          <el-table-column label="交易日期" prop="dealmonth" width="180" align="center"></el-table-column>
          <el-table-column label="交易笔数" prop="ordercount" width="180" align="center"></el-table-column>
          <el-table-column label="交易金额" prop="totalpay" :formatter="unitFormat" width="180" align="center"></el-table-column>
          <el-table-column label="手续费" prop="transferfee" :formatter="unitFormat" width="180" align="center"></el-table-column>
          <el-table-column label="总收入款项" prop="turnover" :formatter="unitFormat" width="180" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="历时月账单">
        <el-table :data="historySumery" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="padding-left:10px">
          <el-table-column label="交易日期" prop="dealmonth" width="180" align="center"></el-table-column>
          <el-table-column label="交易笔数" prop="ordercount" width="180" align="center"></el-table-column>
          <el-table-column label="交易金额" prop="totalpay" :formatter="unitFormat" width="180" align="center"></el-table-column>
          <el-table-column label="手续费" prop="transferfee" :formatter="unitFormat" width="180" align="center"></el-table-column>
          <el-table-column label="总收入款项" prop="turnover" :formatter="unitFormat" width="180" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
        <el-col :span="4" style="text-align:right">
          <span>
            转账手续费：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ transferfeeFormat }}
          </span> 
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            应结算合计：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ totalpayFormat }}
          </span> 
        </el-col>
      </el-row>
      <br/>
      <hr style="height:1px;border:none;border-top:#b1cce7 solid 1px;" />
      <el-row :gutter="20" style="margin-left:0px;margin-right:0px;margin-top:20px;">
        <el-col :span="3" style="text-align:right">
          <span>
            <el-button @click="checkDetail" type="text">查看结算明细</el-button>
          </span> 
        </el-col>
        <el-col :span="3">
          <span>
            <el-button @click="downloadDetail" type="primary">打包下载结算明细</el-button>
          </span> 
        </el-col>
        <el-col :span="3" :offset="10" style="text-align:right">
          <span>
            <el-button @click="checkout" type="primary">确认结账</el-button>
          </span> 
        </el-col>
        <el-col :span="3">
          <span>
            <el-button @click="dispute" type="primary">核账争议</el-button>
          </span> 
        </el-col>
      </el-row>
      <br/>
      <br/>
      <br/>
      <br/>
      <div class="fl bill_info">
        <p>统计周期：上一个自然月，例：10月1-31号；</p>
        <p>统计对象：订单状态为“交易成功（已结单）”；</p>
        <p>交易手续费：支付宝交易手续费=交易金额*0.005，手机支付交易手续费=交易金额*0.003，结果采用“进一法”；</p>
        <p>转账手续费（仅针对支付宝）：转账费=转账金额*0.001，0.5元起收，10元封顶；</p>
        <p>当期应付款：当期应付款=总交易金额-交易手续费-转账手续费。注：当期应付金额低于500时不给予结算，需累计到500以上进行结算；</p>
      </div>   
    </el-tabs>
  </div>
</template>

<script>

import { getThisMonthSummary, getHistorySummary } from '@/api/finance'

export default {
  data() {
    return {
      unitId: '',
      thisMonthSumery: [],
      historySumery: [],
      transferfee: 0,
      totalpay: 0
    }
  },
  created() {
    var userInfo = window.sessionStorage.getItem('userInfo')
    if (userInfo !== undefined && userInfo !== '') {
      userInfo = JSON.parse(userInfo)
      this.unitId = userInfo.unitid
    } else {
      this.$message.error('请先登录')
      // this.$router.push({ path: '/login' })
    }
    this.getSumary()
  },
  computed: {
    transferfeeFormat: function() {
      if (this.transferfee !== undefined) {
        return '￥' + this.transferfee.toFixed(2)
      } else {
        return '￥0.00'
      }
    },
    totalpayFormat: function() {
      if (this.totalpay !== undefined) {
        return '￥' + this.totalpay.toFixed(2)
      } else {
        return '￥0.00'
      }
    }
  },
  methods: {
    getSumary() {
      this.loading = true
      var params = { 'unitid': `${this.unitId}` }
      getThisMonthSummary(params).then(response => {
        if (response.status === 200) {
          this.thisMonthSumery = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
      getHistorySummary(params).then(response => {
        debugger
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
    unitFormat(row, column, cellValue) {
      if (cellValue !== null) {
        return '￥' + cellValue.toFixed(2)
      } else {
        return ''
      }
    },
    checkDetail() {
      this.$router.push({ path: '/statement/detail' })
    },
    downloadDetail() {
      alert('打包下载结算明细')
    },
    checkout() {
      alert('确认结账')
    },
    dispute() {
      alert('核账争议')
    }
  }
}
</script>

<style scoped>
  .bill_info {
    margin: auto 20px;
    border-top: #b1cce7 solid 1px;
    padding-top: 5px;
    width: 960px;
    color: #656565;
    font: 12px/1.6 simsun,Arial;
  }
  .fl {
      float: left;
  }
</style>
