<template>
  <div style="padding-top: 20px;">
    <el-form :model="formT" ref="formT" label-width="100px" >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="商品名称:" prop="shangpmc">
            <el-input :maxlength=20 v-model="formT.shangpmc"></el-input>
          </el-form-item> 
        </el-col>
        <el-col :span="6" class="price">
          <el-form-item style="display:inline-block; width:48%;" label-width="20" prop="spzdjg" label="价格:">
            <el-input style="width: 50%;display:inline-block;" :maxlength=5 v-model="formT.spzdjg"></el-input>
          </el-form-item>
          <el-form-item style="display:inline-block; width: 50%;" label-width="20" prop="spzgjg" label="至:">
            <el-input style="width: 50%;display:inline-block;" :maxlength=5 v-model="formT.spzgjg"></el-input>
            <span style="color: #606266;padding-left: 5px;">元</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品编码:" prop="shangpbm">
            <el-input :maxlength=20 v-model="formT.shangpbm"></el-input>
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
                  <el-select clearable v-model="formT.ssspzt" placeholder="请选择">
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
                  <el-select clearable v-model="formT.ssshzt" placeholder="请选择">
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
                  <el-select clearable v-model="formT.sssplx" placeholder="请选择">
                    <el-option
                      v-for="item in goodsTypeOptions"
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
    <!-- table表 -->
    <div style="padding: 0 2%;">
      <el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabClick">
        <el-tab-pane align="center" label="待上架商品" name="first">
          <el-table @selection-change="handleTableSelectionChange" v-loading="loading" element-loading-text="Loading" ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column align="center" label="商品编码" width="140">
              <template slot-scope="scope">{{ scope.row.goodsCode }}</template>
            </el-table-column>
            <el-table-column prop="goodsName" align="center" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="categoryName" align="center" label="商品类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="price" align="center" width="60" label="价格">
            </el-table-column>
            <el-table-column prop="stock" align="center" width="60" label="库存" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="upTime" align="center" label="上架时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" widht="60" label="状态" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.status === '1' ? '正常' : '错误' }}</template>
            </el-table-column>
            <el-table-column align="center" label="审核状态" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.auditStatus === '1' ? '上架审批中' : scope.row.auditStatus === '2' ? '上架审批通过' : scope.row.auditStatus === '3' ? '上架审批驳回' : '错误' }}</template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="getGoodsDetail(scope.row)" type="text" size="small">详情</el-button>
                <el-button v-if="scope.row.auditStatus === '3'" @click="_upGoods(scope.row)" type="text" size="small">上架</el-button>
                <el-button v-if="scope.row.auditStatus === '3'" @click="modifyGoods(scope.row)" type="text" size="small">修改</el-button>
                <el-button v-if="scope.row.auditStatus === '3'" @click="modifyGoods(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row style="margin-top: 20px;">
            <el-col :span="6" style="padding-left: 20px; text-align: left;padding-top: 5px;">
              <el-button @click="toggleSelection(tableData)" type="text" size="mini">全选</el-button>
              <el-button @click="batchShelf" type="text" size="mini">批量上架</el-button>
              <el-button @click="batchDelete" type="text" size="mini">批量删除</el-button>
            </el-col>
            <el-col :span="18" style="text-align: right; padding-right: 20px;">
              <el-pagination
                @size-change="handleDSJsizeChange"
                @current-change="handleDSJcurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :current-page.sync="DSJcurrentPage"
                :page-sizes="pagesizes"
                :page-size="pagesize"
                :total="total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="草稿箱" name="second">草稿箱</el-tab-pane>
        <el-tab-pane label="历史商品" name="third">历史商品</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import { getGoodsTopType } from '@/api/goodsRelease'
  import { getNoShelfGoods, upGoods } from '@/api/noshelfgoods'
  export default {
    created () {
      this._getGoodsTopType()
      this.dsjflag = false
      this.cgxflag = true
      this.lsspflag = true
      this.selectAll = false
      this._getNoShelfGoods()
    },
    data() {
      return {
        searchFlag: false,
        loading: false,  // 是否展示loading
        show: false,  // 下拉搜索内容是否展示
        activeTab: 'first', // 选择的tab
        total: 0, // 总条目数
        pagesizes: [10, 20, 30, 50],  // 页码选项
        pagesize: 10, // 每页展示条数
        DSJcurrentPage: 1,  // 待上架商品当前页
        formT: {
          shangpmc: '',
          spzdjg: '',
          spzgjg: '',
          shangpbm: '',
          ssspzt: '',
          ssshzt: '',
          sssplx: ''
        },
        tableData: [],
        DSJseletedData: [], // 待上架选中的数据
        goodsStatusOptions: [{
          value: 1,
          label: '正常'
        }],
        auditStatusOptions: [{
          value: 1,
          label: '上架审批中'
        },
        {
          value: 2,
          label: '上架审批通过'
        },
        {
          value: 3,
          label: '上架审批驳回'
        }],
        goodsTypeOptions: []
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
            this.$message.error(res.message)
          }
        })
      },
      _getNoShelfGoods(obj) {
        this.loading = true
        const params = Object.assign({
          searchType: 2,
          pageSize: this.pagesize
        }, obj)
        getNoShelfGoods(params).then(res => {
          if (res.status === 200) {
            this.tableData = res.data
            this.total = res.total
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        }).catch(err => {
          this.$message.error(err)
        })
      },
      handleTabClick(tab, event) {
        if (this.dsjflag === true && tab.name === 'first') {
          this.dsjflag = false
        }
        if (this.cgxflag === true && tab.name === 'second') {
          this.cgxflag = false
          alert('request')
        }
        if (this.lsspflag === true && tab.name === 'third') {
          this.lsspflag = false
          alert('request')
        }
        console.log(tab)
      },
      toggleSelection(rows) {
        this.selectAll = !this.selectAll
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, this.selectAll)
        })
      },
      handleTableSelectionChange(val) {
        this.DSJseletedData = val
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            for (var i in this.formT) {
              if (this.formT[i] !== '') {
                this.searchFlag = true
                this.DSJcurrentPage = 1
                const params = {
                  downPrice: this.formT.spzdjg,
                  upPrice: this.formT.spzgjg,
                  goodsCode: this.formT.shangpbm,
                  typeCode: this.formT.sssplx,
                  approvestatusCode: this.formT.ssshzt,
                  statusCode: this.formT.ssspzt,
                  name: this.formT.shangpmc,
                  pageSize: this.pagesize
                }
                this.tableData = []
                this._getNoShelfGoods(params)
                return false
              } else if (i === 'sssplx' && this.formT[i] === '') {
                this.searchFlag = false
                this.DSJcurrentPage = 1
                this._getNoShelfGoods()
                return false
              }
            }
          } else {
            this.$message.error('提交有误！,请按正确格式填写！')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      // 获取商品详情
      getGoodsDetail(val) {
        if (val.goodsId) {
          this.$router.push({ name: 'goodsdetail', query: { goodsId: val.goodsId }})
        }
      },
      // 修改商品
      modifyGoods(val) {
        this.$router.push({ name: 'publishstep1', query: { goodsId: val.goodsId }})
      },
      // 单个商品上架
      _upGoods(val) {
        const params = {
          goodsIds: val.goodsId
        }
        upGoods(params).then(res => {
          if (res.status === 200) {
            console.log('success')
          } else {
            this.$message.error(res.message)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      // 批量上架
      batchShelf() {
        const len = this.DSJseletedData.length
        if (len === 0) {
          this.$message.error('未选中任何商品！')
          return false
        } else {
          for (var i in this.DSJseletedData) {
            if (this.DSJseletedData[i]['auditStatus'] !== '3') {
              this.$message.error('所选的数据中包含不能执行该操作的数据，请重新选择！')
              return false
            }
          }
          // 请求批量上架接口
          console.log('请求批量上架接口')
        }
      },
      batchDelete() {
        const len = this.DSJseletedData.length
        if (len === 0) {
          this.$message.error('未选中任何商品！')
          return false
        } else {
          for (var i in this.DSJseletedData) {
            if (this.DSJseletedData[i]['auditStatus'] !== '3') {
              this.$message.error('所选的数据中包含不能执行该操作的数据，请重新选择！')
              return false
            }
          }
          // 请求批量删除接口
          console.log('请求批量删除接口')
        }
      },
      handleDSJsizeChange(val) {
        this.pagesize = this.pagesize === val ? this.pagesize : val
      },
      handleDSJcurrentChange(val) {
        const params = this.objHasVal(this.formT) && this.searchFlag ? Object.assign({ page: val }, this.formT) : { page: val }
        this.tableData = []
        this._getNoShelfGoods(params)
      },
      objHasVal(val) {
        var flag = false
        for (var i in val) {
          if (val[i] !== '') {
            flag = true
          }
        }
        return flag
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
.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
  padding: 0 5px !important;
  text-align: center; 
}
</style>
