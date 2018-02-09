<template>
  <el-container>
  <Regheader></Regheader>
    <el-container style="width:1000px;margin:0 auto 20px">
      <el-header style="margin-top:20px">
        <el-steps :active="2" simple>
          <el-step title="查阅协议" icon="el-icon-document"></el-step>
          <el-step title="基本信息" icon="el-icon-edit"></el-step>
          <el-step title="资质上传" icon="el-icon-upload"></el-step>
          <el-step title="提交待审核" icon="el-icon-circle-check-outline"></el-step>
        </el-steps>
      </el-header>
      <el-main>
        <div style="border:1px solid #000">   
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="170px" style="margin:6px">
            <h5>企业经营资质</h5>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <el-form-item label="企业营业执照：" prop="businesslicenseNum">
              <el-input v-model="registerForm.businesslicenseNum" clearable style="width: 270px;" placeholder="请输入营业执照号码"></el-input>
            </el-form-item>
            <el-form-item label="营业执照图片：">
              <el-upload
                action="http://10.189.13.151:8080/ebs/common/upload"
                list-type="text"
                :show-file-list="false"
                :on-success="handleLicenceSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <!-- <img v-if="registerForm.licencepicpath" :src="registerForm.licencepicpath" class="avatar"> -->
                <el-button size="small" type="primary">点击上传</el-button>
                <el-button v-if="registerForm.licencepicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.licencepicpath)">上传成功，点击预览</el-button>
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </el-upload>
            </el-form-item>
          <el-form-item label="经办人身份证：" prop="operatoridnum">
            <el-input v-model="registerForm.operatoridnum" clearable style="width: 270px;" placeholder="输入身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="身份证正面：" prop="sfzmpicpath">
              <el-upload
                action="http://10.189.13.151:8080/ebs/common/upload"
                list-type="picture-card"
                :show-file-list="false"
                :on-success="handleSfzmSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <img v-if="registerForm.sfzmpicpath" :src="registerForm.sfzmpicpath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="身份证反面：" prop="sffmpicpath">
              <el-upload
                action="http://10.189.13.151:8080/ebs/common/upload"
                list-type="picture-card"
                :show-file-list="false"
                :on-success="handleSffmSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <img v-if="registerForm.sffmpicpath" :src="registerForm.sffmpicpath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <br/>
            <h5>产品经营许可</h5>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <el-form-item label="请选择企业性质：" prop="merchantKind">
              <el-radio-group v-model="registerForm.merchantKind">
                <el-radio :label="1">生产商</el-radio>
                <el-radio :label="2">经销商</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="registerForm.merchantKind === 2" label="代理授权证明：">
              <el-upload
                action="http://10.189.13.151:8080/ebs/common/upload"
                list-type="picture-card"
                :show-file-list="false"
                :on-success="handleProxySuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <img v-if="registerForm.proxytestifypicpath" :src="registerForm.proxytestifypicpath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="食品安全认证：">
              <el-upload
                action="http://10.189.13.151:8080/ebs/common/upload"
                list-type="picture-card"
                :show-file-list="false"
                :on-success="handleFoodSafetySuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <img v-if="registerForm.foodsafetypicpath" :src="registerForm.foodsafetypicpath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="食品流通许可：">
              <el-upload
                action="http://10.189.13.151:8080/ebs/common/upload"
                list-type="picture-card"
                :show-file-list="false"
                :on-success="handleFoodCirculationSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <img v-if="registerForm.foodpathpicpath" :src="registerForm.foodpathpicpath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="其他：">
              <el-upload
                action="http://10.189.13.151:8080/ebs/common/upload"
                list-type="picture-card"
                :on-success="handleFoodOtherSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <!-- 图片预览 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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

  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
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
          businesslicenseNum: [{ required: true, message: '请输入营业执照号码', trigger: 'blur' }],
          operatoridnum: [{ required: true, message: '请输入经办人身份证号码', trigger: 'blur' }],
          sfxmpicpath: [{ required: true, message: '请上传经办人身份证正面', trigger: 'change' }],
          sffmpicpath: [{ required: true, message: '请上传经办人身份证发面', trigger: 'change' }]
        }
      }
    },
    components: {
      Regheader,
      Regfooter
    },
    mounted () {
      // 从下一步返回到上一步时取出之前填写的值
      var registerInfo = window.localStorage.getItem('registerInfo')
      if (registerInfo !== undefined && registerInfo !== '') {
        var defaultRegisterInfo = JSON.parse(registerInfo)
        if (defaultRegisterInfo.businessesName !== '') {
          this.registerForm = defaultRegisterInfo
        }
      }
    },
    methods: {
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      handleLicenceSuccess(res, file) {
        this.registerForm.licencepicpath = URL.createObjectURL(file.raw)
      },
      handleSfzmSuccess(res, file) {
        this.registerForm.sfzmpicpath = URL.createObjectURL(file.raw)
      },
      handleSffmSuccess(res, file) {
        this.registerForm.sffmpicpath = URL.createObjectURL(file.raw)
      },
      handleProxySuccess(res, file) {
        this.registerForm.proxytestifypicpath = URL.createObjectURL(file.raw)
      },
      handleFoodSafetySuccess(res, file) {
        this.registerForm.foodsafetypicpath = URL.createObjectURL(file.raw)
      },
      handleFoodCirculationSuccess(res, file) {
        this.registerForm.foodpathpicpath = URL.createObjectURL(file.raw)
      },
      handleFoodOtherSuccess(res, file) {
        this.registerForm.foodotherpicpath.push(URL.createObjectURL(file.raw))
        console.log(this.registerForm.foodotherpicpath)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file
        this.dialogVisible = true
      },
      goBack() {
        this.$router.push({ path: '/regStepTwo' })
      },
      goNext() {
        // 校验输入数据
        // 提交到后台
        if (this.registerForm.businesslicenseNum !== '') {
          this.$message({ type: 'warning', message: '请输入营业执照号码' })
          return
        }
        if (this.registerForm.sfzmpicpath !== '') {
          this.$message({ type: 'warning', message: '请上传营业执照' })
          return
        }
        if (this.registerForm.operatoridnum !== '') {
          this.$message({ type: 'warning', message: '请输入经办人身份证号码' })
          return
        }
        if (this.registerForm.sfzmpicpath !== '') {
          this.$message({ type: 'warning', message: '请上传身份证正面' })
          return
        }
        if (this.registerForm.sffmpicpath !== '') {
          this.$message({ type: 'warning', message: '请上传身份证反面' })
          return
        }
        this.$router.push({ path: '/regStepFour' })
      }
    }
  }
</script>

<style>
.avatar{
  width: 146px;
  height: 146px
}
</style>

