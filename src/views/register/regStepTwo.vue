<template>
  <el-container>
    <Regheader></Regheader>
    <el-container style="width:1000px;margin:0 auto 20px">
      <el-header style="margin-top:20px">
        <el-steps :active="1" simple>
          <el-step title="查阅协议" icon="el-icon-document"></el-step>
          <el-step title="基本信息" icon="el-icon-edit"></el-step>
          <el-step title="资质上传" icon="el-icon-upload"></el-step>
          <el-step title="提交待审核" icon="el-icon-circle-check-outline"></el-step>
        </el-steps>
      </el-header>
      <el-main>
        <div style="border:1px solid #E6E6E6">
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="170px" style="margin:6px">
            <h5>企业基本信息</h5>
            <el-form-item label="企业名称：" prop="businessesName">
              <el-input v-model="registerForm.businessesName" :maxlength=16 clearable style="width: 220px;" placeholder="请输入企业名称"></el-input>
            </el-form-item>
            <el-form-item label="企业地址：" prop="locationCode">
              <RegionSelector v-model="registerForm.locationCode" :grade="4" :showCountry="false" @locationChanged="getLocationCode" :locationId="registerForm.locationCode"></RegionSelector>
            </el-form-item>
            <el-form-item label="详细地址：" prop="address">
              <el-input v-model="registerForm.address" :maxlength=32 clearable style="width: 400px;" placeholder="请输入企业详细地址"></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="业务联系人：" prop="relationPerson">
                  <el-input v-model="registerForm.relationPerson" :maxlength=16 clearable style="width: 220px;" placeholder="请输入业务联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14" style="padding-top:8px">
                <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">该联系人用于业务联系，请填写主要平台使用负责人</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="业务联系人手机号码：" prop="relationPhone">
                  <el-input v-model="registerForm.relationPhone" clearable :maxlength=11 style="width: 220px;" placeholder="请输入业务联系人手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14" style="padding-top:8px">
                <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">该手机将用于平台登录，接收发送的关键信息，请填写有效移动手机号码</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="售后联系人：" prop="sellPersonName">
                  <el-input v-model="registerForm.sellPersonName" :maxlength=16 clearable style="width: 220px;" placeholder="请输入售后联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14" style="padding-top:8px">
                <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">用于解答用户投诉或商品质量问题</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="售后电话：" prop="sellPersonMobile">
                  <el-input v-model="registerForm.sellPersonMobile" clearable :maxlength=18 style="width: 220px;" placeholder="请输入售后电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="财务联系人：" prop="financePersonName">
                  <el-input v-model="registerForm.financePersonName" :maxlength=16 clearable style="width: 220px;" placeholder="请输入财务联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14" style="padding-top:8px">
                <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">用于在线支付相关结算对账联系使用</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="财务手机：" prop="financePersonMobile">
                  <el-input v-model="registerForm.financePersonMobile" clearable :maxlength=11 style="width: 220px;" placeholder="请输入财务手机"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="能否开具发票：" prop="isInvoice">
              <el-radio-group v-model="registerForm.isInvoice">
                <el-radio :label="1">能</el-radio>
                <el-radio :label="0">不能</el-radio>
              </el-radio-group>
            </el-form-item>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <h5>商品销售信息</h5>
            <el-table :data="registerForm.goodsListForm" border style="width:100%">
              <el-table-column property="num" label="编号" width="50"></el-table-column>
              <el-table-column property="name" label="商品名称" width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" :maxlength=16 placeholder="请输入名称"></el-input>
                </template>
              </el-table-column>
              <el-table-column property="unit" label="商品规格" width="90">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.unit" :maxlength=8 placeholder="请输入规格"></el-input>
                </template>
              </el-table-column>
              <el-table-column property="origin" label="商品产地" width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.origin" :maxlength=16 placeholder="请输入产地"></el-input>
                </template>
              </el-table-column>
              <el-table-column property="price" label="市场价格(元)" width="110">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.price" :maxlength=16 placeholder="请输入价格">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column property="description" label="商品特色" width="240">
                <template slot-scope="scope">
                  <el-input type="textarea" v-model="scope.row.description" :maxlength=32 placeholder="请输入特色"></el-input>
                </template>
              </el-table-column>
              <el-table-column property="url" label="介绍链接" width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.url" :maxlength=200 placeholder="请输入介绍链接"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <br/>
        </div>
        <div style="margin-top: 20px; text-align: center;">
          <el-button @click="goBack" type="primary">返回上一步</el-button>
          <el-button @click="goNext" type="primary">保存并下一步</el-button>
        </div>
      </el-main>
    </el-container>
    <el-footer>
      <Regfooter></Regfooter>
    </el-footer>
  </el-container>
</template>

<script>
  import Regheader from '@/components/Register/regheader'
  import Regfooter from '@/components/Register/regfooter'
  import RegionSelector from '@/components/RegionSelector/index'
  import AddressSelector from '@/components/AddressSelector/index'
  import {
    validateMobilePhone,
    containSymbol
  } from '@/utils/validate'
  // import { validateMobilePhone, validateTelephone } from '@/utils/validate'

  export default {
    data() {
      // 校验手机号
      var validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else {
          if (!validateMobilePhone(value.trim())) {
            callback(new Error('请输入有效的手机号码'))
          } else {
            callback()
          }
        }
      }
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'))
        } else {
          if (value.indexOf(' ') >= 0) {
            callback(new Error('不能包含空格'))
          } else if (containSymbol(value.trim())) {
            callback(new Error('不能包含特殊字符'))
          } else {
            callback()
          }
        }
      }
      // // 校验电话号码（包括手机号码、座机号码）
      // var validateContact = (rule, value, callback) => {
      //   debugger
      //   if (value === '') {
      //     callback(new Error('请输入电话号码'))
      //   } else {
      //     if (!validateMobilePhone(value.trim()) && !validateTelephone(value.trim())) {
      //       callback(new Error('请输入有效的电话号码'))
      //     }
      //     callback()
      //   }
      // }
      return {
        registerForm: {
          // businessesForm: {
          businessesName: '',
          locationCode: '0',
          businesslicenseNum: '',
          merchantKind: '1',
          address: '',
          relationPerson: '',
          relationPhone: '',
          sellPersonName: '',
          sellPersonMobile: '',
          financePersonName: '',
          financePersonMobile: '',
          operatoridnum: '',
          isInvoice: '',
          // },
          // attachmentForm: {
          sfzmpicpath: '',
          sffmpicpath: '',
          licencepicpath: '',
          proxytestifypicpath: '',
          foodsafetypicpath: '',
          foodpathpicpath: '',
          foodotherpicpath: [],
          // },
          goodsListForm: [{
            num: '示例',
            name: '鱼香大米',
            unit: '5KG',
            origin: '重庆,西永',
            price: '250',
            description: '多种蛋白质、营养丰富、色泽光亮、颗粒饱满',
            url: 'http://detail.tmall.com/item.htm?spm=a230r.1.14.172.VhFL'
          },
          {
            num: '01',
            name: '',
            unit: '',
            origin: '',
            price: '',
            description: '',
            url: ''
          },
          {
            num: '02',
            name: '',
            unit: '',
            origin: '',
            price: '',
            description: '',
            url: ''
          },
          {
            num: '03',
            name: '',
            unit: '',
            origin: '',
            price: '',
            description: '',
            url: ''
          },
          {
            num: '04',
            name: '',
            unit: '',
            origin: '',
            price: '',
            description: '',
            url: ''
          }
          ]
        },
        registerRules: {
          businessesName: [{
            required: true,
            validator: validateName,
            trigger: 'change'
          }],
          locationCode: [{
            required: true,
            message: '请选择地址',
            trigger: 'change'
          }],
          address: [{
            required: true,
            message: '请输入企业详细地址',
            trigger: 'blur'
          }],
          relationPerson: [{
            required: true,
            validator: validateName,
            trigger: 'change'
          }],
          relationPhone: [{
            required: true,
            trigger: 'blur',
            validator: validateMobile
          }],
          sellPersonName: [{
            required: true,
            validator: validateName,
            trigger: 'change'
          }],
          sellPersonMobile: [{
            required: true,
            message: '请输入售后电话',
            trigger: 'blur',
            validator: validateMobile
          }],
          financePersonName: [{
            required: true,
            validator: validateName,
            trigger: 'change'
          }],
          financePersonMobile: [{
            required: true,
            message: '请输入财务手机',
            trigger: 'blur',
            validator: validateMobile
          }],
          isInvoice: [{
            required: true,
            message: '请选择能否开具发票',
            trigger: 'change'
          }]
        }
      }
    },
    components: {
      Regheader,
      Regfooter,
      RegionSelector,
      AddressSelector
    },
    created() {
      // 从下一步返回到上一步时取出之前填写的值
      var registerInfo = window.localStorage.getItem('registerInfo')
      if (registerInfo !== null && registerInfo !== undefined && registerInfo !== '') {
        var defaultRegisterInfo = JSON.parse(registerInfo)
        if (defaultRegisterInfo.businessesName !== '') {
          this.registerForm = defaultRegisterInfo
        }
      }
    },
    methods: {
      getLocationCode(locationInfo) {
        this.registerForm.locationCode = locationInfo.id.toString()
      },
      goBack() {
        this.$router.push({
          path: '/register'
        })
      },
      goNext() {
        // 校验填写有效性
        if (this.registerForm.businessesName === '') {
          this.$message({
            type: 'warning',
            message: '请输入企业名称'
          })
          return
        } else {
          if (this.registerForm.businessesName.indexOf(' ') >= 0) {
            this.$message({
              type: 'warning',
              message: '企业名称不能包含空格'
            })
            return
          } else if (containSymbol(this.registerForm.businessesName)) {
            this.$message({
              type: 'warning',
              message: '企业名称不能包含特殊字符'
            })
            return
          }
        }

        if (this.registerForm.locationCode === '') {
          this.$message({
            type: 'warning',
            message: '请选择企业地址'
          })
          return
        }
        if (this.registerForm.address === '') {
          this.$message({
            type: 'warning',
            message: '请输入企业详细地址'
          })
          return
        }
  
        if (this.registerForm.relationPerson === '') {
          this.$message({
            type: 'warning',
            message: '请输入业务联系人'
          })
          return
        } else {
          if (this.registerForm.relationPerson.indexOf(' ') >= 0) {
            this.$message({
              type: 'warning',
              message: '业务联系人不能包含空格'
            })
            return
          } else if (containSymbol(this.registerForm.relationPerson)) {
            this.$message({
              type: 'warning',
              message: '业务联系人不能包含特殊字符'
            })
            return
          }
        }

        if (this.registerForm.relationPhone === '') {
          this.$message({
            type: 'warning',
            message: '请输入手机号码'
          })
          return
        }

        if (this.registerForm.sellPersonName === '') {
          this.$message({
            type: 'warning',
            message: '请输入售后联系人'
          })
          return
        } else {
          if (this.registerForm.sellPersonName.indexOf(' ') >= 0) {
            this.$message({
              type: 'warning',
              message: '售后联系人不能包含空格'
            })
            return
          } else if (containSymbol(this.registerForm.sellPersonName)) {
            this.$message({
              type: 'warning',
              message: '售后联系人不能包含特殊字符'
            })
            return
          }
        }

        if (this.registerForm.sellPersonName === '') {
          this.$message({
            type: 'warning',
            message: '请输入售后联系人'
          })
          return
        }
        if (this.registerForm.sellPersonMobile === '') {
          this.$message({
            type: 'warning',
            message: '请输入售后联系电话'
          })
          return
        }

        if (this.registerForm.financePersonName === '') {
          this.$message({
            type: 'warning',
            message: '请输入财务联系人'
          })
          return
        } else {
          if (this.registerForm.financePersonName.indexOf(' ') >= 0) {
            this.$message({
              type: 'warning',
              message: '财务联系人不能包含空格'
            })
            return
          } else if (containSymbol(this.registerForm.financePersonName)) {
            this.$message({
              type: 'warning',
              message: '财务联系人不能包含特殊字符'
            })
            return
          }
        }

        if (this.registerForm.financePersonMobile === '') {
          this.$message({
            type: 'warning',
            message: '请输入财务手机'
          })
          return
        }
        if (this.registerForm.isInvoice === '') {
          this.$message({
            type: 'warning',
            message: '请选择能否开具发票'
          })
          return
        }
        // 校验表格
        for (let i = 1; i < this.registerForm.goodsListForm.length; i++) {
          if (i === 1) {
            if (this.registerForm.goodsListForm[i].name.trim() === '') {
              this.$message({
                type: 'warning',
                message: '请输入商品名称'
              })
              return
            }
            if (this.registerForm.goodsListForm[i].unit.trim() === '') {
              this.$message({
                type: 'warning',
                message: '请输入商品规格'
              })
              return
            }
            if (this.registerForm.goodsListForm[i].origin.trim() === '') {
              this.$message({
                type: 'warning',
                message: '请输入商品产地'
              })
              return
            }
            if (this.registerForm.goodsListForm[i].price.trim() === '') {
              this.$message({
                type: 'warning',
                message: '请输入商品价格'
              })
              return
            }
          }
          if ((this.registerForm.goodsListForm[i].name.trim() !== undefined && this.registerForm.goodsListForm[i].name.trim() !==
              '') ||
            (this.registerForm.goodsListForm[i].unit.trim() !== undefined && this.registerForm.goodsListForm[i].unit.trim() !==
              '') ||
            (this.registerForm.goodsListForm[i].origin.trim() !== undefined && this.registerForm.goodsListForm[i].origin
              .trim() !== '') ||
            (this.registerForm.goodsListForm[i].name.trim() !== undefined && this.registerForm.goodsListForm[i].price.trim() !==
              '') ||
            (this.registerForm.goodsListForm[i].description.trim() !== undefined && this.registerForm.goodsListForm[i].description
              .trim() !== '') ||
            (this.registerForm.goodsListForm[i].url.trim() !== undefined && this.registerForm.goodsListForm[i].url.trim() !==
              '')) {
            if (this.registerForm.goodsListForm[i].name.trim() === '') {
              this.$message({
                type: 'warning',
                message: '请输入商品名称'
              })
              return
            }
            if (this.registerForm.goodsListForm[i].unit.trim() === '') {
              this.$message({
                type: 'warning',
                message: '请输入商品规格'
              })
              return
            }
            if (this.registerForm.goodsListForm[i].origin.trim() === '') {
              this.$message({
                type: 'warning',
                message: '请输入商品产地'
              })
              return
            }
            if (this.registerForm.goodsListForm[i].price.trim() === '') {
              this.$message({
                type: 'warning',
                message: '请输入商品价格'
              })
              return
            }
          }
        }
        var registerInfo = JSON.stringify(this.registerForm)
        window.localStorage.setItem('registerInfo', registerInfo)
        this.$router.push({
          path: '/regStepThree'
        })
      }
    }
  }

</script>
