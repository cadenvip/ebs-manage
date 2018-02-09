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
        <div style="border:1px solid #000" >
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="170px" style="margin:6px">
            <h5>企业基本信息</h5>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="企业名称：" prop="businessesName">
                  <el-input v-model="registerForm.businessesName" clearable style="width: 200px;" placeholder="请输入企业名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业简称：" prop="businessesShortName">
                  <el-input v-model="registerForm.businessesShortName" clearable style="width: 200px;" placeholder="请输入企业简称"></el-input>
                </el-form-item>                
              </el-col>
            </el-row>
            <el-form-item label="商家类型：" prop="businessType">
              <el-select v-model="registerForm.businessType" clearable style="width: 200px;" placeholder="请选择商家类型">
                <el-option label="合作商家" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业地址：" prop="locationCode">
              <RegionSelector v-model="registerForm.locationCode" :grade="4" :showCountry="false" @locationChanged="getLocationCode" :locationId="registerForm.locationCode"></RegionSelector>
            </el-form-item>
            <el-form-item label="" prop="address">
              <el-input v-model="registerForm.address" clearable style="width: 400px;" placeholder="请输入企业详细地址"></el-input>
            </el-form-item>
            <el-form-item label="法人姓名：" prop="legalName">
              <el-input v-model="registerForm.legalName" clearable style="width: 200px;" placeholder="请输入法人姓名"></el-input>
            </el-form-item>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="法人证件类型：" prop="legalPaperType">
                  <el-select v-model="registerForm.legalPaperType" clearable style="width: 200px;" placeholder="请选择法人证件类型">
                    <el-option label="身份证" value="1"></el-option>
                    <el-option label="户口本" value="2"></el-option>
                    <el-option label="驾驶本" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法人证件号码：" prop="legalPaperNumber">
                  <el-input v-model="registerForm.legalPaperNumber" clearable style="width: 200px;" placeholder="请输入法人证件号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="业务联系人：" prop="relationPerson">
                  <el-input v-model="registerForm.relationPerson" clearable style="width: 200px;" placeholder="请输入业务联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="业务联系人手机号码：" prop="relationPhone">
                  <el-input v-model="registerForm.relationPhone" clearable style="width: 200px;" placeholder="请输入业务联系人手机号码"></el-input>
                </el-form-item>                
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="售后联系人：" prop="sellPersonName">
                  <el-input v-model="registerForm.sellPersonName" clearable style="width: 200px;" placeholder="请输入售后联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="售后电话：" prop="sellPersonMobile">
                  <el-input v-model="registerForm.sellPersonMobile" clearable style="width: 200px;" placeholder="请输入售后电话"></el-input>
                </el-form-item>                
              </el-col>
            </el-row>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <h5>财务信息</h5>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="财务联系人：" prop="financePersonName">
                  <el-input v-model="registerForm.financePersonName" clearable style="width: 200px;" placeholder="请输入财务联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="财务手机：" prop="financePersonMobile">
                  <el-input v-model="registerForm.financePersonMobile" clearable style="width: 200px;" placeholder="请输入财务手机"></el-input>
                </el-form-item>                
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="财务联系人电话：" prop="financePersonPhone">
                  <el-input v-model="registerForm.financePersonPhone" clearable style="width: 200px;" placeholder="请输入财务联系人电话"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="财务邮箱：" prop="financePersonEmail">
                  <el-input v-model="registerForm.financePersonEmail" clearable style="width: 200px;" placeholder="请输入财务邮箱"></el-input>
                </el-form-item>                
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="财务通信地址：" prop="financePersonAddress">
                  <el-input v-model="registerForm.financePersonAddress" clearable style="width: 200px;" placeholder="请输入通信地址"></el-input>
                </el-form-item>  
              </el-col>
              <el-col :span="12">
                <el-form-item label="能否开具发票：" prop="isInvoice">
                  <el-radio-group v-model="registerForm.isInvoice">
                    <el-radio :label="1">能</el-radio>
                    <el-radio :label="0">不能</el-radio>
                  </el-radio-group>
                </el-form-item>               
              </el-col>
            </el-row>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <h5>商品销售信息</h5>
            <el-table :data="registerForm.goodsListForm" border style="width:100%">
              <el-table-column property="num" label="编号" width="50"></el-table-column>
              <el-table-column property="name" label="商品名称" width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" placeholder="请输入名称"></el-input>
                </template>
              </el-table-column>
              <el-table-column property="unit" label="商品规格" width="100">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.unit" placeholder="请输入规格"></el-input>
                </template>
              </el-table-column>
              <el-table-column property="origin" label="商品产地" width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.origin" placeholder="请输入产地"></el-input>
                </template>
              </el-table-column>
              <el-table-column property="price" label="市场价格" width="100">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.price" placeholder="请输入价格">
                    <template prefix="￥"></template>
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column property="description" label="商品特色" width="240">
                <template slot-scope="scope">
                  <el-input type="textarea" v-model="scope.row.description" placeholder="请输入特色"></el-input>
                </template>
              </el-table-column>
              <el-table-column property="url" label="介绍链接" width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.url" placeholder="请输入介绍链接"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <h5>支付信息</h5>
            <el-form-item label="启用语音支付：" prop="merchantPayable">
              <el-checkbox v-model="registerForm.merchantPayable"></el-checkbox>
            </el-form-item>
            <el-form-item label="语音支付商户号：" prop="merchantNo">
              <el-input v-model="registerForm.merchantNo" clearable style="width: 200px;" placeholder="请输入语音支付商户号" :disabled="!registerForm.merchantPayable"></el-input>
            </el-form-item>
            <el-form-item label="启用话费支付：" prop="wirelesscitypayable">
              <el-checkbox v-model="registerForm.wirelesscitypayable"></el-checkbox>
            </el-form-item>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="话费支付商户号：" prop="wirelesscityno">
                  <el-input v-model="registerForm.wirelesscityno" clearable style="width: 200px;" placeholder="请输入话费支付商户号" :disabled="!registerForm.wirelesscitypayable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="话费支付商户名称：" prop="wirelesscityname">
                  <el-input v-model="registerForm.wirelesscityname" clearable style="width: 200px;" placeholder="请输入话费支付商户名称" :disabled="!registerForm.wirelesscitypayable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="话费支付渠道编号：" prop="wirelesstpcode">
                  <el-input v-model="registerForm.wirelesstpcode" clearable style="width: 200px;" placeholder="请输入话费支付渠道编号" :disabled="!registerForm.wirelesscitypayable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="话费支付渠道名称：" prop="wirelesstpname">
                  <el-input v-model="registerForm.wirelesstpname" clearable style="width: 200px;" placeholder="请输入话费支付渠道名称" :disabled="!registerForm.wirelesscitypayable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="启用支付宝支付：" prop="aliPayNoPayable">
              <el-checkbox v-model="registerForm.aliPayNoPayable"></el-checkbox>
            </el-form-item>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="支付宝卖家账号：" prop="aliPayAccount">
                  <el-input v-model="registerForm.aliPayAccount" clearable style="width: 200px;" placeholder="请输入支付宝卖家账号" :disabled="!registerForm.aliPayNoPayable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支付宝平台签名Key：" prop="aliPaySignKey">
                  <el-input v-model="registerForm.aliPaySignKey" clearable style="width: 200px;" placeholder="请输入支付宝平台签名Key" :disabled="!registerForm.aliPayNoPayable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="支付宝卖家名字：" prop="aliPaySellerAccountName">
              <el-input v-model="registerForm.aliPaySellerAccountName" clearable style="width: 200px;" placeholder="请输入支付宝卖家名字" :disabled="!registerForm.aliPayNoPayable"></el-input>
            </el-form-item>
            <el-form-item label="启用手机和包支付：" prop="cmPayNoPayable">
              <el-checkbox v-model="registerForm.cmPayNoPayable"></el-checkbox>
            </el-form-item>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="和包支付平台商家ID：" prop="cmPayMerchantId">
                  <el-input v-model="registerForm.cmPayMerchantId" clearable style="width: 200px;" placeholder="请输入和包支付平台商家ID" :disabled="!registerForm.cmPayNoPayable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="和包支付平台签名KEY：" prop="cmPaySignKey">
                  <el-input v-model="registerForm.cmPaySignKey" clearable style="width: 200px;" placeholder="请输入和包支付平台签名KEY" :disabled="!registerForm.cmPayNoPayable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="启用联动优势支付：" prop="umPayNoPayable">
              <el-checkbox v-model="registerForm.umPayNoPayable"></el-checkbox>
            </el-form-item>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="联动优势平台商家ID：" prop="umPayMerchantId">
                  <el-input v-model="registerForm.umPayMerchantId" clearable style="width: 200px;" placeholder="请输入联动优势平台商家ID" :disabled="!registerForm.umPayNoPayable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联动优势银行账号名：" prop="umPayBankAccountName">
                  <el-input v-model="registerForm.umPayBankAccountName" clearable style="width: 200px;" placeholder="请输入联动优势银行账号名" :disabled="!registerForm.umPayNoPayable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="联动优势银行账号：" prop="umPayBankAccountNo">
              <el-input v-model="registerForm.umPayBankAccountNo" clearable style="width: 200px;" placeholder="联动优势银行账号" :disabled="!registerForm.umPayNoPayable"></el-input>
            </el-form-item>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <h5>其他信息</h5>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="注册资金：" prop="registerMoney">
                  <el-input v-model="registerForm.registerMoney" clearable style="width: 200px;" placeholder="请输入注册资金"></el-input>
                </el-form-item>                
              </el-col>
              <el-col :span="12">
                <el-form-item label="保证金：" prop="margin">
                  <el-input v-model="registerForm.margin" clearable style="width: 200px;" placeholder="请输入保证金"></el-input>
                </el-form-item>                 
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="违约金：" prop="liquidatedDamages">
                  <el-input v-model="registerForm.liquidatedDamages" clearable style="width: 200px;" placeholder="请输入违约金"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="税务登记号：" prop="taxRegistrationNum">
                  <el-input v-model="registerForm.taxRegistrationNum" clearable style="width: 200px;" placeholder="请输入税务登记号"></el-input>
                </el-form-item>                
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="办公室电话：" prop="officePhone">
                  <el-input v-model="registerForm.officePhone" clearable style="width: 200px;" placeholder="请输入办公室电话"></el-input>
                </el-form-item>  
              </el-col>
              <el-col :span="12">
                <el-form-item label="营业时间：" prop="operateHours">
                  <el-input v-model="registerForm.operateHours" clearable style="width: 200px;" placeholder="请输入营业时间"></el-input>
                </el-form-item>                  
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="雇员数量：" prop="employeesNum">
                  <el-input v-model="registerForm.employeesNum" clearable style="width: 200px;" placeholder="请输入雇员数量"></el-input>
                </el-form-item>   
              </el-col>
              <el-col :span="12">
                <el-form-item label="传真：" prop="fax">
                  <el-input v-model="registerForm.fax" clearable style="width: 200px;" placeholder="请输入传真号码"></el-input>
                </el-form-item>                   
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="邮编：" prop="zipCode">
                  <el-input v-model="registerForm.zipCode" clearable style="width: 200px;" placeholder="请输入邮编"></el-input>
                </el-form-item>   
              </el-col>
              <el-col :span="12">
                <el-form-item label="所有制类型：" prop="ownershipType">
                  <el-select v-model="registerForm.ownershipType" clearable style="width: 200px;" placeholder="请选择所有制类型">
                    <el-option label="国有企业" value="1"></el-option>
                    <el-option label="集体企业" value="2"></el-option>
                    <el-option label="私营企业" value="3"></el-option>
                    <el-option label="混合所有制企业" value="4"></el-option>
                  </el-select>
                </el-form-item>                   
              </el-col>
            </el-row>
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

  export default {
    data() {
      return {
        registerForm: {
          // businessesForm: {
          businessesName: '',
          businessesShortName: '',	// 企业简称
          businessType: '',			// 商家类型
          locationCode: '',
          businesslicenseNum: '',
          merchantKind: '',
          legalName: '',
          legalPaperType: '',
          legalPaperNumber: '',
          address: '',
          relationPerson: '',
          relationPhone: '',
          sellPersonName: '',
          sellPersonMobile: '',
          financePersonName: '',
          financePersonMobile: '',
          financePersonPhone: '',	// 财务联系人电话
          financePersonEmail: '',	// 财务邮箱
          financePersonAddress: '',	// 财务通信地址
          operatoridnum: '',
          registerMoney: '',			// 注册资金
          margin: '',					// 保证金
          liquidatedDamages: '',	// 违约金
          taxRegistrationNum: '',	// 税务登记号码
          officePhone: '',		// 办公室电话
          operateHours: '',	// 营业时间
          employeesNum: '',			// 雇员数量
          fax: '',				// 传真
          zipCode: '',				// 邮编
          ownershipType: '',		// 所有制类型 国有企业/集体企业/私营企业/混合所有制企业
          isInvoice: '',
          merchantPayable: '',  // 是否开启语音支付(0-关闭，1-开启)
          merchantNo: '',       // 语音支付号码
          aliPayNoPayable: '',	// 是否开启支付宝支付(0-关闭 ，1-开启)
          aliPayAccount: '',		// 支付宝卖家账号（email或者手机号）
          aliPaySignKey: '',		// 支付宝平台签名Key
          aliPaySellerAccountName: '',	// 支付宝卖家名字
          cmPayNoPayable: '',			// 是否开启手机和包支付(0关闭 1开启)
          cmPayMerchantId: '',		// 手机和包支付平台商家ID
          cmPaySignKey: '',		// 手机和包支付平台签名KEY
          umPayNoPayable: '',			// 是否支持联动优势
          umPayMerchantId: '',		// 联动优势平台商家ID
          umPayBankAccountName: '',		// 联动优势银行账号名
          umPayBankAccountNo: '',	// 联动优势银行账号
          wirelesscityno: '',		// 无线城市话费支付商号
          wirelesscityname: '',		// 无线城市话费支付商户名称
          wirelesscitypayable: '1',		// 是否开启无线城市话费支付（0关闭 1开启）
          wirelesstpcode: '',		// 无线城市话费支付渠道编码
          wirelesstpname: '',		// 无线城市话费支付渠道名称
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
          goodsListForm: [
            {
              num: '示例',
              name: '鱼香大米',
              unit: '5KG',
              origin: '重庆,西永',
              price: '￥250',
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
          businessesName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
          locationCode: [{ required: true, message: '请选择地址', trigger: 'change' }],
          address: [{ required: true, message: '请输入企业详细地址', trigger: 'blur' }],
          legalName: [{ required: true, message: '请输入法人姓名', trigger: 'blur' }],
          legalPaperType: [{ required: true, message: '请选择法人证件类型', trigger: 'change' }],
          legalPaperNumber: [{ required: true, message: '请输入法人证件号码', trigger: 'blur' }],
          relationPerson: [{ required: true, message: '请输入业务联系人', trigger: 'blur' }],
          relationPhone: [{ required: true, message: '请输入业务联系人手机号码', trigger: 'blur' }],
          sellPersonName: [{ required: true, message: '请输入售后联系人', trigger: 'blur' }],
          sellPersonMobile: [{ required: true, message: '请输入售后电话', trigger: 'blur' }],
          financePersonName: [{ required: true, message: '请输入财务联系人', trigger: 'blur' }],
          financePersonMobile: [{ required: true, message: '请输入财务手机', trigger: 'blur' }],
          isInvoice: [{ required: true, message: '请选择能否开具发票', trigger: 'change' }]
        }
      }
    },
    components: {
      Regheader,
      Regfooter,
      RegionSelector
    },
    created () {
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
        this.registerForm.locationCode = locationInfo.id
      },
      goBack() {
        this.$router.push({ path: '/register' })
      },
      goNext() {
        // 校验填写有效性
        if (this.registerForm.businessesName === '') {
          this.$message({ type: 'warning', message: '请输入企业名称' })
          return
        }
        if (this.registerForm.locationCode === '') {
          this.$message({ type: 'warning', message: '请选择企业地址' })
          return
        }
        if (this.registerForm.address === '') {
          this.$message({ type: 'warning', message: '请输入企业详细地址' })
          return
        }
        if (this.registerForm.legalName === '') {
          this.$message({ type: 'warning', message: '请输入法人姓名' })
          return
        }
        if (this.registerForm.legalPaperType === '') {
          this.$message({ type: 'warning', message: '请选择法人证件类型' })
          return
        }
        if (this.registerForm.legalPaperNumber === '') {
          this.$message({ type: 'warning', message: '请输入法人证件号码' })
          return
        }
        if (this.registerForm.relationPerson === '') {
          this.$message({ type: 'warning', message: '请输入业务联系人' })
          return
        }
        if (this.registerForm.relationPerson === '') {
          this.$message({ type: 'warning', message: '请输入业务联系人' })
          return
        }
        if (this.registerForm.relationPhone === '') {
          this.$message({ type: 'warning', message: '请输入手机号码' })
          return
        }
        if (this.registerForm.sellPersonName === '') {
          this.$message({ type: 'warning', message: '请输入售后联系人' })
          return
        }
        if (this.registerForm.sellPersonMobile === '') {
          this.$message({ type: 'warning', message: '请输入售后联系电话' })
          return
        }
        if (this.registerForm.financePersonName === '') {
          this.$message({ type: 'warning', message: '请输入财务联系人' })
          return
        }
        if (this.registerForm.financePersonMobile === '') {
          this.$message({ type: 'warning', message: '请输入财务手机' })
          return
        }
        if (this.registerForm.isInvoice === '') {
          this.$message({ type: 'warning', message: '请选择能否开具发票' })
          return
        }
        // 校验表格
        for (let i = 1; i < this.registerForm.goodsListForm.length; i++) {
          // name: '',
          // unit: '',
          // origin: '',
          // price: '',
          // description: '',
          // url: ''
          if (i === 1) {
            if (this.registerForm.goodsListForm[i].name.trim() === '') {
              this.$message({ type: 'warning', message: '请输入商品名称' })
              return
            }
            if (this.registerForm.goodsListForm[i].unit.trim() === '') {
              this.$message({ type: 'warning', message: '请输入商品规格' })
              return
            }
            if (this.registerForm.goodsListForm[i].origin.trim() === '') {
              this.$message({ type: 'warning', message: '请输入商品产地' })
              return
            }
            if (this.registerForm.goodsListForm[i].price.trim() === '') {
              this.$message({ type: 'warning', message: '请输入商品价格' })
              return
            }
          }
        }
        var registerInfo = JSON.stringify(this.registerForm)
        window.localStorage.setItem('registerInfo', registerInfo)
        this.$router.push({ path: '/regStepThree' })
      }
    }
  }
</script>
