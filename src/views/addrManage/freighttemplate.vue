<template>
  <div style="padding: 20px;">
    <p style="font-weight: bold;font-size: 16px;margin: 0 0 20px 0;">新增运费模板</p>
    <el-form :model="Form" :rules="rules" ref="Form" label-width="100px">
      <el-form-item label="模板名称:" prop="templateName">
        <el-col :span="12">
          <el-input placeholder="请输入模板名称" v-model.trim="Form.templateName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="发货地址:" prop="shipAreaLocationId">
        <RegionSelector :grade="4" :showCountry="false" @locationChanged="getLocationCode" :locationId="Form.shipAreaLocationId"></RegionSelector>
      </el-form-item>
      <el-form-item label="计费方式:">
        <el-radio disabled v-model="Form.pricingUnit" label="g">按重量</el-radio>
      </el-form-item>
      <el-form-item label="是否包邮:">
        <el-radio v-model="Form.freightType" label="1">买家承担运费</el-radio>
        <el-radio v-model="Form.freightType" label="2">卖家承担运费</el-radio>
      </el-form-item>
      <el-form-item label-width="0">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column  align="center" id="test" label="运送到">
            <template slot-scope="scope">
              <el-input v-model="scope.row.arrivalLocationName" clearable @focus="handleLocationFocus(scope)" placeholder="未添加区域"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="首件(千克)">
            <template slot-scope="scope">
              <el-input v-model="scope.row.defaultUnit"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="运费(元)">
            <template slot-scope="scope">
              <el-input v-model="scope.row.defaultMoney"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="续件(千克)">
            <template slot-scope="scope">
              <el-input v-model="scope.row.incrementalUnit"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="运费(元)">
            <template slot-scope="scope">
              <el-input v-model="scope.row.incrementalMoney"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="deleteRow(scope)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="addRow" type="text">为指定区域设置运费</el-button>
      </el-form-item>
      <el-form-item>
        <el-col style="margin-top: 25px;" :span="12">
          <el-button type="primary" @click="submitForm('Form')">保 存</el-button>
          <el-button @click="goBack" type="primary">返 回</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <el-dialog
      title="请选择区域"
      :visible.sync="dialogVisible"
      width="440px">
      <locationselector @locationSelected="getLocationInfo"></locationselector>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%"
      center>
      <span style="font-weight: bold;">保存物流模板成功</span>
      <span slot="footer" >
        <el-button type="primary" @click="saveSuccess">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import RegionSelector from '@/components/RegionSelector/index'
  import locationselector from '@/components/LocationSelector/index'
  import { saveTemplate, getTemplateDetail } from '@/api/addrmanage.js'
  export default {
    created() {
      var tid = this.$route.query.tid
      if (tid) {
        this.isFromModify = true
        getTemplateDetail(tid).then(res => {
          if (res.status === 200) {
            var tempObj = res.data
            var transportList = tempObj.transportList
            this.Form.id = tid
            this.Form.templateName = tempObj.template.templateName
            this.Form.shipAreaLocationId = tempObj.template.shipAreaLocationId
            this.Form.shipAreaLocationName = tempObj.template.shipAreaLocationName
            this.Form.freightType = tempObj.template.freightType
            this.tableData = transportList
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }
    },
    data() {
      return {
        dialogVisible: false,
        dialogVisible2: false,
        Form: {
          templateName: '',
          shipAreaLocationId: '',
          shipAreaLocationName: '',
          pricingUnit: 'g',
          freightType: '1',
          type: '2'
        },
        tableData: [{
          defaultUnit: '',
          defaultMoney: '',
          incrementalMoney: '',
          incrementalUnit: '',
          arrivalLocationName: '',
          arrivalLocationId: '',
          transportType: '2'
        }],
        rules: {
          templateName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          shipAreaLocationId: [{ required: true, message: '请选择地址', trigger: 'change' }]
        }
      }
    },
    methods: {
      addRow() {
        const newRow = {
          defaultUnit: '',
          defaultMoney: '',
          incrementalMoney: '',
          incrementalUnit: '',
          arrivalLocationName: '',
          arrivalLocationId: '',
          transportType: '2'
        }
        this.tableData.push(newRow)
      },
      deleteRow(scope) {
        if (scope.$index !== 0) {
          this.tableData.splice(scope.$index)
        }
      },
      getLocationInfo: function(data) {
        this.tableData[this.index].arrivalLocationName = data.label
        this.tableData[this.index].arrivalLocationId = data.id
      },
      handleLocationFocus(scope) {
        this.index = scope.$index
        this.dialogVisible = true
      },
      getLocationCode(locationInfo) {
        this.Form.shipAreaLocationId = locationInfo.id.toString()
        this.Form.shipAreaLocationName = locationInfo.locationName
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = {
              template: this.Form,
              transportList: this.tableData
            }
            console.log(params)
            saveTemplate(params).then(res => {
              if (res.status === 200) {
                this.dialogVisible2 = true
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
      saveSuccess() {
        this.dialogVisible2 = false
        this.$router.push({ path: '/addrmanage/freight' })
      },
      goBack() {
        this.$router.push({ path: '/addrmanage/freight' })
      }
    },
    components: {
      RegionSelector,
      locationselector
    }
  }
</script>

<style scoped>
.el-table_1_column_1{
  font-size: 24px;
}
</style>