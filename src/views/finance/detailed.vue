<template>
  <div style="margin:20px">
    <div>
      <h3>基本信息</h3>
      <div style="color: #606266;font-size:14px;width:960px;height:140px;overflow:auto;border:#E6E6E6 solid 1px;">
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
          <el-col :span="4" style="text-align:right">
            <span>
              企业名称：
            </span> 
          </el-col>
          <el-col :span="8">
            <span>
              {{ thisMonthBill.merchantname }}
            </span> 
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
          <el-col :span="4" style="text-align:right">
            <span>
              出账周期：
            </span> 
          </el-col>
          <el-col :span="8">
            <span>
              {{ period }}
            </span> 
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              对账状态：
            </span> 
          </el-col>
          <el-col :span="8">
            <span>
              {{ formatStatus }}
            </span> 
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
          <el-col :span="4" style="text-align:right">
            <span>
              对账人：
            </span> 
          </el-col>
          <el-col :span="8">
            <span>
              {{ thisMonthBill.dealusername }}
            </span> 
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              对账电话：
            </span> 
          </el-col>
          <el-col :span="8">
            <span>
              {{ thisMonthBill.dealuserphone }}
            </span> 
          </el-col>
        </el-row>
      </div>
      <h3>本月结算交易明细</h3>
      <el-table :data="thisMonthDetail.detailListpayed" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row tooltip-effect="light" style="padding-left:10px">
        <el-table-column label="序号" type="index" :index="indexPayed" align="center"></el-table-column>
        <el-table-column label="订单号" prop="ordercode" align="center"></el-table-column>
        <el-table-column label="订单下单时间" prop="ordertime" show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="订单完成时间" prop="finishtime" show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="支付渠道" prop="paytype" align="center"></el-table-column>
        <el-table-column label="交易金额" prop="totalpay" :formatter="unitFormat" align="center"></el-table-column>
        <el-table-column label="手续费" prop="transferfee" :formatter="unitFormat" align="center"></el-table-column>
        <el-table-column label="应结算金额" prop="turnover" :formatter="unitFormat" align="center"></el-table-column>
      </el-table>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
        <el-col :span="4" style="text-align:right">
          <span>
            转账手续费：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            <!-- {{ transferfeeFormat }} -->
            fasdlfkj
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
      <el-button @click="goback" type="primary">返回</el-button>
    </div>
    <div>
      <h3>本月未结算交易明细</h3>
      <el-table :data="thisMonthDetail.detailListnopayed" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row tooltip-effect="light" style="padding-left:10px">
        <el-table-column label="序号" type="index" :index="indexPayed" align="center"></el-table-column>
        <el-table-column label="订单号" prop="ordercode" align="center"></el-table-column>
        <el-table-column label="订单下单时间" prop="ordertime" show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="支付渠道" prop="finishtime" align="center"></el-table-column>
        <el-table-column label="交易金额" prop="totalpay" :formatter="unitFormat" align="center"></el-table-column>
        <el-table-column label="手续费" prop="transferfee" :formatter="unitFormat" align="center"></el-table-column>
        <el-table-column label="应结算金额" prop="turnover" :formatter="unitFormat" align="center"></el-table-column>
      </el-table>      
    </div>
    <div class="fl bill_info">
      <p v-for="(item, index) in thisMonthDetail.logList">
        {{formatLogType(item.logtype)}}({{item.createdate}}):{{item.logcontent}}
      </p>
    </div>   
    <br/>
  </div>
</template>

<script>
import { getThisMonthBill, getThisMonthDetail } from '@/api/finance'

export default {
  data() {
    return {
      unitId: '',
      logList: [],
      thisMonthBill: {},
      thisMonthDetail: {
        detailListnopayed: [],
        logList: [],
        bill: [],
        detailListpayed: []
      },
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
    period: function() {
      return this.thisMonthBill.startmonth + '--' + this.thisMonthBill.endmonth
    },
    formatStatus: function() {
      // 对账状态(0 待确认 1 已确认 2 待调账 3 已结算 )
      var type = ''
      switch (this.thisMonthBill.status) {
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
        default:break
      }
      return type
    }
  },
  methods: {
    getSumary() {
      this.loading = true
      var params = { 'unitid': `${this.unitId}` }
      getThisMonthBill(params).then(response => {
        if (response.status === 200) {
          this.thisMonthBill = response.data
          getThisMonthDetail({ 'billid': `${response.data.id}` }).then(response => {
            if (response.status === 200) {
              this.thisMonthDetail = response.data
              console.log(this.thisMonthDetail)
            } else {
              this.$message.error(response.msg)
            }
            this.loading = false
          }).catch(error => {
            this.loading = false
            console.log(error)
          })
        } else {
          this.loading = false
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
      this.loading = false
    },
    indexPayed(index) {
      return index
    },
    indexNopayed(index) {
      return index
    },
    unitFormat(row, column, cellValue) {
      if (cellValue !== undefined && cellValue !== null) {
        return '￥' + (cellValue / 100).toFixed(2)
      } else {
        return ''
      }
    },
    formatLogType(logType) {
      // 日志类型(1 争议日志 2 调账日志 3 清账日志 4 结算日志)
      var type = ''
      switch (logType) {
        case 1:
          type = '争议日志'
          break
        case 2:
          type = '调账日志'
          break
        case 3:
          type = '清账日志'
          break
        case 4:
          type = '结算日志'
          break
        default:break
      }
      return type
    },
    goback() {
      this.$router.go(-1)
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
