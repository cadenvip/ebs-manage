<template>
  <div v-loading="loading" class="content" v-cloak>
    <div class="top-con">
      <div class="inline-block banner-con">
        <el-carousel v-show="goodsBean.imageList" indicator-position="none">
          <el-carousel-item v-for="item in goodsBean.imageList" :key="item">
            <img :src="item">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="inline-block" style="padding-left: 50px;vertical-align: top;">
        <h3>{{goodsBean.name}}</h3>
        <p>市场价：<span class="through">￥{{goodsBean.marketPrice}}</span></p>
        <p>销售价格：<span style="color: #FF3300;font-size:30px;font-weight: bold;">￥{{goodsBean.price}}</span></p>
        <p>商品编码：<span>{{format(goodsBean.goodsCode)}}</span></p>
        <p>商品重量：<span>{{goodsBean.weight}} {{goodsBean.weightUnit === '1'?'克':'千克'}}</span></p>
        <p>使用物流：<span v-if="goodsBean.logisticsTypes">{{goodsBean.logisticsTypes.indexOf('1') > -1 ? '自提' : ''}} {{goodsBean.logisticsTypes.indexOf('2')>-1 ? '快递' : ''}} <span v-if="templateName">{{templateName}}</span></span></p>
        <p class="payway">支付方式：
          <span>货到付款</span>
          <span v-if="goodsBean.alipay==='1'">支付宝</span>
          <span v-if="goodsBean.cmpay==='1'">和包支付</span>
          <span v-if="goodsBean.umpay==='1'">联动支付</span>
        </p>
      </div>
    </div>
    <div class="mid-con">
      <p class="pad-title">
        生产日期：<span>{{!goodsBean.produceDate ? '无' : goodsBean.produceDate}}</span> | 
        保质期：<span>{{goodsBean.shelfLife}}{{goodsBean.shelfLifeUnit === '1'?'天':goodsBean.shelfLifeUnit==='2'?'月':'年'}}</span> | 
        推荐：<span>{{goodsBean.isPromote==='1'?'否':'是'}}</span> | 
        支持退货：<span>{{goodsBean.isReturn==='1'?'否':'是'}}</span> | 
        支持换货：<span>{{goodsBean.isexchange==='1'?'否':'是'}}</span>
      </p>
      <p>促销信息：{{format(goodsBean.promotionInfo)}}</p>
      <p>特色卖点：{{format(goodsBean.features)}}</p>
      <p>生产厂家：{{format(goodsBean.supplierName)}}</p>
      <p>品牌：{{format(goodsBean.brand)}}</p>
      <p>wappush内容：{{format(goodsBean.wapUrl)}}</p>
      <p>wappush链接：{{format(goodsBean.wapInfo)}}</p>
      <p>视频地址：{{format(goodsBean.videoUrl)}}</p>
      <p>上架提醒：<span v-show="goodsBean.isEmail==='0'">邮件</span>  <span v-show="goodsBean.isSms==='0'">短信</span></p>
      <p>发布渠道：{{goodsBean.website==='0'?'12582网站': ''}} {{goodsBean.hotline==='0'?'12582热线':''}} {{goodsBean.wapsite==='0'?'WAP':''}} {{goodsBean.phoneline==='0'?'手机客户端':''}} {{goodsBean.agriculturalmall==='0'?'农资商城':''}}</p>
      <p>商品简述：{{format(goodsBean.goodsDesc)}}</p>
      <p>推介短信：{{format(goodsBean.smsInfo)}}</p>
      <p>商品清单：{{format(goodsBean.itemsList)}}</p>
      <p>彩信文件：{{goodsBean.mmsInfo}}</p>
      <p>商品规格：包装：{{goodsBean.orderGoodsSpec1}}</p>
      <div>商品阶梯价：<span v-if="!goodsBean.gradientPriceFlag">暂无信息</span>
        <div v-else>
          <p v-for="(item,index) in goodsBean.gradientNumber" :key="index">
              订购满:{{item}}{{actualUnit}}，商品价格:{{goodsBean.gradientPrice[index]}}/{{actualUnit}}
            </p>
        </div>
      </div>
      <p>库存预警：{{goodsBean.stockAlarm}}</p>
    </div>
    <div>
      <p>手机端描述:{{goodsBean.h5content}}</p>
    </div>
    <div style="text-align: center; margin-top:20px;">
      <el-button size="medium" type="primary" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
  import { getGoodsDetail } from '@/api/noshelfgoods'
  import { getUnitsOptions } from '@/utils/index'
  import { getTemplateDetail } from '@/api/addrmanage.js'
  export default {
    created() {
      this.unitsOptions = getUnitsOptions()
    },
    mounted () {
      if (!this.$route.query.goodsId) {
        this.$message.error('未获取到商品id！')
      } else {
        this._getGoodsDetail()
      }
    },
    data() {
      return {
        loading: false,
        goodsBean: {},
        actualUnit: '',
        templateName: ''
      }
    },
    methods: {
      _getGoodsDetail() {
        this.loading = true
        getGoodsDetail(this.$route.query.goodsId).then(res => {
          this.loading = false
          if (res.status === 200) {
            this.goodsBean = res.data.goodsBean
            for (var i in this.unitsOptions) {
              if (this.unitsOptions[i].value === this.goodsBean.quantityUnits) {
                this.actualUnit = this.unitsOptions[i].label
              }
            }
            if (this.goodsBean.logisticsTemplateCode) {
              this._getTemplateDetail(this.goodsBean.logisticsTemplateCode)
            }
            console.log(this.goodsBean)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      _getTemplateDetail(tid) {
        getTemplateDetail(tid).then(res => {
          if (res.status === 200) {
            this.templateName = res.data.template.templateName
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      format(val) {
        return val || '暂无信息'
      },
      goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .through{text-decoration:line-through}
  .content{padding: 20px 2%;}
  .top-con>div{height: 300px;overflow: hidden;}
  .banner-con{width: 400px;height: 300px;border: 1px solid #d9d9d9;overflow: hidden;}
  .banner-con img{width: 100%; height: 100%;}
  .payway>span {padding-right: 5px;}
  .mid-con{min-width: 560px;border: 1px solid #ddd;padding: 8px;}
  .mid-con .pad-title{background: #ECF0F1;height: 40px;line-height: 40px;}
  .mid-con .pad-title span{font-weight: bold;}
  p{font-size: 14px;}
</style>