<template>
  <el-container>
    <el-container style="width:1000px;margin:0 auto 20px">
      <el-main>
        <div class="part">
          <h1>企业基本信息</h1>
          <div class="con-box">
            <div class="clearfix tr-con">
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>企业名称:</p>
                    <p>企业简称:</p>
                    <p>商家类型:</p>
                    <p>有效时间:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p>{{ registerForm.businessesName }}</p>
                    <p>{{ registerForm.businessesShortName }}</p>
                    <p>{{ registerForm.businessType }}</p>
                    <p>{{ registerForm.validdate_str }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>企业地址:</p>
                    <p>详细地址:</p>
                    <p>法人姓名:</p>
                    <p>法人证件类型:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p>{{ registerForm.locationName ? registerForm.locationName : '&nbsp;' }}</p>
                    <p>{{ registerForm.address ? registerForm.address : '&nbsp;' }}</p>
                    <p>{{ registerForm.legalName ? registerForm.legalName : '&nbsp' }}</p>
                    <p>{{ registerForm.legalPaperType }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="12">
                    <p>法人证件号码:</p>
                    <p>业务联系人:</p>
                    <p>业务联系人手机号码:</p>
                    <p>业务联系人邮箱:</p>
                  </el-col>
                  <el-col class="text-l" :span="12">
                    <p>{{ registerForm.legalPaperNumber }}</p>
                    <p>{{ registerForm.relationPerson }}</p>
                    <p>{{ registerForm.relationPhone }}</p>
                    <p>{{ registerForm.relationEmail }}</p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>

        <div class="part">
          <h1>售后信息</h1>
          <div class="con-box">
            <div class="clearfix tr-con">
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>售后联系人:</p>
                    <p>售后处理点:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p>{{ registerForm.sellPersonName }}</p>
                    <p v-for="(item, index) in sellAddressListForm" :key="item.id">{{item.locationcode}} {{ item.selladdress }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>售后电话:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p>{{ registerForm.sellPersonMobile }}</p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>

        <div class="part">
          <h1>财务信息</h1>
          <div class="con-box">
            <div class="clearfix tr-con">
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>财务联系人:</p>
                    <p>财务手机:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p>{{ registerForm.financePersonName ? registerForm.financePersonName : '&nbsp;' }}</p>
                    <p>{{ registerForm.financePersonMobile }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>财务邮箱:</p>
                    <p>财务通信地址:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p>{{ registerForm.financePersonEmail ? registerForm.financePersonEmail : '&nbsp;' }}</p>
                    <p>{{ registerForm.financePersonAddress ? registerForm.financePersonAddress : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="12">
                    <p>财务联系人电话:</p>
                    <p>能否开具发票:</p>
                  </el-col>
                  <el-col class="text-l" :span="12">
                    <p>{{ registerForm.financePersonPhone ? registerForm.financePersonPhone : '&nbsp;' }}</p>
                    <p>{{ registerForm.isInvoice === '1' ? '能' : '不能' }}</p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>

        <div>
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="170px" style="margin:6px">
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
            
        <div class="part">
          <h1>企业经营资质</h1>
          <div class="con-box">
            <div class="clearfix tr-con">
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>经办人身份证:</p>
                    <p>企业营业执照:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p>{{ registerForm.operatoridnum }}</p>
                    <p>{{ registerForm.businesslicenseNum }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>身份证正面:</p>
                    <p>营业执照:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p><el-button v-if="registerForm.sfzmpicpath" size="mini" type="primary" @click="handlePictureCardPreview(registerForm.sfzmpicpath)">点击预览</el-button></p>
                    <p><el-button v-if="registerForm.licencepicpath" size="mini" type="primary" @click="handlePictureCardPreview(registerForm.licencepicpath)">点击预览</el-button></p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="12">
                    <p>身份证反面:</p>
                  </el-col>
                  <el-col class="text-l" :span="12">
                    <p><el-button v-if="registerForm.sffmpicpath" size="mini" type="primary" @click="handlePictureCardPreview(registerForm.sffmpicpath)">点击预览</el-button></p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>

            <h5>产品经营许可</h5>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <el-form-item label="请选择企业性质：" prop="merchantKind">
              <el-radio v-model="registerForm.merchantKind" label="1">生产商</el-radio>
              <el-radio v-model="registerForm.merchantKind" label="2">经销商</el-radio>
            </el-form-item>
            <el-form-item v-show="registerForm.merchantKind === '2'" label="代理授权证明：" prop="proxytestifypicpath">
              <el-upload
                action="http://120.79.170.36/upload/"
                list-type="text"
                :show-file-list="false"
                :on-success="handleProxySuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <!-- <img v-if="registerForm.proxytestifypicpath" :src="registerForm.proxytestifypicpath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                <el-button size="small" type="primary">点击上传</el-button>
                <el-button v-if="registerForm.proxytestifypicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.proxytestifypicpath)">上传成功，点击预览</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="食品安全认证：">
              <el-upload
                action="http://120.79.170.36/upload/"
                list-type="text"
                :show-file-list="false"
                :on-success="handleFoodSafetySuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <!-- <img v-if="registerForm.foodsafetypicpath" :src="registerForm.foodsafetypicpath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                <el-button size="small" type="primary">点击上传</el-button>
                <el-button v-if="registerForm.foodsafetypicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.foodsafetypicpath)">上传成功，点击预览</el-button>                
              </el-upload>
            </el-form-item>
            <el-form-item label="食品流通许可：">
              <el-upload
                action="http://120.79.170.36/upload/"
                list-type="text"
                :show-file-list="false"
                :on-success="handleFoodCirculationSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <!-- <img v-if="registerForm.foodpathpicpath" :src="registerForm.foodpathpicpath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                <el-button size="small" type="primary">点击上传</el-button>
                <el-button v-if="registerForm.foodpathpicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.foodpathpicpath)">上传成功，点击预览</el-button>                 
              </el-upload>
            </el-form-item>
            <el-form-item label="其他：">
              <el-upload
                action="http://120.79.170.36/upload/"
                list-type="picture-card"
                :on-success="handleFoodOtherSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <br/>
        </div>

        <div class="part">
          <h1>其他信息</h1>
          <div class="con-box">
            <div class="clearfix tr-con">
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>注册资金:</p>
                    <p>保证金:</p>
                    <p>违约金:</p>
                    <p>税务登记号:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p>{{ registerForm.registerMoney ? registerForm.registerMoney : '&nbsp;' }}</p>
                    <p>{{ registerForm.margin ? registerForm.margin : '&nbsp;' }}</p>
                    <p>{{ registerForm.liquidatedDamages ? registerForm.liquidatedDamages : '&nbsp' }}</p>
                    <p>{{ registerForm.taxRegistrationNum }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>办公室电话:</p>
                    <p>营业时间:</p>
                    <p>雇员数量:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p>{{ registerForm.officePhone ? registerForm.officePhone : '&nbsp;' }}</p>
                    <p>{{ registerForm.operateHours ? registerForm.operateHours : '&nbsp;' }}</p>
                    <p>{{ registerForm.employeesNum ? registerForm.employeesNum : '&nbsp' }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="12">
                    <p>传真:</p>
                    <p>邮编:</p>
                    <p>所有制类型:</p>
                  </el-col>
                  <el-col class="text-l" :span="12">
                    <p>{{ registerForm.fax }}</p>
                    <p>{{ registerForm.zipCode ? registerForm.zipCode : '&nbsp;' }}</p>
                    <p>{{ registerForm.ownershipType ? registerForm.ownershipType : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>

        <!-- 图片预览 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div style="margin-top: 20px; text-align: center;">
          <el-button @click="goBack" type="primary">返 回</el-button>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import RegionSelector from '@/components/RegionSelector/index'
  import AddressSelector from '@/components/AddressSelector/index'
  import { getBusinessesDetail } from '@/api/businesses'

  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        sellAddressListForm: [],
        registerForm: {
          // businessesForm: {
          businessesName: '',
          businessesShortName: '',	// 企业简称
          businessType: '',			// 商家类型
          locationCode: '0',  // 中国
          businesslicenseNum: '',
          merchantKind: '',
          legalName: '',
          legalPaperType: '',
          legalPaperNumber: '',
          address: '',
          relationPerson: '',
          relationPhone: '',
          relationEmail: '', // 联系人邮箱
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
          validdate_str: '',
          // },
          // sellAddressListForm: [],
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
            { num: '示例', name: '鱼香大米', unit: '5KG', origin: '重庆,西永', price: '￥250', description: '多种蛋白质、营养丰富、色泽光亮、颗粒饱满', url: 'http://detail.tmall.com/item.htm?spm=a230r.1.14.172.VhFL' },
            { num: '01', name: '', unit: '', origin: '', price: '', description: '', url: '' },
            { num: '02', name: '', unit: '', origin: '', price: '', description: '', url: '' },
            { num: '03', name: '', unit: '', origin: '', price: '', description: '', url: '' },
            { num: '04', name: '', unit: '', origin: '', price: '', description: '', url: '' }
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
          sellAddressListForm: [{ required: true, message: '请输入售后处理点', trigger: 'change' }],
          financePersonName: [{ required: true, message: '请输入财务联系人', trigger: 'blur' }],
          financePersonMobile: [{ required: true, message: '请输入财务手机', trigger: 'blur' }],
          isInvoice: [{ required: true, message: '请选择能否开具发票', trigger: 'change' }],
          businesslicenseNum: [{ required: true, message: '请输入营业执照号码', trigger: 'blur' }],
          licencepicpath: [{ required: true, message: '请上传营业执照', trigger: 'change' }],
          operatoridnum: [{ required: true, message: '请输入经办人身份证号码', trigger: 'blur' }],
          sfzmpicpath: [{ required: true, message: '请上传经办人身份证正面', trigger: 'change' }],
          sffmpicpath: [{ required: true, message: '请上传经办人身份证发面', trigger: 'change' }],
          proxytestifypicpath: [{ required: true, message: '请上传代理授权证明', trigger: 'change' }]
        }
      }
    },
    components: {
      RegionSelector,
      AddressSelector
    },
    created() {
      this.getBusinessesInfo()
    },
    methods: {
      getItem(arr, val) {
        var result = []
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].attachmentname === val) {
            result.push(arr[i])
          }
        }
        if (result.length === 1) {
          return result[0]
        } else {
          return result
        }
      },
      getBusinessesInfo() {
        getBusinessesDetail(this.$route.query.id).then(response => {
          if (response.status === 200) {
            this.registerForm = response.data.businesses
            this.registerForm.locationCode = response.data.businesses.locationCode.toString()
            this.sellAddressListForm = response.data.sellAddresslist
            this.registerForm.validdate_str = (response.data.businesses.validdate !== null ? response.data.businesses.validdate.substr(0, 10) : '')
            var goodsSamplelist = [{ num: '示例', name: '鱼香大米', unit: '5KG', origin: '重庆,西永', price: '￥250', description: '多种蛋白质、营养丰富、色泽光亮、颗粒饱满', url: 'http://detail.tmall.com/item.htm?spm=a230r.1.14.172.VhFL' }]
            switch (response.data.goodsSamplelist.length) {
              case 1:
                goodsSamplelist.push(response.data.goodsSamplelist[0])
                goodsSamplelist[1].num = '01'
                break
              case 2:
                goodsSamplelist.push(response.data.goodsSamplelist[0])
                goodsSamplelist[1].num = '01'
                goodsSamplelist.push(response.data.goodsSamplelist[1])
                goodsSamplelist[2].num = '02'
                break
              case 3:
                goodsSamplelist.push(response.data.goodsSamplelist[0])
                goodsSamplelist[1].num = '01'
                goodsSamplelist.push(response.data.goodsSamplelist[1])
                goodsSamplelist[2].num = '02'
                goodsSamplelist.push(response.data.goodsSamplelist[2])
                goodsSamplelist[3].num = '03'
                break
              case 4:
                goodsSamplelist.push(response.data.goodsSamplelist[0])
                goodsSamplelist[1].num = '01'
                goodsSamplelist.push(response.data.goodsSamplelist[1])
                goodsSamplelist[2].num = '02'
                goodsSamplelist.push(response.data.goodsSamplelist[2])
                goodsSamplelist[3].num = '03'
                goodsSamplelist.push(response.data.goodsSamplelist[3])
                goodsSamplelist[4].num = '04'
                break
              default:break
            }
            this.registerForm.goodsListForm = goodsSamplelist // response.data.goodsSamplelist
            // 资质
            this.registerForm.licencepicpath = this.getItem(response.data.attachmentlist, '营业执照').attachmenturl
            this.registerForm.sfzmpicpath = this.getItem(response.data.attachmentlist, '经办人身份证号码正面').attachmenturl
            this.registerForm.sffmpicpath = this.getItem(response.data.attachmentlist, '经办人身份证号码反面').attachmenturl
            this.registerForm.proxytestifypicpath = this.getItem(response.data.attachmentlist, '代理授权证明').attachmenturl
            this.registerForm.foodsafetypicpath = this.getItem(response.data.attachmentlist, '食品安全认证').attachmenturl
            this.registerForm.foodpathpicpath = this.getItem(response.data.attachmentlist, '食品流通许可').attachmenturl
            const foodothers = this.getItem(response.data.attachmentlist, '其他资质证明')
            var foodotherpics = []
            for (var i = 0; i < foodothers.length; i++) {
              foodotherpics.push(foodothers[i].attachmenturl)
            }
            this.registerForm.foodotherpicpath = foodotherpics
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
      },
      getLocationCode(locationInfo) {
        this.registerForm.locationCode = locationInfo.id.toString()
      },
      getAddressInfo(addressInfo) {
        return
      },
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
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file
        this.dialogVisible = true
      },
      goBack() {
        this.$router.push({ path: '/businesses/list' })
      }
    }
  }
</script>

<style scoped>
.fl{float: left;}
.text-r{text-align: right;}
.text-l{text-align: left;padding-left: 14px;}
.part{margin-top: 20px;}
.part h1{
  line-height: 40px;
  height: 40px;
  font-weight: bold;
  font-size: 15px;
  color: #5f5f5f;
  margin: 0;
}
.con-box{
  border: 1px solid #E6E6E6;
  padding: 15px 20px;
  width: 960px;
}
.tr-con{
  border-bottom: 1px solid #E6E6E6;
  padding-bottom: 12px;
}
.tr-con > div{
  width: 300px;
}
.tr-con > div:nth-child(2), .tr-con > div:nth-child(3) {
  border-left: 1px solid #E6E6E6;
}
.tr-con p {
  color: #787878;
  font-size: 12px;
  line-height: 20px;
  font-weight: bold;
}

.el-table{
  font-size: 13px;
}
.el-table td, .el-table th {
  padding: 8px 0 !important;
}
</style>
