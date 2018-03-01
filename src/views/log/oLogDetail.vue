<template>
  <el-container style="width:1000px;margin:0 auto 20px">
    <el-main>
      <h1>基本信息</h1>
      <div style="width:786px;height:200px;overflow:auto;border:#E6E6E6 solid 1px;">
        <el-row :gutter="40">
          <el-col :span="12">
            <span>
            </span> 
          </el-col>
          <el-col :span="12">
            <span>
            </span> 
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <span>
            </span> 
          </el-col>
          <el-col :span="12">
            <span>
            </span> 
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <span>
            </span> 
          </el-col>
          <el-col :span="12">
            <span>
            </span> 
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <span>
            </span> 
          </el-col>
          <el-col :span="12">
            <span>
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
  import { getOLogDetail } from '@/api/log'
  export default {
    data() {
      return {
        // TODO
      }
    },
    created() {
      this.getOLogInfo()
    },
    methods: {
      getOLogInfo() {
        return new Promise((resolve, reject) => {
          getOLogDetail(this.$route.query.id).then(response => {
            console.log('response.data:', response.data)
            // TODO
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      goBack() {
        this.$router.push({ path: '/system/log/olog/list' })
      }
    }
  }
</script>
