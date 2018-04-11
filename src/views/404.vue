<template>
  <div style="text-align: center">
    <p>网页无法访问！</p>
    <el-button type="primary" @click="goback()">刷新</el-button>
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
