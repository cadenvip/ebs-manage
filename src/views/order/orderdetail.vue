<template>
  <div class="pad20">
    <div class="part" style="margin: 0;">
      <h1>处理流程</h1>
      <div class="clearfix mt15 flowpic-box">
        <div class="flowpic">生成订单</div>
        <div class="arrow"></div>
        <div class="flowpic">交易关闭</div>
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
                <p>1000050027</p>
                <p>13983865031</p>
                <p class="money">￥0.00</p>
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
                <p>1000050027</p>
                <p>2018-03-13 17:37:09</p>
                <p class="money">￥0.00</p>
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
                <p>1000050027</p>
                <p>13983865031</p>
                <p class="money">￥0.00</p>
              </el-col>
            </el-row>
          </div>
        </div>
        <p class="bt-info">备注: 无</p>
      </div>
    </div>
    <div class="part">
      <h1>订单支付信息</h1>
      <div class="con-box">
        <div class="clearfix tr-con">
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="8">
                <p>支付方式:</p>
                <p>已退款金额:</p>
              </el-col>
              <el-col class="text-l" :span="16">
                <p>支付宝支付</p>
                <p></p>
              </el-col>
            </el-row>
          </div>
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="8">
                <p>支付状态:</p>
              </el-col>
              <el-col class="text-l" :span="16">
                <p>待支付</p>
              </el-col>
            </el-row>
          </div>
          <div class="fl">
            <el-row style="overflow: hidden;">
              <el-col class="text-r" :span="12">
                <p>已付金额:</p>
              </el-col>
              <el-col class="text-l" :span="12">
                <p class="money">￥0.00</p>
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
                <p>其它快递</p>
                <p>（小时）</p>
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
                <p class="money">￥0.00</p>
                <p>2018-03-13 17:37:09</p>
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
                <p>配送失败</p>
                <p></p>
              </el-col>
            </el-row>
          </div>
        </div>
        <p class="bt-info">物流公司名称: 无</p>
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
                <p>13983865031</p>
                <p>13983865031</p>
                <p></p>
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
                <p>100430</p>
                <p></p>
                <p></p>
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
                <p>重庆市</p>
                <p>暂无</p>
                <a style="color: #239cdf;font-size:12px;font-weight: bold;" target="_blank">查看</a>
              </el-col>
            </el-row>
          </div>
        </div>
        <p class="bt-info">详细地址: 渝北区</p>
      </div>
    </div>
    <div class="part">
      <h1>支付记录</h1>
      <el-table :data="tableData" border style="width: 770px;">
        <el-table-column prop="date" label="流水号" align="center"></el-table-column>
        <el-table-column prop="date" label="操作类型" align="center"></el-table-column>
        <el-table-column prop="date" label="付款方" align="center"></el-table-column>
        <el-table-column prop="date" label="收款方" align="center"></el-table-column>
        <el-table-column prop="date" label="金额(元)" align="center"></el-table-column>
        <el-table-column prop="date" label="操作结果" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="part">
      <h1>订单商品信息</h1>
      <el-table :data="tableData" border style="width: 770px;">
        <el-table-column prop="date" label="商品编号" align="center"></el-table-column>
        <el-table-column prop="date" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="date" label="商品重量(克)" align="center"></el-table-column>
        <el-table-column prop="date" label="计量单位" align="center"></el-table-column>
        <el-table-column prop="date" label="价格 (元)" align="center"></el-table-column>
        <el-table-column prop="date" label="数量" align="center"></el-table-column>
        <el-table-column prop="date" label="小计 (元)" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="part">
      <h1>操作记录</h1>
      <el-table :data="tableData" border style="width: 770px;">
        <el-table-column prop="date" label="操作时间" align="center"></el-table-column>
        <el-table-column prop="date" label="操作人" align="center"></el-table-column>
        <el-table-column prop="date" label="订单状态" align="center"></el-table-column>
        <el-table-column prop="date" label="备注" align="center"></el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 20px;width:770px;text-align:center;padding-bottom:200px;">
      <el-button @click="goBack" size="mini">返回</el-button>
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
      tableData: []
    }
  },
  methods: {
    _getOrderDetail(oid) {
      orderDetail(oid).then(res => {
        if (res.status === 200) {
          console.log(res)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    goBack() {
      this.$router.go(-1)
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
.arrow{
  width: 40px;
  height: 80px;
  background: url(./images/green_go.png) no-repeat center;
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
.el-table{
  font-size: 13px;
}
.el-table td, .el-table th {
  padding: 8px 0 !important;
}
</style>
