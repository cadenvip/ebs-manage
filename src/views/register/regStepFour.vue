<template>
  <el-container>
    <el-header>
      <el-steps :active="3" simple>
        <el-step title="查阅协议" icon="el-icon-document"></el-step>
        <el-step title="基本信息" icon="el-icon-edit"></el-step>
        <el-step title="资质上传" icon="el-icon-upload"></el-step>
        <el-step title="提交待审核" icon="el-icon-circle-check-outline"></el-step>
      </el-steps>
    </el-header>
    <el-main>
      <div>
        资质上传
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <el-button @click="goBack" type="primary">返回上一步</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      goBack() {
        this.$router.push({ path: '/regStepTwo' })
      }
    }
  }
</script>
