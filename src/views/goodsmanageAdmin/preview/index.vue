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
              剩余库存：<span>{{goodsBean.stock}} 计量单位待改</span>
            </p>
            <p>
              支持换货：<span>{{goodsBean.isexchange?'不支持':'支持'}}</span>
            </p>
            <p>
              物流方式：<span v-if="goodsBean.logisticsTypes">{{goodsBean.logisticsTypes.indexOf('1') > -1 ? '自提' : ''}} {{goodsBean.logisticsTypes.indexOf('2')>-1 ? '物流' : ''}} {{goodsBean.logisticsTypes.indexOf('2')>-1 ? '物流模板：'+goodsBean.logisticsTemplateCode : ''}}</span>
            </p>
            <p>
              物流费用：<span>{{transportList.shipAreaLocationName}}至{{transportList.arrivalLocationName}} <el-button size="mini">选择区域</el-button> 快递：￥{{transportList.defaultMoney}}</span>
            </p>
            <div style="font-size: 12px;color:grey;">商品阶梯价：<span class="corange" v-if="goodsBean.gradientPriceFlag">暂无信息</span>
              <div v-else>
                <p v-for="(item,index) in goodsBean.gradientNumber" :key="index">
                  一次性购买{{item}}件，商品价格优惠为{{goodsBean.gradientPrice[index]}}元
                </p>
              </div>
            </div>
          </div>
          <div>
            <p>
              商品编号：<span>{{format(goodsBean.goodsCode)}}</span>
            </p>
            <p>
              支持退货：<span>{{goodsBean.isReturn?'不支持':'支持'}}</span>
            </p>
            <p>
              商品品牌：<span>{{format(goodsBean.brand)}}</span>
            </p>
            <p>
              推荐商品：<span>{{goodsBean.isPromote?'否':'是'}}</span>
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
              <span>货到付款</span>
              <span v-if="goodsBean.alipay==='0'">支付宝</span>
              <span v-if="goodsBean.cmpay==='0'">手机支付</span>
              <span v-if="goodsBean.unionpay==='0'">银联支付</span>
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
        <el-tab-pane label="商品简述" name="first">商品简述</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="商品描述" name="third">商品描述</el-tab-pane>
        <el-tab-pane label="规格参数" name="fourth">规格参数</el-tab-pane>
        <el-tab-pane label="商品属性" name="fifth">商品属性</el-tab-pane>
        <el-tab-pane label="商品资质" name="sixth">商品资质</el-tab-pane>
        <el-tab-pane label="关联商品" name="seventh">关联商品</el-tab-pane>
        <el-tab-pane label="手机端描述" name="eighth">手机端描述</el-tab-pane>
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
      getUnitsOptions()
      if (!this.$route.query.goodsId) {
        this.$message.error('未获取到商品id！')
      } else {
        this._getGoodsDetail()
      }
    },
    data() {
      return {
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
</style>
