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
              {{ (billDetail.bill.merchantname !== null) ? billDetail.bill.merchantname : '&nbsp;' }}
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
              {{ billDetail.bill.dealusername !== null ? billDetail.bill.dealusername : '&nbsp;' }}
            </span> 
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              对账电话：
            </span> 
          </el-col>
          <el-col :span="8">
            <span>
              {{ billDetail.bill.dealuserphone }}
            </span> 
          </el-col>
        </el-row>
      </div>
      <h3>交易明细</h3>
      <div style="text-align: right;margin-bottom:12px">
        <el-button @click="addOrder" type="primary" >新增</el-button>        
        <el-button @click="deleteOrderList" type="primary" >批量移除</el-button>        
      </div>
      <el-table 
        :data="detailList" 
        v-loading.body="loading" 
        element-loading-text="Loading"
        border stripe fit highlight-current-row 
        tooltip-effect="light" 
        style="padding-left:10px"
        @selection-change="orderSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="序号" type="index" :index="indexList" width="50" align="center"></el-table-column>
        <el-table-column label="订单号" prop="ordercode" width="110" align="center"></el-table-column>
        <el-table-column label="订单下单时间" prop="ordertime" :show-overflow-tooltip="true" width="180" align="center"></el-table-column>
        <el-table-column label="订单完成时间" prop="finishtime" :show-overflow-tooltip="true" width="180" align="center"></el-table-column>
        <el-table-column label="支付渠道" prop="paytype" :formatter="typeFormat" width="100" align="center"></el-table-column>
        <el-table-column label="交易金额" prop="totalamount" :formatter="unitFormat" width="100" align="center"></el-table-column>
        <el-table-column label="手续费" prop="feeamount" :formatter="unitFormat" width="100" align="center"></el-table-column>
        <el-table-column label="应结算金额" prop="payamount" :formatter="unitFormat" width="100" align="center"></el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button @click="deleteOrder(scope.row)" type="text" size="small">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br/>
    <div style="text-align: center">
      <el-button @click="commitBill" type="primary" >提 交</el-button>        
      <el-button @click="goback" type="primary" >返 回</el-button>        
    </div>
    <el-dialog title="选择订单" :visible.sync="orderTableVisible" width="770px">
      <el-form ref="orderSearchForm" :model="orderSearchForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="orderSearchForm.orderCode" clearable style="width: 180px;" placeholder="请输入订单编号"></el-input>
          </el-col>
          <el-col :span="6">
            <!-- 农产品直供[0：待支付，1：待发货，2：已发货，4：交易关闭（撤单），
            5：退货处理中，6：交易关闭（退货），7：交易完成（退货失败），
            8：交易完成，9：退货申请中，10：交易失败，11：退货失败，12：待支付定金，13：待支付尾款]； -->
            <el-select v-model="orderSearchForm.orderState" clearable style="width: 180px;" placeholder="请选择订单状态">
              <el-option label="待支付" value="0"></el-option>
              <el-option label="待发货" value="1"></el-option>
              <el-option label="已发货" value="2"></el-option>
              <!-- <el-option label="退款中" value="3"></el-option> -->
              <el-option label="交易关闭（撤单）" value="4"></el-option>
              <el-option label="退货处理中" value="5"></el-option>
              <el-option label="交易关闭（退货）" value="6"></el-option>
              <el-option label="交易完成（退货失败）" value="7"></el-option>
              <el-option label="交易完成" value="8"></el-option>
              <el-option label="退货申请中" value="9"></el-option>              
              <el-option label="交易失败" value="10"></el-option>
              <el-option label="退货失败" value="11"></el-option>
              <el-option label="待支付定金" value="12"></el-option>
              <el-option label="待支付尾款" value="13"></el-option>              
            </el-select>
          </el-col>
          <el-col :span="6">
            <!-- 支付状态，0：已支付，1：未支付，2：支付失败，3：退款中，
            4：已退款，5：待支付定金，6：待支付尾款，7：定金支付失败 -->
            <el-select v-model="orderSearchForm.payState" clearable style="width: 180px;" placeholder="请选择支付状态">
              <el-option label="已支付" value="0"></el-option>
              <el-option label="未支付" value="1"></el-option>
              <el-option label="支付失败" value="2"></el-option>
              <el-option label="退款中" value="3"></el-option>
              <el-option label="已退款" value="4"></el-option>
              <el-option label="待支付定金" value="5"></el-option>
              <el-option label="待支付尾款" value="6"></el-option>
              <el-option label="定金支付失败" value="7"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button @click="queryOrder()" type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <br/>
      <el-table :data="allOrderList" ref="allOrderTable" tooltip-effect="dark" @selection-change="allOrderSelectionChange">
        <el-table-column type="selection" :reserve-selection="true" width="40"></el-table-column>
        <el-table-column label='订单编号' prop="orderCode" width="120" align="center"></el-table-column>
        <el-table-column label='订购人电话' prop="userPhone" width="120" align="center"></el-table-column>
        <el-table-column label="订单状态" prop="orderStateName" width="140" align="center"></el-table-column>
        <el-table-column label="支付状态" prop="payStateName" width="120" align="center"></el-table-column>
        <el-table-column label="订单时间" prop="orderTime" width="180" align="center"></el-table-column>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelected">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBillDetail, adjustBill, queryOrderList } from '@/api/finance'

export default {
  data() {
    return {
      detailList: [],
      detailListBack: [],
      deleteList: [],
      billDetail: {
        detailListnopayed: [],
        logList: [],
        bill: {},
        detailListpayed: []
      },
      orderTableVisible: false,
      allOrderList: [],
      allOrderListBack: [],
      addedOrderList: [],
      pagesizes: [10, 20, 30, 50],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      orderSearchForm: {
        orderCode: '',
        orderState: '',
        payState: ''
      }
    }
  },
  created() {
    this.initData()
  },
  computed: {
    period: function() {
      if (this.billDetail.bill.startmonth !== null && this.billDetail.bill.endmonth !== null) {
        return this.billDetail.bill.startmonth + '--' + this.billDetail.bill.endmonth
      } else {
        return ''
      }
    },
    formatStatus: function() {
      // 对账状态(0 待确认 1 已确认 2 待调账 3 已结算 )
      var type = ''
      if (this.billDetail.bill.status !== null) {
        switch (this.billDetail.bill.status) {
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
          default:break
        }
      }
      return type
    }
  },
  methods: {
    initData() {
      this.loading = true
      var params = { 'billid': `${this.$route.query.id}` }
      getBillDetail(params).then(response => {
        if (response.status === 200) {
          if (response.data === null) {
            this.$message.error('订单已经不存在！')
          } else {
            this.billDetail = response.data
            this.detailList = this.billDetail.detailListnopayed.concat(this.billDetail.detailListpayed)
            this.detailListBack = this.detailList
            this.listAllOrder()
          }
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
    indexList(index) {
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
        default:break
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
    deleteOrder(bill) {
      alert('移除一行')
      var index = this.detailList.indexOf(bill)
      if (index >= 0) {
        this.detailList.splice(index, 1)
      }
      // TODO 在备选中添加相应订单
    },
    deleteOrderList() {
      alert('批量移除')
      for (var i = 0; i < this.deleteList.length; i++) {
        var index = this.detailList.indexOf(this.deleteList[i])
        if (index >= 0) {
          this.detailList.splice(index, 1)
        }
      }
      // 在备选中添加相应订单
    },
    addOrder() {
      this.orderTableVisible = true
    },
    listAllOrder() {
      var params = { merchantId: `${this.billDetail.bill.merchantcode}` }
      queryOrderList(params).then(response => {
        if (response.status === 200) {
          // TODO 排除已选择
          this.allOrderList = []
          this.allOrderListBack = response.data // 备份所有订单
          var allOrderListTmp = response.data
          if (allOrderListTmp !== undefined && allOrderListTmp !== null && allOrderListTmp.length > 0) {
            if (this.detailList !== undefined && this.detailList !== null  && this.detailList.length > 0) {
              allOrderListTmp.forEach(item => {
                var i = 0
                for (; i < this.detailList.length; i++) {
                  if (item.orderCode === this.detailList[i].ordercode) {
                    break
                  }
                }
                if (i === this.detailList.length) {
                  this.allOrderList.push(item)
                }
              })
              this.total = this.allOrderList.length
            } else {
              this.allOrderList = allOrderListTmp
              this.total = response.total
            }
          }
          // this.allOrderList = response.data
          // this.total = response.total
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    queryOrder() {
      var params = {
        'merchantId': `${this.billDetail.bill.merchantcode}`,
        'orderCode': `${this.orderSearchForm.orderCode}`,
        'orderState': `${this.orderSearchForm.orderState}`,
        'payState': `${this.orderSearchForm.payState}`,
        'page': `${this.currentPage}`,
        'pageSize': `${this.pagesize}`
      }
      queryOrderList(params).then(response => {
        if (response.status === 200) {
          // TODO 排除已选择
          this.allOrderList = []
          var allOrderListTmp = response.data
          if (allOrderListTmp !== undefined && allOrderListTmp !== null && allOrderListTmp.length > 0) {
            if (this.detailList !== undefined && this.detailList !== null  && this.detailList.length > 0) {
              allOrderListTmp.forEach(item => {
                var i = 0
                for (; i < this.detailList.length; i++) {
                  if (item.orderCode === this.detailList[i].ordercode) {
                    break
                  }
                }
                if (i === this.detailList.length) {
                  this.allOrderList.push(item)
                }
              })
              this.total = this.allOrderList.length
            } else {
              this.allOrderList = allOrderListTmp
              this.total = response.total
            }
          }
          // this.allOrderList = response.data
          // this.total = response.total
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.queryOrder()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryOrder()
    },
    orderSelectionChange(val) {
      this.deleteList = []
      this.deleteList = val
    },
    allOrderSelectionChange(val) {
      this.addedOrderList = val
    },
    confirmSelected() {
      alert('选择订单')
      // TODO 调用接口，返回计算后的订单信息
      this.orderTableVisible = false
    },
    commitBill() {
      // TODO 对比，找出删除的订单，新增的订单
      var params = {
        'removeOrdercodeList': ['1000049999', '1000050000'],
        'addOrdercodeList': ['1000049981', '1000049909', '1000050009', '1000049968'],
        'unitid': '29',
        'billid': '3983',
        'content': '调账日志内容，订单1000049981出错！'
      }
      adjustBill(params).then(response => {
        if (response.status === 200) {
          this.$message.success('提交成功！')
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    goback() {
      this.$router.go(-1)
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
