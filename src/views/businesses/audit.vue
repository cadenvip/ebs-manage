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
                    <p>{{ registerForm.businessType ? registerForm.businessType : '&nbsp;'}}</p>
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
                    <p>{{ registerForm.legalPaperType === '1' ? '身份证' : registerForm.editApproveStatus === '2' ? '户口本' : registerForm.editApproveStatus === '3' ? '驾驶本' : '&nbsp;' }}</p>
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
                    <p>{{ registerForm.legalPaperNumber ? registerForm.legalPaperNumber : '&nbsp;'}}</p>
                    <p>{{ registerForm.relationPerson ? registerForm.relationPerson : '&nbsp;'}}</p>
                    <p>{{ registerForm.relationPhone ? registerForm.relationPhone : '&nbsp;'}}</p>
                    <p>{{ registerForm.relationEmail ? registerForm.relationEmail : '&nbsp;'}}</p>
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
                    <p v-for="(item, index) in sellAddressListForm" :key="item.id">{{ item.locationName }} {{ item.selladdress }}</p>
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
                    <p>{{ registerForm.isInvoice === '1' ? '能' : registerForm.isInvoice === '0' ? '不能' : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>

        <div class="part">
          <h1>商品销售信息</h1>
          <el-table :data="registerForm.goodsListForm" border style="width: 960px;" tooltip-effect="dark">
            <el-table-column prop="num" label="编号" align="center"></el-table-column>
            <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="unit" label="商品规格" align="center"></el-table-column>
            <el-table-column prop="origin" label="商品产地" align="center"></el-table-column>
            <el-table-column prop="price" label="市场价格(元)" align="center"></el-table-column>
            <el-table-column prop="description" label="商品特色" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="url" label="介绍链接" align="center" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>         

        <div class="part">
          <h1>支付信息</h1>
          <div class="con-box">
            <div class="clearfix tr-con">
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>启用语音支付:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.merchantPayable === '1' ? '启用' : registerForm.merchantPayable === '0' ? '未启用' : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>语音支付商户号:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.merchantNo ? registerForm.merchantNo : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
            </div>
			      <div class="clearfix tr-con">
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>启用话费支付:</p>
                    <p>话费支付渠道编号:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.wirelesscitypayable === '1' ? '启用' : registerForm.wirelesscitypayable === '0' ? '未启用' : '&nbsp;' }}</p>
                    <p>{{ registerForm.wirelesstpcode }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>话费支付商户号:</p>
                    <p>话费支付渠道名称:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.wirelesscityno ? registerForm.wirelesscityno : '&nbsp;' }}</p>
                    <p>{{ registerForm.wirelesstpname ? registerForm.wirelesstpname : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>话费支付商户名称:</p>
                    <p>&nbsp;</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.wirelesscityname ? registerForm.wirelesscityname : '&nbsp;' }}</p>
                    <p>&nbsp;</p>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="clearfix tr-con">
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>启用支付宝支付:</p>
                    <p>支付宝卖家名字:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.aliPayNoPayable === '1' ? '启用' : registerForm.aliPayNoPayable === '0' ? '未启用' : '&nbsp;' }}</p>
                    <p>{{ registerForm.aliPaySellerAccountName }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>支付宝卖家账号:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.aliPayAccount ? registerForm.aliPayAccount : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>支付宝平台签名Key:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.aliPaySignKey ? registerForm.aliPaySignKey : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="clearfix tr-con">
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>启用手机和包支付:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.cmPayNoPayable === '1' ? '启用' : registerForm.cmPayNoPayable === '0' ? '未启用' : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>和包支付平台商家ID:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.cmPayMerchantId ? registerForm.cmPayMerchantId : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>和包支付平台签名KEY:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.cmPaySignKey ? registerForm.cmPaySignKey : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="clearfix tr-con">
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>启用联动优势支付:</p>
                    <p>联动优势银行账号:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.umPayNoPayable === '1' ? '启用' : registerForm.umPayNoPayable === '0' ? '未启用' : '&nbsp;' }}</p>
                    <p>{{ registerForm.umPayBankAccountNo }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>联动优势平台商家ID:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.umPayMerchantId ? registerForm.umPayMerchantId : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="10">
                    <p>联动优势银行账号名:</p>
                  </el-col>
                  <el-col class="text-l" :span="14">
                    <p>{{ registerForm.umPayBankAccountName ? registerForm.umPayBankAccountName : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
            </div>			
          </div>
        </div>

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
                    <p><el-button v-if="registerForm.sfzmpicpath" size="mini" type="primary" @click="handlePictureCardPreview(registerForm.sfzmpicpath)" icon="el-icon-zoom-in" ></el-button></p>
                    <p><el-button v-if="registerForm.licencepicpath" size="mini" type="primary" @click="handlePictureCardPreview(registerForm.licencepicpath)" icon="el-icon-zoom-in" ></el-button></p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="12">
                    <p>身份证反面:</p>
                  </el-col>
                  <el-col class="text-l" :span="12">
                    <p><el-button v-if="registerForm.sffmpicpath" size="mini" type="primary" @click="handlePictureCardPreview(registerForm.sffmpicpath)" icon="el-icon-zoom-in" ></el-button></p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>

        <div class="part">
          <h1>产品经营许可</h1>
          <div class="con-box">
            <div class="clearfix tr-con">
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>企业性质:</p>
                    <p>代理授权证明:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p>{{ registerForm.merchantKind === '1' ? '生产商' : registerForm.merchantKind === '2' ? '经销商' : '&nbsp;' }}</p>
                    <p><el-button v-if="registerForm.proxytestifypicpath" size="mini" type="primary" @click="handlePictureCardPreview(registerForm.proxytestifypicpath)" icon="el-icon-zoom-in" style="margin:0px"></el-button></p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>&nbsp;</p>
                    <p>食品安全认证:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p>&nbsp;</p>
                    <p><el-button v-if="registerForm.foodsafetypicpath" size="mini" type="primary" @click="handlePictureCardPreview(registerForm.foodsafetypicpath)" icon="el-icon-zoom-in" ></el-button></p>
                  </el-col>
                </el-row>
              </div>
              <div class="fl">
                <el-row style="overflow: hidden;">
                  <el-col class="text-r" :span="8">
                    <p>&nbsp;</p>
                    <p>食品流通许可:</p>
                  </el-col>
                  <el-col class="text-l" :span="16">
                    <p>&nbsp;</p>
                    <p><el-button v-if="registerForm.foodpathpicpath" size="mini" type="primary" @click="handlePictureCardPreview(registerForm.foodpathpicpath)" icon="el-icon-zoom-in" ></el-button></p>
                  </el-col>
                </el-row>
              </div>
            </div>
            <p class="bt-info" style="display:inline-block;">其他资质证明:</p>
            <p v-for="(item, index) in registerForm.foodotherpicpath" :key="index" style="display:inline-block; margin-left:10px;">
              <el-button v-if="item" size="mini" type="primary" @click="handlePictureCardPreview(item)" icon="el-icon-zoom-in"></el-button>
            </p>
          </div>
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
                    <p>{{ registerForm.ownershipType === '1' ? '国有企业' : registerForm.ownershipType === '2' ? '集体企业' : registerForm.ownershipType === '3' ? '私营企业' : registerForm.ownershipType === '4' ? '混合所有制企业' : '&nbsp;' }}</p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>

        <div class="part">
          <h1>审核信息</h1>
			    <el-input type="textarea" v-model="reason" style="width:960px" :maxlength=200 :autosize="{ minRows: 2, maxRows: 6}"></el-input>
          <p>剩余字数: <span style="color:red;">{{ getDescLen }}</span></p>
        </div>
        
        <!-- 图片 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div style="margin-top: 20px; text-align: center;">
          <el-button @click="audit(1)" type="primary">通 过</el-button>
          <el-button @click="audit(2)" type="primary">驳 回</el-button>
          <el-button @click="goBack" type="primary">返 回</el-button>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { getBusinessesDetail, auditBusinesses } from '@/api/businesses'
  import { getLocationInfoById } from '@/api/regionselecter'

  export default {
    data() {
      return {
        reason: '',
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
            { num: '示例', name: '鱼香大米', unit: '5KG', origin: '重庆,西永', price: '250', description: '多种蛋白质、营养丰富、色泽光亮、颗粒饱满', url: 'http://detail.tmall.com/item.htm?spm=a230r.1.14.172.VhFL' },
            { num: '01', name: '', unit: '', origin: '', price: '', description: '', url: '' },
            { num: '02', name: '', unit: '', origin: '', price: '', description: '', url: '' },
            { num: '03', name: '', unit: '', origin: '', price: '', description: '', url: '' },
            { num: '04', name: '', unit: '', origin: '', price: '', description: '', url: '' }
          ]
        }
      }
    },
    created() {
      this.getBusinessesInfo()
    },
    computed: {
      getDescLen() {
        if (this.reason) {
          return (200 - this.reason.length) < 0 ? 0 : (200 - this.reason.length)
        } else {
          return 200
        }
      }
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
            if (this.registerForm.locationCode !== null && this.registerForm.locationName === null) {
              getLocationInfoById(this.registerForm.locationCode).then(response => {
                if (response.status === 200) {
                  if (response.data.list.length > 0) {
                    this.registerForm.locationName = response.data.list[0].locationName
                  } else {
                    this.$message.error('编码对应的区域不存在!')
                  }
                } else {
                  this.$message.error(response.msg)
                }
              }).catch(error => {
                this.$message.error(error)
              })
            }
            this.sellAddressListForm = response.data.sellAddresslist
            if (this.sellAddressListForm.length > 0) {
              this.sellAddressListForm.forEach(item => {
                getLocationInfoById(item.locationcode).then(response => {
                  if (response.status === 200) {
                    if (response.data.list.length > 0) {
                      item['locationName'] = response.data.list[0].locationName
                    } else {
                      this.$message.error('编码对应的区域不存在!')
                    }
                  } else {
                    this.$message.error(response.msg)
                  }
                }).catch(error => {
                  this.$message.error(error)
                })
              })
            }
            this.registerForm.validdate_str = (response.data.businesses.validdate !== null ? response.data.businesses.validdate.substr(0, 10) : '')
            var goodsSamplelist = [{ num: '示例', name: '鱼香大米', unit: '5KG', origin: '重庆,西永', price: '250', description: '多种蛋白质、营养丰富、色泽光亮、颗粒饱满', url: 'http://detail.tmall.com/item.htm?spm=a230r.1.14.172.VhFL' }]
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
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file
        this.dialogVisible = true
      },
      goBack() {
        this.$router.push({ path: '/businesses/auditlist' })
      },
      audit(type) {
        // 0 待审核，1 正常（通过），3 驳回
        if (type === 2) {
          if (this.reason === '') {
            this.$message({ type: 'error', message: '请填写审核原因！' })
            return
          }
        }
        auditBusinesses({ 'businessesid': this.$route.query.id, 'state': `${type}`, 'reason': this.reason }).then(response => {
          if (response.status === 200) {
            this.$message.success('审核成功!')
            this.$router.push({ path: '/businesses/auditlist' })
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
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
.bt-info{
  color: #787878;
  font-size: 12px;
  line-height: 20px;
  font-weight: bold;
  padding-left: 25px;
  margin-bottom: 0;
}
.el-table{
  font-size: 13px;
}
.el-table td, .el-table th {
  padding: 8px 0 !important;
}
</style>
