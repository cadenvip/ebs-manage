<template>
  <div style="padding: 20px;">
    <h1>请填写发货信息</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="订单编号：">
        <span>{{ruleForm.orderId}}</span>
      </el-form-item>
      <el-form-item label="订单编号：" prop="name">
        <p>{{ruleForm.name}}</p>
      </el-form-item>
      <el-form-item label="活动区域：" prop="region">
        <el-select size="mini" v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>    
  </div>  
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          orderId: '1000050018',
          name: '',
          region: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
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
    margin-bottom: 6px;
}
</style>
