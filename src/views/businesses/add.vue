<template>
  <el-container>
    <el-container>
      <el-main>
        <div style="width:1000px;margin:0 auto 20px;border:1px solid #000">
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="170px" style="margin:6px">
            <h5>企业基本信息</h5>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="企业名称：" prop="businessesName">
                  <el-input v-model="registerForm.businessesName" clearable style="width: 220px;" placeholder="请输入企业名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业简称：" prop="businessesShortName">
                  <el-input v-model="registerForm.businessesShortName" clearable style="width: 220px;" placeholder="请输入企业简称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="商家类型：" prop="businessType">
                  <el-select v-model="registerForm.businessType" clearable style="width: 220px;" placeholder="请选择商家类型">
                    <el-option label="合作商家" value="合作商家"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效时间：" prop="validdate_str">
                  <el-date-picker v-model="registerForm.validdate_str" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 220px;"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="企业地址：" prop="locationCode">
              <RegionSelector v-model="registerForm.locationCode" :grade="4" :showCountry="false" @locationChanged="getLocationCode" :locationId="registerForm.locationCode"></RegionSelector>
            </el-form-item>
            <el-form-item label="详细地址：" prop="address">
              <el-input v-model="registerForm.address" clearable style="width: 400px;" placeholder="请输入企业详细地址"></el-input>
            </el-form-item>
            <el-form-item label="法人姓名：" prop="legalName">
              <el-input v-model="registerForm.legalName" clearable style="width: 220px;" placeholder="请输入法人姓名"></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="法人证件类型：" prop="legalPaperType">
                  <el-select v-model="registerForm.legalPaperType" clearable style="width: 220px;" placeholder="请选择法人证件类型">
                    <el-option label="身份证" value="1"></el-option>
                    <el-option label="户口本" value="2"></el-option>
                    <el-option label="驾驶本" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法人证件号码：" prop="legalPaperNumber">
                  <el-input v-model="registerForm.legalPaperNumber" clearable style="width: 220px;" placeholder="请输入法人证件号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="9">
                <el-form-item label="业务联系人：" prop="relationPerson">
                  <el-input v-model="registerForm.relationPerson" clearable style="width: 220px;" placeholder="请输入业务联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="15" style="padding-top:8px;padding-left:30px">
                <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">该联系人用户业务联系，请填写主要平台使用负责人</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="9">
                <el-form-item label="业务联系人手机号码：" prop="relationPhone">
                  <el-input v-model="registerForm.relationPhone" clearable :maxlength=11 style="width: 220px;" placeholder="请输入业务联系人手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="15" style="padding-top:8px;padding-left:30px">
                <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">该手机将用于平台登陆帐号，接收发送的关键信息，请填写有效移动手机号码</span>
              </el-col>
            </el-row>
            <el-form-item label="业务联系人邮箱：" prop="relationEmail">
              <el-input v-model="registerForm.relationEmail" clearable style="width: 220px;" placeholder="请输入业务联系人邮箱"></el-input>
            </el-form-item>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <h5>售后信息</h5>
            <el-row :gutter="20">
              <el-col :span="9">
                <el-form-item label="售后联系人：" prop="sellPersonName">
                  <el-input v-model="registerForm.sellPersonName" clearable style="width: 220px;" placeholder="请输入售后联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="15" style="padding-top:8px;padding-left:30px">
                <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">用于解答用户投诉或商品质量问题</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="9">
                <el-form-item label="售后电话：" prop="sellPersonMobile">
                  <el-input v-model="registerForm.sellPersonMobile" clearable :maxlength=18 style="width: 220px;" placeholder="请输入售后电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="售后处理点：" prop="sellAddressListForm">
              <el-button size="mini" @click="addSellAddress">新增</el-button>
              <div v-for="(item,index) in sellAddressListForm" v-show="item.valid" style="margin-top:10px">
                <el-row>
                  <el-col :span="20">
                    <AddressSelector :locationId="item.locationcode" :detailAddress="item.selladdress" :index="index" @addressChanged="getAddressInfo"></AddressSelector>
                  </el-col>
                  <el-col :span="4">
                    <el-button size="mini" @click="deleteSellAddress(item)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <h5>财务信息</h5>
            <el-row :gutter="20">
              <el-col :span="9">
                <el-form-item label="财务联系人：" prop="financePersonName">
                  <el-input v-model="registerForm.financePersonName" clearable style="width: 220px;" placeholder="请输入财务联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="15" style="padding-top:8px;padding-left:30px">
                <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">用于在线支付相关结算对账联系使用</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="财务手机：" prop="financePersonMobile">
                  <el-input v-model="registerForm.financePersonMobile" clearable :maxlength=11 style="width: 220px;" placeholder="请输入财务手机"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="财务联系人电话：" prop="financePersonPhone">
                  <el-input v-model="registerForm.financePersonPhone" clearable style="width: 220px;" placeholder="请输入财务联系人电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="财务邮箱：" prop="financePersonEmail">
                  <el-input v-model="registerForm.financePersonEmail" clearable style="width: 220px;" placeholder="请输入财务邮箱"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="财务通信地址：" prop="financePersonAddress">
                  <el-input v-model="registerForm.financePersonAddress" clearable style="width: 220px;" placeholder="请输入通信地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
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
              <el-table-column property="unit" label="商品规格" width="90">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.unit" placeholder="请输入规格"></el-input>
                </template>
              </el-table-column>
              <el-table-column property="origin" label="商品产地" width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.origin" placeholder="请输入产地"></el-input>
                </template>
              </el-table-column>
              <el-table-column property="price" label="市场价格(元)" width="110">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.price" placeholder="请输入价格">
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
              <el-input v-model="registerForm.merchantNo" clearable style="width: 220px;" placeholder="请输入语音支付商户号" :disabled="!registerForm.merchantPayable"></el-input>
            </el-form-item>
            <el-form-item label="启用话费支付：" prop="wirelesscitypayable">
              <el-checkbox v-model="registerForm.wirelesscitypayable"></el-checkbox>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="话费支付商户号：" prop="wirelesscityno">
                  <el-input v-model="registerForm.wirelesscityno" clearable style="width: 220px;" placeholder="请输入话费支付商户号" :disabled="!registerForm.wirelesscitypayable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="话费支付商户名称：" prop="wirelesscityname">
                  <el-input v-model="registerForm.wirelesscityname" clearable style="width: 220px;" placeholder="请输入话费支付商户名称" :disabled="!registerForm.wirelesscitypayable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="话费支付渠道编号：" prop="wirelesstpcode">
                  <el-input v-model="registerForm.wirelesstpcode" clearable style="width: 220px;" placeholder="请输入话费支付渠道编号" :disabled="!registerForm.wirelesscitypayable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="话费支付渠道名称：" prop="wirelesstpname">
                  <el-input v-model="registerForm.wirelesstpname" clearable style="width: 220px;" placeholder="请输入话费支付渠道名称" :disabled="!registerForm.wirelesscitypayable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="启用支付宝支付：" prop="aliPayNoPayable">
              <el-checkbox v-model="registerForm.aliPayNoPayable"></el-checkbox>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="支付宝卖家账号：" prop="aliPayAccount">
                  <el-input v-model="registerForm.aliPayAccount" clearable style="width: 220px;" placeholder="请输入支付宝卖家账号" :disabled="!registerForm.aliPayNoPayable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支付宝平台签名Key：" prop="aliPaySignKey">
                  <el-input v-model="registerForm.aliPaySignKey" clearable style="width: 220px;" placeholder="请输入支付宝平台签名Key" :disabled="!registerForm.aliPayNoPayable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="支付宝卖家名字：" prop="aliPaySellerAccountName">
              <el-input v-model="registerForm.aliPaySellerAccountName" clearable style="width: 220px;" placeholder="请输入支付宝卖家名字" :disabled="!registerForm.aliPayNoPayable"></el-input>
            </el-form-item>
            <el-form-item label="启用手机和包支付：" prop="cmPayNoPayable">
              <el-checkbox v-model="registerForm.cmPayNoPayable"></el-checkbox>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="和包支付平台商家ID：" prop="cmPayMerchantId">
                  <el-input v-model="registerForm.cmPayMerchantId" clearable style="width: 220px;" placeholder="请输入和包支付平台商家ID" :disabled="!registerForm.cmPayNoPayable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="和包支付平台签名KEY：" prop="cmPaySignKey">
                  <el-input v-model="registerForm.cmPaySignKey" clearable style="width: 220px;" placeholder="请输入和包支付平台签名KEY" :disabled="!registerForm.cmPayNoPayable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="启用联动优势支付：" prop="umPayNoPayable">
              <el-checkbox v-model="registerForm.umPayNoPayable"></el-checkbox>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="联动优势平台商家ID：" prop="umPayMerchantId">
                  <el-input v-model="registerForm.umPayMerchantId" clearable style="width: 220px;" placeholder="请输入联动优势平台商家ID" :disabled="!registerForm.umPayNoPayable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联动优势银行账号名：" prop="umPayBankAccountName">
                  <el-input v-model="registerForm.umPayBankAccountName" clearable style="width: 220px;" placeholder="请输入联动优势银行账号名" :disabled="!registerForm.umPayNoPayable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="联动优势银行账号：" prop="umPayBankAccountNo">
              <el-input v-model="registerForm.umPayBankAccountNo" clearable style="width: 220px;" placeholder="联动优势银行账号" :disabled="!registerForm.umPayNoPayable"></el-input>
            </el-form-item>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <h5>企业经营资质</h5>
            <el-form-item label="企业营业执照：" prop="businesslicenseNum">
              <el-input v-model="registerForm.businesslicenseNum" clearable style="width: 270px;" placeholder="请输入营业执照号码"></el-input>
            </el-form-item>
            <el-form-item label="营业执照：" prop="licencepicpath">
              <el-upload action="http://10.189.13.151:8080/ebs/common/upload" list-type="text" :show-file-list="false" :on-success="handleLicenceSuccess"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <el-button size="small" type="primary">选择</el-button>
              </el-upload>
              <el-button v-if="registerForm.licencepicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.licencepicpath)" icon="el-icon-zoom-in" ></el-button>
            </el-form-item>
            <el-form-item label="经办人身份证：" prop="operatoridnum">
              <el-input v-model="registerForm.operatoridnum" clearable :maxlength=18 style="width: 270px;" placeholder="输入身份证号码"></el-input>
            </el-form-item>
            <el-form-item label="身份证正面：" prop="sfzmpicpath">
              <el-upload action="http://10.189.13.151:8080/ebs/common/upload" list-type="text" :show-file-list="false" :on-success="handleSfzmSuccess"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <el-button size="small" type="primary">选择</el-button>
              </el-upload>
              <el-button v-if="registerForm.sfzmpicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.sfzmpicpath)" icon="el-icon-zoom-in" ></el-button>
            </el-form-item>
            <el-form-item label="身份证反面：" prop="sffmpicpath">
              <el-upload action="http://10.189.13.151:8080/ebs/common/upload" list-type="text" :show-file-list="false" :on-success="handleSffmSuccess"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <el-button size="small" type="primary">选择</el-button>
              </el-upload>
              <el-button v-if="registerForm.sffmpicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.sffmpicpath)" icon="el-icon-zoom-in" ></el-button>
            </el-form-item>
            <br/>
            <h5>产品经营许可</h5>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <el-form-item label="请选择企业性质：" prop="merchantKind">
              <el-radio v-model="registerForm.merchantKind" label="1">生产商</el-radio>
              <el-radio v-model="registerForm.merchantKind" label="2">经销商</el-radio>
            </el-form-item>
            <el-form-item v-show="registerForm.merchantKind === '2'" label="代理授权证明：" prop="proxytestifypicpath">
              <el-upload action="http://10.189.13.151:8080/ebs/common/upload" list-type="text" :show-file-list="false" :on-success="handleProxySuccess"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <el-button size="small" type="primary">选择</el-button>
              </el-upload>
              <el-button v-if="registerForm.proxytestifypicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.proxytestifypicpath)" icon="el-icon-zoom-in" ></el-button>
            </el-form-item>
            <el-form-item label="食品安全认证：">
              <el-upload action="http://10.189.13.151:8080/ebs/common/upload" list-type="text" :show-file-list="false" :on-success="handleFoodSafetySuccess"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <el-button size="small" type="primary">选择</el-button>
              </el-upload>
              <el-button v-if="registerForm.foodsafetypicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.foodsafetypicpath)" icon="el-icon-zoom-in" ></el-button>
            </el-form-item>
            <el-form-item label="食品流通许可：">
              <el-upload action="http://10.189.13.151:8080/ebs/common/upload" list-type="text" :show-file-list="false" :on-success="handleFoodCirculationSuccess"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <el-button size="small" type="primary">选择</el-button>
              </el-upload>
              <el-button v-if="registerForm.foodpathpicpath" size="small" type="primary" @click="handlePictureCardPreview(registerForm.foodpathpicpath)" icon="el-icon-zoom-in" ></el-button>
            </el-form-item>
            <el-form-item label="其他：">
              <el-upload action="http://10.189.13.151:8080/ebs/common/upload" list-type="picture-card" :on-success="handleFoodOtherSuccess" :limit="3"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeAvatarUpload">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
            <h5>其他信息</h5>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="注册资金：" prop="registerMoney">
                  <el-input v-model="registerForm.registerMoney" clearable style="width: 220px;" placeholder="请输入注册资金"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="保证金：" prop="margin">
                  <el-input v-model="registerForm.margin" clearable style="width: 220px;" placeholder="请输入保证金"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="违约金：" prop="liquidatedDamages">
                  <el-input v-model="registerForm.liquidatedDamages" clearable style="width: 220px;" placeholder="请输入违约金"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="税务登记号：" prop="taxRegistrationNum">
                  <el-input v-model="registerForm.taxRegistrationNum" clearable style="width: 220px;" placeholder="请输入税务登记号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="办公室电话：" prop="officePhone">
                  <el-input v-model="registerForm.officePhone" clearable style="width: 220px;" placeholder="请输入办公室电话"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营业时间：" prop="operateHours">
                  <el-input v-model="registerForm.operateHours" clearable style="width: 220px;" placeholder="请输入营业时间"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="雇员数量：" prop="employeesNum">
                  <el-input v-model="registerForm.employeesNum" clearable style="width: 220px;" placeholder="请输入雇员数量"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="传真：" prop="fax">
                  <el-input v-model="registerForm.fax" clearable style="width: 220px;" placeholder="请输入传真号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="邮编：" prop="zipCode">
                  <el-input v-model="registerForm.zipCode" clearable style="width: 220px;" placeholder="请输入邮编"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所有制类型：" prop="ownershipType">
                  <el-select v-model="registerForm.ownershipType" clearable style="width: 220px;" placeholder="请选择所有制类型">
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
        <!-- 图片 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div style="margin-top: 20px; text-align: center;">
          <el-button @click="goNext" type="primary">提 交</el-button>
          <el-button @click="goBack" type="primary">返 回</el-button>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import RegionSelector from '@/components/RegionSelector/index'
  import AddressSelector from '@/components/AddressSelector/index'
  import {
    adnminAddBusniess
  } from '@/api/businesses'
  import {
    validateMobilePhone,
    validateEmail,
    validateID
  } from '@/utils/validate'

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
      var validateMail = (rule, value, callback) => {
        if (value !== null && value !== '') {
          if (!validateEmail(value.trim())) {
            callback(new Error('请输入有效的邮箱地址'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      var validateId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号码'))
        } else {
          if (!validateID(value.trim())) {
            callback(new Error('请输入有效的身份证号码'))
          } else {
            callback()
          }
        }
      }
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        sellAddressListForm: [],
        registerForm: {
          // businessesForm: {
          businessesName: '',
          businessesShortName: '', // 企业简称
          businessType: '', // 商家类型
          locationCode: '0', // 中国
          businesslicenseNum: '',
          merchantKind: '1',
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
          financePersonPhone: '', // 财务联系人电话
          financePersonEmail: '', // 财务邮箱
          financePersonAddress: '', // 财务通信地址
          operatoridnum: '',
          registerMoney: '', // 注册资金
          margin: '', // 保证金
          liquidatedDamages: '', // 违约金
          taxRegistrationNum: '', // 税务登记号码
          officePhone: '', // 办公室电话
          operateHours: '', // 营业时间
          employeesNum: '', // 雇员数量
          fax: '', // 传真
          zipCode: '', // 邮编
          ownershipType: '', // 所有制类型 国有企业/集体企业/私营企业/混合所有制企业
          isInvoice: '',
          merchantPayable: '', // 是否开启语音支付(0-关闭，1-开启)
          merchantNo: '', // 语音支付号码
          aliPayNoPayable: '', // 是否开启支付宝支付(0-关闭 ，1-开启)
          aliPayAccount: '', // 支付宝卖家账号（email或者手机号）
          aliPaySignKey: '', // 支付宝平台签名Key
          aliPaySellerAccountName: '', // 支付宝卖家名字
          cmPayNoPayable: '', // 是否开启手机和包支付(0关闭 1开启)
          cmPayMerchantId: '', // 手机和包支付平台商家ID
          cmPaySignKey: '', // 手机和包支付平台签名KEY
          umPayNoPayable: '', // 是否支持联动优势
          umPayMerchantId: '', // 联动优势平台商家ID
          umPayBankAccountName: '', // 联动优势银行账号名
          umPayBankAccountNo: '', // 联动优势银行账号
          wirelesscityno: '', // 无线城市话费支付商号
          wirelesscityname: '', // 无线城市话费支付商户名称
          wirelesscitypayable: '1', // 是否开启无线城市话费支付（0关闭 1开启）
          wirelesstpcode: '', // 无线城市话费支付渠道编码
          wirelesstpname: '', // 无线城市话费支付渠道名称
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
            message: '请输入企业名称',
            trigger: 'blur'
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
          legalName: [{
            required: true,
            message: '请输入法人姓名',
            trigger: 'blur'
          }],
          legalPaperType: [{
            required: true,
            message: '请选择法人证件类型',
            trigger: 'change'
          }],
          legalPaperNumber: [{
            required: true,
            message: '请输入法人证件号码',
            trigger: 'blur'
          }],
          relationPerson: [{
            required: true,
            message: '请输入业务联系人',
            trigger: 'blur'
          }],
          relationPhone: [{
            required: true,
            validator: validateMobile,
            trigger: 'blur'
          }],
          relationEmail: [{
            required: false,
            validator: validateMail,
            trigger: 'blur'
          }],
          sellPersonName: [{
            required: true,
            message: '请输入售后联系人',
            trigger: 'blur'
          }],
          sellPersonMobile: [{
            required: true,
            message: '请输入售后电话',
            validator: validateMobile,
            trigger: 'blur'
          }],
          sellAddressListForm: [{
            required: true,
            message: '请输入售后处理点',
            trigger: 'change'
          }],
          financePersonName: [{
            required: true,
            message: '请输入财务联系人',
            trigger: 'blur'
          }],
          financePersonMobile: [{
            required: true,
            trigger: 'blur',
            validator: validateMobile
          }],
          financePersonEmail: [{
            required: false,
            validator: validateMail,
            trigger: 'blur'
          }],
          isInvoice: [{
            required: true,
            message: '请选择能否开具发票',
            trigger: 'change'
          }],
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
      RegionSelector,
      AddressSelector
    },
    methods: {
      getLocationCode(locationInfo) {
        this.registerForm.locationCode = locationInfo.id.toString()
      },
      getAddressInfo(addressInfo) {
        this.sellAddressListForm[addressInfo.index].locationcode = (addressInfo.id !== undefined ? addressInfo.id.toString() : '')
        this.sellAddressListForm[addressInfo.index].selladdress = addressInfo.town_village
      },
      addSellAddress() {
        for (var i = 0; i < this.sellAddressListForm.length; i++) {
          if (this.sellAddressListForm[i].locationcode === '' && this.sellAddressListForm[i].valid === true) {
            this.$message.warning('请先完成售后处理点信息')
            return
          }
        }
        var sellAddress = {
          'id': this.sellAddressListForm.length,
          'locationcode': '',
          'selladdress': '',
          'merchantcode': '',
          'valid': true
        }
        this.sellAddressListForm.push(sellAddress)
      },
      deleteSellAddress(item) {
        // this.sellAddressListForm.splice(index, 1)
        item.valid = false
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
        this.$router.push({
          path: '/businesses/list'
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
        if (this.registerForm.legalName === '') {
          this.$message({
            type: 'warning',
            message: '请输入法人姓名'
          })
          return
        }
        if (this.registerForm.legalPaperType === '') {
          this.$message({
            type: 'warning',
            message: '请选择法人证件类型'
          })
          return
        }
        if (this.registerForm.legalPaperNumber === '') {
          this.$message({
            type: 'warning',
            message: '请输入法人证件号码'
          })
          return
        }
        if (this.registerForm.relationPerson === '') {
          this.$message({
            type: 'warning',
            message: '请输入业务联系人'
          })
          return
        }
        if (this.registerForm.relationPerson === '') {
          this.$message({
            type: 'warning',
            message: '请输入业务联系人'
          })
          return
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
        }
        if (this.registerForm.sellPersonMobile === '') {
          this.$message({
            type: 'warning',
            message: '请输入售后联系电话'
          })
          return
        }
        var sellAddressList = []
        for (let i = 0; i < this.sellAddressListForm.length; i++) {
          if (this.sellAddressListForm[i].valid === true) {
            sellAddressList.push({
              'locationcode': `${this.sellAddressListForm[i].locationcode}`,
              'selladdress': `${this.sellAddressListForm[i].selladdress}`
            })
          }
        }
        if (sellAddressList.length <= 0) {
          this.$message({
            type: 'warning',
            message: '请添加售后处理点'
          })
          return
        }
        if (this.registerForm.financePersonName === '') {
          this.$message({
            type: 'warning',
            message: '请输入财务联系人'
          })
          return
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
        }

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
            'businessesName': `${this.registerForm.businessesName}`, // 企业名称
            'locationCode': `${this.registerForm.locationCode}`, // 归属区域ID
            'businesslicenseNum': `${this.registerForm.businesslicenseNum}`, // 企业营业执照号码
            'merchantKind': `${this.registerForm.merchantKind}`,
            'address': `${this.registerForm.address}`, // 详细地址
            'relationPerson': `${this.registerForm.relationPerson}`, // 联系人姓名
            'relationPhone': `${this.registerForm.relationPhone}`, // 联系人电话，用于登陆，初始密码123456
            'sellPersonName': `${this.registerForm.sellPersonName}`, // 售后联系人
            'sellPersonMobile': `${this.registerForm.sellPersonMobile}`, // 售后联系人电话
            'financePersonName': `${this.registerForm.financePersonName}`, // 财务姓名
            'financePersonMobile': `${this.registerForm.financePersonMobile}`, // 财务联系人手机
            'operatoridnum': `${this.registerForm.operatoridnum}`, // 经办人身份证
            'isInvoice': `${this.registerForm.isInvoice}`, // 是否可开发票，0:不开，1：可以开发票
            'businessesShortName': `${this.registerForm.businessesShortName}`, // 企业简称
            'businessType': `${this.registerForm.businessType}`, // 合作商家
            'legalName': `${this.registerForm.legalName}`, // 法人姓名
            'legalPaperType': `${this.registerForm.legalPaperType}`, // 法人证件类型
            'legalPaperNumber': `${this.registerForm.legalPaperNumber}`, // 法人证件号码
            'relationEmail': `${this.registerForm.relationEmail}`,
            'financePersonPhone': `${this.registerForm.financePersonPhone}`,
            'financePersonEmail': `${this.registerForm.financePersonEmail}`,
            'financePersonAddress': `${this.registerForm.financePersonAddress}`,
            'registerMoney': `${this.registerForm.registerMoney}`,
            'margin': `${this.registerForm.margin}`,
            'liquidatedDamages': `${this.registerForm.liquidatedDamages}`,
            'taxRegistrationNum': `${this.registerForm.taxRegistrationNum}`,
            'officePhone': `${this.registerForm.officePhone}`,
            'operateHours': `${this.registerForm.operateHours}`,
            'employeesNum': `${this.registerForm.employeesNum}`,
            'fax': `${this.registerForm.fax}`,
            'zipCode': `${this.registerForm.zipCode}`,
            'ownershipType': `${this.registerForm.ownershipType}`,
            'merchantPayable': `${this.registerForm.merchantPayable}`,
            'merchantNo': `${this.registerForm.merchantNo}`,
            'aliPayNoPayable': `${this.registerForm.aliPayNoPayable}`,
            'aliPayAccount': `${this.registerForm.aliPayAccount}`,
            'aliPaySignKey': `${this.registerForm.aliPaySignKey}`,
            'aliPaySellerAccountName': `${this.registerForm.aliPaySellerAccountName}`,
            'cmPayNoPayable': `${this.registerForm.cmPayNoPayable}1`,
            'cmPayMerchantId': `${this.registerForm.cmPayMerchantId}`,
            'cmPaySignKey': `${this.registerForm.cmPaySignKey}`,
            'umPayNoPayable': `${this.registerForm.umPayNoPayable}`,
            'umPayMerchantId': `${this.registerForm.umPayMerchantId}`,
            'umPayBankAccountName': `${this.registerForm.umPayBankAccountName}`,
            'umPayBankAccountNo': `${this.registerForm.umPayBankAccountNo}`,
            'wirelesscityno': `${this.registerForm.wirelesscityno}`,
            'wirelesscityname': `${this.registerForm.wirelesscityname}`,
            'wirelesscitypayable': `${this.registerForm.wirelesscitypayable}`,
            'wirelesstpcode': `${this.registerForm.wirelesstpcode}`,
            'wirelesstpname': `${this.registerForm.wirelesstpname}`,
            'validdate_str': `${this.registerForm.validdate_str}`
          },
          'goodsSamplelist': goodsSamplelist,
          'sellAddressList': sellAddressList,
          'registerAttachmentBean': {
            'sfzmpicpath': `http:www.baidu.com`,
            'sffmpicpath': `http:www.baidu.com`,
            'licencepicpath': `http:www.baidu.com`,
            'proxytestifypicpath': `http:www.baidu.com`,
            'foodsafetypicpath': `http:www.baidu.com`,
            'foodpathpicpath': `http:www.baidu.com`,
            'foodotherpicpath': [
              'http:www.baidu.com',
              'http:www.baidu.com',
              'http:www.baidu.com'
            ]
          }
          // 'registerAttachmentBean': {
          //   'sfzmpicpath': `${this.registerForm.sfzmpicpath}`,
          //   'sffmpicpath': `${this.registerForm.sffmpicpath}`,
          //   'licencepicpath': `${this.registerForm.licencepicpath}`,
          //   'proxytestifypicpath': `${this.registerForm.proxytestifypicpath}`,
          //   'foodsafetypicpath': `${this.registerForm.foodsafetypicpath}`,
          //   'foodpathpicpath': `${this.registerForm.foodpathpicpath}`,
          //   'foodotherpicpath': [
          //     '其他URL1',
          //     '其他URL2',
          //     '其他URL3'
          //   ]
          // },
        }
        adnminAddBusniess(params).then(response => {
          if (response.status === 200) {
            this.$message.success('新增企业成功')
            this.$router.push({
              path: '/businesses/list'
            })
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
