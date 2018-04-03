<template>
  <el-container style="width:1000px;margin:0 auto 20px">
    <el-main>
      <h4>基本信息</h4>
      <div style="color: #606266;font-size:14px;width:960px;overflow:auto;border:#E6E6E6 solid 1px;">
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
          <el-col :span="4" style="text-align:right">
            <span>
              流水号：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.id }}
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              操作门户：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ systemFormat }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
          <el-col :span="4" style="text-align:right">
            <span>
              操作人账号：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.loginName !== null ? logDetail.loginName : '&nbsp;' }}
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              操作模块：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.moduleId !== null ? logDetail.moduleId : '&nbsp;' }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
          <el-col :span="4" style="text-align:right">
            <span>
              操作类型：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.operType !== null ? logDetail.operType : '&nbsp;' }}
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              操作人IP：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.clientIp }}
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
              {{ logDetail.createTime }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;margin-bottom:20px">
          <el-col :span="4" style="text-align:right">
            <span>
              操作内容：
            </span>
          </el-col>
          <el-col :span="20">
            <span>
              {{ logDetail.operContent }}
            </span>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <el-button @click="goBack" type="primary">返 回</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {
    getOLogDetail
  } from '@/api/log'
  export default {
    data() {
      return {
        logDetail: {
          id: '',
          userId: '',
          loginName: '',
          moduleId: '',
          operType: '',
          operContent: '',
          clientIp: '',
          timed: '',
          createTime: '',
          system: ''
        }
      }
    },
    created() {
      this.getOLogInfo()
    },
    computed: {
      systemFormat: function () {
        if (this.logDetail.system === undefined || this.logDetail.system === null) {
          return ''
        } else {
          switch (this.logDetail.system) {
            case '1':
              return '系统门户'
            case '2':
              return '商家门户'
          }
        }
      }
    },
    methods: {
      getOLogInfo() {
        getOLogDetail(this.$route.query.id).then(response => {
          if (response.status === 200) {
            this.logDetail = response.data
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      goBack() {
        // this.$router.push({ path: '/log/olog/list' })
        this.$router.go(-1)
      }
    }
  }

</script>
