<template>
  <div style="padding:20px">
    <h4 class="title">新增接入方</h4>
    <div style="width:1000px;">
      <el-form ref="accessBean" :model="accessBean" :rules="rules" label-width="120px">
        <h5>基础信息</h5>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="接入码：" prop="code">
              <el-input v-model="accessBean.code" style="width: 300px;" :maxlength=16 placeholder="请输入接入码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接入方名称：" prop="si_name">
              <el-input v-model="accessBean.si_name" style="width: 300px;" :maxlength=16 placeholder="请输入接入名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="密码：" prop="password">
              <el-input type="password" v-model="accessBean.password" :maxlength=16 style="width: 300px;" placeholder="请输入密码"></el-input>
              <PasswordStrength :password="accessBean.password" @pwdInfo="getPwdInfo"></PasswordStrength>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码：" prop="repassword">
              <el-input type="password" v-model="accessBean.repassword" :maxlength=16 style="width: 300px;" placeholder="请再次输入密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="接入类别：" prop="si_type">
              <el-select v-model="accessBean.si_type" clearable style="width: 180px;" placeholder="请选择接入类别">
                <el-option label="渠道门户" value="1"></el-option>
                <el-option label="业务平台" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属渠道：" prop="channel_code">
              <el-select v-model="accessBean.channel_code" clearable style="width: 180px;" placeholder="请选择接入类别">
                <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="item.channel_code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="系统地址：" prop="si_url">
          <el-input v-model="accessBean.si_url" style="width: 700px;" :maxlength=200 placeholder="请输入系统地址url"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人：" prop="si_person">
              <el-input v-model="accessBean.si_person" style="width: 300px;" :maxlength=16 placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：" prop="si_phone">
              <el-input v-model="accessBean.si_phone" style="width: 300px;" :maxlength=16 placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开始时间：" prop="begin_time">
              <el-date-picker v-model="accessBean.begin_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 300px;" placeholder="请选择开始时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间：" prop="end_time">
              <el-date-picker v-model="accessBean.end_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 300px;" placeholder="请选择结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注：" prop="remark">
          <el-input v-model="accessBean.remark" type="textarea" :maxlength=200 style="width:700px;min-heigh:100px" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="width:1000px;">
      <h5>使用的业务</h5>
      <el-button type="primary" @click="selectOperation">选择业务</el-button>
      <el-table :data="selectedOpList" border stripe fit highlight-current-row style="width:100%;margin-top:10px" align="center">
        <el-table-column label='业务名称' prop="operationname" align="center"></el-table-column>
        <el-table-column label="业务编号" prop="operationcode" align="center"></el-table-column>
        <el-table-column label="业务启用时间" prop="startdate" align="center"></el-table-column>
        <el-table-column label="业务到期时间" prop="enddate" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="deleteOperation(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="width:1000px;">
      <h5>接口列表</h5>
      <el-button type="primary" @click="selectInterface">选择接口</el-button>
      <el-table :data="selectedInList" border stripe fit highlight-current-row style="width:100%;margin-top:10px" align="center">
        <el-table-column label="接口名称" prop="inter_name" align="center"></el-table-column>
        <el-table-column label="接口方法" prop="inter_method" align="center"></el-table-column>
        <el-table-column label="版本" prop="inter_version" align="center"></el-table-column>
        <el-table-column label="类型" prop="inter_type" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="deleteInterface(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br/>
    <div style="text-align: center">
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button type="primary" @click="onCancel">返回</el-button>
    </div>
    <el-dialog title="选择业务" :visible.sync="operationTableVisible" width="770px">
      <el-form ref="opSearchForm" :model="opSearchForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6" :offset="6">
            <el-input v-model="opSearchForm.operationname" clearable style="width: 180px;" placeholder="请输入业务名称"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button @click="queryOperation()" type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <br/>
      <el-table :data="operationList" ref="operationTable" :row-key="getOpRowKey" tooltip-effect="dark" @selection-change="opSelectionChange" border stripe fit highlight-current-row style="width:100%">
        <el-table-column type="selection" :reserve-selection="true"></el-table-column>
        <el-table-column label='业务名称' prop="operationname" align="center"></el-table-column>
        <el-table-column label="业务编号" prop="operationcode" align="center"></el-table-column>
        <el-table-column label="业务启用时间" prop="startdate" align="center"></el-table-column>
        <el-table-column label="业务到期时间" prop="enddate" align="center"></el-table-column>
      </el-table>
      <!-- <br/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="operationTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmOpSelected">确 定</el-button>
      </span> -->
    </el-dialog>
    <el-dialog title="选择接口" :visible.sync="interfaceTableVisible" width="770px">
      <el-form ref="inSearchForm" :model="inSearchForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6" :offset="3">
            <el-input v-model="inSearchForm.inter_name" clearable style="width: 180px;" placeholder="请输入接口名称"></el-input>
          </el-col>
          <el-col :span="6">
            <el-select v-model="inSearchForm.inter_version" clearable style="width: 180px;" placeholder="请选择接口版本">
              <el-option label="V2" value="V2"></el-option>
              <el-option label="V3" value="V3"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button @click="queryInterface()" type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <br/>
      <el-table :data="interfaceList" ref="interfaceTable" :row-key="getInRowKey" tooltip-effect="dark" @selection-change="inSelectionChange" border stripe fit highlight-current-row style="width:100%;">
        <el-table-column type="selection" :reserve-selection="true"></el-table-column>
        <el-table-column label="接口名称" prop="inter_name" align="center"></el-table-column>
        <el-table-column label="接口方法" prop="inter_method" align="center"></el-table-column>
        <el-table-column label="版本" prop="inter_version" align="center"></el-table-column>
        <el-table-column label="类型" prop="inter_type" align="center"></el-table-column>
      </el-table>
      <!-- <br/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="interfaceTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmInSelected">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
  import {
    addAccess,
    getChanelList,
    getAllOperationList,
    getOperationList,
    getAllInterfaceList,
    getInterfaceList
  } from '@/api/access'
  import {
    str2Timestamp
  } from '@/utils/index'
  import {
    validateMobilePhone,
    validateTelephone,
    validateURL
  } from '@/utils/validate'
  import PasswordStrength from '@/components/PasswordStrength/index'
  import {
    encryptPassword
  } from '@/utils/index'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.accessBean.password.length < 8) {
            callback(new Error('请密码长度不足8位'))
          } else if (this.pwdInfo.score < 4) {
            callback(new Error('密码强度不够'))
          } else if (this.accessBean.repassword !== '') {
            this.$refs.accessBean.validateField('repassword')
            callback()
          }
        }
      }
      var validateRepass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.accessBean.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var validateContact = (rule, value, callback) => {
        if (value !== '') {
          if (!validateMobilePhone(value.trim()) && !validateTelephone(value.trim())) {
            callback(new Error('请输入有效的联系方式'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      var validateSi_url = (rule, value, callback) => {
        if (value !== '') {
          if (!validateURL(value.trim())) {
            callback(new Error('请输入有效的Url'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        operationTableVisible: false,
        interfaceTableVisible: false,
        channelList: [],
        accessBean: {
          code: '',
          password: '',
          repassword: '',
          servicecode: '', // 业务代码
          remark: '',
          si_type: '', // SI接入类别 1:渠道门户,2:业务平台
          si_name: '',
          begin_time: '', // 该值为时间戳
          end_time: '', // 该值为时间戳
          si_url: '', //
          si_person: '', // 接入方联系人
          si_phone: '', // 接入方联系人电话
          channel_code: '' // 渠道编码 通过调用接口channelList 得到
        },
        operationList: [], // （全部）服务id，通过调用接口operationList 得到，及时没有也要传一个空数组
        interfaceList: [], // （全部）接口id，通过调用接口interfaceList  得到，及时没有也要传一个空数组
        selectedOpList: [], // （选中）服务id，通过调用接口operationList 得到，及时没有也要传一个空数组
        selectedInList: [], // （选中）接口id，通过调用接口interfaceList  得到，及时没有也要传一个空数组
        // selectedOpTmpList: [],	 // （临时选中）服务id，通过调用接口operationList 得到，及时没有也要传一个空数组
        // selectedInTmpList: [], // （临时选中）接口id，通过调用接口interfaceList  得到，及时没有也要传一个空数组
        opSearchForm: {
          operationname: ''
        },
        inSearchForm: {
          inter_name: '',
          inter_version: ''
        },
        rules: {
          code: [{
            required: true,
            message: '请输入接入码',
            trigger: 'blur'
          }],
          si_name: [{
            required: true,
            message: '请输入接入名称',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }],
          repassword: [{
            required: true,
            validator: validateRepass,
            trigger: 'blur'
          }],
          si_phone: [{
            required: false,
            validator: validateContact,
            trigger: 'blur'
          }],
          si_url: [{
            required: false,
            validator: validateSi_url,
            trigger: 'blur'
          }],
          si_type: [{
            required: true,
            message: '请选择接入类别',
            trigger: 'change'
          }]
        },
        pwdInfo: {},
        getOpRowKey(row) {
          return row.id
        },
        getInRowKey(row) {
          return row.id
        }
      }
    },
    components: {
      PasswordStrength
    },
    created() {
      getChanelList().then(response => {
        if (response.status === 200) {
          this.channelList = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error.msg)
      })
      getAllOperationList().then(response => {
        if (response.status === 200) {
          this.operationList = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error.msg)
      })
      getAllInterfaceList().then(response => {
        if (response.status === 200) {
          this.interfaceList = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    methods: {
      getPwdInfo(data) {
        this.pwdInfo = data
      },
      selectOperation() {
        this.operationTableVisible = true
        getAllOperationList().then(response => {
          if (response.status === 200) {
            this.operationList = response.data
            this.opSearchForm.operationname = ''
            var defaultSelected = []
            if (this.operationList !== undefined && this.operationList.length > 0) {
              if (this.selectedOpList !== undefined && this.selectedOpList.length > 0) {
                this.operationList.forEach(row => {
                  for (var index = 0; index < this.selectedOpList.length; index++) {
                    if (this.selectedOpList[index].id === row.id) {
                      // this.$refs.operationTable.toggleRowSelection(row, true)
                      defaultSelected.push(row)
                      break
                    }
                  }
                })
              }
            }
            this.$refs.operationTable.clearSelection()
            defaultSelected.forEach(row => {
              this.$refs.operationTable.toggleRowSelection(row, true)
            })
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      selectInterface() {
        this.interfaceTableVisible = true
        getAllInterfaceList().then(response => {
          if (response.status === 200) {
            this.interfaceList = response.data
            this.inSearchForm.inter_name = ''
            this.inSearchForm.inter_version = ''
            var defaultSelected = []
            if (this.interfaceList !== undefined && this.interfaceList.length > 0) {
              if (this.selectedInList !== undefined && this.selectedInList.length > 0) {
                this.interfaceList.forEach(row => {
                  for (var index = 0; index < this.selectedInList.length; index++) {
                    if (this.selectedInList[index].id === row.id) {
                      // this.$refs.interfaceTable.toggleRowSelection(row, true)
                      defaultSelected.push(row)
                      break
                    }
                  }
                })
              }
            }
            this.$refs.interfaceTable.clearSelection()
            defaultSelected.forEach(row => {
              this.$refs.interfaceTable.toggleRowSelection(row, true)
            })
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      queryOperation() {
        getOperationList(this.opSearchForm).then(response => {
          if (response.status === 200) {
            this.operationList = response.data
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      queryInterface() {
        getInterfaceList(this.inSearchForm).then(response => {
          if (response.status === 200) {
            this.interfaceList = response.data
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      opSelectionChange(val) {
        // console.log(val)
        // this.selectedOpTmpList = val
        this.selectedOpList = val
      },
      inSelectionChange(val) {
        // console.log(val)
        // this.selectedInTmpList = val
        this.selectedInList = val
      },
      // confirmOpSelected() {
      //   this.selectedOpList = this.selectedOpTmpList
      //   this.operationTableVisible = false
      // },
      // confirmInSelected() {
      //   this.selectedInList = this.selectedInTmpList
      //   this.interfaceTableVisible = false
      // },
      deleteOperation(operationInfo) {
        var index = this.selectedOpList.indexOf(operationInfo)
        if (index > -1) {
          this.selectedOpList.splice(index, 1)
        }
      },
      deleteInterface(interfaceInfo) {
        var index = this.selectedInList.indexOf(interfaceInfo)
        if (index > -1) {
          this.selectedInList.splice(index, 1)
        }
      },
      onSubmit() {
        this.$refs.accessBean.validate(valid => {
          if (valid) {
            var operationIdList = []
            if (this.selectedOpList !== undefined && this.selectedOpList.length > 0) {
              this.selectedOpList.forEach(v => {
                operationIdList.push(v.id)
              })
            }
            var interfaceIdList = []
            if (this.selectedInList !== undefined && this.selectedInList.length > 0) {
              this.selectedInList.forEach(v => {
                interfaceIdList.push(v.id)
              })
            }
            var params = {
              'accessBean': this.accessBean,
              'interfaceIdList': interfaceIdList, // 接口id，通过调用接口interfaceList  得到，及时没有也要传一个空数组
              'operationIdList': operationIdList // 服务id，通过调用接口operationList 得到，及时没有也要传一个空数组
            }
            params.accessBean.password = encryptPassword(params.accessBean.password)
            delete params.accessBean.repassword
            // TODO 时间格式转换
            if (params.accessBean.begin_time !== undefined && params.accessBean.begin_time !== '') {
              params.accessBean.begin_time = str2Timestamp(params.accessBean.begin_time)
            }
            if (params.accessBean.end_time !== undefined && params.accessBean.end_time !== '') {
              params.accessBean.end_time = str2Timestamp(params.accessBean.end_time)
            }
            addAccess(params).then(response => {
              if (response.status === 200) {
                this.$router.push({
                  path: '/system/access/list'
                })
                this.$message.success('新增接入方成功')
              } else {
                this.$message.error(response.msg)
              }
            }).catch(error => {
              this.$message.error(error.msg)
            })
          } else {
            this.$message.error('error submit!!')
            return false
          }
        })
      },
      onCancel() {
        this.$router.push({
          path: '/system/access/list'
        })
      }
    }
  }

</script>

<style scoped>
  .line {
    text-align: center;
  }

</style>
