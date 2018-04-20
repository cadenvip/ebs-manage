<template>
  <div style="padding: 20px;">
    <el-form :model="searchForm" ref="searchFrom" label-width="0px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="订单编号:" label-width="80px">
            <el-input size="medium" v-model.trim="searchForm.orderCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-col :span="12">
            <el-form-item label="下单开始时间:" label-width="100px">
              <el-date-picker size="medium" style="width: 95%;"
                v-model="searchForm.orderStartTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下单结束时间:" label-width="100px">
              <el-date-picker size="medium" style="width: 95%;"
                v-model="searchForm.orderEndTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0" style="text-align: center;">
            <el-button @click="submitForm" size="small" type="primary">确定</el-button>
            <el-button @click="resetForm" size="small" type="primary">重置</el-button>
            <el-button @click="showMore = !showMore" size="small">更多搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-collapse-transition>
          <div v-show="showMore">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="订购人:" label-width="80px">
                  <el-input size="medium" v-model.trim="searchForm.userName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="支付方式:" label-width="100px">
                  <el-select size="medium" v-model="searchForm.payType" placeholder="请选择">
                    <el-option
                      v-for="item in payOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="订单状态:" label-width="100px">
                  <el-select size="medium" v-model="searchForm.orderState" placeholder="请选择">
                    <el-option
                      v-for="item in orderOptions"
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
      <el-tabs v-model="activeTab" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="近三个月订单" name="tab1">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="orderCode" label="订单编号" align="center">
            </el-table-column>
            <el-table-column width="110" label="订购人姓名" align="center">
              <template slot-scope="scope">
                {{getSensitiveName(scope.row.userName)}}
              </template>
            </el-table-column>
            <el-table-column width="110" label="订购人电话" align="center">
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
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.orderCode !== ''">
                  <el-button v-if="scope.row.orderState==='1'" @click="_shipments(scope.row)" type="text" size="small">订单发货</el-button>
                  <el-button v-else-if="scope.row.orderState==='2'&&scope.row.payType==='11'" @click="_userReject(scope.row)" type="text" size="small">用户拒收</el-button>
                  <el-button v-else-if="scope.row.verifyState==='1' && scope.row.orderState==='9'" @click="_returnAudit(scope.row)" type="text" size="small">退货审核</el-button>
                  <el-button v-else-if="scope.row.verifyState==='2' && scope.row.orderState==='5'" @click="_returnSigned(scope.row)" type="text" size="small">退货签收</el-button>
                </div>
                <div><el-button title="查看订单物流信息" @click="_getDeleveryDetail(scope.row)" type="text" size="small">物流查询</el-button></div>
                <div><el-button title="查看订单详情" @click="_getOrderDetail(scope.row)" type="text" size="small">订单详情</el-button></div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="等待付款" name="tab2">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="orderCode" label="订单编号" align="center">
            </el-table-column>
            <el-table-column width="110" label="订购人姓名" align="center">
              <template slot-scope="scope">
                {{getSensitiveName(scope.row.userName)}}
              </template>
            </el-table-column>
            <el-table-column width="110" label="订购人电话" align="center">
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
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.orderCode !== ''">
                  <el-button v-if="scope.row.orderState==='1'" @click="_shipments(scope.row)" type="text" size="small">订单发货</el-button>
                  <el-button v-else-if="scope.row.orderState==='2'&&scope.row.payType==='11'" @click="_userReject(scope.row)" type="text" size="small">用户拒收</el-button>
                  <el-button v-else-if="scope.row.verifyState==='1' && scope.row.orderState==='9'" @click="_returnAudit(scope.row)" type="text" size="small">退货审核</el-button>
                  <el-button v-else-if="scope.row.verifyState==='2' && scope.row.orderState==='5'" @click="_returnSigned(scope.row)" type="text" size="small">退货签收</el-button>
                </div>
                <div><el-button title="查看订单物流信息" @click="_getDeleveryDetail(scope.row)" type="text" size="small">物流查询</el-button></div>
                <div><el-button title="查看订单详情" @click="_getOrderDetail(scope.row)" type="text" size="small">订单详情</el-button></div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="等待发货" name="tab3">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="orderCode" label="订单编号" align="center">
            </el-table-column>
            <el-table-column width="110" label="订购人姓名" align="center">
              <template slot-scope="scope">
                {{getSensitiveName(scope.row.userName)}}
              </template>
            </el-table-column>
            <el-table-column width="110" label="订购人电话" align="center">
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
                <div v-if="scope.row.orderCode !== ''">
                  <el-button v-if="scope.row.orderState==='1'" @click="_shipments(scope.row)" type="text" size="small">订单发货</el-button>
                  <el-button v-else-if="scope.row.orderState==='2'&&scope.row.payType==='11'" @click="_userReject(scope.row)" type="text" size="small">用户拒收</el-button>
                  <el-button v-else-if="scope.row.verifyState==='1' && scope.row.orderState==='9'" @click="_returnAudit(scope.row)" type="text" size="small">退货审核</el-button>
                  <el-button v-else-if="scope.row.verifyState==='2' && scope.row.orderState==='5'" @click="_returnSigned(scope.row)" type="text" size="small">退货签收</el-button>
                </div>
                <div><el-button title="查看订单物流信息" @click="_getDeleveryDetail(scope.row)" type="text" size="small">物流查询</el-button></div>
                <div><el-button title="查看订单详情" @click="_getOrderDetail(scope.row)" type="text" size="small">订单详情</el-button></div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待用户收货" name="tab4">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="orderCode" label="订单编号" align="center">
            </el-table-column>
            <el-table-column width="110" label="订购人姓名" align="center">
              <template slot-scope="scope">
                {{getSensitiveName(scope.row.userName)}}
              </template>
            </el-table-column>
            <el-table-column width="110" label="订购人电话" align="center">
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
                <div v-if="scope.row.orderCode !== ''">
                  <el-button v-if="scope.row.orderState==='1'" @click="_shipments(scope.row)" type="text" size="small">订单发货</el-button>
                  <el-button v-else-if="scope.row.orderState==='2'&&scope.row.payType==='11'" @click="_userReject(scope.row)" type="text" size="small">用户拒收</el-button>
                  <el-button v-else-if="scope.row.verifyState==='1' && scope.row.orderState==='9'" @click="_returnAudit(scope.row)" type="text" size="small">退货审核</el-button>
                  <el-button v-else-if="scope.row.verifyState==='2' && scope.row.orderState==='5'" @click="_returnSigned(scope.row)" type="text" size="small">退货签收</el-button>
                </div>
                <div><el-button title="查看订单物流信息" @click="_getDeleveryDetail(scope.row)" type="text" size="small">物流查询</el-button></div>
                <div><el-button title="查看订单详情" @click="_getOrderDetail(scope.row)" type="text" size="small">订单详情</el-button></div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="交易完成" name="tab5">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="orderCode" label="订单编号" align="center">
            </el-table-column>
            <el-table-column width="110" label="订购人姓名" align="center">
              <template slot-scope="scope">
                {{getSensitiveName(scope.row.userName)}}
              </template>
            </el-table-column>
            <el-table-column width="110" label="订购人电话" align="center">
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
                <div v-if="scope.row.orderCode !== ''">
                  <el-button v-if="scope.row.orderState==='1'" @click="_shipments(scope.row)" type="text" size="small">订单发货</el-button>
                  <el-button v-else-if="scope.row.orderState==='2'&&scope.row.payType==='11'" @click="_userReject(scope.row)" type="text" size="small">用户拒收</el-button>
                  <el-button v-else-if="scope.row.verifyState==='1' && scope.row.orderState==='9'" @click="_returnAudit(scope.row)" type="text" size="small">退货审核</el-button>
                  <el-button v-else-if="scope.row.verifyState==='2' && scope.row.orderState==='5'" @click="_returnSigned(scope.row)" type="text" size="small">退货签收</el-button>
                </div>
                <div><el-button title="查看订单物流信息" @click="_getDeleveryDetail(scope.row)" type="text" size="small">物流查询</el-button></div>
                <div><el-button title="查看订单详情" @click="_getOrderDetail(scope.row)" type="text" size="small">订单详情</el-button></div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="交易关闭" name="tab6">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="orderCode" label="订单编号" align="center">
            </el-table-column>
            <el-table-column width="110" label="订购人姓名" align="center">
              <template slot-scope="scope">
                {{getSensitiveName(scope.row.userName)}}
              </template>
            </el-table-column>
            <el-table-column width="110" label="订购人电话" align="center">
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
                <div v-if="scope.row.orderCode !== ''">
                  <el-button v-if="scope.row.orderState==='1'" @click="_shipments(scope.row)" type="text" size="small">订单发货</el-button>
                  <el-button v-else-if="scope.row.orderState==='2'&&scope.row.payType==='11'" @click="_userReject(scope.row)" type="text" size="small">用户拒收</el-button>
                  <el-button v-else-if="scope.row.verifyState==='1' && scope.row.orderState==='9'" @click="_returnAudit(scope.row)" type="text" size="small">退货审核</el-button>
                  <el-button v-else-if="scope.row.verifyState==='2' && scope.row.orderState==='5'" @click="_returnSigned(scope.row)" type="text" size="small">退货签收</el-button>
                </div>
                <div><el-button title="查看订单物流信息" @click="_getDeleveryDetail(scope.row)" type="text" size="small">物流查询</el-button></div>
                <div><el-button title="查看订单详情" @click="_getOrderDetail(scope.row)" type="text" size="small">订单详情</el-button></div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="退货处理" name="tab7">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="orderCode" label="订单编号" align="center">
            </el-table-column>
            <el-table-column width="110" label="订购人姓名" align="center">
              <template slot-scope="scope">
                {{getSensitiveName(scope.row.userName)}}
              </template>
            </el-table-column>
            <el-table-column width="110" label="订购人电话" align="center">
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
                <div v-if="scope.row.orderCode !== ''">
                  <el-button v-if="scope.row.orderState==='1'" @click="_shipments(scope.row)" type="text" size="small">订单发货</el-button>
                  <el-button v-else-if="scope.row.orderState==='2'&&scope.row.payType==='11'" @click="_userReject(scope.row)" type="text" size="small">用户拒收</el-button>
                  <el-button v-else-if="scope.row.verifyState==='1' && scope.row.orderState==='9'" @click="_returnAudit(scope.row)" type="text" size="small">退货审核</el-button>
                  <el-button v-else-if="scope.row.verifyState==='2' && scope.row.orderState==='5'" @click="_returnSigned(scope.row)" type="text" size="small">退货签收</el-button>
                </div>
                <div><el-button title="查看订单物流信息" @click="_getDeleveryDetail(scope.row)" type="text" size="small">物流查询</el-button></div>
                <div><el-button title="查看订单详情" @click="_getOrderDetail(scope.row)" type="text" size="small">订单详情</el-button></div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="所有订单" name="tab8">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column label="订单编号" align="center">
              <template slot-scope="scope">
                <el-button @click="_getOrderDetail(scope.row)" type="text" size="small">{{scope.row.orderCode}}</el-button>
              </template>
            </el-table-column>
            <el-table-column width="110" label="订购人姓名" align="center">
              <template slot-scope="scope">
                {{getSensitiveName(scope.row.userName)}}
              </template>
            </el-table-column>
            <el-table-column width="110" label="订购人电话" align="center">
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
                <div v-if="scope.row.orderCode !== ''">
                  <el-button v-if="scope.row.orderState==='1'" @click="_shipments(scope.row)" type="text" size="small">订单发货</el-button>
                  <el-button v-else-if="scope.row.orderState==='2'&&scope.row.payType==='11'" @click="_userReject(scope.row)" type="text" size="small">用户拒收</el-button>
                  <el-button v-else-if="scope.row.verifyState==='1' && scope.row.orderState==='9'" @click="_returnAudit(scope.row)" type="text" size="small">退货审核</el-button>
                  <el-button v-else-if="scope.row.verifyState==='2' && scope.row.orderState==='5'" @click="_returnSigned(scope.row)" type="text" size="small">退货签收</el-button>
                </div>
                <div><el-button title="查看订单物流信息" @click="_getDeleveryDetail(scope.row)" type="text" size="small">物流查询</el-button></div>
                <div><el-button title="查看订单详情" @click="_getOrderDetail(scope.row)" type="text" size="small">订单详情</el-button></div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-row style="margin-top: 20px;">
        <el-col :span="12" style="padding-left: 20px;">
          <el-button @click="orderExport" size="mini">导出订单</el-button>
        </el-col>
        <el-col :span="12" style="text-align:right; padding-right: 20px;">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>
      <el-dialog
        title="物流信息"
        :visible.sync="dialogVisible"
        width="30%"
        center>
        <p>物流方式: {{getLogisticWay}}</p>
        <p v-if="logisticsBean.orderDeliveryBean.sendCompanyCode && logisticsBean.orderDeliveryBean.sendCompanyCode!=='privateLogistics'">物流公司: {{logisticsBean.logisticCompanyBean.companyName?logisticsBean.logisticCompanyBean.companyName:'暂无'}}</p>
        <p v-else>物流公司: {{logisticsBean.orderDeliveryBean.logisticName?logisticsBean.orderDeliveryBean.logisticName:'暂无'}}</p>
        <p>运单号码: {{logisticsBean.orderDeliveryBean.logisticNo?logisticsBean.orderDeliveryBean.logisticNo:'暂无'}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import LocationSelector from '@/components/LocationSelector/index'
  import { parseTime } from '@/utils/index'
  import { getOrderList, getDeleveryDetail, orderExport, orderRefuse } from '@/api/order/index.js'
  import { phoneCutSensitive, nameCutSensitive } from '@/utils/index.js'
  export default {
    created () {
      this.tabName = this.$route.query.tab
      if (this.tabName) {
        this.tab = { 'name': this.tabName }
        this.handleClick(this.tab)
      }
      this._getOrderList()
    },
    data() {
      return {
        logisticsBean: {
          orderDeliveryBean: {},
          logisticCompanyBean: {}
        },
        dialogVisible: false,
        tableData: [],
        currentPage: 1,
        currentTab: 'tab8',
        total: 0,
        activeTab: 'tab8',
        showMore: false,  // 是否显示下拉form
        searchForm: {
          orderCode: '',
          orderStartTime: '',
          orderEndTime: '',
          userName: '',
          payType: ''
        },
        searchType: '1',
        payOptions: [{
          label: '货到付款',
          value: '11'
        },
        {
          label: '支付宝支付',
          value: '23'
        },
        {
          label: '联动支付',
          value: '33'
        },
        {
          label: '和包支付',
          value: '34'
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
    methods: {
      getSensitiveName(name) {
        return nameCutSensitive(name)
      },
      getSensitivePhone(phone) {
        return phoneCutSensitive(phone)
      },
      _getDeleveryDetail(row) {
        this.logisticsBean = {
          orderDeliveryBean: {}
        }
        if (row) {
          getDeleveryDetail({ orderId: row.orderCode }).then(res => {
            if (res.status === 200) {
              this.dialogVisible = true
              this.logisticsBean = res.data
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }
      },
      _getOrderDetail(row) {
        this.$router.push({ name: 'orderdetailB', query: { oid: row.orderCode, timeType: '1' }})
      },
      _shipments(row) {
        this.$router.push({ name: 'shipments', query: { oid: row.orderCode }})
        // var url = 'http://183.230.101.151:8380/ebs/mallorder-web/mallOrderAjax!sendGoods.action?codes=' + row.orderCode
        // window.open(url)
      },
      _userReject(row) {
        orderRefuse(row.orderCode).then(res => {
          if (res.status === 200) {
            this.$message.success(res.msg)
            this._getOrderList()
          } else {
            this.$message.error(res.msg)
            this._getOrderList()
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      _returnAudit() {

      },
      _returnSigned() {

      },
      orderExport() {
        const defaultParam = {
          searchType: this.searchType,
          page: this.currentPage,
          pageSize: 10
        }
        const params = Object.assign(defaultParam, this.searchForm)
        orderExport(params).then(res => {
          if (res.status === 200) {
            this.$message.success('成功！')
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      _getOrderList(obj) {
        const defaultParam = {
          searchType: this.searchType,
          page: this.currentPage,
          pageSize: 10,
          order: 'desc',
          sort: 'orderValidDate'
        }
        const params = Object.assign(defaultParam, obj)
        getOrderList(params).then(res => {
          if (res.status === 200) {
            this.tableData = []
            this.tableData = res.data
            this.total = res.total
          } else {
            this.tableData = []
            this.total = res.total
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      handleCurrentChange(val) {
        if (this.currentPage !== val) {
          this.currentPage = val
          this.submitForm()
        }
      },
      getParam(tabName) {
        switch (tabName) {
          case 'tab1':
            this.searchType = '2'
            var time = new Date()
            this.searchForm.orderStartTime = time.setDate(time.getDate() - 90)
            break
          case 'tab2':
            this.searchType = '3'
            break
          case 'tab3':
            this.searchType = '4'
            break
          case 'tab4':
            this.searchType = '5'
            break
          case 'tab5':
            this.searchType = '6'
            break
          case 'tab6':
            this.searchType = '7'
            break
          case 'tab7':
            this.searchType = '8'
            break
          case 'tab8':
            this.searchType = '1'
            break
          default:
            break
        }
      },
      handleClick(tab) {
        this.activeTab = tab.name
        console.log(this.activeTab)
        this.tableData = []
        this.currentTab = tab.name
        this.resetForm()
        this.currentPage = 1
        this.getParam(tab.name)
        // 判断 tab
        this._getOrderList()
      },
      resetForm() {
        this.searchForm = {
          orderCode: '',
          orderStartTime: '',
          orderEndTime: '',
          userName: '',
          payType: ''
        }
      },
      submitForm() {
        if (this.searchForm.orderStartTime) {
          this.searchForm.orderStartTime = parseTime(this.searchForm.orderStartTime)
        }
        if (this.searchForm.orderEndTime) {
          this.searchForm.orderEndTime = parseTime(this.searchForm.orderEndTime)
        }
        this._getOrderList(this.searchForm)
      }
    },
    computed: {
      getLogisticWay () {
        var flag = this.logisticsBean.orderDeliveryBean.transportType
        if (flag === '0') {
          return '自提'
        } else if (flag === '1') {
          return '商家送货上门'
        } else if (flag === '2') {
          return 'EMS'
        } else if (flag === '3') {
          return '顺丰'
        } else if (flag === '4') {
          return '圆通'
        } else if (flag === '5') {
          return '申通'
        } else if (flag === '6') {
          return '中通'
        } else if (flag === '7') {
          return '韵达'
        } else if (flag === '8') {
          return '汇通'
        } else if (flag === '9') {
          return '宅急送'
        } else if (flag === '20') {
          return 'EMAIL'
        } else if (flag === '21') {
          return 'FAX'
        } else if (flag === '99') {
          return '其它快递'
        } else {
          return ''
        }
      }
    },
    components: {
      CollapseTransition,
      LocationSelector
    }
  }
</script>

<style scoped>

</style>

