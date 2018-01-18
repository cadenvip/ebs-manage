<template>
  <div>
    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h2 style="padding-left: 20px;">基本商品信息</h2>
      <el-form-item label="商品名称" prop="cuxiao">
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
        <p style="font-size: 14px;color: #606266;margin-left: 30px;margin-top: 0;">商品名称展示效果: <span style="color: #67c23a">{{ruleForm.cuxiao+"&nbsp&nbsp"+ruleForm.pinpai+"&nbsp&nbsp"+ruleForm.mingchen+"&nbsp&nbsp"+ruleForm.guige+"&nbsp&nbsp"+ruleForm.maidian}}</span></p>
      </div>
      <el-form-item style="display: block;" label="市场价" prop="shichangjia">
        <el-input style="width: 260px;" placeholder="输入同类市场价" v-model="ruleForm.shichangjia"></el-input>
      </el-form-item>
      <el-form-item style="display: block;" label="直供价" prop="zhigongjia">
        <el-input style="width: 260px;" placeholder="输入在商城销售价格，应低于市场价" v-model="ruleForm.zhigongjia"></el-input>
      </el-form-item>
      <el-form-item style="display: block;" label="物流" prop="wuliu">
        <el-radio-group v-model="ruleForm.wuliu">
          <el-radio :label="1">快递</el-radio>
          <el-radio :label="2">自提</el-radio>
          <el-button v-show="ruleForm.wuliu===1" type="primary" size="mini" style="margin-left: 40px;">快递模板</el-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="display: block;" label="库存" prop="kucun">
        <el-input style="width: 100px;" placeholder="输入库存" v-model="ruleForm.kucun"></el-input>
        <el-checkbox style="margin-left: 50px;" v-model="ruleForm.kucuntx">库存提醒</el-checkbox>
        <span style="margin: 0 10px;color: #606266;">低于</span><el-input :disabled="!ruleForm.kucuntx" v-model="ruleForm.kucuntxNum" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item style="display: block;" label="支付方式" prop="zhifufs">
        <el-checkbox-group v-model="ruleForm.zhifufs">
          <el-checkbox label="支付宝支付" name="zhifufs"></el-checkbox>
          <el-checkbox label="手机支付" name="zhifufs"></el-checkbox>
          <el-checkbox label="货到付款" name="zhifufs"></el-checkbox>
          <el-checkbox label="网银支付" name="zhifufs"></el-checkbox>
          <el-alert title="温馨提示：在线支付将由支付渠道收取交易手续费，由商户承担，支付宝0.5%，手机支付0.3%。" type="error" :closable="false"></el-alert>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="display: block;margin-bottom: 0;" label="阶梯价格" prop="jieti">
        <span style="color: #606266;" @click="handleJieti" v-if="!ruleForm.jieti">启用</span><span style="color: #606266;" @click="handleJieti" v-if="ruleForm.jieti">禁用</span>
        <el-switch style="margin-left: 5px;" v-model="ruleForm.jieti"></el-switch>
      </el-form-item>
      <div v-if="ruleForm.jieti" style="display: inline-block;padding: 20px;background-color: lightblue;margin-left:100px;border-radius: 5px;">
        <span> 一次性购买 </span><el-input v-model="jietiItem1.num" size="mini" style="width: 80px;"></el-input>
        <span>件,商品价格优惠为</span>
        <el-input v-model="jietiItem1.dollar" size="mini" style="width: 80px;"></el-input> 元 
        <el-button size="mini" @click="add">新增</el-button>
        <div v-for="(item,index) in jietiItems">
          <jieti :item="item"></jieti>
          <el-button size="mini" @click="delejieti(index)">删除</el-button>
        </div>
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
        <el-col :span="6">
          <el-form-item label="商品编码">
            0000
          </el-form-item>          
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品重量" prop="spzl">
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
        <el-col :span="10">
          <el-form-item label="商品规格">
            <el-input v-model="ruleForm.spgg"></el-input>
          </el-form-item>  
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="生产厂家" prop="sccj">
            <el-input v-model="ruleForm.sccj"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品产地" prop="spcd">
            <el-input v-model="ruleForm.spcd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="生产日期">
            <el-input v-model="ruleForm.scrq"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="保质期" prop="baozhiqi">
            <el-input style="width: 100px;" v-model="ruleForm.baozhiqi"></el-input>
            <el-select v-model="baozhiqi" style="width:80px;" placeholder="请选择">
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
          <el-form-item label="商品分类" prop="spfl">
            <el-input disabled="" v-model="ruleForm.spfl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="计量单位" prop="jldw">
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


      <el-form-item style="margin-top: 100px;text-align: center;">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Jieti from '@/components/Jieti/index'
  export default {
    data() {
      return {
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
        },
        {
          value: '吨',
          label: '吨'
        }],
        baozhiqi: '天',
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
          wuliu: '',
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
          jldw: ''
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
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
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
      add() {
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
      }
    },
    components: {
      Jieti
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
</style>