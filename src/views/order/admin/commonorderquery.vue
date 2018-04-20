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
            <el-input size="medium" v-model.trim="searchForm.userName" placeholder="请输入订购人姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input size="medium" v-model.trim="searchForm.userPhone" placeholder="请输入订购人电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input size="medium" @focus="openDialog" v-model="searchForm.businessName" placeholder="请选择商家"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0" style="text-align: center;">
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
                <el-form-item>
                  <el-select size="medium" v-model="searchForm.orderState" placeholder="请选择订单状态">
                    <el-option
                      v-for="item in orderOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-date-picker style="width: 100%;"
                  v-model="searchForm.orderStartTime"
                  type="datetime"
                  placeholder="选择下单开始时间">
                </el-date-picker>
              </el-col>
              <el-col :span="4">
                <el-date-picker style="width: 100%;"
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
        <div style="border-top: 1px dotted #e5e5e5; padding-top: 20px;">
          <div class="table-list-title">
            订单列表
          </div>
          <div>
            <el-table :data="tableData" style="width: 100%" border>
              <el-table-column prop="orderCode" label="订单编号" align="center">
              </el-table-column>
              <el-table-column label="订购人姓名" align="center">
                <template slot-scope="scope">
                  {{getSensitiveName(scope.row.userName)}}
                </template>
              </el-table-column>
              <el-table-column label="订购人电话" align="center">
                <template slot-scope="scope">
                  {{getSensitivePhone(scope.row.userPhone)}}
                </template>
              </el-table-column>
              <el-table-column prop="totalEccouponMoney" label="电子券金额(元)" align="center">
              </el-table-column>
              <el-table-column prop="specialOffer" label="优惠金额(元)" align="center">
              </el-table-column>
              <el-table-column prop="plusPrice" label="订单金额(元)" align="center">
              </el-table-column>
              <el-table-column prop="orderTime" label="下单日期" align="center">
              </el-table-column>
              <el-table-column prop="payTypeName" label="支付方式" align="center">
              </el-table-column>
              <el-table-column prop="payStateName" label="支付状态" align="center">
              </el-table-column>
              <el-table-column prop="orderStateName" label="订单状态" align="center">
              </el-table-column>
              <el-table-column  label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="_getOrderDetail(scope.row.orderCode)" type="text" size="small">订单详情</el-button>
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
    </el-form>
    <!-- 弹出框 -->
    <el-dialog title="选择商家" :visible.sync="dialogVisible" center>
      <el-form :model="dialogForm">
        <el-form-item>
          <el-col :span="8">
            <el-input size="medium" v-model="dialogForm.name" auto-complete="off" placeholder="请输入商家名称"></el-input>
          </el-col>
          <el-col :span="8" style="padding-left: 20px;">
            <el-button type="primary" size="medium" @click="dialogSearch">查询</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <el-table @current-change="handleCurrentChange3" :data="tableData2" highlight-current-row border style="width: 100%">
        <el-table-column prop="businessesName" label="名称" align="center"></el-table-column>
        <el-table-column prop="businessType" label="商家类型" align="center"></el-table-column>
      </el-table>      
      <div class="block" style="text-align: right;margin-top: 10px;">
        <el-pagination
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          :page-size="pageSize2"
          layout="total, prev, pager, next, jumper"
          :total="total2">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </div>
    </el-dialog>    
  </div>
</template>

<script>
import { getBusiness } from '@/api/admin/onsalemodifyaudit.js'
import { getOrderList } from '@/api/order/index.js'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import { parseTime } from '@/utils/index'
import { phoneCutSensitive, nameCutSensitive } from '@/utils/index.js'
export default {
  data() {
    return {
      searchForm: {
        orderCode: '',
        userName: '',
        userPhone: '',
        businessName: '',
        merchantId: '',
        orderState: '',
        orderStartTime: '',
        orderEndTime: '',
        comeFrom: ''
      },
      dialogForm: {
        name: ''
      },
      dialogVisible: false,
      showMore: false,
      tableData: [],
      tableData2: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      currentPage2: 1,
      pageSize2: 10,
      total2: 0,
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
      }]
    }
  },
  created() {
    this._getOrderList()
  },
  methods: {
    getSensitiveName(name) {
      return nameCutSensitive(name)
    },
    getSensitivePhone(phone) {
      return phoneCutSensitive(phone)
    },
    _getOrderList(obj) {
      this.tableData = []
      var defaultParam = {
        page: this.currentPage,
        pageSize: 10,
        searchType: 1,
        order: 'desc',
        sort: 'orderValidDate'
      }
      var params = Object.assign(defaultParam, obj)
      getOrderList(params).then(res => {
        if (res.status === 200) {
          this.tableData = res.data
          this.total = res.total
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    _getBusiness(obj) {
      var defaultParam = {
        'limit': '10',
        'page': this.currentPage2,
        'businessesName': this.dialogForm.name
      }
      var params = Object.assign(defaultParam, obj)
      this.tableData2 = []
      getBusiness(params).then(res => {
        if (res.status === 200) {
          this.tableData2 = res.data.list
          this.total2 = res.data.total
          this.pageSize2 = res.data.pagesize
          this.currentPage2 = res.data.pagenum
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
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
        userName: '',
        businessName: '',
        merchantId: '',
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
    openDialog() {
      this.dialogForm.name = ''
      this.currentPage2 = 1
      this.dialogVisible = true
      this._getBusiness()
    },
    dialogSearch() {
      this.currentPage2 = 1
      this._getBusiness()
    },
    handleCurrentChange(val) {
      console.log(val + '111')
      this.currentPage = val
      this._getOrderList(this.searchForm)
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val
      this._getBusiness()
    },
    handleCurrentChange3(val) {
      if (val) {
        this.currentBusiness = val.businessesName
        this.currentBusinessId = val.id
      }
    },
    confirmDialog() {
      this.dialogVisible = false
      this.searchForm.businessName = this.currentBusiness
      this.searchForm.merchantId = this.currentBusinessId
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
