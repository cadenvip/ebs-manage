<template>
  <div style="padding: 20px;">
    <el-form :model="searchForm" ref="searchFrom" label-width="0px">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item>
            <el-input size="medium" @focus="openDialog" v-model="searchForm.businessesName" placeholder="请选择商家"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input placeholder="请输入商品名称" :maxlength="20" v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input placeholder="请输入商品编码" :maxlength="20" v-model="searchForm.goodsCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
              <el-cascader
                v-model="selectedOptions3"
                placeholder="商品分类(可搜索)"
                :options="goodsOptions"
                filterable
                @change="handleChange"
              ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0" style="text-align: center;">
            <el-button size="small" type="primary" @click="submitForm">确定</el-button>
            <el-button size="small" type="primary" @click="resetForm('searchForm')">重置</el-button>
            <el-button @click="showMore = !showMore" size="small">更多搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-collapse-transition>
          <div v-show="showMore">
            <el-row :gutter="20">
              <el-col :span="4">
                <el-form-item>
                    <el-select v-model="searchForm.statusCode" placeholder="请选择商品状态">
                      <el-option
                        v-for="item in goodsStatusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                    <el-select v-model="searchForm.approvestatusCode" placeholder="请选择审批状态">
                      <el-option
                        v-for="item in auditStatusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                    <el-date-picker style="width:100%;"
                      v-model="searchForm.upStartTime"
                      type="date"
                      placeholder="上架开始时间">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                    <el-date-picker style="width:100%;"
                      v-model="searchForm.upEndTime"
                      type="date"
                      placeholder="上架结束时间">
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
      </div>
    </el-form>
    <div>
      <div class="goods-list">商品列表</div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="goodsCode" label="商品编码" align="center"></el-table-column>
        <el-table-column prop="goodsName" label="名称" align="center"></el-table-column>
        <el-table-column label="商品类型" align="center">
          <template slot-scope="scope">
              {{goodsType}}
          </template>
        </el-table-column>
        <el-table-column prop="businessesName" label="所属商户" align="center"></el-table-column>
        <el-table-column prop="applyPerson" label="库存" align="center">
          <template slot-scope="scope">
              {{scope.row.stock}}{{scope.row.quantityUnits}}
          </template>
        </el-table-column>
        <el-table-column prop="upTime" label="上架时间" align="center" width="180"></el-table-column>
        <el-table-column prop="downTime" label="下架时间" align="center" width="180"></el-table-column>
        <el-table-column label="商品状态" align="center">
          <template slot-scope="scope">
              {{scope.row.status ==='1'?'正常':scope.row.status ==='2'?'上架':scope.row.status ==='3'?'缺货':scope.row.status ==='4'?'停售':'暂无'}}
          </template>
        </el-table-column>
        <el-table-column label="审批状态" align="center">
          <template slot-scope="scope">
              {{scope.row.auditStatus ==='0' ? '待上架':scope.row.auditStatus ==='1' ? '待上架审批':scope.row.auditStatus ==='2' ? '上架审批通过':scope.row.auditStatus ==='3' ? '上架审批驳回':scope.row.auditStatus ==='4' ? '待下架审批':scope.row.auditStatus ==='5' ? '下架审批通过':scope.row.auditStatus ==='6' ? '下架审批驳回':'暂无'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
              <el-button @click="goPreview(scope.row)" type="text" size="small">预览</el-button>
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>              
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="text-align: right;margin-top: 10px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
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
    <el-dialog width="30%" center title="支付配置" :visible.sync="dialogVisible2">
      <el-form :model="payForm">{{payForm}}
        <el-form-item label="是否支持支付宝：" label-width="150px">
          <el-switch v-model="payForm.alipay"></el-switch>
        </el-form-item>
        <el-form-item label="支持货到付款：" label-width="150px">
          <el-switch v-model="payForm.codpay"></el-switch>
        </el-form-item>
        <el-form-item label="支持联动支付：" label-width="150px">
          <el-switch v-model="payForm.cmpay"></el-switch>
        </el-form-item>
        <el-form-item label="支持和包：" label-width="150px">
          <el-switch v-model="payForm.umpay"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible2 = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitEdit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import { getGoodsType, updatePayment } from '@/api/goodsRelease'
  import { parseTime } from '@/utils/index'
  import { getBusiness, getGoodsDetail } from '@/api/admin/onsalemodifyaudit.js'
  import { getGoods } from '@/api/onsale.js'
  export default {
    mounted () {
      this._getGoodsType()
      this._getGoods()
    },
    data() {
      return {
        dialogVisible2: false,
        payForm: {
          goodsId: '',
          alipay: false,
          cmpay: false,
          codpay: false,
          umpay: false
        },
        goodsType: '普通商品',
        selectedOptions3: [],
        goodsOptions: [], // 商品对象
        goodsOption: [],
        dialogForm: {
          name: ''
        },
        goodsStatusOptions: [{  // 商品状态options
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '上架'
        },
        {
          value: 3,
          label: '缺货'
        },
        {
          value: 4,
          label: '停售'
        }],
        auditStatusOptions: [{
          label: '待上架',
          value: '0'
        },
        {
          label: '待上架审批',
          value: '1'
        },
        {
          label: '上架审批通过',
          value: '2'
        },
        {
          label: '上架审批驳回',
          value: '3'
        },
        {
          label: '待下架审批',
          value: '4'
        },
        {
          label: '下架审批通过',
          value: '5'
        },
        {
          label: '下架审批驳回',
          value: '6'
        }],
        dialogVisible: false,
        showMore: false,  // 是否显示下拉form
        searchForm: {
          businessesName: '',
          merchantId: '',
          name: '',
          goodsCode: '',
          typeCode: '',
          statusCode: '',
          approvestatusCode: '',
          upStartTime: '',
          upEndTime: ''
        },
        currentPage: 1,
        pageSize: 10,
        total: 0,
        currentPage2: 1,
        pageSize2: 10,
        total2: 0,
        tableData: [],
        tableData2: []
      }
    },
    methods: {
      _getGoods(obj) {
        var defaultParam = {
          page: this.currentPage,
          searchType: '5',
          order: 'desc',
          sort: 'createTime'
        }
        var params = Object.assign(defaultParam, obj)
        this.tableData = []
        getGoods(params).then(res => {
          if (res.status === 200) {
            this.total = res.total
            this.tableData = res.data
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      _getBusiness(obj) {
        var defaultParam = {
          'businessesName': this.dialogForm.name,
          'limit': '10',
          'page': this.currentPage2
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
      _getGoodsType() {
        getGoodsType().then(res => {
          if (res.status === 200) {
            this.format(res.data[0])
            this.format2(res.data[1])
          } else {
            this.$message.error(res.mgs)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      goPreview(val) {
        if (val.goodsId) {
          this.$router.push({ name: 'preview', query: { goodsId: val.goodsId }})
        }
      },
      format(val) {
        if (val) {
          var data = val.subCategories
          for (var i = 0; i < data.length; i++) {
            var children = []
            var temp = data[i]
            for (var j = 0; j < temp.subCategories.length; j++) {
              children.push({ value: temp.subCategories[j]['categoryId'], label: temp.subCategories[j]['categoryName'] })
            }
            this.goodsOption.push({ value: temp['categoryId'], label: temp['categoryName'], children: children })
          }
          this.goodsOptions1 = {
            label: val.categoryName,
            value: val.categoryId,
            children: this.goodsOption
          }
          this.goodsOptions.push(this.goodsOptions1)
        }
      },
      format2(val) {
        if (val) {
          var data = val.subCategories
          var children = []
          for (var i = 0; i < data.length; i++) {
            children.push({ value: data[i]['categoryId'], label: data[i]['categoryName'] })
          }
          this.goodsOptions2 = {
            label: val.categoryName,
            value: val.categoryId,
            children: children
          }
          this.goodsOptions.push(this.goodsOptions2)
        }
      },
      resetForm(formName) {
        this.searchForm = {
          businessesName: '',
          merchantId: '',
          name: '',
          goodsCode: '',
          typeCode: '',
          statusCode: '',
          approvestatusCode: '',
          upStartTime: '',
          upEndTime: ''
        }
      },
      submitForm() {
        this.currentPage = 1
        this._getGoods(this.searchForm)
      },
      handleChange(val) {
        console.log(val)
        this.searchForm.typeCode = val.pop()
      },
      handleCurrentChange(val) {
        console.log(val)
        this.currentPage = val
        this._getGoods(this.searchForm)
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
      openDialog() {
        this.dialogForm.name = ''
        this.currentPage2 = 1
        this.dialogVisible = true
        this._getBusiness()
      },
      confirmDialog() {
        this.dialogVisible = false
        this.searchForm.businessesName = this.currentBusiness
        this.searchForm.merchantId = this.currentBusinessId
      },
      dialogSearch() {
        this.currentPage2 = 1
        this._getBusiness()
      },
      edit(row) {
        getGoodsDetail(row.goodsId).then(res => {
          if (res.status === 200) {
            res.data.goodsBean.alipay === '0' ? this.payForm.alipay = true : this.payForm.alipay = false
            res.data.goodsBean.codpay === '0' ? this.payForm.codpay = true : this.payForm.codpay = false
            res.data.goodsBean.cmpay === '0' ? this.payForm.cmpay = true : this.payForm.cmpay = false
            res.data.goodsBean.umpay === '0' ? this.payForm.umpay = true : this.payForm.umpay = false
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
        this.payForm.goodsId = row.goodsId
        this.dialogVisible2 = true
      },
      submitEdit() {
        this.dialogVisible2 = false
        updatePayment(this.payForm).then(res => {
          if (res.status === 200) {
            this.$message.success('支付方式更新成功！')
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    computed: {
      getUpTime() {
        return parseTime(this.searchForm.upStartTime)
      },
      getDownTime() {
        return parseTime(this.searchForm.upEndTime)
      }
    },
    components: {
      CollapseTransition
    }
  }
</script>

<style scoped>
  .goods-list{
    height: 30px;
    line-height: 30px;
    background: #6ebfec;
    font-size: 14px;
    color:#fff;
    padding-left: 20px;
    font-weight: bold;
  }
</style>

