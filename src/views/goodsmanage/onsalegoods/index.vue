<template>
  <div style="padding-top: 20px;">
    <el-form :model="formT" ref="formT" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="商品名称:" prop="shangpmc">
            <el-input :maxlength=20 v-model="formT.shangpmc"></el-input>
          </el-form-item> 
        </el-col>
        <el-col :span="6" class="price flex">
          <el-form-item class="it1" label-width="20" prop="spzdjg" style="white-space: nowrap;" label="价格:">
            <el-input style="width: 50%;display:inline-block;" :maxlength=5 v-model.number="formT.spzdjg"></el-input>
          </el-form-item>
          <el-form-item class="it1" label-width="20" prop="spzgjg" style="white-space: nowrap;" label="至:">
            <el-input style="width: 50%;display:inline-block;" :maxlength=5 v-model.number="formT.spzgjg"></el-input>
            <span style="color: #606266;padding-left: 5px;">元</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品编码:" prop="shangpbm">
            <el-input :maxlength=20 v-model.number="formT.shangpbm"></el-input>
          </el-form-item> 
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0" style="text-align: center;">
            <el-button size="small" type="primary" @click="submitForm('formT')">确定</el-button>
            <el-button size="small" type="primary" @click="resetForm('formT')">重置</el-button>
            <el-button @click="show = !show" size="small">更多搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="margin-top: 10px;">
        <el-collapse-transition>
          <div v-show="show">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="商品状态:" prop="ssspzt">
                  <el-select v-model="formT.ssspzt" placeholder="请选择">
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
                <el-form-item label="审核状态:" prop="ssshzt">
                  <el-select v-model="formT.ssshzt" placeholder="请选择">
                    <el-option
                      v-for="item in auditStatusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="商品类型:" prop="sssplx">
                  <el-select v-model="formT.sssplx" placeholder="请选择">
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
                <el-form-item label="修改状态:" prop="ssxgzt">
                  <el-select v-model="formT.ssxgzt" placeholder="请选择">
                    <el-option
                      v-for="item in modifyStatusOptions"
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
    <div style="padding: 0 2%;">
      <el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="销售中商品" name="first">
          <el-table :row-class-name="tableRowClassName" @selection-change="handleTableSelectionChange" ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="goodsCode" align="center" label="商品编码" width="140"></el-table-column>
            <el-table-column prop="goodsName" align="center" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="categoryName" align="center" label="商品类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="price" align="center" label="价格" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="stock" align="center" label="库存">
              <template slot-scope="scope">{{ scope.row.stock }} <el-button @click="showStockPop(scope.row)" size="mini" v-show="scope.row.auditStatus !== '4'" type="text">修改</el-button></template>
            </el-table-column>
            <el-table-column prop="upTime" align="center" label="上架时间">
            </el-table-column>
            <el-table-column prop="" align="center" label="状态" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.status === '2' ? '上架中' : scope.row.status === '3' ? '缺货中' : '' }}</template>
            </el-table-column>
            <el-table-column align="center" label="审核状态">
              <template slot-scope="scope">{{ scope.row.auditStatus === '2' ? '上架审批通过' : scope.row.auditStatus === '4' ? '下架审批中' : scope.row.auditStatus === '6' ? '下架审批驳回' : '错误' }}</template>
            </el-table-column>
            <el-table-column prop="" align="center" label="修改状态" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.editApproveStatus === '1' ? '修改待审核' : scope.row.editApproveStatus === '2' ? '修改审核通过' : scope.row.editApproveStatus === '3' ? '修改审核驳回' : '' }}</template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="140">
            <template slot-scope="scope">
              <el-button @click="getGoodsDetail(scope.row)" type="text" size="small">详情</el-button>
              <el-button v-show="scope.row.auditStatus !== '4'" @click="saleOff(scope.row)" type="text" size="small">下架</el-button>
              <el-button v-show="scope.row.auditStatus !== '4'" @click="modifyGoods(scope.row.goodsId)" type="text" size="small">修改</el-button>
            </template>
            </el-table-column>
          </el-table>
          <el-row style="margin-top: 20px;">
            <el-col :span="6" style="padding-left: 20px; text-align: left;padding-top: 5px;">
              <el-button @click="toggleSelection(tableData)" type="text" size="mini">全选</el-button>
              <el-button @click="batchOff" type="text" size="mini">批量下架</el-button>
            </el-col>
            <el-col :span="18" style="text-align: right; padding-right: 20px;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :current-page.sync="currentPage"
                :page-sizes="pagesizes"
                :page-size="pagesize"
                :total="total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="缺货的商品" name="second">缺货的商品</el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <el-dialog title="库存修改" width="30%" :visible.sync="popupVisible">
        <el-form :model="stockForm">
          <el-form-item label="最新库存:" label-width="120px">
            <el-input size="mini" style="width: 60%;" type="text" v-model="stockForm.nowStock"></el-input> 件
          </el-form-item>
          <el-form-item label-width="120px">
            <el-checkbox :checked="stockForm.stockFlag" v-model="stockForm.stockFlag"></el-checkbox>
            库存提醒: 低于 <el-input :disabled="!stockForm.stockFlag" size="mini" v-model.trim="stockForm.stockAlarm" style="width: 20%;" type="text">10</el-input>
            <div>
              <span style="color: #FF6600;">空或者0表示取消库存提醒</span>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" style="text-align: center;margin-top: -30px;" class="dialog-footer">
          <el-button @click="popupVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyStock">确 定</el-button>
        </div>
      </el-dialog>      
    </div>
  </div>
</template>

<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import { getGoodsTopType } from '@/api/goodsRelease'
  import { getOnSaleGoods, saleOff, modifyStock } from '@/api/onsale'
  export default {
    created () {
      this._getGoodsTopType()
      this._getOnSaleGoods()
    },
    data() {
      return {
        popupVisible: false,
        stockForm: {
          nowStock: 0, // 最新库存
          stockAlarm: 10,
          stockFlag: true
        },
        loading: false,
        total: 0,
        currentPage: 1,
        pagesizes: [10, 20, 30, 50],
        pagesize: 10,
        show: false,  // 下拉搜索内容是否展示
        activeTab: 'first', // 选择的tab
        formT: {
          shangpmc: '',
          spzdjg: '',
          spzgjg: '',
          shangpbm: '',
          ssspzt: '',
          ssshzt: '',
          sssplx: '',
          ssxgzt: ''
        },
        tableData: [],
        multipleSelection: [],
        goodsStatusOptions: [{
          value: 2,
          label: '上架中'
        },
        {
          value: 3,
          label: '缺货中'
        }],
        auditStatusOptions: [{
          value: 2,
          label: '上架审批通过'
        },
        {
          value: 4,
          label: '下架审批中'
        },
        {
          value: 6,
          label: '下架审批驳回'
        }],
        goodsTypeOptions: [],
        modifyStatusOptions: [{
          value: 1,
          label: '修改待审核'
        },
        {
          value: 2,
          label: '修改审核通过'
        },
        {
          value: 3,
          label: '修改审核驳回'
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
            this.$message.error('请求出错,请检查您的网络！')
          }
        })
      },
      _getOnSaleGoods(obj) {
        this.loading = true
        const params = Object.assign({
          searchType: 1,
          pageSize: this.pagesize
        }, obj)
        console.log(params)
        getOnSaleGoods(params).then(res => {
          if (res.status === 200) {
            this.tableData = res.data
            this.total = res.total
          } else if (res.status === 400 && res.msg === '没有商品数据') {
            return
          } else {
            this.$message.error(res.msg)
          }
          this.loading = false
        }).catch(err => {
          this.$message.error(err)
          this.loading = false
        })
      },
      handleTabClick(tab, event) {
        console.log(tab)
      },
      toggleSelection(rows) {
        this.selectAll = !this.selectAll
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, this.selectAll)
        })
      },
      handleTableSelectionChange(val) {
        this.multipleSelection = val
        console.log(val)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.currentPage = 1
            // 请求搜索接口
            const params = {
              name: this.formT.shangpmc,
              downPrice: this.formT.spzdjg,
              upPrice: this.formT.spzgjg,
              goodsCode: this.formT.shangpbm,
              statusCode: this.formT.ssspzt,
              approvestatusCode: this.formT.ssshzt,
              typeCode: this.formT.sssplx,
              editApprovestatusCode: this.formT.ssxgzt,
              pageSize: this.pagesize
            }
            if (params.downPrice !== '' && (typeof params.downPrice !== 'number')) {
              this.$message.error('最低价不能包含字符！')
              return false
            }
            if (params.upPrice !== '' && (typeof params.upPrice !== 'number')) {
              this.$message.error('最低价不能包含字符！')
              return false
            }
            this.tableData = []
            this._getOnSaleGoods(params)
          } else {
            this.$message.error('提交有误！,请按正确格式填写！')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      getGoodsDetail(val) {
        if (val.goodsId) {
          this.$router.push({ name: 'goodsdetail', query: { goodsId: val.goodsId }})
        } else {
          this.$message.error('商品id不存在！')
        }
      },
      handleSizeChange(val) {
        this.pagesize = this.pagesize === val ? this.pagesize : val
        this.submitForm('formT')
      },
      handleCurrentChange(val) {
        this.currentPage = val
        const params = {
          name: this.formT.shangpmc,
          downPrice: this.formT.spzdjg,
          upPrice: this.formT.spzgjg,
          goodsCode: this.formT.shangpbm,
          statusCode: this.formT.ssspzt,
          approvestatusCode: this.formT.ssshzt,
          typeCode: this.formT.sssplx,
          editApprovestatusCode: this.formT.ssxgzt,
          pageSize: this.pagesize,
          page: this.currentPage
        }
        if (params.downPrice !== '' && (typeof params.downPrice !== 'number')) {
          this.$message.error('最低价不能包含字符！')
          return false
        }
        if (params.upPrice !== '' && (typeof params.upPrice !== 'number')) {
          this.$message.error('最低价不能包含字符！')
          return false
        }
        this.tableData = []
        this._getOnSaleGoods(params)
      },
      saleOff(row) {
        const params = { goodsIds: row.goodsId }
        saleOff(params).then(res => {
          if (res.status === 200) {
            this.$message.success(res.msg)
            this._getOnSaleGoods()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      showStockPop(row) {   // 弹出框显示
        this.goodsId = row.goodsId
        this.stockForm.nowStock = row.stock
        this.popupVisible = true
      },
      modifyStock() {   // 修改库存
        const params = {
          goodsId: this.goodsId,
          stockAlarm: this.stockForm.stockAlarm,
          stock: this.stockForm.nowStock
        }
        if (!this.stockForm.stockFlag || this.stockForm.stockAlarm === '') {
          params.stockAlarm = 0
        }
        modifyStock(params).then(res => {
          if (res.status === 200) {
            this.popupVisible = false
            this.$message.success(res.msg)
          } else {
            this.popupVisible = false
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      batchOff() {  // 批量下架
        const params = {
          goodsIds: ''
        }
        if (this.multipleSelection.length <= 0) {
          this.$message.error('所选数据为空！')
        } else {
          for (var i in this.multipleSelection) {
            params.goodsIds += this.multipleSelection[i].goodsId + ','
          }
          params.goodsIds = params.goodsIds.substring(0, params.goodsIds.length - 1)
          console.log(params)
          saleOff(params).then(res => {
            if (res.status === 200) {
              this.$message.success(res.msg)
              this._getOnSaleGoods()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }
      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
          return 'warning-row'
        }
      },
      modifyGoods(gid) {
        this.$router.push({ name: 'publishstep1', query: { goodsId: gid, modifyFlag: 2 }})
      }
    },
    components: {
      CollapseTransition
    }
  }
</script>
<style>
.price .el-input__inner {
  padding: 0 5px !important;
}
.el-table .warning-row {
    background: oldlace;
  }

</style>
