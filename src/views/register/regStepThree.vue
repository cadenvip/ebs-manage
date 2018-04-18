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
              <el-input v-model="registerForm.businesslicenseNum" :maxlength=32 clearable style="width: 270px;" placeholder="请输入营业执照号码"></el-input>
            </el-form-item>
            <el-form-item label="营业执照：" prop="licencepicpath">
              <el-upload action="http://183.230.100.168/upload" list-type="text" :show-file-list="false" :on-success="handleLicenceSuccess"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <el-button size="small" type="primary">选择</el-button>
              </el-upload>
              <el-button v-if="registerForm.licencepicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.licencepicpath)" icon="el-icon-zoom-in" ></el-button>
            </el-form-item>
            <el-form-item label="经办人身份证：" prop="operatoridnum">
              <el-input v-model="registerForm.operatoridnum" clearable :maxlength=18 style="width: 270px;" placeholder="输入身份证号码"></el-input>
            </el-form-item>
            <el-form-item label="身份证正面：" prop="sfzmpicpath">
              <el-upload action="http://183.230.100.168/upload" list-type="text" :show-file-list="false" :on-success="handleSfzmSuccess"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <el-button size="small" type="primary">选择</el-button>
              </el-upload>
              <el-button v-if="registerForm.sfzmpicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.sfzmpicpath)" icon="el-icon-zoom-in" ></el-button>
            </el-form-item>
            <el-form-item label="身份证反面：" prop="sffmpicpath">
              <el-upload action="http://183.230.100.168/upload" list-type="text" :show-file-list="false" :on-success="handleSffmSuccess"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <el-button size="small" type="primary">选择</el-button>
              </el-upload>
              <el-button v-if="registerForm.sffmpicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.sffmpicpath)" icon="el-icon-zoom-in" ></el-button>
            </el-form-item>
            <br/>
            <h5>产品经营许可</h5>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <el-form-item label="请选择企业性质：" prop="merchantKind">
              <el-radio-group v-model="registerForm.merchantKind">
                <el-radio label="1">生产商</el-radio>
                <el-radio label="2">经销商</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="registerForm.merchantKind === '2'" label="代理授权证明：" prop="proxytestifypicpath">
              <el-upload action="http://183.230.100.168/upload" list-type="text" :show-file-list="false" :on-success="handleProxySuccess"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <el-button size="small" type="primary">选择</el-button>
              </el-upload>
              <el-button v-if="registerForm.proxytestifypicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.proxytestifypicpath)" icon="el-icon-zoom-in" ></el-button>
            </el-form-item>
            <el-form-item label="食品安全认证：">
              <el-upload action="http://183.230.100.168/upload" list-type="text" :show-file-list="false" :on-success="handleFoodSafetySuccess"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <el-button size="small" type="primary">选择</el-button>
              </el-upload>
              <el-button v-if="registerForm.foodsafetypicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.foodsafetypicpath)" icon="el-icon-zoom-in" ></el-button>
            </el-form-item>
            <el-form-item label="食品流通许可：">
              <el-upload action="http://183.230.100.168/upload" list-type="text" :show-file-list="false" :on-success="handleFoodCirculationSuccess"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <el-button size="small" type="primary">选择</el-button>
              </el-upload>
              <el-button v-if="registerForm.foodpathpicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.foodpathpicpath)" icon="el-icon-zoom-in" ></el-button>
            </el-form-item>
            <el-form-item label="其他：">
              <el-upload action="http://183.230.100.168/upload" list-type="picture-card" :on-success="handleFoodOtherSuccess" :limit="3"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeAvatarUpload">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <!-- 图片 -->
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
  import {
    EnterpriseRegister
  } from '@/api/register'
  import {
    validateID
  } from '@/utils/validate'

  export default {
    data() {
      var validateId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号码'))
        } else {
          if (!validateID(value.trim())) {
            callback(new Error('请输入有效的身份证号码'))
          }
          callback()
        }
      }
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        registerForm: {
          // businessesForm: {
          businessesName: '',
          locationCode: '',
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
          businesslicenseNum: [{
            required: true,
            message: '请输入营业执照号码',
            trigger: 'blur'
          }],
          licencepicpath: [{
            required: true,
            message: '请上传营业执照',
            trigger: 'change'
          }],
          operatoridnum: [{
            required: true,
            trigger: 'blur',
            validator: validateId
          }],
          sfzmpicpath: [{
            required: true,
            message: '请上传经办人身份证正面',
            trigger: 'change'
          }],
          sffmpicpath: [{
            required: true,
            message: '请上传经办人身份证发面',
            trigger: 'change'
          }],
          proxytestifypicpath: [{
            required: true,
            message: '请上传代理授权证明',
            trigger: 'change'
          }]
        }
      }
    },
    components: {
      Regheader,
      Regfooter
    },
    mounted() {
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
      handleLicenceSuccess(res, file, fileList) {
        console.log('res', res)
        console.log('file', file)
        console.log('fileList', fileList)
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
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
        console.log(this.registerForm.foodotherpicpath)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file
        this.dialogVisible = true
      },
      goBack() {
        this.$router.push({
          path: '/regStepTwo'
        })
      },
      goNext() {
        // 校验输入数据
        if (this.registerForm.businesslicenseNum === '') {
          this.$message({
            type: 'warning',
            message: '请输入营业执照号码'
          })
          return
        }
        // if (this.registerForm.sfzmpicpath === '') {
        //   this.$message({ type: 'warning', message: '请上传营业执照' })
        //   return
        // }
        if (this.registerForm.operatoridnum === '') {
          this.$message({
            type: 'warning',
            message: '请输入经办人身份证号码'
          })
          return
        }
        // if (this.registerForm.sfzmpicpath === '') {
        //   this.$message({ type: 'warning', message: '请上传身份证正面' })
        //   return
        // }
        // if (this.registerForm.sffmpicpath === '') {
        //   this.$message({ type: 'warning', message: '请上传身份证反面' })
        //   return
        // }
        // if (this.registerForm.proxytestifypicpath === '') {
        //   this.$message({ type: 'warning', message: '请上传代理授权证明' })
        //   return
        // }
        var registerInfo = JSON.stringify(this.registerForm)
        window.localStorage.setItem('registerInfo', registerInfo)
        // 提交到后台
        var goodsSamplelist = []
        for (let i = 1; i < this.registerForm.goodsListForm.length; i++) {
          if ((this.registerForm.goodsListForm[i].name.trim() !== undefined && this.registerForm.goodsListForm[i].name.trim() !==
              '')) {
            goodsSamplelist.push({
              'name': `${this.registerForm.goodsListForm[i].name}`,
              'unit': `${this.registerForm.goodsListForm[i].unit}`,
              'origin': `${this.registerForm.goodsListForm[i].origin}`,
              'price': `${this.registerForm.goodsListForm[i].price}`,
              'description': `${this.registerForm.goodsListForm[i].description}`,
              'url': `${this.registerForm.goodsListForm[i].url}`
            })
          }
        }
        var params = {
          'businessesBean': {
            'businessesName': this.registerForm.businessesName, // 企业名称
            'locationCode': `${this.registerForm.locationCode}`, // 归属区域ID
            'merchantKind': `${this.registerForm.merchantKind}`,
            'businesslicenseNum': this.registerForm.businesslicenseNum, // 企业营业执照号码
            'address': this.registerForm.address, // 详细地址
            'relationPerson': this.registerForm.relationPerson, // 联系人姓名
            'relationPhone': this.registerForm.relationPhone, // 联系人电话，用于登录，初始密码123456
            'sellPersonName': this.registerForm.sellPersonName, // 售后联系人
            'sellPersonMobile': this.registerForm.sellPersonMobile, // 售后联系人电话
            'financePersonName': this.registerForm.financePersonName, // 财务姓名
            'financePersonMobile': this.registerForm.financePersonMobile, // 财务联系人手机
            'operatoridnum': this.registerForm.operatoridnum, // 经办人身份证
            'isInvoice': `${this.registerForm.isInvoice}`, // 是否可开发票，0:不开，1：可以开发票
            'createsource': '1' // 录入渠道 1、商家注册 2、管理员添加
          },
          // 'registerAttachmentBean': {
          //   'sfzmpicpath': `http:www.baidu.com`,
          //   'sffmpicpath': `http:www.baidu.com`,
          //   'licencepicpath': `http:www.baidu.com`,
          //   'proxytestifypicpath': `http:www.baidu.com`,
          //   'foodsafetypicpath': `http:www.baidu.com`,
          //   'foodpathpicpath': `http:www.baidu.com`,
          //   'foodotherpicpath': [
          //     'http:www.baidu.com',
          //     'http:www.baidu.com',
          //     'http:www.baidu.com'
          //   ]
          // },
          'registerAttachmentBean': {
            'sfzmpicpath': this.registerForm.sfzmpicpath,
            'sffmpicpath': this.registerForm.sffmpicpath,
            'licencepicpath': this.registerForm.licencepicpath,
            'proxytestifypicpath': this.registerForm.proxytestifypicpath,
            'foodsafetypicpath': this.registerForm.foodsafetypicpath,
            'foodpathpicpath': this.registerForm.foodpathpicpath,
            'foodotherpicpath': []
          },
          'goodsSamplelist': goodsSamplelist
        }
        EnterpriseRegister(params).then(response => {
          if (response.status === 200) {
            this.$router.push({
              path: '/regStepFour'
            })
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      }
    }
  }

</script>

<style>
  .avatar {
    width: 146px;
    height: 146px
  }

</style>
