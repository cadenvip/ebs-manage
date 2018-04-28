<template>
  <div style="padding: 0 30px 200px 30px;">
    <div class="part part1">
      <h1>基本信息</h1>
      <div>
        <div class="clearfix">
          <el-col :span="12">
            <p class="must"><span class="title">商品名称:</span> <span v-if="isModify('name')">{{fBean.name}}</span> <span :class="{'modify':isModify('name')}">{{gBean.name}}<span v-if="isModify('name')">(修改后)</span></span></p>
            
            <p class="must"><span class="title">商品产地:</span><span v-if="isModify('placeofOriginName')">{{fBean.placeofOriginName}}</span> <span :class="{'modify':isModify('placeofOriginName')}">{{gBean.placeofOriginName}}<span v-if="isModify('placeofOriginName')">(修改后)</span></span></p>
            <p class="must"><span class="title">商品分类:</span><span v-if="isModify('typeCodeName')">{{fBean.typeCodeName}}</span> <span :class="{'modify':isModify('typeCodeName')}">{{gBean.typeCodeName}}<span v-if="isModify('typeCodeName')">(修改后)</span></span></p>
            <p class="must"><span class="title">单价(元):</span><span v-if="isModify('price')">{{fBean.price}}</span> <span :class="{'modify':isModify('price')}">{{gBean.price}}<span v-if="isModify('price')">(修改后)</span></span></p>
            <p class="must"><span class="title">重量(克):</span><span v-if="isModify('weight')">{{fBean.weight}}</span> <span :class="{'modify':isModify('weight')}">{{gBean.weight}}<span v-if="isModify('weight')">(修改后)</span></span></p>
            <p class="must"><span class="title">送货时限:</span><span v-if="isModify('deliveryLimit')">{{fBean.deliveryLimit}}小时</span> <span :class="{'modify':isModify('deliveryLimit')}">{{gBean.deliveryLimit}}小时<span v-if="isModify('deliveryLimit')">(修改后)</span></span></p>
            <p class="must"><span class="title">供应商:</span> <span v-if="isModify('supplierName')">{{fBean.supplierName}}</span><span :class="{'modify':isModify('supplierName')}">{{gBean.supplierName}}<span v-if="isModify('supplierName')">(修改后)</span></span></p>
            <p><span class="title">品牌:</span> <span v-if="isModify('brand')">{{fBean.brand}}</span><span :class="{'modify':isModify('brand')}">{{gBean.brand}}<span v-if="isModify('brand')">(修改后)</span></span></p>

            <p class="must">
              <span class="title" :class="{'modify':isModify('')}">支付方式:</span> <span class="plr5" v-show="fBean.alipay==='0'">支付宝</span><span class="plr5" v-show="fBean.cmpay==='0'">和包支付</span><span class="plr5"v-show="fBean.umpay==='0'">联动支付</span><span class="plr5"v-show="fBean.codpay==='0'">货到付款</span>
              <span class="modify" v-if="getPayWayChange"> <span class="plr5" v-show="gBean.alipay==='0'">支付宝</span><span class="plr5" v-show="gBean.cmpay==='0'">和包支付</span><span class="plr5"v-show="gBean.umpay==='0'">联动支付</span><span class="plr5"v-show="gBean.codpay==='0'">货到付款</span>(修改后)</span>
            </p>
            

            <p class="must">
              <span class="title">物流：</span><span v-if="fBean.logisticsTypes">{{fBean.logisticsTypes.indexOf('1') > -1 ? '自提' : ''}} {{fBean.logisticsTypes.indexOf('2')>-1 ? '快递' : ''}}</span>
              <span class="modify" v-if="getWLChange">
                <span v-if="gBean.logisticsTypes">{{gBean.logisticsTypes.indexOf('1') > -1 ? '自提' : ''}} {{gBean.logisticsTypes.indexOf('2')>-1 ? '快递' : ''}}(修改后)</span>
              </span>
            </p>
          </el-col>
          <el-col :span="12">
            <p class="must"><span class="title">商品编码:</span> <span v-if="isModify('goodsCode')">{{fBean.goodsCode}}</span><span :class="{'modify':isModify('goodsCode')}">{{gBean.goodsCode}}<span v-if="isModify('goodsCode')">(修改后)</span></span></p>
            <p class="must"><span class="title">保质期:</span><span v-if="getBZQChange">{{fBean.shelfLife}} {{getshelfLifeUnit(fBean.shelfLifeUnit)}}</span> <span :class="{'modify':getBZQChange}">{{gBean.shelfLife}} {{getshelfLifeUnit(gBean.shelfLifeUnit)}}<span v-if="getBZQChange">(修改后)</span></span></p>
            <p class="must"><span class="title">计量单位:</span><span v-if="unitChange">{{formerActualUnit}}</span> <span :class="{'modify':unitChange}">{{actualUnit}}<span v-if="unitChange">(修改后)</span></span></p>
            <p class="must"><span class="title">市场价(元):</span><span v-if="isModify('marketPrice')">{{fBean.marketPrice}}</span> <span :class="{'modify':isModify('marketPrice')}">{{gBean.marketPrice}}<span v-if="isModify('marketPrice')">(修改后)</span></span></p>
            <p class="must"><span class="title">生产日期:</span> <span v-if="isModify('produceDate')">{{fBean.produceDate}}</span><span :class="{'modify':isModify('produceDate')}">{{gBean.produceDate}}<span v-if="isModify('produceDate')">(修改后)</span></span</p>
            <p class="must"><span class="title">当前库存:</span> <span v-if="isModify('stock')">{{fBean.stock}}</span><span :class="{'modify':isModify('stock')}">{{gBean.stock}}<span v-if="isModify('stock')">(修改后)</span></span></p>
            <p><span class="title">特色卖点:</span> <span v-if="isModify('stock')">{{fBean.features}}</span><span :class="{'modify':isModify('features')}">{{gBean.features}}<span v-if="isModify('features')">(修改后)</span></span></p>
            <p><span class="title">促销信息:</span> <span v-if="isModify('promotionInfo')">{{fBean.promotionInfo}}</span><span :class="{'modify':isModify('promotionInfo')}">{{gBean.promotionInfo}}<span v-if="isModify('promotionInfo')">(修改后)</span></span></p>
            <p>
              <span class="title">退换货:</span> <span class="plr5" v-show="fBean.isPromote==='0'">推荐</span><span class="plr5" v-show="fBean.isReturn==='0'">支持退货</span><span class="plr5" v-show="fBean.isExchange==='0'">支持换货</span>
              <span v-if="getTHHChange" class="modify">
                <span class="plr5" v-show="gBean.isPromote==='0'">推荐</span><span class="plr5" v-show="gBean.isReturn==='0'">支持退货</span><span class="plr5" v-show="gBean.isExchange==='0'"></span><span class="modify">支持换货(修改后)</span>
              </span>
            </p>
          </el-col>
        </div>
        <div class="clearfix">
          <div class="fl" style="margin-top: 10px;width: 40%;">
          <p class="must"><span class="title">商品图片:</span></p>
          <el-carousel trigger="click" height="360px">
            <el-carousel-item v-for="item in fBean.imageList" :key="item">
              <img style="width: 100%;height:100%;" :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-if="isModify('imageList')" class="fl" style="margin-top: 10px;margin-left: 10%; width: 40%;">
          <p class="must"><span class="title" style="color: red;">商品图片:(修改后)</span></p>
          <el-carousel trigger="click" height="360px">
            <el-carousel-item v-for="item in gBean.imageList" :key="item">
              <img style="width: 100%;height:100%;" :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
        </div>
        <p class="must">
          <span class="title">库存预警:</span> <span v-if="fBean.stockAlarmFlag">预警数量：{{fBean.stockAlarm}}</span><span v-else>暂无预警</span>
          <span class="must" v-if="getKCYJChange"><span class="modify" v-if="gBean.stockAlarmFlag">预警数量：{{gBean.stockAlarm}}(修改后)</span><span class="modify" v-else>暂无预警(修改后)</span></span>
        </p>
        <p>
          <span class="title">发布渠道:</span>
          <span class="pl10" v-show="fBean.website==='0'">WEB</span>
          <span class="pl10" v-show="fBean.hotline==='0'">热线</span>
          <span class="pl10" v-show="fBean.wapsite==='0'">WAP</span>
          <span class="pl10" v-show="fBean.phoneline==='0'">手机客户端</span>
          <span class="pl10" v-show="fBean.agriculturalmall==='0'">农资商城</span>
          <span v-if="getFBQDChange" class="modify">
            <span class="pl10" v-show="gBean.website==='0'">WEB</span>
            <span class="pl10" v-show="gBean.hotline==='0'">热线</span>
            <span class="pl10" v-show="gBean.wapsite==='0'">WAP</span>
            <span class="pl10" v-show="gBean.phoneline==='0'">手机客户端</span>
            <span class="pl10" v-show="gBean.agriculturalmall==='0'">农资商城</span>
            <span>(修改后)</span>
          </span>
        </p>
        <p><span class="title">视频地址:</span> <span v-if="isModify('videoUrl')">{{fBean.videoUrl}}</span><span :class="{'modify': isModify('videoUrl')}">{{gBean.videoUrl}}<span v-if="isModify('videoUrl')">(修改后)</span></span></p>
        <div style="font-size: 12px;color:grey;"><span>商品阶梯价：</span><span class="corange" v-if="!fBean.gradientPriceFlag">暂无信息</span>
          <div v-else>
            <p v-for="(item,index) in fBean.gradientNumber" :key="index">
              订购满:{{item}}{{actualUnit}}，商品价格:{{fBean.gradientPrice[index]}}/{{actualUnit}}
            </p>
          </div>
        </div>
        <div v-if="getJieTiChange" style="font-size: 12px;color:grey;"><span style="color: red;">商品阶梯价：(修改后)</span><span class="corange" v-if="!gBean.gradientPriceFlag">暂无信息</span>
          <div v-else>
            <p style="color: red" v-for="(item,index) in gBean.gradientNumber" :key="index">
              订购满:{{item}}{{actualUnit}}，商品价格:{{gBean.gradientPrice[index]}}/{{actualUnit}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="part part2">
      <h1>参数信息</h1>
      <div>
        <div class="clearfix">
          <el-col :span="12">
            <div class="area-cons">
              <span class="title">wappush:</span>
              <span class="areacon">{{gBean.wapInfo}}</span>
            </div>
            <div class="area-cons mt10">
              <span class="title">推介短信:</span>
              <span class="areacon">{{gBean.smsInfo}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="area-cons">
              <span class="title">商品简述:</span>
              <span class="areacon">{{gBean.goodsDesc}}</span>
            </div>
            <div class="area-cons mt10">
              <span class="title">商品清单:</span>
              <span class="areacon">{{gBean.itemList?gBean.itemList:''}}</span>
            </div>
          </el-col>
        </div>
        <p><span class="title">wappush链接:{{gBean.wapUrl}}</span></p>
        <p><span class="title">彩信文件:{{gBean.mmsInfo}}</span></p>
      </div>
    </div>
    <div class="content" style="margin-top: 20px;">
      <el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="商品信息" name="first">
          <el-row>
            <el-col :span="12" style="border-right: 1px solid #999;">
              <div class="clearfix mt10">
                <p class="fl pleft">商品名称：</p> <p class="fl pright">{{gBean.name}}</p>
              </div>
              <div class="clearfix mt10">
                <p class="fl pleft">商品重量：</p> <p class="fl pright">{{gBean.weight}}克(g)</p>
              </div>
              <div class="clearfix mt10">
                <p class="fl pleft">供应商：</p> <p class="fl pright">{{gBean.supplierName}}</p>
              </div>
              <div class="clearfix mt10">
                <p class="fl pleft">推介短信：</p> <p class="fl pright">{{gBean.smsInfo}}</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="clearfix mt10">
                <p class="fl pleft">商家名称：</p> <p class="fl pright">{{gBean.shopName}}</p>
              </div>
              <div class="clearfix mt10">
                <p class="fl pleft">商品产地：</p> <p class="fl pright">{{gBean.placeofOriginName}}</p>
              </div>
              <div class="clearfix mt10">
                <p class="fl pleft">商品分类信息：</p> <p class="fl pright">{{gBean.typeCodeName}}</p>
              </div>
              <div class="clearfix mt10">
                <p class="fl pleft">商品清单：</p> <p class="fl pright">{{gBean.itemList?gBean.itemList:''}}</p>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="商品简述" name="third"><p style="color:grey;font-size:13px;">{{gBean.goodsDesc}}</p></el-tab-pane>
        <el-tab-pane label="规格参数" name="fourth">
          <p style="color:grey;font-size:13px;" v-show="gBean.orderGoodsSpec1">包装：{{gBean.orderGoodsSpec1}}</p>
          <p style="color:grey;font-size:13px;margin-top:10px;" v-show="gBean.orderGoodsSpec2">长度：{{gBean.orderGoodsSpec2}}</p>
        </el-tab-pane>
        <el-tab-pane label="手机端描述" name="eighth">
          <p v-html="gBean.h5content" style="color:grey;font-size:13px;">
          </p>
        </el-tab-pane>
      </el-tabs>    
    </div>
    <div class="part part4">
      <h1>执行类型</h1>
      <div v-if="gBean.takeEffectType==='1'">
        <p>立即执行</p>
      </div>
      <div v-else>
        <p>定时执行  执行时间:{{gBean.takeEffectTime}} 20180302</p>

      </div>
    </div>
    <div class="part part5">
      <h1>审核处理</h1>
      <div>
        <div style="width: 60%;margin: 0 auto;">
          <el-form>
            <el-form-item label="审批选择:" label-width="100px">
                <el-radio v-model="yesOrNo" label="1">通过</el-radio>
                <el-radio v-model="yesOrNo" label="0">驳回</el-radio>
            </el-form-item>
            <el-form-item label="审批意见:" label-width="100px">
              <el-input type="textarea" v-model.trim="auditReason"></el-input>
              <p style="margin: 0;">
                剩余字数: <span style="color:red;">{{getResidualLen}}</span>
              </p>
            </el-form-item>
            <el-form-item style="text-align: center;">
              <el-button size="mini" @click="submit">确认</el-button>
              <el-button size="mini" @click="goBack">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsDetail, audit } from '@/api/admin/onsalemodifyaudit.js'
import { getLogisticsTemplate } from '@/api/goodsRelease'
import { getUnitsOptions } from '@/utils/index'
export default {
  created() {
    var gid = this.$route.query.gid
    this.goodsId = gid
    this.unitsOptions = getUnitsOptions()
    if (gid) {
      this._getGoodsDetail(gid)
    }
  },
  data() {
    return {
      activeTab: 'first',
      goodsId: '',
      yesOrNo: '1',
      auditReason: '',
      gBean: {
        logisticsTypes: '',
        gradientNumber: [],
        gradientPrice: []
      },
      fBean: {  // 修改前的商品对象
        logisticsTypes: '',
        gradientNumber: [],
        gradientPrice: []
      },
      tempArr: [],
      actualUnit: '',  // 计量单位
      formerActualUnit: '',
      unitChange: false
    }
  },
  methods: {
    _getGoodsDetail(gid) {
      getGoodsDetail(gid).then(res => {
        if (res.status === 200) {
          this.fBean = res.data.goodsBean
          this.tempArr = this.compareObj(res.data.goodsBean, res.data.editGoodsBean)
          console.log(this.tempArr)
          this.gBean = Object.assign({}, res.data.goodsBean, res.data.editGoodsBean)
          for (var i in this.unitsOptions) {
            if (this.unitsOptions[i].value === this.fBean.quantityUnits) {
              this.formerActualUnit = this.unitsOptions[i].label
            }
          }
          for (var j in this.unitsOptions) {
            if (this.unitsOptions[j].value === this.gBean.quantityUnits) {
              this.actualUnit = this.unitsOptions[j].label
            }
          }
          if (this.actualUnit !== this.formerActualUnit) {
            this.unitChange = true
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    compareObj(obj1, obj2) {
      var arr = []
      for (var i in obj1) {
        if (obj1[i] !== obj2[i] && !(obj1[i] instanceof Array)) {
          console.log(1, i, obj1[i], obj2[i])
          arr.push(i)
        } else if (obj1[i] instanceof Array && obj1[i].sort().toString() !== obj2[i].sort().toString()) {
          console.log(2, i, obj1[i], obj2[i])
          arr.push(i)
        }
      }
      return arr
    },
    isModify(param) {
      var arr = this.tempArr
      if (arr.indexOf(param) > -1) {
        return true
      } else {
        return false
      }
    },
    submit() {
      if (this.yesOrNo === '0' && this.auditReason === '') {
        this.$message.error('请输入审批意见！')
        return
      } else {
        const params = {
          goodsId: this.goodsId,
          yesOrNo: this.yesOrNo,
          auditReason: this.auditReason
        }
        audit(params).then(res => {
          if (res.status === 200) {
            this.$message.success(res.msg)
            this.$router.push({ path: '/goodsmanage/onsalemodifyaudit' })
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }
    },
    getshelfLifeUnit(val) {
      if (val === '1') {
        return '天'
      } else if (val === '2') {
        return '月'
      } else {
        return '年'
      }
    },
    handleTabClick(tab, event) {
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  computed: {
    getPayWayChange() {
      if (this.fBean.codpay !== this.gBean.codpay || this.fBean.cmpay !== this.gBean.cmpay || this.fBean.umpay !== this.gBean.umpay || this.fBean.alipay !== this.gBean.alipay) {
        return true
      } else {
        return false
      }
    },
    getJieTiChange() {
      if (this.fBean.gradientNumber !== null || this.fBean.gradientPrice !== null || this.fBean.gradientNumber !== null || this.fBean.gradientPrice !== null) {
        if (this.fBean.gradientNumber.toString() !== this.gBean.gradientNumber.toString() || this.fBean.gradientPrice.toString() !== this.gBean.gradientPrice.toString()) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    getBZQChange() {
      if (this.fBean.shelfLife !== this.gBean.shelfLife || this.fBean.shelfLifeUnit !== this.gBean.shelfLifeUnit) {
        return true
      } else {
        return false
      }
    },
    getKCYJChange() {
      if (this.fBean.stockAlarmFlag !== this.gBean.stockAlarmFlag || this.fBean.stockAlarm !== this.gBean.stockAlarm) {
        return true
      } else {
        return false
      }
    },
    getFBQDChange() {
      if (this.fBean.website !== this.gBean.website || this.fBean.hotline !== this.gBean.hotline || this.fBean.wapsite !== this.gBean.wapsite || this.fBean.phoneline !== this.gBean.phoneline || this.fBean.agriculturalmall !== this.gBean.agriculturalmall) {
        return true
      } else {
        return false
      }
    },
    getTHHChange() {
      if (this.fBean.isPromote !== this.gBean.isPromote || this.fBean.isReturn !== this.gBean.isReturn || this.fBean.isExchange !== this.gBean.isExchange) {
        return true
      } else {
        return false
      }
    },
    getWLChange() {
      if ((this.fBean.logisticsTypes.indexOf('1') > -1) !== (this.gBean.logisticsTypes.indexOf('1') > -1) || (this.fBean.logisticsTypes.indexOf('2') > -1) !== (this.gBean.logisticsTypes.indexOf('2') > -1)) {
        return true
      } else {
        return false
      }
    },
    getResidualLen() {
      return (30 - this.auditReason.length) < 0 ? 0 : (30 - this.auditReason.length)
    },
    templateName() {
      var tempName = ''
      getLogisticsTemplate(this.gBean.logisticsTemplateCode).then(function(res) {
        if (res.status === 200) {
          tempName = res.data[0]['templateName']
          return tempName
        } else {
          this.$message.error(res.msg)
        }
      }).catch(function(err) {
        this.$message.error(err.msg)
      })
    }
  }
}
</script>

<style scoped>
  .modify{color: red !important;padding-left: 10px;}
  .plr5{padding: 0 5px;}
  .pl10{padding-left: 10px;}
  .mt10{margin-top: 10px;}
  .title{font-weight: bold;font-size: 13px;color: #5e5e66;}
  .part{
    width: 80%;
    overflow: hidden;
  }
  .part h1{
    line-height: 40px;
    height: 40px;
    font-weight: bold;
    font-size: 15px;
    color: #5f5f5f;
    margin-bottom: 0;
  }
  .part > div{
    border: 1px solid #E6E6E6;
    padding: 15px 20px;
  }
  .part p{
    color: #5e5e66;
    font-size: 13px;
    padding-left: 10px;
    position: relative;
  }
  .part .must::before{
    content: '*';
    position: absolute;
    color: red;
    top: 5px;
    left: 0px;
  }
  .area-cons{
    color: #787878;
    font-size: 13px;
  }
  .areacon{
    display: inline-block;
    width: 80%;
    height: 80px;
    border: 1px solid #d1d1d1;
    padding: 10px;
  }
  /* 例子 */
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }  
  .pleft{width: 100px;text-align: right;font-size: 13px;color: #787878;}
  .pright{font-size: 13px;}
</style>
