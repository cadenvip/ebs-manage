<template>
  <div style="padding: 0 30px 200px 30px;">
    <div class="part part1">
      <h1>基本信息</h1>
      <div>
        <div class="clearfix">
          <el-col :span="12">
            <p class="must"><span class="title" :class="{'modify':isModify('name')}">商品名称:</span> <span>{{gBean.name}}</span></p>
            <p class="must"><span class="title" :class="{'modify':isModify('placeofOriginName')}">商品产地:</span> <span>{{gBean.placeofOriginName}}</span></p>
            <p class="must"><span class="title" :class="{'modify':isModify('')}">商品分类:</span> <span>{{gBean.typeCodeName}}</span></p>
            <p class="must"><span class="title" :class="{'modify':isModify('price')}">单价(元):</span> <span>{{gBean.price}}</span></p>
            <p class="must"><span class="title" :class="{'modify':isModify('weight')}">重量(克):</span> <span>{{gBean.weight}}</span></p>
            <p class="must"><span class="title" :class="{'modify':isModify('')}">送货时限:</span> <span>{{gBean.deliveryLimit}}小时</span></p>
            <p class="must"><span class="title" :class="{'modify':isModify('supplierName')}">供应商:</span> <span>{{gBean.supplierName}}</span></p>
            <p><span class="title" :class="{'modify':isModify('brand')}">品牌:</span> <span>{{gBean.brand}}</span></p>
            <p class="must"><span class="title" :class="{'modify':isModify('')}">支付方式:</span> <span class="plr5" v-show="gBean.alipay==='0'">支付宝</span><span class="plr5" v-show="gBean.cmpay==='0'">和包支付</span><span class="plr5"v-show="gBean.umpay==='0'">联动支付</span><span class="plr5"v-show="gBean.codpay==='0'">货到付款</span></p>
            <p class="must"><span class="title">物流：</span><span v-if="gBean.logisticsTypes">{{gBean.logisticsTypes.indexOf('1') > -1 ? '自提' : ''}} {{gBean.logisticsTypes.indexOf('2')>-1 ? '快递' : ''}}{{gBean.logisticsTypes.indexOf('3')>-1 ? '免邮' : ''}}{{gBean.logisticsTypes.indexOf('20')>-1 ? 'EMAIL' : ''}}{{gBean.logisticsTypes.indexOf('21')>-1 ? 'FAX' : ''}}</span></p>
          </el-col>
          <el-col :span="12">
            <p class="must"><span class="title">商品编码:</span> <span>{{gBean.goodsCode}}</span></p>
            <p class="must"><span class="title">保质期:</span> <span>{{gBean.shelfLife}} {{getshelfLifeUnit(gBean.shelfLifeUnit)}}</span></p>
            <p class="must"><span class="title">计量单位:</span> <span>{{actualUnit}}</span></p>
            <p class="must"><span class="title">市场价(元):</span> <span>{{gBean.marketPrice}}</span></p>
            <p class="must"><span class="title">生产日期:</span> <span>{{gBean.produceDate}}</span></p>
            <p class="must"><span class="title">当前库存:</span> <span>{{gBean.stock}}</span></p>
            <p><span class="title">特色卖点:</span> <span>{{gBean.features}}</span></p>
            <p><span class="title">促销信息:</span> <span>{{gBean.promotionInfo}}</span></p>
            <p><span class="title">退换货:</span> <span class="plr5" v-show="gBean.isPromote==='0'">推荐</span><span class="plr5" v-show="gBean.isReturn==='0'">支持退货</span><span class="plr5" v-show="gBean.isExchange==='0'">支持换货</span></p>
          </el-col>
        </div>
        <div class="block" style="margin-top: 10px;width: 40%;">
          <p class="must"><span class="title">商品图片:</span></p>
          <el-carousel trigger="click" height="360px">
            <el-carousel-item v-for="item in gBean.imageList" :key="item">
              <img style="width: 100%;height:100%;" :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>  
        <p class="must"><span class="title">库存预警:</span> <span v-if="gBean.stockAlarmFlag">预警数量：{{gBean.stockAlarm}}</span><span v-else>暂无预警</span></p>
        <p><span class="title">发布渠道:</span>
          <span class="pl10" v-show="gBean.website==='0'">WEB</span>
          <span class="pl10" v-show="gBean.hotline==='0'">热线</span>
          <span class="pl10" v-show="gBean.wapsite==='0'">WAP</span>
          <span class="pl10" v-show="gBean.phoneline==='0'">手机客户端</span>
          <span class="pl10" v-show="gBean.agriculturalmall==='0'">农资商城</span>
        </p>
        <p><span class="title">视频地址:</span> <span>{{gBean.videoUrl}}</span></p>
        <div style="font-size: 12px;color:grey;">商品阶梯价：<span class="corange" v-if="!gBean.gradientPriceFlag">暂无信息</span>
          <div v-else>
            <p v-for="(item,index) in gBean.gradientNumber" :key="index">
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
    <!-- <div class="part part3">
      <h1>属性信息</h1>
      <div>

      </div>
    </div> -->
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
              <el-button size="mini">返回</el-button>
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
      goodsId: '',
      yesOrNo: '1',
      auditReason: '',
      gBean: {
        logisticsTypes: ''
      },
      tempArr: [],
      actualUnit: ''  // 计量单位
    }
  },
  methods: {
    _getGoodsDetail(gid) {
      getGoodsDetail(gid).then(res => {
        if (res.status === 200) {
          this.tempArr = this.compareObj(res.data.goodsBean, res.data.editGoodsBean)
          this.gBean = Object.assign(res.data.goodsBean, res.data.editGoodsBean)
          for (var i in this.unitsOptions) {
            if (this.unitsOptions[i].value === this.gBean.quantityUnits) {
              this.actualUnit = this.unitsOptions[i].label
            }
          }
          console.log(this.gBean)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    compareObj(obj1, obj2) {
      var arr = []
      for (var i in obj1) {
        if (obj1[i] !== obj2[i] && !(obj1[i] instanceof Array)) {
          // console.log(i, obj1[i], obj2[i])
          arr.push(i)
        } else if (obj1[i] instanceof Array && obj1[i].sort().toString() !== obj2[i].sort().toString()) {
          // console.log(i, obj1[i], obj2[i])
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
          this.$message.error(err)
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
    }
  },
  computed: {
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
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>
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
</style>
