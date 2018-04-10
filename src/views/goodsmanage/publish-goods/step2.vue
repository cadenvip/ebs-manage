<template>
  <div>
    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h2 style="padding-left: 20px;">基本商品信息</h2>
      <el-form-item label="商品名称:" class="goods-name">
        <el-input style="width: 100px;" placeholder="促销信息" :maxlength=20 v-model="ruleForm.cuxiao"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input style="width: 100px;" placeholder="品牌" :maxlength=20 v-model="ruleForm.pinpai"></el-input>
      </el-form-item>
      <el-form-item label="" prop="mingchen">
        <el-input style="width: 180px;" placeholder="名称" :maxlength=20 v-model="ruleForm.mingchen"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input style="width: 100px;" placeholder="规格" :maxlength=20 v-model="ruleForm.guige"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input style="width: 100px;" placeholder="特色卖点" :maxlength=20 v-model="ruleForm.maidian"></el-input>
      </el-form-item>
      <div>
        <p style="font-size: 14px;color: #ccc;margin-left: 30px;margin-top: 0;">商品名称展示效果: <span style="color: #67c23a">{{ruleForm.cuxiao+"&nbsp&nbsp"+ruleForm.pinpai+"&nbsp&nbsp"+ruleForm.mingchen+"&nbsp&nbsp"}}<i v-show="ruleForm.guige">包装: </i>{{ruleForm.guige+"&nbsp&nbsp"+ruleForm.maidian}}</span></p>
      </div>
      <el-form-item style="display: block;" label="市场价:" prop="shichangjia">
        <el-input style="width: 260px;" :maxlength=7 placeholder="输入同类市场价" v-model.number="ruleForm.shichangjia"></el-input>
      </el-form-item>
      <el-form-item style="display: block;" label="直供价:" prop="zhigongjia">
        <el-input style="width: 260px;" :maxlength=7 placeholder="输入在商城销售价格，应低于市场价" v-model.number="ruleForm.zhigongjia"></el-input>
      </el-form-item>
      <el-form-item style="display: block;" label="物流:" prop="wuliu">
        <el-popover
          v-loading="templateLoading"
          ref="popover"
          placement="right"
          width="400"
          trigger="click"
          v-model="popVisible"> 
          <el-radio-group v-model="ruleForm.wuliuObjt">
            <div style="margin-top: 14px;" v-for="item in ruleForm.wuliuObj">
              <el-radio :label="item.templateCode">{{item.templateName}}</el-radio>
            </div>
          </el-radio-group>
          <div class="confirm-btn" style="text-align: center; margin: 14px;">
            <el-button type="primary" size="mini" @click="confirmLogisticsTemplate">确定</el-button>
          </div>
        </el-popover>
        <el-checkbox-group style="display: inline-block;" v-model="ruleForm.wuliu">
          <el-checkbox label="物流"></el-checkbox>
          <el-checkbox label="自提"></el-checkbox>
          <el-button v-show="ruleForm.wuliu.indexOf('物流')>-1?true:false" @click="openLogisticsTemplate" type="primary" size="mini" style="margin-left: 40px;" v-popover:popover>快递模板</el-button> 
        </el-checkbox-group>          
        <span style="font-size: 14px;color: #606266; padding-left: 20px;" v-show="ruleForm.wuliuObjN&&ruleForm.wuliu.indexOf('物流')>-1?true:false">已选模板: {{ruleForm.wuliuObjN}}</span>
      </el-form-item>
      <el-form-item style="display: block;" :maxlength=5 label="库存:" prop="kucun">
        <el-input style="width: 100px;" placeholder="输入库存" v-model.number="ruleForm.kucun"></el-input>
        <el-checkbox style="margin-left: 50px;" v-model.number="ruleForm.kucuntx">库存提醒</el-checkbox>
        <span style="margin: 0 10px;color: #606266;">低于</span><el-input  :maxlength=5 :disabled="!ruleForm.kucuntx" v-model="ruleForm.kucuntxNum" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item style="display: block;" label="支付方式:" prop="zhifufs">
        <el-checkbox-group v-model="ruleForm.zhifufs">
          <el-checkbox :disabled="zfbDisable" @change="_checkPayWay(23, 1)" label="支付宝支付" name="zhifufs"></el-checkbox>
          <el-checkbox :disabled="sjzfDisable" @change="_checkPayWay(33, 2)" label="联动支付" name="zhifufs"></el-checkbox>
          <el-checkbox :checked=true disabled label="货到付款" name="zhifufs"></el-checkbox>
          <el-checkbox :disabled="wyzjDisable" @change="_checkPayWay(34, 3)" label="和包支付" name="zhifufs"></el-checkbox>
          <el-alert title="温馨提示：在线支付将由支付渠道收取交易手续费，由商户承担，支付宝0.5%，手机支付0.3%。" type="error" :closable="false"></el-alert>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="display: block;margin-bottom: 0;" label="阶梯价格:" prop="jieti">
        <!-- <span style="color: #606266;" v-if="ruleForm.jietiFlag">启用</span>
        <span style="color: #606266;" v-if="!ruleForm.jietiFlag">禁用</span> -->
        <el-switch style="margin-left: 5px;" v-model="ruleForm.jietiFlag"></el-switch>
      </el-form-item>
      <div v-if="ruleForm.jietiFlag" style="display: inline-block;padding: 20px;background-color: lightblue;margin-left:100px;border-radius: 5px;">
        <span> 一次性购买 </span><el-input :maxlength=5 v-model="jietiItem1.num" size="mini" style="width: 80px;"></el-input>
        <span>件,商品价格优惠为</span>
        <el-input v-model="jietiItem1.dollar" :maxlength=7 size="mini" style="width: 80px;"></el-input> 元 
        <el-button size="mini" @click="addJieti">新增</el-button>
        <div v-for="(item,index) in jietiItems">
          <jieti :item="item"></jieti>
          <el-button size="mini" @click="delejieti(index)">删除</el-button>
        </div>
      </div>
      <el-form-item style="padding-left: 100px;">
        <el-upload
          class="avatar-uploader"
          action="http://10.189.13.151:8080/ebs/common/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload" style="display:inline-block">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span style="color: #aaa;">单个图片的大小不能超过500K。图片至少上传1张，可在图片预览栏选择商品图片。按住Ctrl可多选商品图片</span>
      </el-form-item>
      <h2 style="padding-left: 20px;">商品参数信息</h2>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商品编码:">
            0000
          </el-form-item>          
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品重量:" prop="spzl">
            <el-input style="width: 100px;" :maxlength=5 v-model.number="ruleForm.spzl"></el-input>
            <el-select v-model="danwei" style="width:80px;" placeholder="请选择">
              <el-option
                v-for="item in danweiOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>       
          </el-form-item>  
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品规格:">
            <el-input :maxlength=20 v-model="ruleForm.spgg"></el-input>
          </el-form-item>  
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="生产厂家:" prop="sccj">
            <el-input :maxlength=25 v-model="ruleForm.sccj"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品产地:" prop="spcd" class="spcd">
            <el-input :maxlength=25 v-model="ruleForm.spcd" @focus="regionVisible = true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生产日期:">
            <el-date-picker
              v-model="ruleForm.scrq"
              type="date"
              value-format="yyyyMMdd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="保质期:" prop="baozhiqi">
            <el-input :maxlength=5 style="width: 100px;" v-model="ruleForm.baozhiqi"></el-input>
            <el-select v-model="baozhiqidw" style="width:80px;" placeholder="请选择">
              <el-option
                v-for="item in baozhiqiOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>       
          </el-form-item> 
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品分类:" prop="spfl">
            <el-input disabled="" v-model="goodsType.typeCodeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计量单位:" prop="jldw">
          <el-select style="width: 180px;" v-model="jiliangdw" placeholder="请选择">
            <el-option
              v-for="item in jiliangdwOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>            
          </el-form-item>
        </el-col>
      </el-row>
      <h2 style="padding-left: 20px;">商品更多信息</h2>
      <el-col v-if="!belongPublish" style="padding: 20px 30px;">
        <el-checkbox style="padding-top: 11px;" v-model="immediate">立即生效</el-checkbox>
        <el-form-item label-width="120px" label="修改生效时间:" class="spcd">
          <el-date-picker
            :disabled="immediate"
            v-model="immediateTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <div v-if="belongPublish">
        <el-form-item>
          <span style="padding-left:30px;">定时上架:</span>
          <el-checkbox :checked="ruleForm.dingssj" @change="iszdsj" style="margin-left: 10px;" v-model="ruleForm.dingssj">启用</el-checkbox>
          <el-form-item label="上架时间：" prop="zdsjsj">
            <el-date-picker
              :clearable = "false"
              @blur="checkTimeCorrect"
              :disabled="ruleForm.iszisj"
              v-model="ruleForm.zdsjsj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="下架时间：">
            <el-date-picker
              :default-value = "new Date()"
              @blur="checkTimeCorrect"
              v-model="ruleForm.zdxjsj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item style="display: block;" label="上架提醒:">
          <el-checkbox-group v-model="ruleForm.sjtx">
            <el-checkbox label="邮件" name="sjtx"></el-checkbox>
            <el-checkbox label="短信" name="sjtx"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <el-form-item style="display: block;" label="发布渠道:">
        <el-checkbox-group v-model="ruleForm.fbqd">
          <el-checkbox checked label="12582网站" name="fbqd"></el-checkbox>
          <el-checkbox checked label="12582热线" name="fbqd"></el-checkbox>
          <el-checkbox checked label="WAP" name="fbqd"></el-checkbox>
          <el-checkbox checked label="手机客户端" name="fbqd"></el-checkbox>
          <el-checkbox label="农资商城" name="fbqd"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="display: block;" label="退换货:">
        <el-checkbox-group v-model="ruleForm.thh">
          <el-checkbox label="推荐" name="thh"></el-checkbox>
          <el-checkbox label="支持退货" name="thh"></el-checkbox>
          <el-checkbox label="支持换货" name="thh"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="display: block;" label="视频地址:">
          <el-input :maxlength=200 v-model="ruleForm.spdz"></el-input>
      </el-form-item>
      <el-button @click="show = !show" style="margin-left: 30px;">更多信息展开</el-button>
      <div style="margin-top: 20px;">
        <el-collapse-transition>
          <div v-show="show">
            <div class="transition-box">
              <label class="el-form-item__label" style="width: 100px;">商品简述:</label>
              <el-input style="width: 70%;" type="textarea" placeholder="请输入内容" v-model="ruleForm.shangpjs"></el-input>
            </div>
            <div class="transition-box" style="margin-top: 20px;">
              <label class="el-form-item__label" style="width: 100px;">推介短信:</label>
              <el-input style="width: 70%;" type="textarea" placeholder="请输入内容" v-model="ruleForm.tuijdx"></el-input>
            </div>
            <div class="transition-box" style="margin-top: 20px;">
              <label class="el-form-item__label" style="width: 100px;">商品清单:</label>
              <el-input style="width: 70%;" type="textarea" placeholder="请输入内容" v-model="ruleForm.shangpqd"></el-input>
            </div>
            <div class="transition-box" style="margin-top: 20px;">
              <el-form-item label="wappush内容:" label-width="120px">
                <el-input placeholder="请输入内容" v-model="ruleForm.wappushnr"></el-input>
              </el-form-item>
              <el-form-item label="wappush链接:" label-width="120px">
                <el-input placeholder="请输入内容" v-model="ruleForm.wappushlj"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-collapse-transition>
      </div>    
      <h2 style="padding-left: 20px;">商品描述详情</h2>  
      <el-row>
        <p style="text-align:center;font-weight: bold;">手机端编辑</p>
        <div style="padding: 0 20px 40px 20px;">
          <quill-editor ref="myTextEditor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>
        </div>
      </el-row>
      <div style="text-align: center;margin-top: 20px;">
        <el-form-item>
          <el-button @click="goBack">返回上一步</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
          <el-button @click="resetForm('ruleForm')">重 置</el-button> 
          <el-button @click="giveUp" v-if="gFlag">放弃修改</el-button>         
        </el-form-item>
      </div>      
    </el-form>   
    <el-dialog
      title="请选择区域"
      :visible.sync="regionVisible"
      width="40%"
      :before-close="handleClose">
      <locationselector @locationSelected="getLocationInfo"></locationselector>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" size="mini" @click="regionVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Jieti from '@/components/Jieti/index'
  import { checkPayWay, goodsRelease, getLogisticsTemplate } from '@/api/goodsRelease'
  import { giveUp } from '@/api/onsale'
  import { parseTime, getUnitsOptions } from '@/utils/index'
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import { mapGetters } from 'vuex'
  import { getGoodsDetail } from '@/api/noshelfgoods'
  import locationselector from '@/components/LocationSelector/index'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  export default {
    mounted() {
      // 计量单位
      this.jiliangdwOptions = getUnitsOptions()
      this.isFromModifyFlag = Number(this.$route.query.isFromModifyFlag)
      if (this.$route.query.gFlag) {
        this.gFlag = true
      }
      if (this.isFromModifyFlag === 2) {
        this.belongPublish = false
      }
      if (this.isFromModifyFlag === 1 && this.$route.query.goodsId || this.isFromModifyFlag === 2) {
        getGoodsDetail(this.$route.query.goodsId).then(res => {
          if (res.status === 200) {
            // 状态为驳回是 展示放弃修改
            this.goodsBean = Object.assign(res.data.goodsBean, res.data.editGoodsBean)
            console.log(this.goodsBean)
            this.ruleForm.cuxiao =  this.goodsBean.promotionInfo
            this.ruleForm.mingchen =  this.goodsBean.name
            this.ruleForm.pinpai = this.goodsBean.brand
            this.ruleForm.guige = this.goodsBean.orderGoodsSpec1
            this.ruleForm.maidian = this.goodsBean.features
            this.ruleForm.shichangjia = this.goodsBean.marketPrice
            this.ruleForm.zhigongjia = this.goodsBean.price
            this.goodsBean.logisticsTypes.toString().indexOf('2') > -1 ? this.ruleForm.wuliu.push('物流') : this.ruleForm.wuliu
            String(this.goodsBean.logisticsTypes).indexOf('1') > -1 ? this.ruleForm.wuliu.push('自提') : this.ruleForm.wuliu
            // 如果选取了物流
            if (this.goodsBean.logisticsTypes.toString().indexOf('2') > -1 ? true : false && this.goodsBean.logisticsTemplateCode) {
              this.ruleForm.wuliuObjt = this.goodsBean.logisticsTemplateCode
              getLogisticsTemplate().then(res => {
                var template = res.data
                for (var i in template) {
                  if (template[i].templateCode === this.goodsBean.logisticsTemplateCode) {
                    this.ruleForm.wuliuObjN = template[i].templateName
                    return false
                  }
                }
              })
            }
            this.ruleForm.kucun = Number(this.goodsBean.stock)
            this.ruleForm.kucuntx = this.goodsBean.stockAlarmFlag
            this.ruleForm.kucuntxNum = this.goodsBean.stockAlarmFlag ? this.goodsBean.stockAlarm : ''
            if (this.goodsBean.alipay === '0') {
              this.ruleForm.zhifufs.push('支付宝支付')
            }
            if (this.goodsBean.cmpay === '0') {
              this.ruleForm.zhifufs.push('和包支付')
            }
            if (this.goodsBean.umpay === '0') {
              this.ruleForm.zhifufs.push('联动支付')
            }
            // 阶梯价格
            if (this.goodsBean.gradientPriceFlag === '1') {
              this.ruleForm.jietiFlag = true
            } else {
              this.ruleForm.jietiFlag = false
            }
            if (this.goodsBean.gradientNumber !== null && this.goodsBean.gradientPrice !== null) {
              this.jietiItem1.num = this.goodsBean.gradientNumber[0]
              this.jietiItem1.dollar = this.goodsBean.gradientPrice[0]
              var tempNumArr = this.goodsBean.gradientNumber.slice(1, this.goodsBean.gradientNumber.length)
              var tempDollarArr = this.goodsBean.gradientPrice.slice(1, this.goodsBean.gradientPrice.length)
              if (tempNumArr.length !== 0 || tempDollarArr.length !== 0) {
                for (var i = 0; i < tempNumArr.length; i++) {
                  this.jietiItems.push({ num: tempNumArr[i], dollar: tempDollarArr[i] })
                }
              }
            }
            // 图片上传 先不管
            this.ruleForm.spzl = Number(this.goodsBean.weight)
            this.danwei = this.goodsBean.weightUnit
            this.ruleForm.spgg = this.goodsBean.orderGoodsSpec2
            this.ruleForm.sccj = this.goodsBean.supplierName
            this.ruleForm.spcdcode = this.goodsBean.placeofOriginCode
            this.ruleForm.spcd = this.goodsBean.placeofOriginName
            this.ruleForm.scrq = this.goodsBean.produceDate
            this.ruleForm.baozhiqi = this.goodsBean.shelfLife
            this.baozhiqidw = this.goodsBean.shelfLifeUnit
            this.jiliangdw = this.goodsBean.quantityUnits
            // 定时上架
            if (this.goodsBean.salsCatalogCode === '0') {
              this.ruleForm.dingssj = true
            } else {
              this.ruleForm.dingssj = false
            }
            this.ruleForm.zdsjsj = this.goodsBean.onSaleTime
            this.ruleForm.zdxjsj = this.goodsBean.offSaleTime
            this.goodsBean.isEmail === '0' ? this.ruleForm.sjtx.push('邮件') : this.ruleForm.sjtx
            this.goodsBean.isSms === '0' ? this.ruleForm.sjtx.push('短信') : this.ruleForm.sjtx
            this.goodsBean.website === '0' ? this.ruleForm.fbqd.push('12582网站') : this.ruleForm.fbqd
            this.goodsBean.hotline === '0' ? this.ruleForm.fbqd.push('12582热线') : this.ruleForm.fbqd
            this.goodsBean.wapsite === '0' ? this.ruleForm.fbqd.push('WAP') : this.ruleForm.fbqd
            this.goodsBean.phoneline === '0' ? this.ruleForm.fbqd.push('手机客户端') : this.ruleForm.fbqd
            this.goodsBean.agriculturalmall === '0' ? this.ruleForm.fbqd.push('农资商城') : this.ruleForm.fbqd
            this.goodsBean.isPromote === '0' ? this.ruleForm.thh.push('推荐') : this.ruleForm.thh
            this.goodsBean.isReturn === '0' ? this.ruleForm.thh.push('支持退货') : this.ruleForm.thh
            this.goodsBean.isExchange === '0' ? this.ruleForm.thh.push('支持换货') : this.ruleForm.thh
            this.ruleForm.spdz = this.goodsBean.videoUrl
            if (this.goodsBean.takeEffectType === '1') {
              this.immediate = true
              this.immediateTime = ''
            } else if (this.goodsBean.takeEffectType === '2') {
              this.immediate = false
              this.immediateTime = this.goodsBean.takeEffectTime
            }
            console.log(this.ruleForm)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      } else {
        console.log('error')
      }
      this.goodsType.typeCode = this.$route.query.typeCode
      this.goodsType.typeCodeName = this.selectedlabel.label + '/' + this.selectedlabel.subLabel
      if (this.goodsType.typeCodeName === '/') {
        this.goodsType.typeCodeName = window.localStorage.getItem('typeName')
      } else {
        window.localStorage.setItem('typeName', this.goodsType.typeCodeName)
      }
    },
    data() {
      return {
        content: '',
        editorOption: {
          // something config
        },
        gFlag: false,     // 放弃按钮
        immediate: true,    // 在售商品修改 立即生效字段
        immediateTime: '',
        belongPublish: true,
        regionVisible: false,  // 地址区域是否显示
        zfbDisable: false,
        sjzfDisable: false,
        wyzjDisable: false,
        templateLoading: false,
        goodsBean: {},
        popVisible: false,
        show: false,
        goodsType: {
          typeCode: '',
          typeCodeName: '',
          pattern: 0
        },
        jietiItems: [],
        jietiItem1: {
          num: '',
          dollar: ''
        },
        danwei: '克',
        danweiOptions: [{// 单位选项
          value: '1',
          label: '克'
        },
        {
          value: '2',
          label: '千克'
        }],
        baozhiqidw: '1',
        baozhiqiOptions: [{
          value: '1',
          label: '天'
        },
        {
          value: '2',
          label: '月'
        },
        {
          value: '3',
          label: '年'
        }],
        jiliangdw: '1',
        jiliangdwOptions: [],
        imageUrl: '',
        ruleForm: {
          cuxiao: '',
          pinpai: '',
          mingchen: '',
          guige: '',
          maidian: '',
          shichangjia: '',
          zhigongjia: '',
          wuliu: [],
          wuliuObj: {},
          wuliuObjt: '',  // 物流模板编码
          wuliuObjN: '',  // 物流模板名称
          kucun: '',
          kucuntx: true,
          kucuntxNum: 10,
          zhifufs: [],
          jietiFlag: false,
          spzl: '',
          baozhiqi: '',
          spgg: '', // 商品规格
          sccj: '', // 生产厂家
          spcd: '', // 商品产地
          spcdcode: '', // 商品产地代码
          scrq: '', // 生产日期
          spfl: '从前一页取',
          jldw: '',
          dingssj: true,
          zdsjsj: parseTime(new Date()),
          iszisj: false,
          zdxjsj: parseTime(new Date(2099, 11, 31, 23, 59, 59)),
          sjtx: [],
          fbqd: [],
          thh: [],
          spdz: '',
          shangpjs: '',
          tuijdx: '',
          shangpqd: '',
          wappushnr: '',
          wappushlj: ''
        },
        rules: {
          mingchen: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          shichangjia: [
            { required: true, message: '请输入市场价', trigger: 'blur' },
            { type: 'number', message: '市场价必须为数字值' }
          ],
          zhigongjia: [
            { required: true, message: '请输入直供价价', trigger: 'blur' },
            { type: 'number', message: '直供价必须为数字值' }
          ],
          wuliu: [
            { required: true, message: '请选择物流' }
          ],
          kucun: [
            { required: true, message: '请输入库存', trigger: 'blur' },
            { type: 'number', message: '库存必须为数字值' }
          ],
          kucuntxNum: [
            { required: true, message: '请输入库存提醒数量', trigger: 'blur' },
            { type: 'number', message: '库存必须为数字值' }
          ],
          zhifufs: [
            { type: 'array', required: true, message: '请至少选择一种支付方式', trigger: 'change' }
          ],
          spzl: [
            { required: true, message: '请输入商品重量', trigger: 'blur' },
            { type: 'number', message: '商品重量必须为数字值' }
          ],
          sccj: [
            { required: true, message: '请输入生产厂家', trigger: 'blur' }
          ],
          spcd: [
            { message: '请输入商品产地', trigger: 'blur' }
          ],
          baozhiqi: [
            { required: true, message: '请输入保质期', trigger: 'blur' }
          ],
          spfl: [
            { required: true }
          ],
          zdsjsj: [
            { required: true, message: '请输入自动上架时间', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', this.content)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        this.content = html
      },
      // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (this.ruleForm.jietiFlag) {
            if (this.jietiItem1.num === '' || this.jietiItem1.dollar === '') {
              this.$message.error('阶梯价格第一行不能有空！')
              return false
            }
          }
          if (this.ruleForm.spcd === '') {
            this.$message.error('商品产地不能为空！')
            return false
          }
          if (this.ruleForm.wuliu.indexOf('物流') > -1 && this.ruleForm.wuliuObjN === '') {
            this.$message.error('物流模板不能为空！')
            return false
          }
          if (this.ruleForm.kucun < this.ruleForm.kucuntxNum) {
            this.$message.error('库存不能小于库存提醒！')
            return false
          }
          if (valid) {
            const parmas = {
              name: this.ruleForm.mingchen,
              promotionInfo: this.ruleForm.cuxiao,
              brand: this.ruleForm.pinpai,
              orderGoodsSpec1: this.ruleForm.guige,
              features: this.ruleForm.maidian,
              marketPrice: this.ruleForm.shichangjia,
              price: this.ruleForm.zhigongjia,
              logisticsTypes: this.logisticsTypes,
              logisticsTemplateCode: this.logisticsTypes.indexOf(2) > -1 ? this.ruleForm.wuliuObjt : '',
              // logisticsTemplateName: this.logisticsTypes.indexOf(2) > -1 ? this.ruleForm.wuliuObjN : '',
              stock: this.ruleForm.kucun,
              stockAlarmFlag: this.ruleForm.kucuntx ? 1 : 0,
              stockAlarm: this.ruleForm.kucuntx ? this.ruleForm.kucuntxNum : '',
              alipay: this.ruleForm.zhifufs.indexOf('支付宝支付') > -1 ? 0 : 1,
              codpay: 0,
              cmpay: this.ruleForm.zhifufs.indexOf('和包支付') > -1 ? 0 : 1,
              umpay: this.ruleForm.zhifufs.indexOf('联动支付') > -1 ? 0 : 1,
              imageList: ['http://image1.qianqianhua.com/uploads/20171227/14/1514356264-OpIVSzBPAM.jpg'],
              gradientPriceFlag: this.ruleForm.jietiFlag ? 1 : 0,  // true or false  this.ruleForm.Jieti
              gradientNumber: this.convertJTnums,
              gradientPrice: this.convertJTamount,
              weight: this.ruleForm.spzl,
              weightUnit: this.danwei,
              orderGoodsSpec2: this.ruleForm.spgg,
              supplierName: this.ruleForm.sccj,
              placeofOriginCode: this.ruleForm.spcdcode,
              placeofOriginName: this.ruleForm.spcd,
              produceDate: this.ruleForm.scrq,
              shelfLife: this.ruleForm.baozhiqi,
              shelfLifeUnit: this.baozhiqidw,
              typeCode: this.goodsType.typeCode,
              typeCodeName: this.goodsType.typeCodeName,
              pattern: this.goodsType.pattern,
              quantityUnits: this.jiliangdw,
              quantityUnitsValue: 1,
              salsCatalogCode: this.ruleForm.dingssj ? 0 : 1,
              onSaleTime: this.ruleForm.zdsjsj,
              offSaleTime: this.ruleForm.zdxjsj,
              isEmail: this.ruleForm.sjtx.indexOf('邮件') > -1 ? 0 : 1,
              isSms: this.ruleForm.sjtx.indexOf('短信') > -1 ? 0 : 1,
              website: this.ruleForm.fbqd.indexOf('12582网站') > -1 ? 0 : 1,
              hotline: this.ruleForm.fbqd.indexOf('12582热线') > -1 ? 0 : 1,
              wapsite: this.ruleForm.fbqd.indexOf('WAP') > -1 ? 0 : 1,
              phoneline: this.ruleForm.fbqd.indexOf('手机客户端') > -1 ? 0 : 1,
              agriculturalmall: this.ruleForm.fbqd.indexOf('农资商城') > -1 ? 0 : 1,
              isPromote: this.ruleForm.thh.indexOf('推荐') > -1 ? 0 : 1,
              isReturn: this.ruleForm.thh.indexOf('支持退货') > -1 ? 0 : 1,
              isExchange: this.ruleForm.thh.indexOf('支持换货') > -1 ? 0 : 1,
              videoUrl: this.ruleForm.spdz,
              description: this.ruleForm.shangpjs,
              smsInfo: this.ruleForm.tuijdx,
              wapInfo: this.ruleForm.wappushnr,
              wapUrl: this.ruleForm.wappushlj
            }
            if (this.isFromModifyFlag === 1 || this.isFromModifyFlag === 2) {
              parmas.goodsId = this.$route.query.goodsId
              parmas.goodsCode = this.$route.query.goodsCode
            }
            if (this.isFromModifyFlag === 2) {
              parmas.takeEffectType = this.immediate ? '1' : '2'
              if (!this.immediate && this.immediateTime === '') {
                this.$message.error('请输入修改生效时间！')
                return
              } else {
                parmas.takeEffectTime = parseTime(this.immediateTime)
              }
            }
            console.log(parmas)
            goodsRelease(parmas).then(res => {
              if (res.status === 200) {
                // 跳转
                this.$router.push({ path: '/goodsmanage/publishstep3' })
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            this.$message.error('有未完成的必选项！')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleClose(done) {
        done()
      },
      getLocationInfo(data) {
        this.ruleForm.spcd = data.label
        this.ruleForm.spcdcode = data.locationCode
      },
      addJieti() {
        this.jietiItems.push({})
      },
      delejieti(index) {
        this.jietiItems.splice(index, 1)
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
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
      deleArrElement(originArr, ele) {
        if (originArr.length > 0) {
          var index = originArr.indexOf(ele)
          return originArr.splice(index, 1)
        }
      },
      goBack() {
        console.log(this.isFromModifyFlag)
        this.$router.go(-1)
      },
      _checkPayWay(val, index) {
        const params = { payAccountType: val }
        checkPayWay(params).then((res) => {
          if (res.status === 200) {
            console.log(res)
            if (res.data === '1') {
              return false
            } else {
              if (index === 1) {
                this.zfbDisable = true
                this.deleArrElement(this.ruleForm.zhifufs, '支付宝支付')
              } else if (index === 2) {
                this.sjzfDisable = true
                this.deleArrElement(this.ruleForm.zhifufs, '联动支付')
              } else if (index === 3) {
                this.wyzjDisable = true
                this.deleArrElement(this.ruleForm.zhifufs, '和包支付')
              }
              this.$message.error('商家不支持该付款方式！')
            }
          } else {
            this.$message.error('商家不支持该付款方式！')
          }
        })
      },
      iszdsj() {
        if (this.ruleForm.dingssj) {
          this.ruleForm.iszisj = false
          this.ruleForm.zdsjsj = new Date()
        } else {
          this.ruleForm.iszisj = true
          this.ruleForm.zdsjsj = new Date()
        }
      },
      checkTimeCorrect() {
        if (this.ruleForm.zdsjsj && this.ruleForm.zdxjsj) {
          if (!this.compareTime) {
            this.$message.error('下架时间不能小于上架时间！')
            var self = this
            setTimeout(function () {
              self.ruleForm.zdxjsj = parseTime(new Date(2099, 11, 31, 23, 59, 59))
              self.ruleForm.zdsjsj = parseTime(new Date())
            }, 2000)
          }
        } else if (this.ruleForm.zdsjsj && this.ruleForm.zdsjsj < new Date()) {
          this.$message.error('输入上架时间不能小于当前时间！')
        }
      },
      openLogisticsTemplate() { // 获取物流模板
        getLogisticsTemplate().then((res) => {
          this.templateLoading = true
          if (res.status === 200) {
            this.templateLoading = false
            this.ruleForm.wuliuObj = res.data
          } else {
            this.templateLoading = false
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.templateLoading = false
          this.$message.error(err)
        })
      },
      confirmLogisticsTemplate() {
        this.popVisible = false
        if (this.ruleForm.wuliuObj.length) {
          for (var i in this.ruleForm.wuliuObj) {
            if (this.ruleForm.wuliuObj[i].templateCode === this.ruleForm.wuliuObjt) {
              this.ruleForm.wuliuObjN = this.ruleForm.wuliuObj[i].templateName
              console.log(this.ruleForm.wuliuObj[i], this.ruleForm.wuliuObjt, this.ruleForm.wuliuObjN)
            }
          }
        }
      },
      giveUp() {
        giveUp(this.$route.query.goodsId).then(res => {
          if (res.status === 200) {
            this.$message.success(res.msg)
            this.$router.push({ path: '/goodsmanage/onsalegoods' })
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }
    },
    computed: {
      compareTime() {
        return Date.parse(this.ruleForm.zdsjsj) < Date.parse(this.ruleForm.zdxjsj)
      },
      logisticsTypes() {
        if (this.ruleForm.wuliu.length === 1) {
          return this.ruleForm.wuliu.indexOf('物流') > -1 ? '2' : '' + this.ruleForm.wuliu.indexOf('自提') > -1 ? '1' : ''
        } else if (this.ruleForm.wuliu.length === 2) {
          return '2,1'
        }
      },
      convertJTnums() {
        var arr = []
        if (this.ruleForm.jietiFlag) {
          arr.push(this.jietiItem1.num)
          for (var i in this.jietiItems) {
            arr.push(this.jietiItems[i].num)
          }
          return arr
        }
      },
      convertJTamount() {
        var arr = []
        if (this.ruleForm.jietiFlag) {
          arr.push(this.jietiItem1.dollar)
          for (var i in this.jietiItems) {
            arr.push(this.jietiItems[i].dollar)
          }
          return arr
        }
      },
      ...mapGetters([
        'selectedoption',
        'selectedlabel'
      ])
    },
    components: {
      quillEditor,
      Jieti,
      CollapseTransition,
      locationselector
    }
  }
</script>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-date-editor--date{
    width: 180px !important;
  }
  /* .el-form-item__label{
    width: 120px !important;
  } */
  .spcd .el-form-item__label:before, .goods-name .el-form-item__label:before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  } 
  .el-dialog__footer {
    text-align: center;
  }
  .el-popover{
    position: relative;
    max-height: 370px;
    overflow-y: hidden;
    padding-bottom: 100px;
  }
  .el-radio-group{
    max-height: 300px;
    width: 100%;
    overflow-y: scroll;
  }
  .quill-editor {
    height: 200px;
  }
  .ql-container {
    height: 200px;
  }
</style>