import request from '@/utils/request'

export function EnterpriseRegister(params) {
  alert(JSON.stringify(params))
  console.log(params)
  return request({
    url: '/register/BusinessesRegist',
    method: 'post',
    data: {
      'businessesBean': {
        'businessesName': `${params.businessesName}`,       // 企业名称
        'businessesShortName': `${params.businessesShortName}`,	// 企业简称
        'businessType': `${params.businessType}`,			// 商家类型
        'locationCode': `${params.locationCode}`,		// 归属区域ID
        'businesslicenseNum': `${params.businesslicenseNum}`, // 企业营业执照号码
	      'merchantKind': `${params.merchantKind}`,					// 是否是生产商（1）或者经销商（2）
	      'legalName': `${params.legalName}`,				// 法人姓名
        'legalPaperType': `${params.legalPaperType}`,	// 法人证件类型
        'legalPaperNumber': `${params.legalPaperNumber}`,	// 法人证件号码
        'address': `${params.address}`,				// 详细地址
        'relationPerson': `${params.relationPerson}`,			// 联系人姓名
        'relationPhone': `${params.relationPhone}`,		// 联系人电话，用于登陆，初始密码123456
        'relationEmail': `${params.relationEmail}`, // 联系人邮箱
        'sellPersonName': `${params.sellPersonName}`,			// 售后联系人
        'sellPersonMobile': `${params.sellPersonMobile}`,	// 售后联系人电话
        'financePersonName': `${params.financePersonName}`,		// 财务姓名
        'financePersonMobile': `${params.financePersonMobile}`, // 财务联系人手机
        'financePersonPhone': `${params.financePersonPhone}`,	// 财务联系人电话
        'financePersonEmail': `${params.financePersonEmail}`,	// 财务邮箱
        'financePersonAddress': `${params.financePersonAddress}`,	// 财务通信地址
        'operatoridnum': `${params.operatoridnum}`,	// 经办人身份证
        'registerMoney': `${params.registerMoney}`,			// 注册资金
        'margin': `${params.margin}`,					// 保证金
        'liquidatedDamages': `${params.liquidatedDamages}`,	// 违约金
        'taxRegistrationNum': `${params.taxRegistrationNum}`,	// 税务登记号码
        'officePhone': `${params.officePhone}`,		// 办公室电话
        'operateHours': `${params.operateHours}`,	// 营业时间
        'employeesNum': `${params.employeesNum}`,			// 雇员数量
        'fax': `${params.fax}`,				// 传真
        'zipCode': `${params.zipCode}`,				// 邮编
        'ownershipType': `${params.ownershipType}`,		// 所有制类型 国有企业/集体企业/私营企业/混合所有制企业
	      'isInvoice': `${params.isInvoice}`,   // 是否可开发票，0:不开，1：可以开发票
        'merchantPayable': `${params.merchantPayable}`,		 	// 是否开启语音支付(0-关闭，1-开启)
        'merchantNo': `${params.merchantNo}`, 		// 语音支付号码
        'aliPayNoPayable': `${params.aliPayNoPayable}`,			// 是否开启支付宝支付(0-关闭 ，1-开启)
        'aliPayAccount': `${params.aliPayAccount}`,		// 支付宝卖家账号（email或者手机号）
        'aliPaySignKey': `${params.aliPaySignKey}`,		// 支付宝平台签名Key
        'aliPaySellerAccountName': `${params.aliPaySellerAccountName}`,	// 支付宝卖家名字
        'cmPayNoPayable': `${params.cmPayNoPayable}`,			// 是否开启手机和包支付(0关闭 1开启)
        'cmPayMerchantId': `${params.cmPayMerchantId}`,		// 手机和包支付平台商家ID
        'cmPaySignKey': `${params.cmPaySignKey}`,		// 手机和包支付平台签名KEY
        'umPayNoPayable': `${params.umPayNoPayable}`,			// 是否支持联动优势
        'umPayMerchantId': `${params.umPayMerchantId}`,		// 联动优势平台商家ID
        'umPayBankAccountName': `${params.umPayBankAccountName}`,		// 联动优势银行账号名
        'umPayBankAccountNo': `${params.umPayBankAccountNo}`,	// 联动优势银行账号
        'wirelesscityno': `${params.wirelesscityno}`,		// 无线城市话费支付商号
        'wirelesscityname': `${params.wirelesscityname}`,		// 无线城市话费支付商户名称
        'wirelesscitypayable': `${params.wirelesscitypayable}`,		// 是否开启无线城市话费支付（0关闭 1开启）
        'wirelesstpcode': `${params.wirelesstpcode}`,		// 无线城市话费支付渠道编码
        'wirelesstpname': `${params.wirelesstpname}`		// 无线城市话费支付渠道名称
      },
      'sellAddressList': params.sellAddressListForm,
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
      },
      // 'registerAttachmentBean': {
      //   'sfzmpicpath': `${params.sfzmpicpath}`,
      //   'sffmpicpath': `${params.sffmpicpath}`,
      //   'licencepicpath': `${params.licencepicpath}`,
      //   'proxytestifypicpath': `${params.proxytestifypicpath}`,
      //   'foodsafetypicpath': `${params.foodsafetypicpath}`,
      //   'foodpathpicpath': `${params.foodpathpicpath}`,
      //   'foodotherpicpath': [
      //     '其他URL1',
      //     '其他URL2',
      //     '其他URL3'
      //   ]
      // },
      'goodsSamplelist': params.goodsListForm
    }
  })
}
