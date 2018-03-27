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
              <el-button @click="checkDetail" type="text" >查看结算明细</el-button>
            </span> 
          </el-col>
          <el-col :span="3">
            <span>
              <el-button @click="downloadDetail" type="primary" >打包下载结算明细</el-button>
            </span> 
          </el-col>
          <el-col :span="3" :offset="10" style="text-align:right">
            <span>
              <el-button @click="checkout" type="primary" >确认结账</el-button>
            </span> 
          </el-col>
          <el-col :span="3">
            <span>
              <el-button @click="dispute" type="primary" >核账争议</el-button>
            </span> 
          </el-col>
        </el-row>        
      </el-tab-pane>
      <el-tab-pane label="历史月账单">
        <div style="margin:20px">
          <h5>所有财务账单</h5>
          <span v-for="(item, index) in historyBill" v-if="item !== undefined" style="margin-top:10px;margin-left:50px">
            <el-button @click="chechMonthBillDetail(item)" type="text" el-icon-download>{{ formatYearMonth(item) }}</el-button>
            <el-button @click="downloadMonthBill(item)" type="primary" icon="el-icon-download" size="mini"></el-button>
          </span>
          <span v-for="(item, index) in moreHistoryBill" v-if="item !== undefined" style="margin-top:10px;margin-left:50px">
            <el-button @click="chechMonthBillDetail(item)" type="text">{{ formatYearMonth(item) }}</el-button>
            <el-button @click="downloadHistoryMonthBill(item)" type="primary" icon="el-icon-download" size="mini"></el-button>
          </span>
        </div>
      </el-tab-pane>
    </el-tabs>
    <br/>
    <br/>
    <div class="fl bill_info">
      <p>统计周期：上一个自然月，例：10月1-31号；</p>
      <p>统计对象：订单状态为“交易成功（已结单）”；</p>
      <p>交易手续费：支付宝交易手续费=交易金额*0.005，手机支付交易手续费=交易金额*0.003，结果采用“进一法”；</p>
      <p>转账手续费（仅针对支付宝）：转账费=转账金额*0.001，0.5元起收，10元封顶；</p>
      <p>当期应付款：当期应付款=总交易金额-交易手续费-转账手续费。注：当期应付金额低于500时不给予结算，需累计到500以上进行结算；</p>
    </div>
    <el-dialog title="核账争议" :visible.sync="dialogFormVisible" style="padding:10px 20px">
      <el-input v-model="content" type="textarea" :rows=8 placeholder='请输入核账争议内容'></el-input>
      <p>剩余字数: <span style="color:red;">{{getContentLen}}</span></p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDispute">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { getThisMonthSummary, getHistorySummary, getThisMonthBill, downloadBill,
  getHistoryBill, getHistoryBillsList, businessDealBill, submitDispute } from '@/api/finance'

export default {
  data() {
    return {
      unitId: '',
      thisMonthSumery: [],
      historySumery: [],
      thisMonthBill: {},
      historyBill: [],
      moreHistoryBill: [],
      content: '',
      dialogFormVisible: false
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
    this.initData()
  },
  computed: {
    getContentLen() {
      if (this.content) {
        return (200 - this.content.length) < 0 ? 0 : (200 - this.content.length)
      } else {
        return 200
      }
    },
    transferfeeFormat: function() {
      if (this.thisMonthBill !== null && this.thisMonthBill.transferfee !== undefined && this.thisMonthBill.transferfee !== null) {
        return '￥' + (this.thisMonthBill.transferfee / 100).toFixed(2)
      } else {
        return '￥0.00'
      }
    },
    totalpayFormat: function() {
      if (this.thisMonthBill !== null && this.thisMonthBill.totalpay !== undefined && this.thisMonthBill.totalpay !== null) {
        return '￥' + (this.thisMonthBill.totalpay / 100).toFixed(2)
      } else {
        return '￥0.00'
      }
    }
  },
  methods: {
    initData() {
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
        this.$message.error(error)
      })
      getThisMonthBill(params).then(response => {
        if (response.status === 200) {
          this.thisMonthBill = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.loading = false
        this.$message.error(error)
      })
      getHistorySummary(params).then(response => {
        if (response.status === 200) {
          this.historySumery = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.loading = false
        this.$message.error(error)
      })
      getHistoryBill(params).then(response => {
        if (response.status === 200) {
          this.historyBill = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.loading = false
        this.$message.error(error)
      })
      getHistoryBillsList(params).then(response => {
        if (response.status === 200) {
          this.moreHistoryBill = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.loading = false
        this.$message.error(error)
      })
      this.loading = false
    },
    unitFormat(row, column, cellValue) {
      if (cellValue !== null) {
        return '￥' + (cellValue / 100).toFixed(2)
      } else {
        return ''
      }
    },
    formatYearMonth(bill) {
      const billmonth = bill.billmonth.toString()
      if (billmonth !== undefined) {
        return billmonth.substr(0, 4) + '年' + billmonth.substr(4, 2) + '月'
      } else {
        return '年' + '月'
      }
    },
    checkDetail() {
      if (this.thisMonthBill !== null) {
        this.$router.push({ path: '/statement/thisMonthBillDetail', query: { id: this.thisMonthBill.id }})
      } else {
        this.$message.error('暂无数据')
      }
    },
    chechMonthBillDetail(bill) {
      if (this.thisMonthBill !== null) {
        this.$router.push({ path: '/statement/detail', query: { id: bill.id }})
      } else {
        this.$message.error('暂无数据')
      }
    },
    downloadDetail() {
      downloadBill(this.thisMonthBill, 1).then(response => {
        if (response.status === 200) {
          this.$message.success('下载结算明细成功')
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    downloadMonthBill(bill) {
      downloadBill(bill, 1).then(response => {
        if (response.status === 200) {
          this.$message.success('下载成功')
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    downloadHistoryMonthBill(bill) {
      downloadBill(bill, 0).then(response => {
        if (response.status === 200) {
          this.$message.success('下载成功')
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    checkout() {
      if (this.thisMonthBill !== null) {
        var params = { 'billid': `${this.thisMonthBill.id}` }
        businessDealBill(params).then(response => {
          if (response.status === 200) {
            this.$message.success('确认结账成功，等待管理员处理')
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
      } else {
        this.$message.error('暂无数据')
      }
    },
    dispute() {
      if (this.thisMonthBill !== null) {
        this.dialogFormVisible = true
      } else {
        this.$message.error('暂无数据')
      }
    },
    confirmDispute() {
      if (this.content === undefined || this.content === '') {
        this.$message.error('请填写争议内容')
        return
      } else {
        var params = {
          'billid': `${this.thisMonthBill.id}`,
          'content': this.content
        }
        submitDispute(params).then(response => {
          if (response.status === 200) {
            this.$message.success('提交成功')
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
        this.dialogFormVisible = false
      }
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
