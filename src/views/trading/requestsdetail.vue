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
              <p class="textr fl bold">成功：</p>
              <p class="fl">否</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">返回状态：</p>
              <p class="fl">{{bean.respState}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">回调地址：</p>
              <p class="fl">{{bean.callbackUrl}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">商户地址：</p>
              <p class="fl">{{bean.merchantUrl}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">首次请求时间：</p>
              <p class="fl">{{bean.createDate}}</p>
            </div>
          </el-col>
          <el-col :span="12">
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
              <p class="textr fl bold">请求类型：</p>
              <p class="fl">{{bean.isRef==='1'?'退款':bean.isRef==='0'?'支付':'暂无'}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">商品名称：</p>
              <p class="fl">{{bean.goodsName}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">更新时间：</p>
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
    </el-tabs>
    <el-dialog title="报文内容" :visible.sync="dialogVisible" width="40%" center>
      <p class="mt0" style="word-wrap: break-word;">{{baowen}}</p>
    </el-dialog>
  </div>
</template>

<script>
import { getRequestDetail } from '@/api/trading'
import { phoneCutSensitive } from '@/utils/index.js'
export default {
  created() {
    this.gid = this.$route.query.gid
    if (this.gid && this.gid > 0) {
      getRequestDetail(this.gid).then(res => {
        this.bean = res
      })
    }
  },
  data() {
    return {
      baowen: '',
      dialogVisible: false,
      bean: {
        onlineTradeLogs: []
      }
    }
  },
  methods: {
    getSensitivePhone(phone) {
      return phoneCutSensitive(phone)
    },
    getMessage(row) {
      this.baowen = row.logContent
      this.dialogVisible = true
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
