<template>
  <div style="text-align: center">
    <p>您已被登出或者您长时间未操作页面已超时！</p>
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