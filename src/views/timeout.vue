<template>
  <div style="text-align: center">
    <p>由于长时间未操作，页面已经超时！</p>
    <el-button type="primary" @click="relogin()">重新登录</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      relogin() {
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
</script>