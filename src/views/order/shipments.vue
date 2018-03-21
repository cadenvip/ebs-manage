<template>
  <div style="padding: 20px;">
    <h1>请填写发货信息</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
      <el-form-item label="订单编号：" style="margin-bottom: 0;">
        <span>{{ruleForm.orderId}}</span>
      </el-form-item>
      <el-form-item label="快递方式：" prop="kdfs">
        <el-select size="mini" v-model="ruleForm.kdfs" placeholder="请选择快递方式">
          <el-option v-for="item in KDoptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="快递公司名称：" prop="kdgsmc">
        <el-select size="mini" v-model="ruleForm.kdgsmc" placeholder="请选择快递方式">
          <el-option v-for="item in KDoptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="快递电话：" prop="kddh">
        <el-input size="medium" v-model.trim="ruleForm.kddh" :maxlength="11" style="width: 195px;"></el-input>
      </el-form-item>
      <el-form-item label="运单号：">
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
  export default {
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
        ruleForm: {
          orderId: '1000050018',
          kdfs: '',
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
        rules: {
          kdfs: [
            { required: true, message: '请选择快递方式', trigger: 'blur' }
          ],
          kdgsmc: [
            { required: true, message: '请选择快递公司名称', trigger: 'blur' }
          ],
          kddh: [
            { required: true, validator: validateMobile, trigger: 'blur' }
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
