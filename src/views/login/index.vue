<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <h3 class="title">中国移动商户管理系统</h3>
      <el-form-item prop="loginname">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="loginname" type="text" v-model="loginForm.loginname" :maxlength=16 placeholder="请输入账号" clearable v-on:blur="getUnitids" />
      </el-form-item>
      <el-form-item prop="unitid">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="department" />
        </span>
        <el-select v-model="loginForm.unitid" placeholder="请选择归属单位" clearable v-on:focus="selectUnit">
          <el-option v-for="(item, index) in unitinfos" v-if="item" :key="index" :label="item.businessesName" :value="item.id" selected></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" :maxlength=20 clearable v-model="loginForm.password" placeholder="请输入密码"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item prop="vercode">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="verifycode" />
        </span>
        <el-input name="vercode" type="text" v-model="loginForm.vercode" :maxlength=6 placeholder="请输入验证码" style="width:50%;display:inline-block;" />
        <el-button type="text" style="margin-top:6px;margin-left: 50px;" @click.native.prevent="getVercode" :disabled="disableBtn">
          获取验证码
        </el-button>
      </el-form-item>
      <p v-show="disableBtn" style="color: #f56c6c; font-size: 12px; line-height: 1;">{{ timerCodeMsg }}</p>
      <el-form-item style="text-align: center;">
        <el-button type="primary" style="width:47.85%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
        <el-button type="primary" style="width:47.85%;" @click.native.prevent="handleRegist">
          注册
        </el-button>
        <!-- <el-button type="primary" style="width:47.85%;" @click.native.prevent="Test">
          测试
        </el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    getVercode,
    getUnitInfos,
    getUnits
  } from '@/api/login'
  // import { validateMobilePhone } from '@/utils/validate'
  import {
    encryptPassword
  } from '@/utils/index'
  // import { downloadBillList } from '@/api/finance'

  export default {
    data() {
      // var validateCellphone = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入手机号码'))
      //   } else {
      //     if (!validateMobilePhone(value.trim())) {
      //       callback(new Error('请输入有效的手机号码'))
      //     }
      //     callback()
      //   }
      // }
      return {
        unitinfos: [],
        loginForm: {
          loginname: '',
          password: '',
          unitid: '',
          vercode: ''
        },
        loginRules: {
          // loginname: [{ required: true, trigger: 'blur', validator: validateCellphone }],
          loginname: [{
            required: true,
            trigger: 'blur',
            message: '请输入账号'
          }],
          password: [{
            required: true,
            trigger: 'blur',
            message: '请输入密码'
          }],
          unitid: [{
            required: true,
            trigger: 'change',
            message: '请选择归属单位'
          }],
          vercode: [{
            required: true,
            trigger: 'blur',
            message: '请输入验证码'
          }]
        },
        pwdType: 'password',
        disableBtn: false,
        timerCodeMsg: '',
        timer: null,
        count: ''
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        // validate element-ui的一个方法
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // 提供dispatch(action)方法更新state；
            var loginParams = {
              'loginname': this.loginForm.loginname,
              'password': encryptPassword(this.loginForm.password),
              'unitid': this.loginForm.unitid,
              'vercode': this.loginForm.vercode
            }
            this.$store.dispatch('Login', loginParams).then(response => {
              // 根据角色进入相应的首页
              if (response.data.role[0].roletype === '1') {
                this.$router.push({
                  path: '/home/ahome'
                })
              } else if (response.data.role[0].roletype === '2' || response.data.role[0].roletype === '3') {
                this.$router.push({
                  path: '/home/bhome'
                })
              } else {
                this.$message.error('登录失败！')
              }
              getUnits().then(res => {
                if (res.status === 200) {
                  this.units = res.data
                  window.localStorage.setItem('units', JSON.stringify(this.units))
                } else {
                  this.$message.error(res.msg)
                }
              }).catch(err => {
                this.$message.error(err)
              })
            }).catch(errpr => {
              this.$message.error(errpr)
            })
          } else {
            // this.$message.error('error submit!!')
            return
          }
        })
      },
      getUnitids() {
        // this.loginForm.loginname = this.loginForm.loginname.trim()
        // if (this.loginForm.loginname === '') {
        //   this.$message.error('请输入手机号码')
        //   return
        // } else {
        //   if (!validateMobilePhone(this.loginForm.loginname.trim())) {
        //     return
        //   }
        // }

        if (this.loginForm.loginname === '') {
          this.$message.error('请输入账号')
          return
        }
        getUnitInfos(this.loginForm.loginname).then(response => {
          if (response.status === 200) {
            this.unitinfos = response.data
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      selectUnit() {
        if (this.unitinfos === undefined || this.unitinfos.length <= 0) {
          this.getUnitids()
        }
      },
      getVercode() {
        // this.loginForm.loginname = this.loginForm.loginname.trim()
        // if (this.loginForm.loginname === '') {
        //   this.$message.error('请输入手机号码')
        //   return
        // } else {
        //   if (!validateMobilePhone(this.loginForm.loginname.trim())) {
        //     return
        //   }
        // }
        if (this.loginForm.loginname === '') {
          this.$message.error('请输入账号')
          return
        }
        if (this.loginForm.unitid === '') {
          this.$message.error('请选择归属单位')
          return
        }
        if (this.loginForm.password === '') {
          this.$message.error('请输入密码')
          return
        }
        var params = {
          'loginname': this.loginForm.loginname,
          'password': encryptPassword(this.loginForm.password),
          'unitid': this.loginForm.unitid
        }
        this.disableBtn = true
        getVercode(params).then(response => {
          if (response.status === 200) {
            const TIME_COUNT = 300
            if (!this.timer) {
              this.count = TIME_COUNT
              this.disableBtn = false
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.timerCodeMsg = `验证码发送成功，${this.count}秒后可重发验证码。`
                  this.count--
                  this.disableBtn = true
                } else {
                  this.disableBtn = false
                  clearInterval(this.timer)
                  this.timer = null
                }
              }, 1000)
            }
          } else {
            this.$message.error(response.msg)
            this.disableBtn = false
          }
        }).catch(error => {
          this.$message.error(error.msg)
          this.disableBtn = false
        })
      },
      handleRegist() {
        this.$router.push({
          path: '/register'
        })
      }
      // Test () {
      //   downloadBillList().then(response => {
      //     console.log('246', response)
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .el-input--suffix {
      width: 292px;
    }
  }

</style>
