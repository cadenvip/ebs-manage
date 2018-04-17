<template>
  <div style="padding: 20px;">
    <el-steps :active="active" finish-status="success">
      <el-step v-for="(item, index) in stepsArr" :title="item" :key="index"></el-step>
    </el-steps>
    <div class="addr-box">
      <p class="ft14 ftc" v-if="orderObj.orderDeliveryBean.transportType !== '0'">收货地址: {{getVal(orderObj.receiverLocationName)}} ，{{getVal(orderObj.userPhone)}}，{{getVal(orderObj.receiverAddress)}}，{{getVal(orderObj.receiverPostCode)}}</p>
    </div>
    <div class="info-box">
      <h1>订单信息</h1>
      <el-row :gutter="20" class="clearfix">
        <el-col :span="8">
          <p>订单编号：<span>{{getVal(orderObj.orderCode)}}</span></p>
          <p>订购人姓名： <span>{{getVal(orderObj.userName)}}</span></p>
          <p>优惠金额： <span class="money">{{getMoney(orderObj.specialOffer)}}</span></p>
          <p>备注：<span>{{getVal(orderObj.remark)}}</span></p>
        </el-col>
        <el-col :span="8">
          <p>订单状态：<span>{{getOrderState(orderObj.orderState)}}</span></p>
          <p>下单时间：<span>{{getVal(orderObj.orderValidDate)}}</span></p>
          <p>应支付金额：<span class="money">{{getMoney(orderObj.totalPrice)}}</span></p>
        </el-col>
        <el-col :span="8">
          <p>订购人电话：<span>{{getVal(orderObj.userPhone)}}</span></p>
          <p>订购渠道： <span>{{orderObj.comeFrom==='1'?'热线':orderObj.comeFrom==='2'?'WEP':orderObj.comeFrom==='3'?'WAP':orderObj.comeFrom==='4'?'手机客户端':orderObj.comeFrom==='5'?'触屏版':orderObj.comeFrom==='6'?'第三方平台':orderObj.comeFrom==='7'?'农资商城':'暂无'}}</span></p>
        </el-col>
      </el-row>
    </div>
    <div class="info-box">
      <el-row :gutter="20">
        <el-col :span="8">
          <h1>订单支付信息</h1>
          <p>付款方式：<span style="padding-right:4px;" v-for="item in payWay">{{item}}</span></p>
          <p>支付状态： <span>{{payState}}</span></p>
          <p v-if="orderObj.orderPayBean.payState==='1'||orderObj.orderPayBean.payState==='2'">已支付金额：<span class="money">￥0.00</span></p>
          <p v-else>已支付金额：<span class="money">{{getMoney(orderObj.orderPayBean.payFee)}}</span> </p>
        </el-col>
        <el-col :span="8" v-if="orderObj.orderDeliveryBean.transportType !== '0'">
          <h1>订单配送信息</h1>
          <p>配送方式：<span>{{transportType}}</span></p>
          <p>配送费用：<span class="money">{{getMoney(orderObj.orderDeliveryBean.transportFee)}}</span></p>
          <p>配送状态：<span>{{orderObj.orderDeliveryBean.transportState==='0'?'待配送':orderObj.orderDeliveryBean.transportState==='1'?'配送中':orderObj.orderDeliveryBean.transportState==='2'?'配送成功':orderObj.orderDeliveryBean.transportState==='3'?'配送失败':orderObj.orderDeliveryBean.transportState==='5'?'同步支付宝':'暂无'}}</span></p>
          <p>配送时限：<span>{{getVal(orderObj.orderDeliveryBean.transportTime)}}（小时）</span></p>
          <p>到货签收时间：<span>{{getVal(orderObj.orderDeliveryBean.receiveTime)}}</span></p>
        </el-col>
        <el-col :span="8" v-else>
          <h1>订单配送信息</h1>
          <p>配送方式：<span>自提</span></p>
        </el-col>
        <el-col :span="8">
          <h1>发票详情</h1>
          <p>发票抬头：<span v-if="orderObj.orderInvoiceBean">{{getVal(orderObj.orderInvoiceBean.invoiceSubject)}}</span><span v-else>暂无</span></p>
          <p>发票类型：<span v-if="orderObj.orderInvoiceBean">{{orderObj.orderInvoiceBean.invoiceType==='2'?'单位':orderObj.orderInvoiceBean.invoiceType==='1'?'个人':'暂无'}}</span><span v-else>暂无</span></p>
          <p>发票内容：<span v-if="orderObj.orderInvoiceBean">{{getVal(orderObj.orderInvoiceBean.invoiceInfo)}}</span><span v-else>暂无</span></p>
        </el-col>
      </el-row>
    </div>
    <div class="info-box" v-if="orderObj.orderDeliveryBean.logisticName !== null">
      <h1>物流信息</h1>
      <p>物流方式：<span>快递</span></p>
      <p>物流公司：<span>{{getVal(orderObj.orderDeliveryBean.logisticName)}}</span></p>
      <p>运单编号：<span>{{getVal(orderObj.orderDeliveryBean.logisticNo)}}</span></p>
    </div>
    <div v-else class="logistics-box info-box">
      <h1>物流信息</h1>
      <p class="tip">
        暂无任何物流信息！
      </p>
    </div>
    <div>
      <h1>操作记录</h1>
      <el-table :data="tableData3" border>
        <el-table-column prop="operateTime" label="操作时间" align="center"></el-table-column>
        <el-table-column prop="outOperator" label="操作人" align="center"></el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            {{getOrderState(scope.row.orderState)}}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      </el-table>
    </div>
    <div style="padding-bottom: 200px; text-align: center; margin-top: 45px;">
      <el-button @click="goBack" size="mini">返 回</el-button>
    </div>
  </div>
</template>

<script>
import { orderDetail } from '@/api/order/index.js'
export default {
  created() {
    this.oid = this.$route.query.oid
    if (this.oid) {
      this._getOrderDetail(this.oid)
    }
  },
  data() {
    return {
      stepsArr: [],
      active: 0,
      orderObj: {
        expQueryResultBean: {},
        orderDeliveryBean: {},
        orderFlowLogs: [],
        orderGoodsList: [],
        orderPayBean: {},
        orderRejectedBean: {
          orderRejectedImgBeanList: []
        },
        orderInvoiceBean: {}
      },
      payWay: [],
      payState: '',
      transportType: '',
      tableData3: []
    }
  },
  methods: {
    _getOrderDetail(oid) {
      orderDetail(oid).then(res => {
        if (res.status === 200) {
          Object.assign(this.orderObj, res.data)
          this.formatSteps(this.orderObj)
          this.getPayWay(this.orderObj.orderPayBean.payType)
          this.getPayState(this.orderObj.orderPayBean.payState)
          this.getTransportType(this.orderObj.orderDeliveryBean.transportType)
          this.tableData3 = this.orderObj.orderFlowLogs
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    formatSteps(obj) {
      if (obj.orderPayBean.payType === '11') {
        for (var i = 0; i < obj.orderFlowLogs.length; i++) {
          this.formateOperateType(obj.orderFlowLogs[i])
        }
        this.active = this.stepsArr.length
        switch (obj.orderState) {
          case '1':
            this.stepsArr.push('商家发货')
            this.stepsArr.push('用户收货')
            break
          case '2':
            this.stepsArr.push('用户收货')
            break
          case '5':
            this.stepsArr.push('退货签收')
            break
          case '9':
            this.stepsArr.push('商家审核退货')
            this.stepsArr.push('退货签收')
            break
          case '11':
            this.stepsArr.push('交易完成(退货失败)')
            break
          default:break
        }
      } else if (obj.orderPayBean.payType === '23' || obj.orderPayBean.payType === '33' || obj.orderPayBean.payType === '34') {
        for (var j = 0; j < obj.orderFlowLogs.length; j++) {
          this.formateOperateType(obj.orderFlowLogs[j])
        }
        if ((obj.orderState !== '4') || obj.orderState !== '6' || obj.orderState !== '10') {  // 括号里的判断需要加mark！！！！！！！！！！！！！！
          this.active = this.stepsArr.length
        }
        if (obj.orderState === '0') {
          this.stepsArr.push('等待支付', '商家发货', '用户收货', '交易完成')
        } else if (obj.orderState === '1') {
          this.stepsArr.push('等待发货', '用户收货', '交易完成')
        } else if (obj.orderState === '2') {
          this.stepsArr.push('等待收货', '交易完成')
        } else if (obj.orderState === '4') {    // 这里还需要判断 mark!!!!!!!!!!!!!!!!!!!!
          this.stepsArr.push('交易关闭(撤单)')
          this.active = this.stepsArr.length
        } else if (obj.orderState === '5') {
          this.stepsArr.push('商家退款', '交易关闭(退货)')
        } else if (obj.orderState === '6') {
          this.stepsArr.push('交易关闭(退货)')
          this.active = this.stepsArr.length
        } else if (obj.orderState === '9') {
          this.stepsArr.push('退货审核', '商家退款', '交易关闭(退货)')
        } else if (obj.orderState === '10') {
          this.stepsArr.push('交易失败(客户拒收)')
          this.active = this.stepsArr.length
        } else if (obj.orderState === '11') {
          this.stepsArr.push('交易完成(退货失败)')
        } else if (obj.orderState === '12') {
          this.stepsArr.push('定金支付', '尾款支付', '商家发货', '用户收货')
        } else if (obj.orderState === '13') {
          this.stepsArr.push('尾款支付', '商家发货', '用户收货')
        }
      } else if (obj.orderPayBean.payType === '32') {
        for (var k = 0; k < obj.orderFlowLogs.length; k++) {
          this.formateOperateType(obj.orderFlowLogs[k])
        }
        if (obj.orderState !== '6' || obj.orderState !== '8') {
          this.active = this.stepsArr.length
        }
        if (obj.orderState === '0') {
          this.stepsArr.push('等待支付', '商家发货', '用户收货', '交易完成')
        } else if (obj.orderState === '1') {
          this.stepsArr.push('等待发货', '用户收货')
        } else if (obj.orderState === '2') {
          this.stepsArr.push('等待收货')
        } else if (obj.orderState === '5') {
          this.stepsArr.push('商家确认收货', '交易关闭(退货)')
        } else if (obj.orderState === '6') {
          this.stepsArr.push('交易关闭(退货)')
          this.active = this.stepsArr.length
        } else if (obj.orderState === '8') {
          this.stepsArr.push('交易完成')
          this.active = this.stepsArr.length
        } else if (obj.orderState === '9') {
          this.stepsArr.push('商家审核退货', '商家确认收货', '交易关闭(退货)')
        } else if (obj.orderState === '11') {
          this.stepsArr.push('交易完成(退货失败)')
        }
      }
    },
    formateOperateType(obj) {
      switch (obj.operateType) {
        case '1':
          this.stepsArr.push('生成订单')
          break
        case '2':
          this.stepsArr.push('在线支付')
          break
        case '3':
          this.stepsArr.push('商家发货')
          break
        case '4':
          this.stepsArr.push('交易关闭（撤单）')
          break
        case '5':
          this.stepsArr.push('支付后撤单')
          break
        case '6':
          this.stepsArr.push('交易完成')
          break
        case '7':
          this.stepsArr.push('用户拒收')
          break
        case '8':
          this.stepsArr.push('用户退货')
          break
        case '9':
          this.stepsArr.push('退货成功')
          break
        case '10':
          this.stepsArr.push('退货失败')
          break
        case '11':
          this.stepsArr.push('商家退款')
          break
        case '12':
          this.stepsArr.push('退货签收')
          break
        case '13':
          this.stepsArr.push('交易完成')
          break
        case '14':
          this.stepsArr.push('交易完成(退货失败)')
          break
        case '16':
          this.stepsArr.push('定金支付')
          break
        case '17':
          this.stepsArr.push('尾款支付')
          break
        default:break
      }
    },
    getMoney(val) {
      if (val === null || val === '' || val === undefined) {
        return '暂无'
      } else {
        return '￥' + val
      }
    },
    getVal(val) {
      if (val === null || val === '' || val === undefined) {
        return '暂无'
      } else {
        return val
      }
    },
    getOrderState(val) {
      return val === '0' ? '待支付' : val === '1' ? '待发货' : val === '2' ? '已发货' : val === '4' ? '交易关闭（撤单）' : val === '5' ? '退货处理中' : val === '6' ? '交易关闭（退货）' : val === '7' ? '交易完成（退货失败）' : val === '8' ? '交易完成' : val === '9' ? '退货申请中' : val === '10' ? '交易失败' : val === '11' ? '退货失败' : val === '12' ? '待支付定金' : val === '13' ? '待支付尾款' : '暂无'
    },
    getPayWay(val) {
      if (val) {
        var tempArr = val.split('|')
        if (tempArr.length > 0) {
          for (var i = 0; i < tempArr.length; i++) {
            if (tempArr[i] !== '') {
              switch (tempArr[i]) {
                case '11':
                  this.payWay.push('货到付款')
                  break
                case '12':
                  this.payWay.push('线下汇款')
                  break
                case '21':
                  this.payWay.push('银联支付')
                  break
                case '23':
                  this.payWay.push('支付宝支付')
                  break
                case '22':
                  this.payWay.push('手机支付')
                  break
                case '24':
                  this.payWay.push('网银支付')
                  break
                case '25':
                  this.payWay.push('财付通支付')
                  break
                case '26':
                  this.payWay.push('快钱支付')
                  break
                case '27':
                  this.payWay.push('银联语音支付')
                  break
                case '32':
                  this.payWay.push('话费支付')
                  break
                case '33':
                  this.payWay.push('联动支付')
                  break
                case '34':
                  this.payWay.push('和包支付')
                  break
                default:break
              }
            }
          }
        } else {
          this.payWay.push('暂无')
        }
      } else {
        return '暂无'
      }
    },
    getPayState(val) {
      if (val) {
        switch (val) {
          case '0':
            this.payState = ('已支付')
            break
          case '1':
            this.payState = ('待支付')
            break
          case '2':
            this.payState = ('支付失败')
            break
          case '3':
            this.payState = ('退款中')
            break
          case '4':
            this.payState = ('已退款')
            break
          case '5':
            this.payState = ('待支付定金')
            break
          case '6':
            this.payState = ('待支付尾款')
            break
          case '7':
            this.payState = ('支付定金失败')
            break
          default:break
        }
      }
    },
    getTransportType(val) {
      if (val) {
        switch (val) {
          case '0':
            this.transportType = '自提'
            this.dialogTransport = '自提'
            break
          case '1':
            this.transportType = '商家送货上门'
            this.dialogTransport = '商家送货上门'
            break
          case '2':
            this.transportType = ('EMS')
            this.dialogTransport = 'EMS'
            break
          case '3':
            this.transportType = ('顺丰')
            this.dialogTransport = '顺丰'
            break
          case '4':
            this.transportType = ('圆通')
            this.dialogTransport = '圆通'
            break
          case '5':
            this.transportType = ('申通')
            this.dialogTransport = '申通'
            break
          case '6':
            this.transportType = ('中通')
            this.dialogTransport = '中通'
            break
          case '7':
            this.transportType = ('韵达')
            this.dialogTransport = '韵达'
            break
          case '8':
            this.transportType = ('汇通')
            this.dialogTransport = '汇通'
            break
          case '9':
            this.transportType = ('宅急送')
            this.dialogTransport = '宅急送'
            break
          case '20':
            this.transportType = ('EMAIL')
            this.dialogTransport = 'EMAIL'
            break
          case '21':
            this.transportType = ('FAX')
            this.dialogTransport = 'FAX'
            break
          case '99':
            this.transportType = ('快递')
            this.dialogTransport = '快递'
            break
          default:break
        }
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.addr-box{color: #333;background-color: #ecfdef;border: #b8d9bd solid 1px;padding: 10px;margin: 15px 0;}
h1{height: 30px;line-height: 30px;font-size: 16px;color: #e47911;padding-left: 15px;border-bottom: #dcd4ca solid 1px;}
.info-box{color:#797979;font-size: 13px;}
.info-box span{color:#2b2b2b;}
.money{color: #ff7e00 !important;font-weight: bold;}
.tip{display: inline-block;color: #656565;font-size: 13px; padding-left: 25px;clear: right;padding-right: 25px; height: 24px;line-height: 24px;border: #ffcc7f solid 1px;}
</style>
