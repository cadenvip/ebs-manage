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
        // 退一步海阔天空，退两步刚刚合适
        this.$router.go(-2)
      }
    }
  }
</script>
