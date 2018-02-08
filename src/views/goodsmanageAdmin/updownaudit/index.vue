<template>
  <div style="padding: 20px;">
    <el-form :model="searchForm" ref="searchFrom" label-width="0px">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item prop="spcd">
            <el-input placeholder="请选择商品产地"  @focus="regionVisible = true" v-model="searchForm.spcd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item  prop="spmc">
            <el-input placeholder="请输入商品名称" :maxlength="20" v-model="searchForm.spmc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="spbm">
            <el-input placeholder="请输入商品编码" :maxlength="20" v-model="searchForm.spbm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="goodsCate">
              <el-cascader
                placeholder="商品分类(可搜索)"
                v-model="goodsCate"
                :options="goodsOptions"
                :show-all-levels="false"
                filterable
              ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0" style="text-align: center;">
            <el-button size="small" type="primary" @click="submitForm('searchFrom')">确定</el-button>
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
                    <el-select v-model="searchForm.spzt" placeholder="请选择商品状态">
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
                    <el-select v-model="searchForm.xsml" placeholder="请选择销售目录">
                      <el-option
                        v-for="item in saleCatalogOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                    <el-date-picker
                      v-model="searchForm.sjkssj"
                      :clearable="false"
                      type="date"
                      placeholder="上架开始时间">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item>
                    <el-date-picker
                      v-model="searchForm.sjjssj"
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
    <el-dialog
      title="请选择区域"
      :visible.sync="regionVisible"
      width="40%"
      :before-close="handleClose">
      <location-selector @locationSelected="getLocationInfo"></location-selector>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" size="mini" @click="regionVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 表格 -->
    <div>
      <el-table @selection-change="handleTableSelectionChange" v-loading="loading" element-loading-text="Loading" ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" label="商品编码" width="140">
          <template slot-scope="scope">{{ scope.row.goodsCode }}</template>
        </el-table-column>
        <el-table-column prop="goodsName" align="center" label="商品名称" width="120">
        </el-table-column>
        <el-table-column align="center" label="商品类型" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.goodsType === '0' ? '普通商品' : '套餐商品' }}</template>
        </el-table-column>
        <el-table-column prop="businessesName" align="center" label="所属商户" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="center" label="库存" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.stock}}{{scope.row.quantityUnits}}</template>
        </el-table-column>
        <el-table-column prop="upTime" align="center" label="上架时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="downTime" align="center" label="下架时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="center" label="商品状态" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.status==='1'?'正常':scope.row.status==='2'?'上架':scope.row.status==='3'?'缺货':'停售'}}</template>
        </el-table-column>
        <el-table-column align="center" label="审批状态" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.auditStatus==='0'?'待上架':scope.row.auditStatus==='1'?'待上架审批':scope.row.auditStatus==='2'?'上架审批通过':scope.row.auditStatus==='3'?'上架审批驳回':scope.row.auditStatus==='4'?'待下架审批':scope.row.auditStatus==='5'?'下架审批通过':'下架审批驳回'}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="50">
        <template slot-scope="scope">
          <el-button @click="goPreview(scope.row)" type="text" size="small">预览</el-button>
        </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-row style="margin-top: 20px;">
      <el-col :span="6" style="padding-left: 20px; text-align: left;padding-top: 5px;">
        <el-button @click="batchAudit" type="primary" size="mini">批量审批</el-button>
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
    <div>
      <el-dialog title="审核商品" :visible.sync="dialogFormVisible">
        <el-form :model="auditForm">
          <el-form-item label="审批状态:" label-width="120px">
            <el-radio v-model="auditForm.auditStatus" label="1">是</el-radio>
            <el-radio v-model="auditForm.auditStatus" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="审批意见:" label-width="120px">
            <el-input
              style="width: 300px;"
              :maxlength=30
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="auditForm.auditAdvice">
            </el-input>
            <p>
              剩余字数: <span style="color:red;">{{getResidualLen}}</span>
            </p>
          </el-form-item>
        </el-form>
        <div slot="footer" style="text-align: center;" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="disalogConfirm">确 定</el-button>
        </div>
      </el-dialog>      
    </div>    
  </div>
</template>

<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import LocationSelector from '@/components/LocationSelector/index'
  import { getGoodsType } from '@/api/goodsRelease'
  import { parseTime } from '@/utils/index'
  import { getSearches, upDownAudit } from '@/api/admin/updownaudit'
  export default {
    mounted () {
      this._getGoodsType()
      this._getSearches()
    },
    data() {
      return {
        dialogFormVisible: false,
        auditForm: {
          auditStatus: '1',
          auditAdvice: ''
        },
        seletedData: [],
        total: 0,
        pagesize: 10,
        pagesizes: [10, 20, 30, 50],
        currentPage: 1,
        goodsCate: [],
        tableData: [],  // 表格数据
        loading: false,
        goodsOptions: [], // 商品对象
        goodsOption: [],
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
        saleCatalogOptions: [{
          label: '农产品直供',
          value: '01'
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
        regionVisible: false, // 地区选择是否展示
        showMore: false,  // 是否显示下拉form
        searchForm: {
          spcd: '',
          spcdcode: '',
          spmc: '',
          spbm: '',
          spzt: '',
          xsml: '',
          sjkssj: '',
          sjjssj: ''
        }
      }
    },
    methods: {
      _getGoodsType() {
        getGoodsType().then(res => {
          if (res.status === 200) {
            this.format(res.data[0])
            this.format2(res.data[1])
          } else {
            this.$message.error(res.message)
          }
        }).catch(err => {
          this.$message.error(err)
        })
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
      handleClose(done) {
        done()
      },
      resetForm(formName) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields()
        }
      },
      submitForm(formName) {
        console.log(this.getUpStartTime)
        const params = {
          placeOfOrigin: this.searchForm.spcdcode,
          name: this.searchForm.spmc,
          goodsCode: this.searchForm.spbm,
          typeCode: this.getGoodsCate,
          statusCode: this.searchForm.spzt,
          // catalogId: this.searchForm.xsml,
          upStartTime: this.getUpStartTime,
          upEndTime: this.getUpEndTime
        }
        this.$refs[formName].validate((valid) => {
          this._getSearches(params)
        })
      },
      getLocationInfo(data) {
        this.searchForm.spcd = data.label
        this.searchForm.spcdcode = data.locationCode
      },
      goPreview(val) {
        if (val.goodsId) {
          this.$router.push({ name: 'preview', query: { goodsId: val.goodsId }})
        }
      },
      _getSearches(obj) {
        this.tableData = []
        const params = Object.assign({
          searchType: 4
        }, obj)
        this.loading = true
        getSearches(params).then(res => {
          if (res.status === 200) {
            this.tableData = res.data
            this.total = res.total
            this.loading = false
          } else {
            this.$message.error(res.message)
            this.loading = false
          }
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      },
      handleSizeChange(val) {
        this.pagesize = this.pagesize === val ? this.pagesize : val
      },
      handleCurrentChange(val) {
        console.log(val)
      },
      batchAudit() {
        const len = this.seletedData.length
        if (len <= 0) {
          this.$message.error('未选中任何商品！')
          return false
        } else {
          this.dialogFormVisible = true
        }
      },
      handleTableSelectionChange(val) {
        this.seletedData = val
      },
      disalogConfirm() {
        var selectedGoodsIds = ''
        var params = {
          yesOrNo: this.auditForm.auditStatus,
          auditReason: this.auditForm.auditAdvice
        }
        if (this.seletedData.length <= 1) {
          selectedGoodsIds = this.seletedData[0].goodsId
          params.goodsIds = selectedGoodsIds
        } else {
          var tempArr = []
          for (var i in this.seletedData) {
            tempArr.push(this.seletedData[i].goodsId)
          }
          selectedGoodsIds = tempArr.join(',')
          params.goodsIds = selectedGoodsIds
        }
        if (this.auditForm.auditStatus === '1' && this.auditForm.auditAdvice === '') {
          this.$message.error('请填写审批意见！')
          return false
        } else {
          console.log(params)
          upDownAudit(params).then(res => {
            if (res.status === 200) {
              console.log(res)
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }
      }
    },
    computed: {
      getUpStartTime() {
        var time = parseTime(this.searchForm.sjkssj)
        return time === '0-0-0 0:0:0' ? '' : time
      },
      getUpEndTime() {
        var time = parseTime(this.searchForm.sjjssj)
        return time === '0-0-0 0:0:0' ? '' : time
      },
      getGoodsCate() {
        if (this.goodsCate.length) {
          return this.goodsCate.pop()
        } else {
          return ''
        }
      },
      getResidualLen() {
        return (30 - this.auditForm.auditAdvice.length) < 0 ? 0 : (30 - this.auditForm.auditAdvice.length)
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

