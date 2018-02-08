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
          <el-form style="margin:6px">
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
                <img v-if="registerForm.licencepicpath" :src="registerForm.licencepicpath" class="avatar">
                <el-button size="small" type="primary">点击上传</el-button>
                <el-button v-if="registerForm.licencepicpath" size="small" type="primary" @click="handlePictureCardPreview">预览</el-button>
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </el-upload>
            </el-form-item>
          <el-form-item label="经办人身份证：" prop="businesslicenseNum">
            <el-input v-model="registerForm.businesslicenseNum" clearable style="width: 270px;" placeholder="输入身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="身份证正面：">
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
            <el-form-item label="身份证反面：">
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
                <img v-if="registerForm.foodsafetypath" :src="registerForm.foodsafetypath" class="avatar">
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
                <img v-if="registerForm.foodcirculationpath" :src="registerForm.foodcirculationpath" class="avatar">
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
          foodsafetypath: '',
          foodcirculationpath: '',
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
          locationCode: [{ required: true, message: '请选择地址', trigger: 'change' }]
        }
      }
    },
    components: {
      Regheader,
      Regfooter
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
        this.registerForm.foodsafetypath = URL.createObjectURL(file.raw)
      },
      handleFoodCirculationSuccess(res, file) {
        this.registerForm.foodcirculationpath = URL.createObjectURL(file.raw)
      },
      handleFoodOtherSuccess(res, file) {
        this.registerForm.foodotherpicpath.push(URL.createObjectURL(file.raw))
        console.log(this.registerForm.foodotherpicpath)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      goBack() {
        this.$router.push({ path: '/regStepTwo' })
      },
      goNext() {
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

