<template>
  <div class="pad20">
    <div class="part" style="margin: 0;">
      <h1>处理流程</h1>
      <div class="clearfix mt15">
        <div v-for="item in tableData3" class="clearfix fl flowpic-box">
          <div v-if="item.operateType === '1'" class="flowpic-box"><div class="flowpic">生成订单</div><div class="arrow"></div></div>
          <div v-if="item.operateType === '4'" class="flowpic-box"><div class="flowpic" title="交易关闭(撤单)">交易关闭</div></div>
          <div v-if="item.operateType === '2'" class="flowpic-box"><div class="flowpic">在线支付</div><div class="arrow"></div></div>
          <div v-if="item.operateType === '3'" class="flowpic-box"><div class="flowpic">商家发货</div><div class="arrow"></div></div>
          <div v-if="item.operateType === '5'" class="flowpic-box"><div class="flowpic" title="支付后撤单">支付后撤单</div><div class="arrow"></div></div>
          <div v-if="item.operateType === '6'" class="flowpic-box"><div class="flowpic">交易完成</div></div>
          <div v-if="item.operateType === '7'" class="flowpic-box"><div class="flowpic">用户拒收</div><div class="arrow"></div></div>
          <div v-if="item.operateType === '8'" class="flowpic-box"><div class="flowpic">用户退货</div><div class="arrow"></div></div>
          <div v-if="item.operateType === '9'" class="flowpic-box"><div class="flowpic">退货成功</div><div class="arrow"></div></div>
          <div v-if="item.operateType === '10'" class="flowpic-box"><div class="flowpic">退货失败</div><div class="arrow"></div></div>
          <div v-if="item.operateType === '11'" class="flowpic-box"><div class="flowpic">商家退款</div><div class="arrow"></div></div>
          <div v-if="item.operateType === '12'" class="flowpic-box"><div class="flowpic">退货签收</div><div class="arrow"></div></div>
          <div v-if="item.operateType === '13'" class="flowpic-box"><div class="flowpic">交易完成</div></div>
          <div v-if="item.operateType === '14'" class="flowpic-box"><div class="flowpic" title="交易完成(退货失败)">退货失败</div></div>
          <div v-if="item.operateType === '16'" class="flowpic-box"><div class="flowpic">定金支付</div><div class="arrow"></div></div>
          <div v-if="item.operateType === '17'" class="flowpic-box"><div class="flowpic">尾款支付</div><div class="arrow"></div></div>
        </div>
        <div v-if="orderState==='0'" class="fl">
          <div class="flowpic bg-gray fl">在线支付</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">商家发货</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">用户拒收</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">交易完成</div>
        </div>
        <div v-if="orderState==='1'" class="fl">
          <div class="flowpic bg-gray fl">商家发货</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">用户拒收</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">交易完成</div>
        </div>
        <div v-if="orderState==='2'" class="fl">
          <div class="flowpic bg-gray fl">用户收货</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">交易完成</div>
        </div>
        <div v-if="orderState==='4'" class="fl">
          <div class="flowpic fl" title="交易关闭(撤单)">交易关闭</div>
        </div>
        <div v-if="orderState==='5'" class="fl">
          <div class="flowpic bg-gray fl">退货签收</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl" title="交易关闭(退货)">交易关闭</div>
        </div>
        <div v-if="orderState==='6'" class="fl">
          <div class="flowpic fl" title="交易关闭(退货)">交易关闭</div>
        </div>
        <div v-if="orderState==='9'" class="fl">
          <div class="flowpic bg-gray fl">退货审核</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">退货签收</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl" title="交易关闭(退货)">交易关闭</div>
        </div>
        <div v-if="orderState==='10'" class="fl">
          <div class="flowpic bg-gray fl" title="交易失败(客户拒收)">交易失败</div>
        </div>
        <div v-if="orderState==='11'" class="fl">
          <div class="flowpic bg-gray fl" title="交易完成(退货失败)">退货失败</div>
        </div>
        <div v-if="orderState==='12'" class="fl">
          <div class="flowpic bg-gray fl">定金支付</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">尾款支付</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">商家发货</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">用户收货</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">交易完成</div>
        </div>
        <div v-if="orderState==='13'" class="fl">
          <div class="flowpic bg-gray fl">尾款支付</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">商家发货</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">用户收货</div><div class="arrow-gray fl"></div>
          <div class="flowpic bg-gray fl">交易完成</div>
        </div>
      </div>
    </div>
    <div class="part">
      <h1>订单明细</h1>
      <div class="con-box">
        <div class="clearfix tr-con">
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="8">
                <p>订单编号:</p>
                <p>订购人姓名:</p>
                <p>优惠金额:</p>
              </el-col>
              <el-col class="text-l" :span="16">
                <p>{{getVal(orderObj.orderCode)}}</p>
                <p>{{getSensitiveName(getVal(orderObj.userName))}}</p>
                <p class="money">{{getMoney(orderObj.specialOffer)}}</p>
              </el-col>
            </el-row>
          </div>
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="8">
                <p>订单状态:</p>
                <p>下单时间:</p>
                <p>应付金额:</p>
              </el-col>
              <el-col class="text-l" :span="16">
                <p>{{getOrderState(orderObj.orderState)}}</p>
                <p>{{getVal(orderObj.orderValidDate)}}</p>
                <p class="money">{{getMoney(orderObj.totalPrice)}}</p>
              </el-col>
            </el-row>
          </div>
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="12">
                <p>订购人电话:</p>
                <p>操作员工号:</p>
                <p>订购渠道:</p>
              </el-col>
              <el-col class="text-l" :span="12">
                <p>{{getSensitivePhone(getVal(orderObj.userPhone))}}</p>
                <p>{{getVal(orderObj.operator)}}</p>
                <p>{{orderObj.comeFrom==='1'?'热线':orderObj.comeFrom==='2'?'WEP':orderObj.comeFrom==='3'?'WAP':orderObj.comeFrom==='4'?'手机客户端':orderObj.comeFrom==='5'?'触屏版':orderObj.comeFrom==='6'?'第三方平台':orderObj.comeFrom==='7'?'农资商城':'暂无'}}</p>
              </el-col>
            </el-row>
          </div>
        </div>
        <p class="bt-info">备注: {{orderObj.remark ===null?'无':orderObj.remark}}</p>
      </div>
    </div>
    <div class="part">
      <h1>订单支付信息</h1>
      <div class="con-box">
        <div class="clearfix tr-con">
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="8">
                <p style="height:45px;">支付方式:</p>
                <p>已退款金额:</p>
              </el-col>
              <el-col class="text-l" :span="16">
                <p style="height:45px;"><span style="padding-right:4px;" v-for="item in payWay">{{item}}</span></p>
                <p v-if="orderObj.orderRejectedBean">{{getMoney(orderObj.orderRejectedBean.refundMoney)}}</p>
                <p v-else>暂无</p>
              </el-col>
            </el-row>
          </div>
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="8">
                <p>支付状态:</p>
              </el-col>
              <el-col class="text-l" :span="16">
                <p>{{payState}}</p>
              </el-col>
            </el-row>
          </div>
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="12">
                <p>已付金额:</p>
              </el-col>
              <el-col class="text-l" :span="12">
                <p class="money" v-if="orderObj.orderPayBean.payState==='1'||orderObj.orderPayBean.payState==='2'">￥0.00</p>
                <p class="money" v-else>{{getMoney(orderObj.orderPayBean.payFee)}}</p>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="part">
      <h1>订单配送信息</h1>
      <div class="con-box">
        <div class="clearfix tr-con">
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="8">
                <p>配送方式:</p>
                <p>配送时限:</p>
              </el-col>
              <el-col class="text-l" :span="16">
                <p>{{transportType}}</p>
                <p>{{getVal(orderObj.orderDeliveryBean.transportTime)}}（小时）</p>
              </el-col>
            </el-row>
          </div>
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="8">
                <p>配送费用:</p>
                <p>发货时间:</p>
              </el-col>
              <el-col class="text-l" :span="16">
                <p class="money">{{getMoney(orderObj.orderDeliveryBean.transportFee)}}</p>
                <p>{{getVal(orderObj.orderDeliveryBean.sendTime)}}</p>
              </el-col>
            </el-row>
          </div>
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="12">
                <p>配送状态:</p>
                <p>到货签收时间:</p>
              </el-col>
              <el-col class="text-l" :span="12">
                <p>{{getVal(transportState)}}</p>
                <p>{{getVal(orderObj.orderDeliveryBean.receiveTime)}}</p>
              </el-col>
            </el-row>
          </div>
        </div>
        <p class="bt-info">物流公司名称: {{getVal(orderObj.orderDeliveryBean.logisticName)}}</p>
      </div>
    </div>
    <div class="part">
      <h1>订单收货人信息</h1>
      <div class="con-box">
        <div class="clearfix tr-con">
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="8">
                <p>收货人姓名:</p>
                <p>手机号码:</p>
                <p>邮编:</p>
              </el-col>
              <el-col class="text-l" :span="16">
                <p>{{getVal(orderObj.receiverName)}}</p>
                <p>{{getSensitivePhone(getVal(orderObj.receiverMobile))}}</p>
                <p>{{getVal(orderObj.receiverPostCode)}}</p>
              </el-col>
            </el-row>
          </div>
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="8">
                <p>区域编码:</p>
                <p>座机号码:</p>
                <p>传真:</p>
              </el-col>
              <el-col class="text-l" :span="16">
                <p>{{getVal(orderObj.receiverLocationCode)}}</p>
                <p>{{getVal(orderObj.receiverPhone)}}</p>
                <p>{{getVal(orderObj.fax)}}</p>
              </el-col>
            </el-row>
          </div>
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="12">
                <p>区域名称:</p>
                <p>Email:</p>
                <p>运单号码:</p>
              </el-col>
              <el-col class="text-l" :span="12">
                <p>{{getVal(orderObj.receiverLocationName)}}</p>
                <p>{{getVal(orderObj.email)}}</p>
                <a @click="openDialog" style="color: #239cdf;font-size:12px;font-weight: bold;">查看</a>
              </el-col>
            </el-row>
          </div>
        </div>
        <p class="bt-info">详细地址: {{getVal(orderObj.receiverAddress)}}</p>
      </div>
    </div>
    <div class="part">
      <h1>支付记录</h1>
      <el-table :data="tableData1" border style="width: 770px;">
        <el-table-column prop="sid" label="流水号" align="center"></el-table-column>
        <el-table-column prop="operType" label="操作类型" align="center"></el-table-column>
        <el-table-column prop="payFrom" label="付款方" align="center"></el-table-column>
        <el-table-column prop="payTo" label="收款方" align="center"></el-table-column>
        <el-table-column prop="amount" label="金额(元)" align="center"></el-table-column>
        <el-table-column prop="payResult" label="操作结果" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="part">
      <h1>订单商品信息</h1>
      <el-table :data="tableData2" border style="width: 770px;">
        <el-table-column prop="goodsCode" label="商品编号" align="center"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="weight" label="商品重量(克)" align="center"></el-table-column>
        <el-table-column prop="unitName" label="计量单位" align="center"></el-table-column>
        <el-table-column prop="price" label="价格 (元)" align="center"></el-table-column>
        <el-table-column prop="quantity" label="数量" align="center"></el-table-column>
        <el-table-column prop="total" label="小计 (元)" align="center"></el-table-column>
      </el-table>
      <div class="totalPrice">
        <span style="color: #787878;font-size: 15px;font-weight: bold;">总计 (元)：</span>
        <span style="color: #FE8D47;font-size: 15px;">{{getMoney(orderObj.plusPrice)}}</span>
      </div>
    </div>
    <div class="part" v-if="orderObj.orderRejectedBean">
      <h1>退货信息</h1>
      <div class="con-box">
        <div class="clearfix tr-con">
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="8">
                <p>退货原因:</p>
                <p>应退款金额:</p>
                <p>申请时间:</p>
              </el-col>
              <el-col class="text-l" :span="16">
                <p v-if="orderObj.orderRejectedBean">
                  {{orderObj.orderRejectedBean.reason === '1'?'无理由':orderObj.orderRejectedBean.reason === '2'?'个人原因':orderObj.orderRejectedBean.reason === '3'?'商品质量原因':orderObj.orderRejectedBean.reason === '4'?'快递原因':'暂无'}}
                </p>
                <p v-else>暂无</p>
                <p>{{getMoney(orderObj.orderRejectedBean.refundMoney)}}</p>
                <p>{{getVal(orderObj.orderRejectedBean.requestDate)}}</p>
              </el-col>
            </el-row>
          </div>
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="8">
                <p>审核人:</p>
                <p>审核状态:</p>
                <p>审核时间:</p>
              </el-col>
              <el-col class="text-l" :span="16">
                <p>{{getVal(orderObj.orderRejectedBean.auditPerson)}}</p>
                <p>{{auditStatus}}</p>
                <p>{{getVal(orderObj.orderRejectedBean.auditDate)}}</p>
              </el-col>
            </el-row>
          </div>
          <div class="fl">
            <el-row style="overflow: hidden;">
              <div class="block" v-if="orderObj.orderRejectedBean">
                <span style="font-size: 12px;color:#787878;font-weight: bold; padding-left: 10px;">退货图片：</span>
                <el-carousel v-if="orderObj.orderRejectedBean.orderRejectedImgBeanList && orderObj.orderRejectedBean.orderRejectedImgBeanList.length>0" trigger="click" height="120px" indicator-position="none">
                  <el-carousel-item v-for="item in orderObj.orderRejectedBean.orderRejectedImgBeanList" :key="item">
                    <img :src="item" alt="">
                  </el-carousel-item>
                </el-carousel>
                <span v-else style="font-size: 12px;color:#787878;font-weight: bold;">暂无</span>
              </div>
              <div v-else>
                <el-col class="text-r" :span="12">
                  <p style="font-size: 12px;color:#787878;font-weight: bold;">退货图片:</p>
                </el-col>
                <el-col class="text-l" :span="12">
                  <p style="font-size: 12px;color:#787878;font-weight: bold;">暂无</p>
                </el-col>
              </div>
            </el-row>
          </div>
        </div>
        <p class="bt-info">退货说明: {{getVal(orderObj.orderRejectedBean.remark)}}</p>
        <p class="bt-info">审核意见: {{getVal(orderObj.orderRejectedBean.auditRemark)}}</p>
      </div>
    </div>
    <div class="part">
      <h1>操作记录</h1>
      <el-table :data="tableData3" border style="width: 770px;">
        <el-table-column prop="operateTime" label="操作时间" align="center"></el-table-column>
        <el-table-column label="操作人" align="center">
          <template slot-scope="scope">
            {{getSensitiveName(scope.row.outOperator)}}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            {{getOrderState(scope.row.orderState)}}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="part"  v-if="operateFlag === '1'">
      <h1>处理意见</h1>
      <div style="width: 770px;">
        <el-input v-model.trim="suggestion" :maxlength="100" type="textarea"></el-input>
        <p style="font-size: 12px;">剩余字符：<span style="color: red;">{{getResidualLen}}</span></p>
      </div>
    </div>
    <div style="margin-top: 20px;width:770px;text-align:center;padding-bottom:200px;">
      <el-button  v-if="operateFlag === '1'" @click="shipments" size="mini">发货</el-button>
      <el-button @click="goBack" size="mini">返回</el-button>
    </div>
    <el-dialog title="物流信息" :visible.sync="dialogVisible" center>
      <div v-if="dialogForm.orderDeliveryBean.logisticName">
        <p>物流方式：<span>{{dialogTransport}}</span></p>
        <p v-if="dialogForm.orderDeliveryBean.sendCompanyCode && dialogForm.orderDeliveryBean.sendCompanyCode!=='privateLogistics'">物流公司: {{dialogForm.logisticCompanyBean.companyName?dialogForm.logisticCompanyBean.companyName:'暂无'}}</p>
        <p v-else>物流公司: {{dialogForm.orderDeliveryBean.logisticName?dialogForm.orderDeliveryBean.logisticName:'暂无'}}</p>
        <p>运单号码：<span>{{dialogForm.orderDeliveryBean.logisticNo}}</span></p>
        <p v-if="dialogForm.orderDeliveryBean.sendCompanyCode === 'privateLogistics'">查询电话：<span>{{dialogForm.orderDeliveryBean.sendExpTel}}</span></p>
        <p v-else>
          <p v-if="dialogForm.logisticCompanyBean">查询电话：<span>{{dialogForm.logisticCompanyBean.serviceCall}}</span></p>
        </p>
        <p v-if="dialogForm.orderDeliveryBean.sendRemark">备注：<span>{{dialogForm.orderDeliveryBean.sendRemark}}</span></p>
        <div v-if="dialogForm.expResultDataBeanList && dialogForm.expResultDataBeanList.length>0">
          <p>物流跟踪：以下跟踪信息由<a style="color: #6AA6FA;" href="http://www.kuaidi100.com/" target="_blank">快递100</a>提供，如有疑问请到物流公司官网查询</p>
          <p style="color: #4791D0;font-size: 12px;padding-left: 70px;" v-for="item in dialogForm.expResultDataBeanList">
            {{item.time}} {{item.context}}
          </p>
        </div>
      </div>
      <div v-else>
        <p>对不起，暂时没有任何物流信息！</p>
      </div>
      <div style="text-align: center;">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { orderDetail, getDeleveryDetail } from '@/api/order/index.js'
import { phoneCutSensitive, nameCutSensitive } from '@/utils/index.js'
export default {
  created() {
    this.oid = this.$route.query.oid
    this.operateFlag = this.$route.query.operateFlag
    if (this.openDialog === '1') {
      // 来至发货
    }
    if (this.oid) {
      this._getOrderDetail(this.oid)
    }
  },
  data() {
    return {
      suggestion: '', // 处理意见
      operateFlag: '',
      dialogVisible: false,
      dialogForm: {
        expQueryResultBean: {},
        orderDeliveryBean: {},
        logisticCompanyBean: {},
        expResultDataBeanList: []
      },
      orderObj: {
        expQueryResultBean: {},
        orderDeliveryBean: {},
        orderFlowLogs: [],
        orderGoodsList: [],
        orderPayBean: {},
        orderRejectedBean: {
          orderRejectedImgBeanList: []
        }
      },
      orderState: '',
      payWay: [],
      payState: '',
      transportType: '',
      transportState: '',   // 配送状态
      auditStatus: '',      // 审核状态
      tableData1: [],
      tableData2: [],
      tableData3: [],
      dialogTransport: ''
    }
  },
  methods: {
    getSensitivePhone(phone) {
      return phoneCutSensitive(phone)
    },
    getSensitiveName(name) {
      return nameCutSensitive(name)
    },
    _getDeleveryDetail(oid) {
      if (oid) {
        getDeleveryDetail({ orderId: oid }).then(res => {
          if (res.status === 200) {
            this.dialogForm = res.data
            if (this.dialogForm.orderDeliveryBean.logisticName) {
              this.getTransportType(this.dialogForm.orderDeliveryBean.transportType)
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }
    },
    _getOrderDetail(oid) {
      orderDetail(oid).then(res => {
        if (res.status === 200) {
          this.orderObj = res.data
          this.getPayWay(this.orderObj.orderPayBean.payType)
          this.getPayState(this.orderObj.orderPayBean.payState)
          this.getTransportType(this.orderObj.orderDeliveryBean.transportType)
          this.getTransportState(this.orderObj.orderDeliveryBean.transportState)
          if (this.orderObj.orderRejectedBean) {
            this.getAuditStatus(this.orderObj.orderRejectedBean.auditStatus)
          }
          this.tableData1 = this.orderObj.onlinePayOperationBeanList
          this.tableData2 = this.orderObj.orderGoodsList
          this.tableData3 = this.orderObj.orderFlowLogs
          this.orderState = this.orderObj.orderState
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    openDialog() {
      this.dialogVisible = true
      this.dialogTransport = ''
      this._getDeleveryDetail(this.oid)
    },
    goBack() {
      this.$router.go(-1)
    },
    getVal(val) {
      if (val === null || val === '' || val === undefined) {
        return '暂无'
      } else {
        return val
      }
    },
    getMoney(val) {
      if (val === null || val === '' || val === undefined) {
        return '暂无'
      } else {
        return '￥' + val
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
    shipments() {
      if (this.suggestion === '') {
        this.$message.error('处理意见不能为空！')
        return
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
    getTransportState(val) {
      if (val) {
        switch (val) {
          case '0':
            this.transportState = ('待配送')
            break
          case '1':
            this.transportState = ('配送中')
            break
          case '2':
            this.transportState = ('配送成功')
            break
          case '3':
            this.transportState = ('配送失败')
            break
          case '5':
            this.transportState = ('同步支付宝')
            break
          default:break
        }
      }
    },
    getAuditStatus (val) {
      if (val) {
        switch (val) {
          case '1':
            this.auditStatus = ('待审核')
            break
          case '2':
            this.auditStatus = ('审核通过')
            break
          case '3':
            this.auditStatus = ('驳回')
            break
          default:break
        }
      }
    }
  },
  computed: {
    getResidualLen() {
      return (100 - this.suggestion.length) < 0 ? 0 : (100 - this.suggestion.length)
    }
  }
}
</script>

<style scoped>
.mt15{margin-top: 15px;}
.mb15{margin-bottom: 15px;}
.fl{float: left;}
.text-r{text-align: right;}
.text-l{text-align: left;padding-left: 14px;}
.money{color: #FE8D47 !important;}
.part{margin-top: 20px;}
.part h1{
  line-height: 40px;
  height: 40px;
  font-weight: bold;
  font-size: 15px;
  color: #5f5f5f;
  margin: 0;
}
.flowpic-box > div{
  float: left;
}
.flowpic{
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-radius: 50%;
  background-color: #6ebfec;
  color: #fff;
  font-size: 14px; 
  font-weight: bold;
}
.bg-gray{
  background-color: #efefef;
  color: #777777;
}
.arrow{
  width: 40px;
  height: 80px;
  background: url(./images/green_go.png) no-repeat center;
}
.arrow-gray{
  width: 40px;
  height: 80px;
  background: url(./images/gray_go.png) no-repeat center;
}
.con-box{
  border: 1px solid #E6E6E6;
  padding: 15px 20px;
  width: 770px;
}
.tr-con{
  border-bottom: 1px solid #E6E6E6;
  padding-bottom: 12px;
}
.tr-con > div{
  width: 225px;
}
.tr-con > div:nth-child(2), .tr-con > div:nth-child(3) {
  border-left: 1px solid #E6E6E6;
}
.tr-con p {
  color: #787878;
  font-size: 12px;
  line-height: 20px;
  font-weight: bold;
}
.bt-info{
  color: #787878;
  font-size: 12px;
  line-height: 20px;
  font-weight: bold;
  padding-left: 40px;
  margin-bottom: 0;
}
.totalPrice {
  width: 770px;
  height: 40px;
  border: 1px solid #ebeef5;
  border-top: none;
  line-height: 40px;
  text-align: right;
  padding-right: 90px;
}
.el-table{
  font-size: 13px;
}
.el-table td, .el-table th {
  padding: 8px 0 !important;
}
/* 测试 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
