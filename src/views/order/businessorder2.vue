<template>
  <div style="padding: 20px;">
    <el-form :model="searchForm" ref="searchFrom" label-width="0px">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item>
            <el-input size="medium" v-model.trim="searchForm.orderCode" placeholder="请输入订单编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input size="medium" v-model.trim="searchForm.goodsName" placeholder="请输入商品名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input size="medium" v-model.trim="searchForm.userName" placeholder="请输入订购人姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input size="medium" :maxlength="11" v-model.trim="searchForm.userPhone" placeholder="请输入订购人电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input size="medium" v-model.trim="searchForm.receiverName" placeholder="请输入收货人姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item>
            <el-input size="medium" :maxlength="11" v-model.trim="searchForm.receiverPhone" placeholder="请输入收货人手机"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input size="medium" v-model.trim="searchForm.downPrice" placeholder="请输入订单最小金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input size="medium" v-model.trim="searchForm.upPrice" placeholder="请输入订单最大金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-select size="medium" v-model="searchForm.payType" placeholder="请选择支付方式">
            <el-option
              v-for="item in payWayOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0" style="text-align: left;">
            <el-button @click="submitForm" size="small" type="primary">确定</el-button>
            <el-button @click="resetForm" size="small" type="primary">重置</el-button>
            <el-button @click="exportFile" size="small" type="primary">导出</el-button>
            <el-button @click="showMore = !showMore" size="small">更多</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-collapse-transition>
          <div v-show="showMore">
            <el-row :gutter="20">
              <el-col :span="4">
                <el-select size="medium" v-model="searchForm.payState" placeholder="请选择支付状态">
                  <el-option
                    v-for="item in payStateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-select size="medium" v-model="searchForm.orderState" placeholder="请选择订单状态">
                  <el-option
                    v-for="item in orderOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-date-picker size="medium" style="width: 100%;"
                  v-model="searchForm.orderStartTime"
                  type="datetime"
                  placeholder="选择下单开始时间">
                </el-date-picker>
              </el-col>
              <el-col :span="4">
                <el-date-picker size="medium" style="width: 100%;"
                  v-model="searchForm.orderEndTime"
                  type="datetime"
                  placeholder="选择下单结束时间">
                </el-date-picker>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-select size="medium" v-model="searchForm.comeFrom" placeholder="请选择订购渠道">
                    <el-option
                      v-for="item in DGQDoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>      
      </div>
    </el-form>    
    <div style="border-top: 1px dotted #e5e5e5; padding-top: 20px;">
      <div class="table-list-title">
        订单列表
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="订单编号" align="center">
            <template slot-scope="scope">
              <a @click="_getOrderDetail(scope.row.orderCode)" style="color: #239cdf;">{{ scope.row.orderCode }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="订购人姓名" align="center">
          </el-table-column>
          <el-table-column prop="userPhone" label="订购人电话" align="center">
          </el-table-column>
          <el-table-column label="电子券金额(元)" align="center">
            <template slot-scope="scope">
              <span style="color: #E48E55;font-weight: bold;">￥{{ scope.row.totalEccouponMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column label="优惠金额(元)" align="center">
            <template slot-scope="scope">
              <span style="color: #E48E55;font-weight: bold;">￥{{ scope.row.specialOffer }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单金额(元)" align="center">
            <template slot-scope="scope">
              <span style="color: #E48E55;font-weight: bold;">￥{{ scope.row.plusPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderTime" label="下单日期" align="center">
          </el-table-column>
          <el-table-column prop="businessesName" label="商家名称" align="center">
          </el-table-column>
          <el-table-column prop="payTypeName" label="支付方式" align="center">
          </el-table-column>
          <el-table-column prop="payStateName" label="支付状态" align="center">
          </el-table-column>
          <el-table-column label="订单状态" align="center">
            <template slot-scope="scope">
              <span style="color: #B1B9C7;">{{ scope.row.orderStateName }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="操作" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.taskId !== undefined || scope.row.taskId === ''">
                <div v-if="scope.row.payType === '11'">
                  <el-button v-if="scope.row.orderState==='1'" @click="_shipments(scope.row)" type="text" size="small">订单发货</el-button>
                  <el-button v-else-if="scope.row.orderState==='2'" @click="_userReject(scope.row)" type="text" size="small">用户拒收</el-button>
                  <el-button v-else-if="scope.row.orderState==='9'" @click="_returnAudit(scope.row)" type="text" size="small">退货审核</el-button>
                  <el-button v-else-if="scope.row.orderState==='5'" @click="_returnSigned(scope.row)" type="text" size="small">退货签收</el-button>
                  <el-button v-else @click="_getOrderDetail(scope.row.orderCode)" type="text" size="small">订单详情</el-button>
                </div>
                <div v-else-if="scope.row.payType === '22'||scope.row.payType === '23'||scope.row.payType === '24'">
                  <el-button v-if="scope.row.orderState==='1'&&scope.row.payState==='0'" @click="_shipments(scope.row)" type="text" size="small">订单发货</el-button>
                  <el-button v-else-if="scope.row.orderState==='9'&&scope.row.payState==='0'" @click="_returnAudit(scope.row)" type="text" size="small">退货审核</el-button>
                  <el-button v-else-if="scope.row.orderState==='5'&&scope.row.payState==='3'" @click="_returnSigned(scope.row)" type="text" size="small">退货签收</el-button>
                  <el-button v-else @click="_getOrderDetail(scope.row.orderCode)" type="text" size="small">订单详情</el-button>
                </div>
                <div v-else-if="scope.row.payType === '32'">
                  <el-button v-if="scope.row.orderState==='1'&&scope.row.payState==='0'" @click="_shipments(scope.row)" type="text" size="small">订单发货</el-button>
                  <el-button v-else-if="scope.row.orderState==='9'&&scope.row.payState==='0'" @click="_returnAudit(scope.row)" type="text" size="small">退货审核</el-button>
                  <el-button v-else-if="scope.row.orderState==='5'&&scope.row.payState==='3'" @click="_returnSigned(scope.row)" type="text" size="small">退货签收</el-button>
                  <el-button v-else @click="_getOrderDetail(scope.row.orderCode)" type="text" size="small">订单详情</el-button>
                </div>
                <div v-else>
                  <el-button v-if="scope.row.orderState==='1'" @click="_shipments(scope.row)" type="text" size="small">订单发货</el-button>
                  <el-button v-else-if="scope.row.orderState==='9'" @click="_returnAudit(scope.row)" type="text" size="small">退货审核</el-button>
                  <el-button v-else @click="_getOrderDetail(scope.row.orderCode)" type="text" size="small">订单详情</el-button>
                </div>
              </div>
              <div v-else>
                <el-button @click="_getOrderDetail(scope.row.orderCode)" type="text" size="small">订单详情</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="text-align: right;margin-top: 10px;">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import { getOrderList } from '@/api/order/index.js'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      searchForm: {
        orderCode: '',
        goodsName: '',
        userName: '',
        userPhone: '',
        receiverName: '',
        receiverPhone: '',
        downPrice: '',
        upPrice: '',
        payType: '',
        payState: '',
        orderState: '',
        orderStartTime: '',
        orderEndTime: '',
        comeFrom: ''
      },
      showMore: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      DGQDoptions: [{
        label: '热线',
        value: '1'
      },
      {
        label: 'WEP',
        value: '2'
      },
      {
        label: 'WAP',
        value: '3'
      },
      {
        label: '手机客户端',
        value: '4'
      },
      {
        label: '触屏版',
        value: '5'
      },
      {
        label: '第三方平台',
        value: '6'
      },
      {
        label: '农资商城',
        value: '7'
      }],
      orderOptions: [{
        label: '待支付',
        value: '0'
      },
      {
        label: '待发货',
        value: '1'
      },
      {
        label: '已发货',
        value: '2'
      },
      {
        label: '交易关闭(撤单)',
        value: '4'
      },
      {
        label: '退货处理中',
        value: '5'
      },
      {
        label: '交易关闭(退货)',
        value: '6'
      },
      {
        label: '交易完成(退货失败)',
        value: '7'
      },
      {
        label: '交易完成',
        value: '8'
      },
      {
        label: '退货申请中',
        value: '9'
      },
      {
        label: '交易失败',
        value: '10'
      },
      {
        label: '退货失败',
        value: '11'
      },
      {
        label: '待支付定金',
        value: '12'
      },
      {
        label: '待支付尾款',
        value: '13'
      }],
      payWayOptions: [{
        label: '货到付款',
        value: '11'
      },
      {
        label: '支付宝支付',
        value: '23'
      },
      {
        label: '手机支付',
        value: '22'
      },
      {
        label: '网银支付',
        value: '24'
      },
      {
        label: '话费支付',
        value: '32'
      }],
      payStateOptions: [{
        label: '已支付',
        value: '0'
      },
      {
        label: '待支付',
        value: '1'
      },
      {
        label: '支付失败',
        value: '2'
      },
      {
        label: '退款中',
        value: '3'
      },
      {
        label: '已退款',
        value: '4'
      },
      {
        label: '待支付定金',
        value: '5'
      },
      {
        label: '待支付尾款',
        value: '6'
      },
      {
        label: '支付定金失败',
        value: '7'
      }]
    }
  },
  created() {
    this._getOrderList()
  },
  methods: {
    _getOrderList(obj) {
      this.tableData = []
      var defaultParam = {
        page: this.currentPage,
        pageSize: 10,
        searchType: 1
      }
      var params = Object.assign(defaultParam, obj)
      getOrderList(params).then(res => {
        if (res.status === 200) {
          this.tableData = res.data
          this.total = res.total
        } else {
          this.tableData = res.data
          this.total = res.total
          this.currentPage = 1
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    _shipments(row) {
      this.$router.push({ name: 'shipments', query: { oid: row.orderCode }})
    },
    submitForm() {
      this.currentPage = 1
      if (this.searchForm.orderStartTime) {
        this.searchForm.orderStartTime = parseTime(this.searchForm.orderStartTime)
      }
      if (this.searchForm.orderEndTime) {
        this.searchForm.orderEndTime = parseTime(this.searchForm.orderEndTime)
      }
      this._getOrderList(this.searchForm)
    },
    resetForm() {
      this.searchForm = {
        orderCode: '',
        goodsName: '',
        userName: '',
        userPhone: '',
        receiverName: '',
        receiverPhone: '',
        downPrice: '',
        upPrice: '',
        payType: '',
        payState: '',
        orderState: '',
        orderStartTime: '',
        orderEndTime: '',
        comeFrom: ''
      }
    },
    exportFile() {

    },
    _getOrderDetail(oid) {
      if (oid) {
        this.$router.push({ name: 'orderdetail', query: { oid: oid }})
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this._getOrderList(this.searchForm)
    }
  },
  components: {
    CollapseTransition
  }
}
</script>

<style scoped>
.table-list-title {
  background-color: #6ebfec;
  text-indent: 15px;
  font-weight: bold;
  color: #fff;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
</style>
