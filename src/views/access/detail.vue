<template>
  <div style="padding:20px">
    <h4 class="title">接入方详情</h4>
    <h5 class="title">基本信息</h5>
    <div style="color: #606266;font-size:14px;width:960px;height:160px;overflow:auto;border:#E6E6E6 solid 1px;">
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
        <el-col :span="4" style="text-align:right">
          <span>
            接入码：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ accessBean.code }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            联系电话：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ si_phoneFormat }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            接入方名称：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ accessBean.si_name }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            开始时间：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ accessBean.begin_time }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            接入类别：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ si_typeFormat }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            到期时间：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ accessBean.end_time }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            联系人：
          </span>
        </el-col>
        <el-col :span="8">
          <span v-html="si_personFormat">
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            所属渠道：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ channel_codeFormat }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            系统地址：
          </span>
        </el-col>
        <el-col :span="20">
          <span>
            {{ accessBean.si_url }}
          </span>
        </el-col>
      </el-row>
    </div>

    <div style="width:960px;">
      <h5>使用的业务</h5>
      <el-table :data="selectedOpList" border stripe fit highlight-current-row style="width:100%">
        <el-table-column label='业务名称' prop="operationname" align="center"></el-table-column>
        <el-table-column label="业务编号" prop="operationcode" align="center"></el-table-column>
        <el-table-column label="业务启用时间" prop="startdate" align="center"></el-table-column>
        <el-table-column label="业务到期时间" prop="enddate" align="center"></el-table-column>
      </el-table>
    </div>
    <div style="width:960px;">
      <h5>接口列表</h5>
      <el-table :data="selectedInList" border stripe fit highlight-current-row style="width:100%">
        <el-table-column label="接口名称" prop="inter_name" align="center"></el-table-column>
        <el-table-column label="接口方法" prop="inter_method" align="center"></el-table-column>
        <el-table-column label="版本" prop="inter_version" align="center"></el-table-column>
        <el-table-column label="类型" prop="inter_type" align="center"></el-table-column>
      </el-table>
    </div>
    <br/>
    <div style="text-align: center">
      <el-button type="primary" @click="onCancel">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {
    getAccessDetail,
    getChanelList,
    getAllOperationList,
    getAllInterfaceList
  } from '@/api/access'
  import {
    phoneCutSensitive,
    nameCutSensitive
  } from '@/utils/index'

  export default {
    data() {
      return {
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
        selectedInList: [] // （选中）接口id，通过调用接口interfaceList  得到，及时没有也要传一个空数组
      }
    },
    computed: {
      si_typeFormat: function () {
        if (this.accessBean.si_type === '1') {
          return '渠道门户'
        } else if (this.accessBean.si_type === '2') {
          return '业务平台'
        } else {
          return '未知'
        }
      },
      channel_codeFormat: function () {
        if (this.accessBean.channel_code !== null) {
          for (var i = 0; i < this.channelList.length; i++) {
            if (this.channelList[i].channel_code === this.accessBean.channel_code) {
              return this.channelList[i].channel_name
            }
          }
        }
        return ''
      },
      si_personFormat: function() {
        var name = nameCutSensitive(this.accessBean.si_person)
        return name !== '' ? name : '&nbsp;'
      },
      si_phoneFormat: function() {
        return phoneCutSensitive(this.accessBean.si_phone)
      }
    },
    created() {
      getAccessDetail(this.$route.query.id).then(response => {
        if (response.status === 200) {
          this.accessBean = response.data.access
          this.selectedOpList = response.data.operationList
          this.selectedInList = response.data.interfaceList
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error.msg)
      })
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
