<template>
  <el-container>
    <el-header>
      <el-steps :active="1" simple>
        <el-step title="查阅协议" icon="el-icon-document"></el-step>
        <el-step title="基本信息" icon="el-icon-edit"></el-step>
        <el-step title="资质上传" icon="el-icon-upload"></el-step>
        <el-step title="提交待审核" icon="el-icon-circle-check-outline"></el-step>
      </el-steps>
    </el-header>
    <el-main>
      <div>
        <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="120px">
          <el-form-item label="企业名称：" prop="businessesName">
            <el-input v-model="registerForm.businessesName" clearable style="width: 200px;" placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="企业地址：" prop="locationCode">
            <RegionSelector v-model="registerForm.locationCode" :grade="4" :showCountry="false" @regionCodeChanged="getLocationCode"></RegionSelector>
          </el-form-item>
          <el-form-item label="" prop="address">
            <el-input v-model="registerForm.address" clearable style="width: 400px;" placeholder="请输入企业详细地址"></el-input>
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
        </el-form>
        <br/>
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <el-button @click="goBack" type="primary">返回上一步</el-button>
        <el-button @click="goNext" type="primary">保存并下一步</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
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
          address: '',
          relationPerson: '',
          relationPhone: '',
          sellPersonName: '',
          sellPersonMobile: '',
          financePersonName: '',
          financePersonMobile: '',
          isInvoice: '',
          // },
          // attachmentForm: {
          sfzmpicpath: '',
          sffmpicpath: '',
          licencepicpath: '',
          proxytestifypicpath: '',
          foodotherpicpath: [],
          // },
          goodsListForm: []
        },
        registerRules: {
          businessesName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
          locationCode: [{ required: true, message: '请选择地址', trigger: 'change' }],
          address: [{ required: true, message: '请输入企业详细地址', trigger: 'blur' }],
          relationPerson: [{ required: true, message: '请输入业务联系人', trigger: 'blur' }],
          relationPhone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
          sellPersonName: [{ required: true, message: '请输入售后联系人', trigger: 'blur' }],
          sellPersonMobile: [{ required: true, message: '请输入售后电话', trigger: 'blur' }],
          financePersonName: [{ required: true, message: '请输入财务联系人', trigger: 'blur' }],
          financePersonMobile: [{ required: true, message: '请输入财务手机', trigger: 'blur' }]
        }
      }
    },
    components: {
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
