<template>
  <div style="margin:20px">
    <div>
      <h4>基本信息</h4>
      <div style="color: #606266;font-size:14px;width:960px;height:140px;overflow:auto;border:#E6E6E6 solid 1px;">
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
          <el-col :span="4" style="text-align:right">
            <span>
              企业名称：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ thisMonthDetail.bill.merchantname !== null ? thisMonthDetail.bill.merchantname : '&nbsp;' }}
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
            <span v-html="dealusernameFormat">
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              对账电话：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ dealuserphoneFormat }}
            </span>
          </el-col>
        </el-row>
      </div>
      <h4>本月结算交易明细</h4>
      <el-table :data="thisMonthDetail.detailListpayed" v-loading.body="loading" element-loading-text="Loading" border stripe fit
        highlight-current-row tooltip-effect="light" style="width:100%">
        <el-table-column label="序号" type="index" :index="indexPayed" align="center"></el-table-column>
        <el-table-column label="订单号" prop="ordercode" align="center"></el-table-column>
        <el-table-column label="订单下单时间" prop="ordertime" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="订单完成时间" prop="finishtime" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="支付渠道" prop="paytype" :formatter="typeFormat" align="center"></el-table-column>
        <el-table-column label="交易金额" prop="totalamount" :formatter="unitFormat" align="center"></el-table-column>
        <el-table-column label="手续费" prop="feeamount" :formatter="unitFormat" align="center"></el-table-column>
        <el-table-column label="应结算金额" prop="payamount" :formatter="unitFormat" align="center"></el-table-column>
        <el-table-column label="是否存在争议" align="center">
          <template slot-scope="scope">
            <el-checkbox @change="handleConflict(scope.row)">有误差</el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
        <el-col :span="4" style="text-align:right">
          <span>
            转账手续费：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ formatTransferfee }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            应结算合计：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ formatTotalpay }}
          </span>
        </el-col>
      </el-row>
      <br/>
      <hr style="height:1px;border:none;border-top:#b1cce7 solid 1px;" />
      <el-button @click="downloadDetail" type="primary">打包下载交易明细</el-button>
    </div>
    <div>
      <h4>本月未结算交易明细</h4>
      <el-table :data="thisMonthDetail.detailListnopayed" v-loading.body="loading" element-loading-text="Loading" border stripe
        fit highlight-current-row tooltip-effect="light" style="width:100%">
        <el-table-column label="序号" type="index" :index="indexPayed" align="center"></el-table-column>
        <el-table-column label="订单号" prop="ordercode" align="center"></el-table-column>
        <el-table-column label="订单下单时间" prop="ordertime" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="支付渠道" prop="paytype" :formatter="typeFormat" align="center"></el-table-column>
        <el-table-column label="交易金额" prop="totalamount" :formatter="unitFormat" align="center"></el-table-column>
        <el-table-column label="手续费" prop="feeamount" :formatter="unitFormat" align="center"></el-table-column>
        <el-table-column label="应结算金额" prop="payamount" :formatter="unitFormat" align="center"></el-table-column>
      </el-table>
    </div>
    <br/>
    <div class="fl bill_info">
      <p v-for="(item, index) in thisMonthDetail.logList">
        {{formatLogType(item.logtype)}}({{item.createdate}}): {{item.logcontent}}
      </p>
    </div>
    <el-row :gutter="20" style="margin-left:0px;margin-right:0px;margin-top:20px;">
      <el-col :span="3" :offset="8" style="text-align:right">
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
    <el-dialog title="核账争议" :visible.sync="dialogFormVisible" style="padding:10px 20px">
      <el-input v-model="content" type="textarea" :rows=8 placeholder='请输入核账争议内容'></el-input>
      <p>剩余字数:
        <span style="color:red;">{{getContentLen}}</span>
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDispute">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getBillDetail,
    downloadBill,
    businessDealBill,
    submitDispute
  } from '@/api/finance'
  import {
    phoneCutSensitive,
    nameCutSensitive
  } from '@/utils/index'

  export default {
    data() {
      return {
        thisMonthDetail: {
          detailListnopayed: [],
          logList: [],
          bill: {},
          detailListpayed: []
        },
        content: '',
        dialogFormVisible: false
      }
    },
    created() {
      this.initData()
    },
    computed: {
      period: function () {
        return this.thisMonthDetail.bill.startmonth + '--' + this.thisMonthDetail.bill.endmonth
      },
      formatStatus: function () {
        // 对账状态(0 待确认 1 已确认 2 待调账 3 已结算 )
        var type = ''
        switch (this.thisMonthDetail.bill.status) {
          case '0':
            type = '待确认'
            break
          case '1':
            type = '已确认'
            break
          case '2':
            type = '待调账'
            break
          case '3':
            type = '已结算'
            break
          default:
            break
        }
        return type
      },
      formatTransferfee: function () {
        if (this.thisMonthDetail.bill.transferfee !== undefined && this.thisMonthDetail.bill.transferfee !== null) {
          return '￥' + (this.thisMonthDetail.bill.transferfee / 100).toFixed(2)
        } else {
          return ''
        }
      },
      formatTotalpay: function () {
        if (this.thisMonthDetail.bill.totalpay !== undefined && this.thisMonthDetail.bill.totalpay !== null) {
          return '￥' + (this.thisMonthDetail.bill.transferfee / 100).toFixed(2)
        } else {
          return ''
        }
      },
      dealusernameFormat: function() {
        var name = nameCutSensitive(this.thisMonthDetail.bill.dealusername)
        return name !== '' ? name : '&nbsp;'
      },
      dealuserphoneFormat: function() {
        var phone = phoneCutSensitive(this.thisMonthDetail.bill.dealuserphone)
        return phone !== '' ? phone : '&nbsp;'
      },
      getContentLen() {
        if (this.content) {
          return (200 - this.content.length) < 0 ? 0 : (200 - this.content.length)
        } else {
          return 200
        }
      }
    },
    methods: {
      initData() {
        this.loading = true
        var params = {
          'billid': `${this.$route.query.id}`
        }
        getBillDetail(params).then(response => {
          if (response.status === 200) {
            this.thisMonthDetail = response.data
          } else {
            this.$message.error(response.msg)
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.error(error.msg)
        })
        this.loading = false
      },
      indexPayed(index) {
        return index
      },
      indexNopayed(index) {
        return index
      },
      typeFormat(row, column, cellValue) {
        // 11：货到付款，12：线下汇款，21：银联支付，22：手机支付，23：支付宝支付，
        // 24：网银支付，25：财付通支付，26：快钱支付，27：银联语音支付，32：话费支付
        var type = ''
        switch (cellValue) {
          case '11':
            type = '货到付款'
            break
          case '12':
            type = '线下汇款'
            break
          case '21':
            type = '银联支付'
            break
          case '22':
            type = '手机支付'
            break
          case '23':
            type = '支付宝支付'
            break
          case '24':
            type = '网银支付'
            break
          case '25':
            type = '财付通支付'
            break
          case '26':
            type = '快钱支付'
            break
          case '27':
            type = '银联语音支付'
            break
          case '32':
            type = '话费支付'
            break
          case '33':
            type = '联动支付'
            break
          case '34':
            type = '和包支付'
            break
          default:
            break
        }
        return type
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
          case '1':
            type = '争议日志'
            break
          case '2':
            type = '调账日志'
            break
          case '3':
            type = '清账日志'
            break
          case '4':
            type = '结算日志'
            break
          default:
            break
        }
        return type
      },
      downloadDetail() {
        downloadBill(this.thisMonthDetail.bill, 1).then(response => {
          if (response.status === 200) {
            this.$message.success('下载结算明细成功')
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      checkout() {
        var params = {
          'billid': `${this.thisMonthDetail.bill.id}`
        }
        businessDealBill(params).then(response => {
          if (response.status === 200) {
            this.$message.success('确认结账成功，等待管理员处理')
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      dispute() {
        this.dialogFormVisible = true
      },
      confirmDispute() {
        if (this.content === undefined || this.content === '') {
          this.$message.error('请填写争议内容')
          return
        } else {
          var params = {
            'billid': `${this.thisMonthDetail.bill.id}`,
            'content': this.content
          }
          submitDispute(params).then(response => {
            if (response.status === 200) {
              this.$message.success('提交成功')
            } else {
              this.$message.error(response.msg)
            }
          }).catch(error => {
            this.$message.error(error.msg)
          })
          this.dialogFormVisible = false
        }
      },
      handleConflict(orderInfo) {
        console.log(orderInfo)
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
    font: 12px/1.6 simsun, Arial;
  }

  .fl {
    float: left;
  }

</style>
