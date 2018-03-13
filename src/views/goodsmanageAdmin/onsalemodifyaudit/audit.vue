<template>
  <div style="padding: 0 30px 200px 30px;">
    <div class="part part1">
      <h1>基本信息</h1>
      <div>
        <div class="clearfix">
          <el-col :span="12">
            <p class="must"><span class="title" :class="{'modify':isModify('name')}">商品名称:</span> <span>名称1</span></p>
            <p class="must"><span class="title" :class="{'modify':isModify('name')}">商品产地:</span> <span>名称1</span></p>
            <p class="must"><span class="title">商品分类:</span> <span>名称1</span></p>
            <p class="must"><span class="title">单价(元):</span> <span>80</span></p>
            <p class="must"><span class="title">重量(克):</span> <span>10000.0</span></p>
            <p class="must"><span class="title">送货时限:</span> <span>小时</span></p>
            <p class="must"><span class="title">供应商:</span> <span>测试</span></p>
            <p><span class="title">品牌:</span> <span>米花糖</span></p>
            <p class="must"><span class="title">支付方式:</span> <span class="plr5">支付宝</span><span class="plr5">手机支付</span><span class="plr5">网银支付</span><span class="plr5">货到付款</span></p>
            <p class="must"><span class="title">物流:</span> <span>快递</span></p>
          </el-col>
          <el-col :span="12">
            <p class="must"><span class="title">商品编码:</span> <span>103505000000003</span></p>
            <p class="must"><span class="title">保质期:</span> <span>20月</span></p>
            <p class="must"><span class="title">计量单位:</span> <span>立方米</span></p>
            <p class="must"><span class="title">市场价(元):</span> <span>100</span></p>
            <p class="must"><span class="title">生产日期:</span> <span>	20180110</span></p>
            <p class="must"><span class="title">当前库存:</span> <span>	200</span></p>
            <p><span class="title">特色卖点:</span> <span>好吃不贵</span></p>
            <p><span class="title">促销信息:</span> <span>买一送一</span></p>
            <p><span class="title">退换货:</span> <span class="plr5">推荐</span><span class="plr5">支持退货</span><span class="plr5">支持换货</span></p>
          </el-col>
        </div>
        <div class="block" style="margin-top: 10px;width: 40%;">
          <p class="must"><span class="title">商品图片:</span></p>
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>  
        <p class="must"><span class="title">库存预警:</span> <span>预警数量：10</span></p>
        <p><span class="title">发布渠道:</span> <span>	WEB    热线    WAP    手机客户端   </span></p>
        <p><span class="title">视频地址:</span> <span>http://www.baidu.com</span></p>
        <p><span class="title">阶梯价格:</span></p>
      </div>
    </div>
    <div class="part part2">
      <h1>参数信息</h1>
      <div>
        <div class="clearfix">
          <el-col :span="12">
            <div class="area-cons">
              <span class="title">wappush:</span>
              <span class="areacon">内容内容</span>
            </div>
            <div class="area-cons mt10">
              <span class="title">推介短信:</span>
              <span class="areacon">内容内容</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="area-cons">
              <span class="title">商品简述:</span>
              <span class="areacon">内容内容</span>
            </div>
            <div class="area-cons mt10">
              <span class="title">商品清单:</span>
              <span class="areacon">内容内容</span>
            </div>
          </el-col>
        </div>
        <p><span class="title">wappush链接:</span></p>
        <p><span class="title">彩信文件:</span></p>
      </div>
    </div>
    <div class="part part3">
      <h1>属性信息</h1>
      <div>

      </div>
    </div>
    <div class="part part4">
      <h1>执行类型</h1>
      <div>
        <p>立即执行</p>
      </div>
    </div>
    <div class="part part5">
      <h1>审核处理</h1>
      <div>
        <div style="width: 60%;margin: 0 auto;">
          <el-form>
            <el-form-item label="审批选择:" label-width="100px">
                <el-radio v-model="radio" label="1">通过</el-radio>
                <el-radio v-model="radio" label="2">驳回</el-radio>
            </el-form-item>
            <el-form-item label="审批意见:" label-width="100px">
              <el-input type="textarea" v-model="desc"></el-input>
              <p style="margin: 0;">
                剩余字数: <span style="color:red;">{{getResidualLen}}</span>
              </p>
            </el-form-item>
            <el-form-item style="text-align: center;">
              <el-button size="mini">确认</el-button>
              <el-button size="mini">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsDetail } from '@/api/admin/onsalemodifyaudit.js'
export default {
  created() {
    var gid = this.$route.query.gid
    if (gid) {
      this._getGoodsDetail(gid)
    }
  },
  data() {
    return {
      radio: '1',
      desc: ''
    }
  },
  methods: {
    _getGoodsDetail(gid) {
      getGoodsDetail(gid).then(res => {
        if (res.status === 200) {
          var tempArr = this.compareObj(res.data.goodsBean, res.data.editGoodsBean)
          var tempObj = Object.assign(res.data.goodsBean, res.data.editGoodsBean)
          if (tempArr.length === 0) {
            console.log('暂无修改')
          } else {
            // for (var i = 0; i < tempArr.length; i++) {
            console.log(tempObj)
            // }
          }
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
        if (obj1[i] !== obj2[i]) {
          arr.push(i)
          console.log(i, obj1[i], obj2[i])
        }
      }
      console.log(arr)
      return arr
    },
    isModify(param) {
      var arr = ['name']
      if (arr.indexOf(param) > -1) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    getResidualLen() {
      return (30 - this.desc.length) < 0 ? 0 : (30 - this.desc.length)
    }
  }
}
</script>

<style scoped>
  .plr5{padding: 0 5px;}
  .mt10{margin-top: 10px;}
  .title{font-weight: bold;font-size: 13px;color: #5e5e66;}
  .modify{color: red !important;}
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
