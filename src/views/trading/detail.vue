<template>
  <div style="padding: 15px;">
    <el-tabs type="border-card">
      <el-tab-pane label="交易信息">
        <el-row class="content">
          <el-col :span="12">
            <div class="clearfix mt10">
              <p class="textr fl bold">ID：</p>
              <p class="fl">{{bean.id}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">交易编号：</p>
              <p class="fl">{{bean.orderTradeNo}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">订单编号：</p>
              <p class="fl">{{bean.orderNumber}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">金额：</p>
              <p class="fl">{{'￥'+(bean.totalFee/100)}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">支付账户：</p>
              <p class="fl">{{getAccountSensitive(bean.payAccount)}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">退款金额：</p>
              <p class="fl">{{'￥'+(bean.refundFee)}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">支付时间：</p>
              <p class="fl">{{bean.createDate}}</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="clearfix mt10">
              <p class="textr fl bold">状态：</p>
              <p class="fl">{{bean.state==='1'?'付款成功':bean.state==='2'?'申请退款':'暂无'}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">外部平台编号：</p>
              <p class="fl">{{bean.outTradeNo}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">手机号码：</p>
              <p class="fl">{{getSensitivePhone(bean.customerPhone)}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">付款方式：</p>
              <p class="fl">{{bean.payType==='33'?'联动支付':bean.payType==='34'?'和包支付':bean.payType==='23'?'支付宝':bean.payType==='11'?'货到付款':bean.payType}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">收款账户：</p>
              <p class="fl">{{getAccountSensitive(bean.receiveAccount)}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">交易次数：</p>
              <p class="fl">{{bean.payTimes}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">最后更新：</p>
              <p class="fl">{{bean.updateDate}}</p>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="交易日志">
        <el-table :data="bean.onlineTradeLogs" style="width: 100%;margin-top: 15px;" border>
          <el-table-column width="180" align="center" prop="createDate" label="时间"></el-table-column>
          <el-table-column width="100" align="center" prop="logType" label="类型"></el-table-column>
          <el-table-column align="center" prop="logDesc" label="描述"></el-table-column>
          <el-table-column width="100" align="center" prop="" label="报文内容">
            <template slot-scope="scope">
              <el-button @click="getMessage(scope.row)" type="text" size="mini">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="相关订单"></el-tab-pane>
      <el-tab-pane label="订单结算记">
        <el-table :data="bean.orderTradeList" style="width: 100%;margin-top: 15px;" border>
          <el-table-column width="100" align="center" prop="orderCode" label="订单编号"></el-table-column>
          <el-table-column align="center" prop="goodsInfo" label="商品信息"></el-table-column>
          <el-table-column align="center" label="商家金额">
            <template slot-scope="scope">
              {{'￥'+(scope.row.merchantMoney/100)+'(商家ID'+scope.row.unitId+')'}}
            </template>
          </el-table-column>
          <el-table-column width="180" align="center" prop="payDate" label="支付时间"></el-table-column>
          <el-table-column width="180" align="center" prop="refundDate" label="退款时间"></el-table-column>
          <el-table-column width="180" align="center" prop="cancelDate" label="取消时间"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="报文内容" :visible.sync="dialogVisible" width="40%" center>
      <p class="mt0" style="word-wrap: break-word;">{{baowen}}</p>
    </el-dialog>
  </div>
</template>

<script>
import { getTradeDetail } from '@/api/trading'
import { phoneCutSensitive, accountCutSensitive } from '@/utils/index.js'
export default {
  created() {
    this.gid = this.$route.query.gid
    if (this.gid && this.gid > 0) {
      getTradeDetail(this.gid).then(res => {
        this.bean = res
      })
    }
  },
  data() {
    return {
      dialogVisible: false,
      baowen: {},
      bean: {
        onlineTradeLogs: [],
        orderTradeList: []
      }
    }
  },
  methods: {
    getSensitivePhone(phone) {
      return phoneCutSensitive(phone)
    },
    getAccountSensitive(name) {
      return accountCutSensitive(name)
    },
    getMessage(row) {
      this.baowen = row.logContent
      this.dialogVisible = true
      console.log(row)
    }
  }
}
</script>

<style scoped>
.content p{float: left;margin: 0;font-size: 14px;padding-left: 10px;}
.bold{font-weight: bold;}
.mt10{margin-top: 10px;}
.mt0{margin: 0;}
.textr{
  width: 120px;
  text-align: right;
}
</style>
