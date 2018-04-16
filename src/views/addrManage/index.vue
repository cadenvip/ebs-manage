<template>
  <div class="main">
    <el-form :model="tab1Form" :rules="tab1rules" ref="tab1Form" label-width="100px">
      <el-form-item label="姓  名:" prop="name">
        <el-col :span="12">
          <el-input :maxlength="8" id="addrName" placeholder="请输入姓名" v-model.trim="tab1Form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="所在区域:"  prop="locationCode">
        <RegionSelector v-model="tab1Form.locationCode" :grade="4" :showCountry="false" @locationChanged="getLocationCode" :locationId="tab1Form.locationCode"></RegionSelector>
      </el-form-item>
      <el-form-item label="街道地区:" prop="block">
        <el-col :span="12">
          <el-input :maxlength="30" placeholder="请输入街道地区" v-model.trim="tab1Form.block"></el-input>
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
          <el-input :maxlength="11" placeholder="请输入手机号码" v-model.trim="tab1Form.cellphone"></el-input>
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
      <el-col :span="3" class="valid-addr">
        <span style="font-size: 14px; color: #656565;">已保存有效地址</span>
      </el-col>
      <el-col :span="21" style="border-bottom: 1px dashed #ccc;height: 15px;"></el-col>
      <el-table
        :data="tab1TableData"
        border
        style="width: 100%">
        <el-table-column  align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column  align="center" prop="locationName" label="所在区域"></el-table-column>
        <el-table-column  align="center" prop="street" label="街道地址"></el-table-column>
        <el-table-column  align="center" prop="postCode" label="邮编"></el-table-column>
        <el-table-column  align="center" label="手机/电话">
          <template slot-scope="scope">
            {{scope.row.mobileTelephone}}
            <span v-show="scope.row.mobileTelephone && scope.row.telephone">/</span>
            {{scope.row.telephone}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="modifyAddr(scope.row.gid)" type="text" size="small">修改</el-button>
            <el-button @click="deleteAddr(scope.row.gid)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>          
    </div>    

    <el-dialog
      title="地址信息"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <span style="font-weight: bold;">{{tipInfo}}</span>
      <span slot="footer" >
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="地址信息"
      :visible.sync="dialogVisible2"
      width="30%"
      center>
      <span style="font-size: 15px;font-weight: bold;">确认删除？</span>
      <span slot="footer" >
        <el-button type="primary" @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirDeleteAddr">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import RegionSelector from '@/components/RegionSelector/index'
  import { validateMobilePhone, validatePostcode } from '@/utils/validate'
  import { saveAddr, getAddr, getAddrDetail, deleteAddr } from '@/api/addrmanage.js'
  export default {
    created() {
      this._getAddr()
    },
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
        tipInfo: '',
        dialogVisible: false,
        dialogVisible2: false,
        tab1Form: {
          gid: '',
          name: '',
          locationCode: '',
          locationName: '',
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
          postcode: [{ required: true, trigger: 'blur', validator: validatePostCode }]
        },
        tab1TableData: []
      }
    },
    methods: {
      getLocationCode(locationInfo) {
        this.tab1Form.locationCode = locationInfo.id.toString()
        this.tab1Form.locationName = locationInfo.locationName
      },
      _getAddr() {
        getAddr().then(res => {
          if (res.status === 200) {
            this.tab1TableData = res.data
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
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
                return
              }
            } else if (this.tab1Form.cellphone.trim().length === 0 && this.tab1Form.telephone.trim().length !== 0) {
              // 接口
            } else {
              if (!validateMobilePhone(this.tab1Form.cellphone)) {
                this.$message.error('请输入有效的手机号码！')
                return
              }
            }
            const param = {
              gid: this.tab1Form.gid,
              name: this.tab1Form.name,
              locationId: this.tab1Form.locationCode,
              locationName: this.tab1Form.locationName,
              street: this.tab1Form.block,
              postCode: this.tab1Form.postcode,
              mobileTelephone: this.tab1Form.cellphone,
              telephone: this.tab1Form.telephone,
              isDefault: this.tab1Form.isDefault ? 0 : 1
            }
            saveAddr(param).then(res => {
              if (res.status === 200) {
                if (this.tab1Form.gid === '') {
                  this.tipInfo = '新增地址成功'
                } else {
                  this.tipInfo = '修改地址成功'
                }
                this.dialogVisible = true
                this.tab1Form = {
                  gid: '',
                  name: '',
                  locationCode: '',
                  locationName: '',
                  block: '',
                  postcode: '',
                  cellphone: '',
                  telephone: '',
                  isDefault: false
                }
                this._getAddr()
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
      },
      modifyAddr(gid) {
        this.tab1Form.gid = gid
        getAddrDetail(gid).then(res => {
          if (res.status === 200) {
            const addrObj = res.data
            this.tab1Form.name = this.checkNull(addrObj.name)
            this.tab1Form.locationCode = this.checkNull(addrObj.locationId)
            this.tab1Form.locationName = this.checkNull(addrObj.locationName)
            this.tab1Form.block = this.checkNull(addrObj.street)
            this.tab1Form.postcode = this.checkNull(addrObj.postCode)
            this.tab1Form.cellphone = this.checkNull(addrObj.mobileTelephone)
            this.tab1Form.telephone = this.checkNull(addrObj.telephone)
            if (addrObj.isDefault === '1') {
              this.tab1Form.isDefault =  false
            } else if (addrObj.isDefault === '0') {
              this.tab1Form.isDefault =  true
            }
            document.getElementById('addrName').focus()
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
          }  else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      deleteAddr(gid) {
        this.dialogVisible2 = true
        this.gid = gid
      },
      confirDeleteAddr() {
        this.dialogVisible2 = false
        deleteAddr(this.gid).then(res => {
          if (res.status === 200) {
            this.tipInfo = res.msg
            this.dialogVisible = true
            this._getAddr()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      checkNull(data) {
        if (data === null) {
          return ''
        } else {
          return data
        }
      }
    },
    components: {
      RegionSelector
    }
  }
</script>

<style scoped>
  .main {
    padding: 20px;
  }
  .valid-addr {
    height: 30px;
    line-height: 30px;
    border-radius: 30px;
    background: #ddd;
    text-align: center;
    overflow: hidden;
    margin-bottom: 20px;
  }
</style>
