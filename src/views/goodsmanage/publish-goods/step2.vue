<template>
  <div>
    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h2 style="padding-left: 20px;">基本商品信息</h2>
      <el-form-item label="商品名称:" prop="cuxiao">
        <el-input style="width: 100px;" placeholder="促销信息" v-model="ruleForm.cuxiao"></el-input>
      </el-form-item>
      <el-form-item label="" prop="pinpai">
        <el-input style="width: 100px;" placeholder="品牌" v-model="ruleForm.pinpai"></el-input>
      </el-form-item>
      <el-form-item label="" prop="mingchen">
        <el-input style="width: 100px;" placeholder="名称" v-model="ruleForm.mingchen"></el-input>
      </el-form-item>
      <el-form-item label="" prop="guige">
        <el-input style="width: 100px;" placeholder="规格" v-model="ruleForm.guige"></el-input>
      </el-form-item>
      <el-form-item label="" prop="maidian">
        <el-input style="width: 100px;" placeholder="特色卖点" v-model="ruleForm.maidian"></el-input>
      </el-form-item>
      <div>
        <p style="font-size: 14px;color: #606266;margin-left: 30px;margin-top: 0;">商品名称展示效果: <span style="color: #67c23a">{{ruleForm.cuxiao+"&nbsp&nbsp"+ruleForm.pinpai+"&nbsp&nbsp"+ruleForm.mingchen+"&nbsp&nbsp"}}<i v-show="ruleForm.guige">包装: </i>{{ruleForm.guige+"&nbsp&nbsp"+ruleForm.maidian}}</span></p>
      </div>
      <el-form-item style="display: block;" label="市场价:" prop="shichangjia">
        <el-input style="width: 260px;" placeholder="输入同类市场价" v-model="ruleForm.shichangjia"></el-input>
      </el-form-item>
      <el-form-item style="display: block;" label="直供价:" prop="zhigongjia">
        <el-input style="width: 260px;" placeholder="输入在商城销售价格，应低于市场价" v-model="ruleForm.zhigongjia"></el-input>
      </el-form-item>
      <el-form-item style="display: block;" label="物流:" prop="wuliu">
        <el-popover
          ref="popover"
          placement="right"
          width="400"
          trigger="click"
          v-model="popVisible"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"> 
          <el-radio-group v-model="ruleForm.wuliuObjt">
            <div style="margin-top: 14px;" v-for="item in ruleForm.wuliuObj">
              <el-radio :label="item.templateCode">{{item.templateName}}</el-radio>
            </div>
          </el-radio-group>
          <div style="text-align: center; margin: 14px;">
            <el-button type="danger" size="mini" @click="popVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="popVisible = false">确定</el-button>
          </div>
        </el-popover>
        <el-checkbox-group v-model="ruleForm.wuliu">
          <el-checkbox label="物流"></el-checkbox>
          <el-checkbox label="自提"></el-checkbox>
          <el-button @click="openLogisticsTemplate" v-show="ruleForm.wuliu.indexOf('物流')>=0" type="primary" size="mini" style="margin-left: 40px;" v-popover:popover>快递模板</el-button>          
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="display: block;" label="库存:" prop="kucun">
        <el-input style="width: 100px;" placeholder="输入库存" v-model="ruleForm.kucun"></el-input>
        <el-checkbox style="margin-left: 50px;" v-model="ruleForm.kucuntx">库存提醒</el-checkbox>
        <span style="margin: 0 10px;color: #606266;">低于</span><el-input :disabled="!ruleForm.kucuntx" v-model="ruleForm.kucuntxNum" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item style="display: block;" label="支付方式:" prop="zhifufs">
        <el-checkbox-group v-model="ruleForm.zhifufs">
          <el-checkbox @change="checkPayWay(23)" label="支付宝支付" name="zhifufs"></el-checkbox>
          <el-checkbox @change="checkPayWay(22)" label="手机支付" name="zhifufs"></el-checkbox>
          <el-checkbox :checked=true disabled label="货到付款" name="zhifufs"></el-checkbox>
          <el-checkbox @change="checkPayWay(24)" label="网银支付" name="zhifufs"></el-checkbox>
          <el-alert title="温馨提示：在线支付将由支付渠道收取交易手续费，由商户承担，支付宝0.5%，手机支付0.3%。" type="error" :closable="false"></el-alert>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="display: block;margin-bottom: 0;" label="阶梯价格:" prop="jieti">
        <span style="color: #606266;" @click="handleJieti" v-if="!ruleForm.jieti">启用</span><span style="color: #606266;" @click="handleJieti" v-if="ruleForm.jieti">禁用</span>
        <el-switch style="margin-left: 5px;" v-model="ruleForm.jieti"></el-switch>
      </el-form-item>
      <div v-if="ruleForm.jieti" style="display: inline-block;padding: 20px;background-color: lightblue;margin-left:100px;border-radius: 5px;">
        <span> 一次性购买 </span><el-input v-model="jietiItem1.num" size="mini" style="width: 80px;"></el-input>
        <span>件,商品价格优惠为</span>
        <el-input v-model="jietiItem1.dollar" size="mini" style="width: 80px;"></el-input> 元 
        <el-button size="mini" @click="addJieti">新增</el-button>
        <div v-for="(item,index) in jietiItems">
          <jieti :item="item"></jieti>
          <el-button size="mini" @click="delejieti(index)">删除</el-button>
        </div>
        {{jietiItem1.num}}  {{jietiItem1.dollar}}
        {{jietiItems}}

      </div>
      <el-form-item style="padding-left: 100px;">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
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
            <el-input style="width: 100px;" v-model="ruleForm.spzl"></el-input>
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
            <el-input v-model="ruleForm.spgg"></el-input>
          </el-form-item>  
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="生产厂家:" prop="sccj">
            <el-input v-model="ruleForm.sccj"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品产地:" prop="spcd">
            <el-input v-model="ruleForm.spcd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生产日期:">
            <el-date-picker
              v-model="ruleForm.scrq"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="保质期:" prop="baozhiqi">
            <el-input style="width: 100px;" v-model="ruleForm.baozhiqi"></el-input>
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
            <el-input disabled="" v-model="ruleForm.spfl"></el-input>
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
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下架时间：">
          <el-date-picker
            :default-value = "new Date()"
            @blur="checkTimeCorrect"
            v-model="ruleForm.zdxjsj"
            type="datetime"
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
          <el-checkbox checked label="推荐" name="thh"></el-checkbox>
          <el-checkbox checked label="支持退货" name="thh"></el-checkbox>
          <el-checkbox checked label="支持换货" name="thh"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="display: block;" label="视频地址:">
          <el-input v-model="ruleForm.spdz"></el-input>
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
              <el-form-item label="wappush内容:">
                <el-input placeholder="请输入内容" v-model="ruleForm.wappushnr"></el-input>
              </el-form-item>
              <el-form-item label="wappush链接:">
                <el-input placeholder="请输入内容" v-model="ruleForm.wappushlj"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-collapse-transition>
      </div>    
      <!-- <h2 style="padding-left: 20px;">商品描述详情</h2>   -->
      <div style="text-align: center;margin-top: 20px;">
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>          
        </el-form-item>
      </div>      
    </el-form>   
    {{selectedlabel}}
  </div>
</template>
<script>
  import 'element-ui/lib/theme-chalk/base.css'
  import Jieti from '@/components/Jieti/index'
  import { checkPayWay, goodsRelease, getLogisticsTemplate } from '@/api/goodsRelease'
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import { mapGetters } from 'vuex'
  export default {
    mounted() {
      this.goodsType.typeCode = this.$route.params.typeCode
      this.goodsType.typeCodeName = this.$route.params.typeCodeName
      this.goodsType.pattern = this.$route.params.pattern
      console.log(this.goodsType)
    },
    data() {
      return {
        popVisible: false,
        show: true,
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
          value: '克',
          label: '克'
        },
        {
          value: '千克',
          label: '千克'
        }],
        baozhiqidw: '天',
        baozhiqiOptions: [{
          value: '天',
          label: '天'
        },
        {
          value: '月',
          label: '月'
        },
        {
          value: '年',
          label: '年'
        }],
        jiliangdw: '吨',
        jiliangdwOptions: [{
          value: '吨',
          label: '吨'
        },
        {
          value: '千克',
          label: '千克'
        },
        {
          value: '克',
          label: '克'
        }],
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
          wuliuObjt: '',
          kucun: '',
          kucuntx: true,
          kucuntxNum: '',
          zhifufs: [],
          jieti: false,
          spzl: '',
          baozhiqi: '',
          spgg: '', // 商品规格
          sccj: '', // 生产厂家
          spcd: '', // 商品产地
          scrq: '', // 生产日期
          spfl: '从前一页取',
          jldw: '',
          dingssj: true,
          zdsjsj: new Date(),
          iszisj: false,
          zdxjsj: new Date(2099, 11, 31, 23, 59, 59),
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
          cuxiao: [
            { required: true, message: '请输入促销信息', trigger: 'blur' }
          ],
          pinpai: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          mingchen: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          guige: [
            { required: true, message: '请输入商品规格', trigger: 'blur' }
          ],
          maidian: [
            { required: true, message: '请输入商品卖点', trigger: 'blur' }
          ],
          shichangjia: [
            { required: true, message: '请输入市场价', trigger: 'blur' }
          ],
          zhigongjia: [
            { required: true, message: '请输入直供价价', trigger: 'blur' }
          ],
          wuliu: [
            { required: true, message: '请选择物流', trigger: 'change' }
          ],
          kucun: [
            { required: true, message: '请输入库存', trigger: 'blur' }
          ],
          kucuntxNum: [
            { required: true, message: '请输入库存提醒数量', trigger: 'blur' }
          ],
          zhifufs: [
            { type: 'array', required: true, message: '请至少选择一种支付方式', trigger: 'change' }
          ],
          spzl: [
            { required: true, message: '请输入商品重量', trigger: 'blur' }
          ],
          sccj: [
            { required: true, message: '请输入生产厂家', trigger: 'blur' }
          ],
          spcd: [
            { required: true, message: '请输入商品产地', trigger: 'blur' }
          ],
          baozhiqi: [
            { required: true, message: '请输入商品产地', trigger: 'blur' }
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const parmas = {
              name: this.ruleForm.mingchen,
              promotionInfo: this.ruleForm.cuxiao,
              brand: this.ruleForm.pinpai,
              orderGoodsSpec1: this.ruleForm.guige,
              features: this.ruleForm.maidian,
              marketPrice: this.ruleForm.shichangjia,
              price: this.ruleForm.zhigongjia,
              logisticsTypes: this.ruleForm.wuliu,
              logisticsTemplateCode: this.ruleForm.wuliuObjt,
              stock: this.ruleForm.kucun,
              stockAlarmFlag: this.ruleForm.kucuntx,
              stockAlarm: this.ruleForm.kucuntxNum,
              alipay: this.ruleForm.zhifufs.indexOf('支付宝支付') > -1 ? 1 : 0,
              codpay: 1,
              cmpay: this.ruleForm.zhifufs.indexOf('手机支付') > -1 ? 1 : 0,
              unionpay: this.ruleForm.zhifufs.indexOf('网银支付') > -1 ? 1 : 0,
              imageList: ['http://image1.qianqianhua.com/uploads/20171227/14/1514356264-OpIVSzBPAM.jpg'],
              gradientPriceFlag: this.ruleForm.Jieti,  // true or false
              gradientNumber: [11, 22],
              gradientPrice: [1, 2],
              weight: this.ruleForm.spzl,
              weightUnit: this.danwei,
              orderGoodsSpec2: this.ruleForm.spgg,
              supplierName: this.ruleForm.sccj,
              placeofOriginCode: this.ruleForm.spcd,
              produceDate: this.ruleForm.scrq,
              shelfLife: this.ruleForm.baozhiqi,
              shelfLifeUnit: this.ruleForm.baozhiqidw,
              typeCodeName: this.selectedlabel,
              quantityUnits: this.ruleForm.jldw,
              quantityUnitsValue: this.jiliangdw,
              salsCatalogCode: this.ruleForm.dingssj,
              onSaleTime: this.ruleForm.zdsjsj,
              offSaleTime: this.ruleForm.zdxjsj,
              isEmail: this.ruleForm.sjtx.indexOf('邮件') > -1 ? 1 : 0,
              isSms: this.ruleForm.sjtx.indexOf('短信') > -1 ? 1 : 0,
              website: this.ruleForm.fbqd.indexOf('12582网站') > -1 ? 1 : 0,
              hotline: this.ruleForm.fbqd.indexOf('12582热线') > -1 ? 1 : 0,
              wapsite: this.ruleForm.fbqd.indexOf('WAP') > -1 ? 1 : 0,
              phoneline: this.ruleForm.fbqd.indexOf('手机客户端') > -1 ? 1 : 0,
              agriculturalmall: this.ruleForm.fbqd.indexOf('农资商城') > -1 ? 1 : 0,
              isPromote: this.ruleForm.thh.indexOf('推荐') > -1 ? 1 : 0,
              isReturn: this.ruleForm.thh.indexOf('支持退货') > -1 ? 1 : 0,
              isExchange: this.ruleForm.thh.indexOf('支持换货') > -1 ? 1 : 0,
              videoUrl: this.ruleForm.spdz,
              description: '',
              smsInfo: '',
              wapInfo: '',
              wapUrl: ''
            }
            goodsRelease(parmas)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleJieti() {
        this.ruleForm.jieti = !this.ruleForm.jieti
      },
      addJieti() {
        this.jietiItems.push({})
      },
      delejieti(index) {
        console.log(this.jietiItems, index)
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
      checkPayWay(val) {
        checkPayWay(val).then((res) => {
          if (res.status === 200) {
            console.log(res)
          }
        })
      },
      iszdsj() {
        if (this.ruleForm.dingssj) {
          this.ruleForm.iszisj = false
          this.ruleForm.zdsjsj = new Date()
        } else {
          this.ruleForm.iszisj = true
          this.ruleForm.zdsjsj = ''
        }
      },
      checkTimeCorrect() {
        if (this.ruleForm.zdsjsj && this.ruleForm.zdxjsj) {
          if (!this.compareTime) {
            this.$message.error('下架时间不能小于上架时间！')
            var self = this
            setTimeout(function () {
              self.ruleForm.zdxjsj = new Date(2099, 11, 31, 23, 59, 59)
            }, 2000)
          }
        } else if (this.ruleForm.zdsjsj && this.ruleForm.zdsjsj < new Date()) {
          this.$message.error('输入上架时间不能小于当前时间！')
        }
      },
      openLogisticsTemplate() { // 获取物流模板
        getLogisticsTemplate().then((res) => {
          console.log(res.data)
          if (res.status === 200) {
            this.ruleForm.wuliuObj = res.data
          } else {
            this.$message.error('网络错误！')
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }
    },
    computed: {
      compareTime() {
        return this.ruleForm.zdsjsj < this.ruleForm.zdxjsj
      },
      ...mapGetters([
        'selectedoption',
        'selectedlabel'
      ])
    },
    components: {
      Jieti,
      CollapseTransition
    }
  }
</script>
<style>
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
  .el-form-item__label{
    width: 120px !important;
  }
</style>