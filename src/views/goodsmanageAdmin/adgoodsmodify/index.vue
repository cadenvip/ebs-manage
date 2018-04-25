<template>
  <div style="padding: 15px;">
    <el-form :model="searchForm">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="商品名称：" label-width="90px">
            <el-input size="medium" v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="12">
              <el-form-item label="价格：" label-width="60px">
                <el-input size="medium" v-model="searchForm.downPrice"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="至" label-width="40px">
                <el-input size="medium" v-model="searchForm.upPrice"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品编码：" label-width="90px">
            <el-input size="medium" v-model="searchForm.goodsCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="商品状态:" label-width="90px">
            <el-select clearable v-model="searchForm.statusCode" placeholder="请选择">
              <el-option
                v-for="item in goodsStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品类型:" label-width="90px">
            <el-select clearable v-model="searchForm.typeCode" placeholder="请选择">
              <el-option
                v-for="item in goodsTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合作社：" label-width="90px">
            <el-input size="medium" @focus="openDialog" v-model="searchForm.businessesName" placeholder="请选择商家"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button size="mini" type="primary" @click="submit">查询</el-button>
            <el-button size="mini" type="primary" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-tabs v-model="activeTab" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="销售中商品" name="tab1">
          <div>
            <div class="goods-list">商品列表</div>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="goodsCode" label="商品编码" width="140" align="center"></el-table-column>
              <el-table-column prop="goodsName" label="名称" align="center"></el-table-column>
              <el-table-column prop="businessesName" label="所属商户" align="center"></el-table-column>
              <el-table-column label="商品类型" prop="categoryName" align="center"></el-table-column>
              <el-table-column label="价格" align="center">
                <template slot-scope="scope">
                    {{'￥'+scope.row.price}}
                </template>
              </el-table-column>
              <el-table-column label="商品状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.status ==='1'?'正常':scope.row.status ==='2'?'上架中':scope.row.status ==='3'?'缺货':scope.row.status ==='4'?'停售':'暂无'}}
                </template>
              </el-table-column>
              <el-table-column label="审批状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.auditStatus ==='0' ? '待上架':scope.row.auditStatus ==='1' ? '待上架审批':scope.row.auditStatus ==='2' ? '上架审批通过':scope.row.auditStatus ==='3' ? '上架审批驳回':scope.row.auditStatus ==='4' ? '待下架审批':scope.row.auditStatus ==='5' ? '下架审批通过':scope.row.auditStatus ==='6' ? '下架审批驳回':'暂无'}}
                </template>
              </el-table-column>
              <el-table-column label="修改状态" align="center">
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                  <el-button @click="goPreview(scope.row)" type="text" size="small">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>          
        </el-tab-pane>
        <el-tab-pane label="待上架商品" name="tab2">
          <div>
            <div class="goods-list">商品列表</div>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="goodsCode" label="商品编码" width="140" align="center"></el-table-column>
              <el-table-column prop="goodsName" label="名称" align="center"></el-table-column>
              <el-table-column prop="businessesName" label="所属商户" align="center"></el-table-column>
              <el-table-column label="商品类型" prop="categoryName" align="center"></el-table-column>
              <el-table-column label="价格" align="center">
                <template slot-scope="scope">
                    {{'￥'+scope.row.price}}
                </template>
              </el-table-column>
              <el-table-column label="商品状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.status ==='1'?'正常':scope.row.status ==='2'?'上架中':scope.row.status ==='3'?'缺货':scope.row.status ==='4'?'停售':'暂无'}}
                </template>
              </el-table-column>
              <el-table-column label="审批状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.auditStatus ==='0' ? '待上架':scope.row.auditStatus ==='1' ? '待上架审批':scope.row.auditStatus ==='2' ? '上架审批通过':scope.row.auditStatus ==='3' ? '上架审批驳回':scope.row.auditStatus ==='4' ? '待下架审批':scope.row.auditStatus ==='5' ? '下架审批通过':scope.row.auditStatus ==='6' ? '下架审批驳回':'暂无'}}
                </template>
              </el-table-column>
              <el-table-column label="修改状态" align="center">
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                  <el-button @click="goPreview(scope.row)" type="text" size="small">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="缺货的商品" name="tab3">
          <div>
            <div class="goods-list">商品列表</div>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="goodsCode" label="商品编码" width="140" align="center"></el-table-column>
              <el-table-column prop="goodsName" label="名称" align="center"></el-table-column>
              <el-table-column prop="businessesName" label="所属商户" align="center"></el-table-column>
              <el-table-column label="商品类型" prop="categoryName" align="center"></el-table-column>
              <el-table-column label="价格" align="center">
                <template slot-scope="scope">
                    {{'￥'+scope.row.price}}
                </template>
              </el-table-column>
              <el-table-column label="商品状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.status ==='1'?'正常':scope.row.status ==='2'?'上架中':scope.row.status ==='3'?'缺货':scope.row.status ==='4'?'停售':'暂无'}}
                </template>
              </el-table-column>
              <el-table-column label="审批状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.auditStatus ==='0' ? '待上架':scope.row.auditStatus ==='1' ? '待上架审批':scope.row.auditStatus ==='2' ? '上架审批通过':scope.row.auditStatus ==='3' ? '上架审批驳回':scope.row.auditStatus ==='4' ? '待下架审批':scope.row.auditStatus ==='5' ? '下架审批通过':scope.row.auditStatus ==='6' ? '下架审批驳回':'暂无'}}
                </template>
              </el-table-column>
              <el-table-column label="修改状态" align="center">
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                  <el-button @click="goPreview(scope.row)" type="text" size="small">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史商品" name="tab4">
          <div>
            <div class="goods-list">商品列表</div>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="goodsCode" label="商品编码" width="140" align="center"></el-table-column>
              <el-table-column prop="goodsName" label="名称" align="center"></el-table-column>
              <el-table-column prop="businessesName" label="所属商户" align="center"></el-table-column>
              <el-table-column label="商品类型" prop="categoryName" align="center"></el-table-column>
              <el-table-column label="价格" align="center">
                <template slot-scope="scope">
                    {{'￥'+scope.row.price}}
                </template>
              </el-table-column>
              <el-table-column label="商品状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.status ==='1'?'正常':scope.row.status ==='2'?'上架中':scope.row.status ==='3'?'缺货':scope.row.status ==='4'?'停售':'暂无'}}
                </template>
              </el-table-column>
              <el-table-column label="审批状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.auditStatus ==='0' ? '待上架':scope.row.auditStatus ==='1' ? '待上架审批':scope.row.auditStatus ==='2' ? '上架审批通过':scope.row.auditStatus ==='3' ? '上架审批驳回':scope.row.auditStatus ==='4' ? '待下架审批':scope.row.auditStatus ==='5' ? '下架审批通过':scope.row.auditStatus ==='6' ? '下架审批驳回':'暂无'}}
                </template>
              </el-table-column>
              <el-table-column label="修改状态" align="center">
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                  <el-button @click="goPreview(scope.row)" type="text" size="small">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
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
import { getGoods } from '@/api/onsale.js'
import { getGoodsTopType } from '@/api/goodsRelease'
import { getBusiness } from '@/api/admin/onsalemodifyaudit.js'
export default {
  created() {
    this._getGoods()
    this._getGoodsTopType()
  },
  data() {
    return {
      currentTab: 'tab1',
      searchType: '1',
      dialogVisible: false,
      dialogForm: {
        name: ''
      },
      activeTab: 'tab1',
      searchForm: {
        name: '',
        downPrice: '',
        upPrice: '',
        goodsCode: '',
        typeCode: '',
        statusCode: '',
        businessesName: '',
        merchantId: ''
      },
      tableData: [],
      tableData2: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      currentPage2: 1,
      pageSize2: 10,
      total2: 0,
      goodsTypeOptions: [],
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
      }]
    }
  },
  methods: {
    _getGoodsTopType() {
      getGoodsTopType().then(res => {
        if (res.status === 200) {
          const data = res.data
          for (var i in data) {
            this.goodsTypeOptions.push({
              label: data[i].caption,
              value: data[i].csid
            })
          }
        } else {
          this.$message.error(res.msg)
        }
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
        this.$message.error(err.msg)
      })
    },
    _getGoods() {
      this.tableData = []
      var defaultParam = {
        page: this.currentPage,
        searchType: this.searchType,  // 默认展示在售商品
        order: 'desc',
        sort: 'createTime'
      }
      var params = Object.assign(defaultParam, this.searchForm)
      getGoods(params).then(res => {
        if (res.status === 200) {
          this.total = res.total
          this.tableData = res.data
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    submit() {
      this.currentPage = 1
      this._getGoods()
    },
    reset() {
      this.searchForm = {
        name: '',
        downPrice: '',
        upPrice: '',
        goodsCode: '',
        typeCode: '',
        statusCode: '',
        businessesName: '',
        merchantId: ''
      }
    },
    handleTabClick(tab) {
      if (this.currentTab !== tab.name) {
        this.reset()
        if (tab.name === 'tab1') {
          this.currentTab = 'tab1'
          this.searchType = '1'
          this.currentPage = 1
        } else if (tab.name === 'tab2') {
          this.currentTab = 'tab2'
          this.searchType = '2'
          this.currentPage = 1
        } else if (tab.name === 'tab3') {
          this.currentTab = 'tab3'
          this.searchType = '3'
          this.currentPage = 1
        } else if (tab.name === 'tab4') {
          this.currentTab = 'tab4'
          this.searchType = '6'
          this.currentPage = 1
        }
        this._getGoods()
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this._getGoods()
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
    dialogSearch() {
      this.currentPage2 = 1
      this._getBusiness()
    },
    confirmDialog() {
      this.dialogVisible = false
      this.searchForm.businessesName = this.currentBusiness
      this.searchForm.merchantId = this.currentBusinessId
    },
    goPreview(val) {
      if (val.goodsId) {
        this.$router.push({ name: 'preview', query: { goodsId: val.goodsId }})
      }
    }
  }
}
</script>

<style scoped>
.el-form-item{
  margin-bottom: 10px !important;
}
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
