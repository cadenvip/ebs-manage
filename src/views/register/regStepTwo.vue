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
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="120px" style="margin:6px">
            <el-form-item label="企业名称：" prop="businessesName">
              <el-input v-model="registerForm.businessesName" clearable style="width: 200px;" placeholder="请输入企业名称"></el-input>
            </el-form-item>
            <el-form-item label="企业地址：" prop="locationCode">
              <RegionSelector v-model="registerForm.locationCode" :grade="4" :showCountry="false" @regionCodeChanged="getLocationCode"></RegionSelector>
            </el-form-item>
            <el-form-item label="" prop="address">
              <el-input v-model="registerForm.address" clearable style="width: 400px;" placeholder="请输入企业详细地址"></el-input>
            </el-form-item>
            <el-form-item label="法人姓名：" prop="legalName">
              <el-input v-model="registerForm.legalName" clearable style="width: 200px;" placeholder="请输入法人姓名"></el-input>
            </el-form-item>
            <el-form-item label="法人证件类型：" prop="legalPaperType">
              <el-select v-model="registerForm.legalPaperType" clearable style="width: 200px;" placeholder="请选择法人证件类型">
                <el-option label="身份证" value="1"></el-option>
                <el-option label="户口本" value="2"></el-option>
                <el-option label="驾驶本" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="法人证件号码：" prop="legalPaperNumber">
              <el-input v-model="registerForm.legalPaperNumber" clearable style="width: 200px;" placeholder="请输入法人证件号码"></el-input>
            </el-form-item>
            <el-form-item label="业务联系人：" prop="relationPerson">
              <el-input v-model="registerForm.relationPerson" clearable style="width: 200px;" placeholder="请输入业务联系人"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="relationPhone">
              <el-input v-model="registerForm.relationPhone" clearable style="width: 200px;" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="售后联系人：" prop="sellPersonName">
              <el-input v-model="registerForm.sellPersonName" clearable style="width: 200px;" placeholder="请输入售后联系人"></el-input>
            </el-form-item>
            <el-form-item label="售后电话：" prop="sellPersonMobile">
              <el-input v-model="registerForm.sellPersonMobile" clearable style="width: 200px;" placeholder="请输入售后电话"></el-input>
            </el-form-item>
            <el-form-item label="财务联系人：" prop="financePersonName">
              <el-input v-model="registerForm.financePersonName" clearable style="width: 200px;" placeholder="请输入财务联系人"></el-input>
            </el-form-item>
            <el-form-item label="财务手机：" prop="financePersonMobile">
              <el-input v-model="registerForm.financePersonMobile" clearable style="width: 200px;" placeholder="请输入财务手机"></el-input>
            </el-form-item>
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
          operatoridnum: '',
          isInvoice: '',
          // },
          // attachmentForm: {
          sfzmpicpath: '',
          sffmpicpath: '',
          licencepicpath: '',
          proxytestifypicpath: '',
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
          relationPhone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
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
    methods: {
      getLocationCode(locationInfo) {
        this.registerForm.locationCode = locationInfo
      },
      goBack() {
        this.$router.push({ path: '/register' })
      },
      goNext() {
        this.$router.push({ path: '/regStepThree' })
      }
    }
  }
</script>
