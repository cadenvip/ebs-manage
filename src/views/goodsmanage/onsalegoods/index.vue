<template>
  <div style="padding-top: 20px;">
    <el-form :model="formT" ref="formT" label-width="100px" class="demo-ruleForm">
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
          <el-form-item style="display:inline-block; width: 50%;" label-width="20" prop="spzdjg" label="至:">
            <el-input style="width: 50%;display:inline-block;" :maxlength=5 v-model="formT.spzgjg"></el-input>
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
        <el-tab-pane align="center" label="销售中商品" name="first">
          <el-table @selection-change="handleTableSelectionChange" ref="multipleTable" :data="tableData3" tooltip-effect="dark" border style="width: 100%" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column align="center" label="商品编码" width="140">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="address" align="center" label="商品类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" align="center" label="价格" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" align="center" label="库存" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" align="center" label="上架时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" align="center" label="状态" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" align="center" label="审核状态" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" align="center" label="修改状态" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="操作" width="140">
            <template slot-scope="scope">
              <el-button @click="getGoodsDetail(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="saleOff(scope.row)" type="text" size="small">下架</el-button>
              <el-button @click="modifyGoods(scope.row)" type="text" size="small">修改</el-button>
            </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="缺货的商品" name="second">缺货的商品</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import { getGoodsTopType } from '@/api/goodsRelease'
  export default {
    created () {
      this._getGoodsTopType()
    },
    data() {
      return {
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
        tableData3: [{
          date: '12831321382138',
          name: '东北大米',
          address: '米油'
        }, {
          date: '12831321382138',
          name: '香蕉',
          address: '水果'
        }],
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
      handleTabClick(tab, event) {
        console.log(tab)
      },
      toggleSelection(rows) {
        alert(2)
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleTableSelectionChange(val) {
        alert(2)
        this.multipleSelection = val
        console.log(this.multipleSelection)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            for (var i in this.formT) {
              if (this.formT[i] !== '') {
                // 请求搜索接口
                return false
              } else {
                this.$message.error('未输入任何搜索信息！')
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
      getGoodsDetail(val) {
        console.log(val)
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
</style>
