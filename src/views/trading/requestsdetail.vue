<template>
  <div>
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
              <p class="fl">不知道</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">返回状态：</p>
              <p class="fl">不知道</p>
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
              <p class="fl">{{bean.customerPhone}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">付款方式：</p>
              <p class="fl">{{bean.payType==='33'?'联动支付':bean.payType==='34'?'和包支付':bean.payType==='23'?'支付宝':bean.payType==='11'?'货到付款':bean.payType}}</p>
            </div>
            <div class="clearfix mt10">
              <p class="textr fl bold">请求类型：</p>
              <p class="fl">不知道</p>
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
      <el-tab-pane label="交易日志"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getRequestDetail } from '@/api/trading'
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
      bean: {}
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
