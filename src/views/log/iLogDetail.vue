<template>
  <el-container style="width:1000px;margin:0 auto 20px">
    <el-main>
      <h3>基本信息</h3>
      <div style="color: #606266;font-size:14px;width:960px;height:140px;overflow:auto;border:#E6E6E6 solid 1px;">
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
          <el-col :span="4" style="text-align:right">
            <span>
              流水号：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.reqseq }}
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              接口服务名：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.reqservice }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
          <el-col :span="4" style="text-align:right">
            <span>
              接口消息标志：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.reqaction }}
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              发起方编码：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.reqcode }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
          <el-col :span="4" style="text-align:right">
            <span>
              发起方IP地址：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.clientip }}
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              接口协议：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.protocol }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
          <el-col :span="4" style="text-align:right">
            <span>
              耗时（毫秒）：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.timed }}
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              创建时间：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.createtime }}
            </span>
          </el-col>
        </el-row>
      </div>
      <h3>请求报文</h3>
      <div style="color: #606266;font-size:14px;width:960px;height:200px;overflow-x:hidden;border:#E6E6E6 solid 1px;padding:15px 20px;line-height:30px;word-wrap:break-word;word-break:break-all;">
        <span>
          {{ logDetail.reqmessage }}
        </span>
      </div>
      <h3>响应报文</h3>
      <div style="color: #606266;font-size:14px;width:960px;height:300px;overflow-x:hidden;border:#E6E6E6 solid 1px;padding:15px 20px;line-height:30px;word-wrap:break-word;word-break:break-all;">
        <span>
          {{ logDetail.rspmessage }}
        </span>
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <el-button @click="goBack" type="primary">返 回</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {
    getILogDetail
  } from '@/api/log'
  export default {
    data() {
      return {
        // TODO
        logDetail: {
          clientip: '',
          createtime: '',
          errormessage: '',
          id: '',
          month: '',
          month_day: '',
          protocol: '',
          reqaction: '',
          reqcode: '',
          reqmessage: '',
          reqseq: '',
          reqservice: '',
          rspmessage: '',
          timed: ''
        }
      }
    },
    created() {
      this.getILogInfo()
    },
    methods: {
      getILogInfo() {
        getILogDetail(this.$route.query.id).then(response => {
          if (response.status === 200) {
            this.logDetail = response.data
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
      },
      goBack() {
        this.$router.push({
          path: '/log/ilog/list'
        })
        // this.$router.go(-1)
      }
    }
  }

</script>
