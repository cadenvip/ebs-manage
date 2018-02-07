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
          <el-form-item>
              <el-cascader
                placeholder="商品分类(可搜索)"
                :options="goodsOptions"
                filterable
                @change="handleChange"
                :show-all-levels="false"
                :change-on-select="false"
              ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0" style="text-align: center;">
            <el-button size="small" type="primary">确定</el-button>
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
                  <!-- <el-input placeholder="请选择商品状态" :maxlength="20" v-model="searchForm.spfl"></el-input> -->
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
                    <el-select v-model="searchForm.shenpizt" placeholder="请选择审批状态">
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
                    <el-date-picker
                      v-model="searchForm.sjkssj"
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
      <div class="content">
        
      </div>
  </div>
</template>

<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import LocationSelector from '@/components/LocationSelector/index'
  import { getGoodsType } from '@/api/goodsRelease'
  import { parseTime } from '@/utils/index'
  export default {
    mounted () {
      this._getGoodsType()
    },
    data() {
      return {
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
          spfl: '',
          spzt: '',
          xsml: '',
          shenpizt: '',
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
      getLocationInfo(data) {
        this.searchForm.spcd = data.label
        this.searchForm.spcdcode = data.locationCode
      },
      handleChange(val) {
        this.searchForm.spfl = val.pop()
      }
    },
    computed: {
      getUpTime() {
        return parseTime(this.searchForm.sjkssj)
      },
      getDownTime() {
        return parseTime(this.searchForm.sjjssj)
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

