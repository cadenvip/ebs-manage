<template>
  <div style="padding: 20px;">
    <h1>请填写发货信息</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
      <el-form-item label="订单编号：" style="margin-bottom: 0;">
        <span>{{ruleForm.oid}}</span>
      </el-form-item>
      <el-form-item label="快递方式：" prop="kdfs">
        <el-select size="mini" v-model="ruleForm.kdfs" placeholder="请选择快递方式">
          <el-option v-for="item in KDoptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="快递公司名称：" prop="kdgsmcbm">
        <el-select @change="changeKDGS" @focus="getCompanies" size="mini" v-model="ruleForm.kdgsmcbm" placeholder="请选择快递公司">
          <el-option v-for="item in KDGSoptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.kdfs==='0'" label="快递电话：" prop="kddh">
        <el-input size="medium" v-model.trim="ruleForm.kddh" :maxlength="11" style="width: 195px;"></el-input>
      </el-form-item>
      <el-form-item label="运单号：" prop="ydh">
        <el-input size="medium" v-model.trim="ruleForm.ydh" style="width: 195px;"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input size="medium" v-model.trim="ruleForm.bz" style="width: 195px;"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 15px;">
        <el-button size="mini" type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
        <el-button size="mini" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>    
  </div>  
</template>

<script>
  import { validateMobilePhone } from '@/utils/validate'
  import { getCompanies, sendGoods } from '@/api/order/index'
  export default {
    created() {
      this.ruleForm.oid = this.$route.query.oid
    },
    data() {
      var validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else {
          if (!validateMobilePhone(value.trim())) {
            callback(new Error('请输入有效的手机号码'))
          }
          callback()
        }
      }
      return {
        html: '',
        ruleForm: {
          oid: '',
          kdfs: '',
          kdgsmcbm: '',
          kdgsmc: '',
          kddh: '',
          ydh: '',
          bz: ''
        },
        KDoptions: [{
          label: '快递',
          value: '0'
        }, {
          label: '大件物流快递',
          value: '1'
        }],
        KDGSoptions: [],
        rules: {
          kdfs: [
            { required: true, message: '请选择快递方式', trigger: 'blur' }
          ],
          kdgsmcbm: [
            { required: true, message: '请选择快递公司名称', trigger: 'blur' }
          ],
          kddh: [
            { required: true, validator: validateMobile, trigger: 'blur' }
          ],
          ydh: [
            { required: true, message: '请输入运单号', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      changeKDGS(val) {
        for (var i in this.KDGSoptions) {
          if (this.KDGSoptions[i].value === val) {
            this.ruleForm.kdgsmc = this.KDGSoptions[i].label
            return
          }
        }
      },
      submitForm(formName) {
        // var url = process.env.BASE_API + 'order/toSendGoods?JSESSIONID=' + getSessionid() + '&orderId=' + this.$route.query.oid
        // window.open(url)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = {
              oid: this.ruleForm.oid,
              logisticsName: this.ruleForm.kdgsmc,   // 快递公司名称
              logisticNo: this.ruleForm.ydh,         // 运单号
              transportType: 'EXPRESS',             // 默认EXPRESS 有问题
              sendCompanyCode: this.ruleForm.kdgsmcbm, // 快递公司名称编码
              sendExpTel: this.ruleForm.kdfs === '0' ? this.ruleForm.kddh : '',       // 快递电话
              sendExpType: this.ruleForm.kdfs,      // 快递方式
              sendRemark: this.ruleForm.bz
            }
            console.log(params)
            sendGoods(this.ruleForm.oid, params).then(res => {
              if (res.status === 200) {
                this.$message.success('订单发货成功！')
                this.$router.push({ path: '/order/index' })
              } else {
                this.$message.error(res.msg)
              }
            }).catch(err => {
              this.$message.error(err)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.ruleForm.ydh = ''
        this.ruleForm.bz = ''
      },
      getCompanies() {
        if (this.ruleForm.kdfs === '') {
          this.$message.error('请先选择快递方式！')
          return
        } else {
          const param = {
            type: this.ruleForm.kdfs
          }
          getCompanies(param).then(res => {
            if (res.status === 200) {
              this.options = res.data
              if (this.options.length > 0) {
                this.KDGSoptions = []
                for (var i in this.options) {
                  this.KDGSoptions.push({
                    label: this.options[i].companyName,
                    value: this.options[i].companyCode
                  })
                }
              }
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
h1{
  line-height: 40px;
  height: 40px;
  font-weight: bold;
  font-size: 15px;
  color: #5f5f5f;
  margin: 0;
  border-bottom: 1px solid #CFD2D7;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.el-form-item {
    margin-bottom: 20px;
}
</style>
