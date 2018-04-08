<template>
  <div style="text-align: center">
    <p>您没有此操作权限！</p>
    <el-button type="primary" @click="goback()">返回</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      goback() {
        this.$router.go(-1)
      }
    }
  }
</script>
