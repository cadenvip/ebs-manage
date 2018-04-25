<template>
  <div style="text-align: center">
    <p>由于页面长时间未操作已超时或此账号在其他地方登录，您以被迫下线，请重新登录或修改密码。</p>
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