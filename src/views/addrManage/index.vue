<template>
  <div class="main">
    <el-tabs v-model="activeTab" type="card" @tab-click="handleTapClick">
      <!-- tab1 -->
      <el-tab-pane label="地址管理" name="first">
        <el-form :model="tab1Form" :rules="tab1rules" ref="tab1Form" label-width="100px">
          <el-form-item label="姓名:" prop="name">
            <el-col :span="12">
              <el-input placeholder="请输入姓名" v-model.trim="tab1Form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="所在区域:"  prop="locationCode">
            <RegionSelector v-model="tab1Form.locationCode" :grade="4" :showCountry="false" @locationChanged="getLocationCode" :locationId="tab1Form.locationCode"></RegionSelector>
          </el-form-item>
          <el-form-item label="街道地区:" prop="block">
            <el-col :span="12">
              <el-input placeholder="请输入街道地区" v-model.trim="tab1Form.block"></el-input>
            </el-col>
            <el-col :span="12">
              <span style="padding-left: 20px; color: #999;">不需要重复填写省/市/区</span>
            </el-col>
          </el-form-item>
          <el-form-item label="邮政编码:" prop="postcode">
            <el-col :span="12">
              <el-input :maxlength="6" placeholder="请输入邮政编码" v-model.trim="tab1Form.postcode"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号码:" prop="cellphone">
            <el-col :span="12">
              <el-input placeholder="请输入手机号码" v-model.trim="tab1Form.cellphone"></el-input>
            </el-col>
            <el-col :span="12">
              <span style="padding-left: 20px; color: #999;">电话号码、手机号码必填一项</span>
            </el-col>
          </el-form-item>
          <el-form-item label="电话号码:" prop="telephone">
            <el-col :span="12">
              <el-input placeholder="请输入电话号码" v-model.trim="tab1Form.telephone"></el-input>
            </el-col>
            <el-col :span="12">
              <span style="padding-left: 20px; color: #999;">区号-电话号码-分机</span>
            </el-col>
          </el-form-item>
          <el-form-item label="设为默认" prop="isDefault">
            <el-checkbox v-model="tab1Form.isDefault"></el-checkbox>
          </el-form-item>
          <el-col style="border-bottom: 1px dashed #ccc;"></el-col>
          <el-form-item>
            <el-col style="margin-top: 25px;" :span="12">
              <el-button type="primary" @click="submitForm('tab1Form')">保存</el-button>
              <el-button @click="resetForm('tab1Form')">重置</el-button>
            </el-col>
          </el-form-item>
        </el-form>
        <div>
          <el-col :span="3" style="text-align: center;">
            <span style="font-size: 14px; color: #656565;">已保存有效地址</span>
          </el-col>
          <el-col :span="21" style="border-bottom: 1px dashed #ccc;height: 12px;"></el-col>
        </div>    
      </el-tab-pane>

      <!-- tab2 -->
      <el-tab-pane label="运费管理" name="second">

      </el-tab-pane>

      <!-- tab3 -->
      <el-tab-pane label="自提管理" name="third">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import RegionSelector from '@/components/RegionSelector/index'
  import { validateMobilePhone, validatePostcode } from '@/utils/validate'
  export default {
    data() {
      var validatePostCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮政编码'))
        } else {
          if (!validatePostcode(value.trim())) {
            callback(new Error('请输入有效的邮政编码'))
          }
          callback()
        }
      }
      return {
        activeTab: 'first',
        tab1Form: {
          name: '',
          locationCode: '',
          block: '',
          postcode: '',
          cellphone: '',
          telephone: '',
          isDefault: false
        },
        tab1rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          locationCode: [{ required: true, message: '请选择地址', trigger: 'change' }],
          block: [{ required: true, message: '请输入街道地区', trigger: 'blur' }],
          postcode: [{ required: false, trigger: 'blur', validator: validatePostCode }]
        }
      }
    },
    methods: {
      getLocationCode(locationInfo) {
        this.tab1Form.locationCode = locationInfo.id.toString()
      },
      handleTapClick(tab, event) {
        console.log(tab, event)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.tab1Form.cellphone.trim().length === 0 && this.tab1Form.telephone.trim().length === 0) {
              this.$message.error('电话号码、手机号码必填一项！')
              return
            } else if (this.tab1Form.cellphone.trim().length !== 0 && this.tab1Form.telephone.trim().length === 0) {
              if (!validateMobilePhone(this.tab1Form.cellphone)) {
                this.$message.error('请输入有效的手机号码！')
              }
            } else if (this.tab1Form.cellphone.trim().length === 0 && this.tab1Form.telephone.trim().length !== 0) {
              // 接口
            } else {
              if (!validateMobilePhone(this.tab1Form.cellphone)) {
                this.$message.error('请输入有效的手机号码！')
                return
              }
            }
            console.log('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    },
    components: {
      RegionSelector
    }
  }
</script>

<style scoped>
  .main{
    padding: 20px;
  }
</style>
