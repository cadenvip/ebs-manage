<template>
  <div v-loading="loading" class="preview">
    <div class="header">
      <div class="inline-block banner-con">
        <el-carousel v-show="goodsBean.imageList" indicator-position="none">
          <el-carousel-item v-for="item in goodsBean.imageList" :key="item">
            <img :src="item">
          </el-carousel-item>
        </el-carousel>
      </div>   
      <div class="inline-block title-con">
        <h3>{{goodsBean.name}}</h3>
        <div class="goods-info clearfix">
          <div>
            <p>
              销售价格：<span class="corange">￥{{formatPrice}}</span>
            </p>
            <p>
              市场价：<span class="corange">￥{{goodsBean.marketPrice}}</span>
            </p>
            <p>
              特色卖点：<span>{{format(goodsBean.features)}}</span>
            </p>
            <p>
              剩余库存：<span>{{goodsBean.stock}}{{actualUnit}}</span>
            </p>
            <p>
              支持换货：<span>{{goodsBean.isexchange==='1'?'否':'是'}}</span>
            </p>
            <p>
              物流方式：<span v-if="goodsBean.logisticsTypes">{{goodsBean.logisticsTypes.indexOf('1') > -1 ? '自提' : ''}} {{goodsBean.logisticsTypes.indexOf('2')>-1 ? '快递' : ''}}{{goodsBean.logisticsTypes.indexOf('3')>-1 ? '免邮' : ''}}{{goodsBean.logisticsTypes.indexOf('20')>-1 ? 'EMAIL' : ''}}{{goodsBean.logisticsTypes.indexOf('21')>-1 ? 'FAX' : ''}}</span>
            </p>
            <!-- <p>
              物流费用：<span v-if="transportList">{{transportList.shipAreaLocationName}}至{{transportList.arrivalLocationName}} <el-button size="mini">选择区域</el-button> 快递：￥{{transportList.defaultMoney}}</span>
            </p> -->
            <div style="font-size: 12px;color:grey;">商品阶梯价：<span class="corange" v-if="!goodsBean.gradientPriceFlag">暂无信息</span>
              <div v-else>
                <p v-for="(item,index) in goodsBean.gradientNumber" :key="index">
                  订购满:{{item}}{{actualUnit}}，商品价格:{{goodsBean.gradientPrice[index]}}/{{actualUnit}}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p>
              商品编号：<span>{{format(goodsBean.goodsCode)}}</span>
            </p>
            <p>
              支持退货：<span>{{goodsBean.isReturn==='1'?'否':'是'}}</span>
            </p>
            <p>
              商品品牌：<span>{{format(goodsBean.brand)}}</span>
            </p>
            <p>
              推荐商品：<span>{{goodsBean.isPromote==='1'?'否':'是'}}</span>
            </p>
            <p>
              是否预警：<span>{{goodsBean.stockAlarmFlag?'是':'否'}}</span>
            </p>
            <p>
              预警数量：<span>{{goodsBean.stockAlarm}}</span>
            </p>
            <p>
              发布渠道：<span>	{{goodsBean.website==='0'?'12582网站': ''}} {{goodsBean.hotline==='0'?'12582热线':''}} {{goodsBean.wapsite==='0'?'WAP':''}} {{goodsBean.phoneline==='0'?'手机客户端':''}} {{goodsBean.agriculturalmall==='0'?'农资商城':''}}  </span>
            </p>
            <p>
              支持方式：
              <span v-if="goodsBean.codpay==='0'">货到付款</span>
              <span v-if="goodsBean.alipay==='0'">支付宝</span>
              <span v-if="goodsBean.cmpay==='0'">和包支付</span>
              <span v-if="goodsBean.umpay==='0'">联动支付</span>
            </p>
            <p>
              视频地址：<span>{{format(goodsBean.videoUrl)}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="商品信息" name="first">
          <el-row>
            <el-col :span="12" style="border-right: 1px solid #999;">
              <div class="clearfix mt10">
                <p class="fl pleft">商品名称：</p> <p class="fl pright">{{goodsBean.name}}</p>
              </div>
              <div class="clearfix mt10">
                <p class="fl pleft">商品重量：</p> <p class="fl pright">{{goodsBean.weight}}克(g)</p>
              </div>
              <div class="clearfix mt10">
                <p class="fl pleft">供应商：</p> <p class="fl pright">{{goodsBean.supplierName}}</p>
              </div>
              <div class="clearfix mt10">
                <p class="fl pleft">推介短信：</p> <p class="fl pright">{{goodsBean.smsInfo}}</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="clearfix mt10">
                <p class="fl pleft">商家名称：</p> <p class="fl pright">{{goodsBean.shopName}}</p>
              </div>
              <div class="clearfix mt10">
                <p class="fl pleft">商品产地：</p> <p class="fl pright">{{goodsBean.placeofOriginName}}</p>
              </div>
              <div class="clearfix mt10">
                <p class="fl pleft">商品分类信息：</p> <p class="fl pright">{{goodsBean.typeCodeName}}</p>
              </div>
              <div class="clearfix mt10">
                <p class="fl pleft">商品清单：</p> <p class="fl pright">{{goodsBean.itemList?goodsBean.itemList:''}}</p>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="商品简述" name="third"><p style="color:grey;font-size:13px;">{{goodsBean.goodsDesc}}</p></el-tab-pane>
        <el-tab-pane label="规格参数" name="fourth">
          <p style="color:grey;font-size:13px;" v-show="goodsBean.orderGoodsSpec1">包装：{{goodsBean.orderGoodsSpec1}}</p>
          <p style="color:grey;font-size:13px;margin-top:10px;" v-show="goodsBean.orderGoodsSpec2">长度：{{goodsBean.orderGoodsSpec2}}</p>
        </el-tab-pane>
        <el-tab-pane label="手机端描述" name="eighth">
          <p style="color:grey;font-size:13px;">
            {{goodsBean.h5content}}
          </p>
        </el-tab-pane>
      </el-tabs>    
    </div>
    <div style="text-align: center; margin-top: 20px;">
      <el-button size="medium" type="primary" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
  import { getGoodsDetail } from '@/api/noshelfgoods'
  import { getTemplate } from '@/api/admin/updownaudit.js'
  import { getUnitsOptions } from '@/utils/index'
  export default {
    mounted () {
      this.unitsOptions = getUnitsOptions()
      if (!this.$route.query.goodsId) {
        this.$message.error('未获取到商品id！')
      } else {
        this._getGoodsDetail()
      }
    },
    data() {
      return {
        unitsOptions: [],
        actualUnit: '',
        activeTab: 'first',
        templateName: '',   // 物流模板名称
        transportList: [],
        loading: false,
        goodsBean: {}
      }
    },
    methods: {
      _getGoodsDetail() {
        this.loading = true
        if (this.$route.query.goodsId) {
          getGoodsDetail(this.$route.query.goodsId).then(res => {
            this.loading = false
            if (res.status === 200) {
              this.goodsBean = res.data.goodsBean
              console.log('222', this.goodsBean)
              for (var i in this.unitsOptions) {
                if (this.unitsOptions[i].value === this.goodsBean.quantityUnits) {
                  this.actualUnit = this.unitsOptions[i].label
                }
              }
              if (this.goodsBean.logisticsTemplateCode) {
                getTemplate(this.goodsBean.logisticsTemplateCode).then(res => {
                  if (res.status === 200) {
                    this.templateName = res.data.template.templateName
                    this.transportList = res.data.transportList[0]
                  } else {
                    this.$message.error(res.msg)
                  }
                }).catch(err => {
                  this.$message.error(err)
                })
              }
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }
      },
      format(val) {
        return val || '暂无信息'
      },
      handleTabClick(tab, event) {
        console.log(tab, event)
      },
      goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      }
    },
    computed: {
      formatPrice() {
        if (this.goodsBean.price) {
          var price = this.goodsBean.price.toString()
          var length = price.length
          var index = price.indexOf('.')
          if (index === -1) {
            return (price + '.00')
          } else {
            if (length - (index + 1) === 1) {
              return (price + '0')
            } else if (length - (index + 1) === 2) {
              return price
            } else if (length - (index + 1) > 2) {
              return (price.slice(0, index + 3))
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .mt10{margin-top: 10px;}
  .preview{padding: 10px 2%;}
  .banner-con{width: 400px;height: 300px;border: 1px solid #d9d9d9;overflow: hidden;}
  .banner-con img{width: 100%; height: 100%;}
  .title-con{width: 500px;margin-left: 40px;vertical-align: top;}
  .title-con h3{background: #e6f6dd;line-height: 30px;color: #2f9c0d;font-size: 14px;margin: 0;padding-left: 30px;}
  .goods-info{border: 1px solid #e2e2e2;padding: 15px;}
  .goods-info>div{width: 50%;float: left;overflow: hidden;}
  .goods-info p{margin: 10px 0;color: grey;font-size: 12px;}
  .goods-info span{font-size: 14px;font-weight: bold;}
  .corange{color: #f60;}
  .content{margin-top: 20px;padding: 20px;border: 1px solid #e4e7ed;}
  .content p{margin: 0;}
  .pleft{width: 100px;text-align: right;font-size: 13px;color: #787878;}
  .pright{font-size: 13px;}
</style>
