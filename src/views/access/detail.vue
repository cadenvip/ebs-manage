<template>
  <div class="app-container">
    <h3 class="title">接入方详情</h3>
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
            {{ accessBean.si_phone }}
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
          <span>
            {{ accessBean.si_person !== null ? accessBean.si_person : '&nbsp;' }}
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
    <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
    <h5>使用的业务</h5>
    <el-table :data="selectedOpList" border stripe fit highlight-current-row style="padding-left:10px;margin-top:10px">
      <el-table-column label='业务名称' prop="operationname" width="220" align="center"></el-table-column>
      <el-table-column label="业务编号" prop="operationcode" width="180" align="center"></el-table-column>
      <el-table-column label="业务启用时间" prop="startdate" width="240" align="center"></el-table-column>
      <el-table-column label="业务到期时间" prop="enddate" width="240" align="center"></el-table-column>
    </el-table>
    <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
    <h5>接口列表</h5>
    <el-table :data="selectedInList" border stripe fit highlight-current-row style="padding-left:10px;margin-top:10px">
      <el-table-column label="接口名称" prop="inter_name" width="240" align="center"></el-table-column>
      <el-table-column label="接口方法" prop="inter_method" width="240" align="center"></el-table-column>
      <el-table-column label="版本" prop="inter_version" width="200" align="center"></el-table-column>
      <el-table-column label="类型" prop="inter_type" width="200" align="center"></el-table-column>
    </el-table>       
    <br/>
    <div style="text-align: center">
      <el-button @click="onCancel">返回</el-button>
    </div>
  </div>
</template>

<script>

import { getAccessDetail, getChanelList, getAllOperationList, getAllInterfaceList } from '@/api/access'

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
        channel_code: ''// 渠道编码 通过调用接口channelList 得到
      },
      operationList: [],	 // （全部）服务id，通过调用接口operationList 得到，及时没有也要传一个空数组
      interfaceList: [], // （全部）接口id，通过调用接口interfaceList  得到，及时没有也要传一个空数组
      selectedOpList: [],	 // （选中）服务id，通过调用接口operationList 得到，及时没有也要传一个空数组
      selectedInList: [] // （选中）接口id，通过调用接口interfaceList  得到，及时没有也要传一个空数组
    }
  },
  computed: {
    si_typeFormat: function() {
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
    }
  },
  created () {
    getAccessDetail(this.$route.query.id).then(response => {
      if (response.status === 200) {
        this.accessBean = response.data.access
        this.selectedOpList = response.data.operationList
        this.selectedInList = response.data.interfaceList
      } else {
        this.$message.error(response.msg)
      }
    }).catch(error => {
      this.$message.error(error)
    })
    getChanelList().then(response => {
      if (response.status === 200) {
        this.channelList = response.data
      } else {
        this.$message.error(response.msg)
      }
    }).catch(error => {
      this.$message.error(error)
    })
    getAllOperationList().then(response => {
      if (response.status === 200) {
        this.operationList = response.data
      } else {
        this.$message.error(response.msg)
      }
    }).catch(error => {
      this.$message.error(error)
    })
    getAllInterfaceList().then(response => {
      if (response.status === 200) {
        this.interfaceList = response.data
      } else {
        this.$message.error(response.msg)
      }
    }).catch(error => {
      this.$message.error(error)
    })
  },
  methods: {
    onCancel() {
      this.$router.push({ path: '/system/access/list' })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>