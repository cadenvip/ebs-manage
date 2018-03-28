<template>
  <div style="padding: 40px;">
    <h1 style="font-size: 15px; font-weight: bold;">基础信息</h1>
    <el-form label-width="120px" :model="formData">
      <el-form-item label="商品分类名称" prop="typeName" :rules="[{ required: true, message: '请输入商品分类名称', trigger: 'blur' }]">
        <el-input style="width: 35%;" v-model.trim="formData.typeName"></el-input>
      </el-form-item>
      <el-form-item label="商品分类描述">
        <el-input
          style="width: 45%;"
          :maxlength=60
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="formData.description">
        </el-input>
        <p>
          剩余字数: <span style="color:red;">{{getDescLen}}</span>
        </p>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">提交</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>     
  </div>
</template>

<script>
  import { goodsTypeSave, getCategoryDetail } from '@/api/goodstype'
  export default {
    created() {
      this.formData.typeName = this.$route.query.name
      this.formData.superTypeCode = this.$route.query.csid
      getCategoryDetail(this.$route.query.csid).then(res => {
        if (res.status === 200) {
          this.formData.description = res.data.cDesc
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    data() {
      return {
        formData: {
          typeName: '',
          superTypeCode: '',
          description: ''
        }
      }
    },
    methods: {
      submit() {
        const param = {
          csid: this.formData.superTypeCode,
          superId: this.formData.superTypeCode.substring(0, this.formData.superTypeCode.length - 2),
          caption: this.formData.typeName,
          cDesc: this.formData.description
        }
        if (param.csid === '' || param.caption === '') {
          this.$message.error('请输入商品分类名称')
        } else {
          goodsTypeSave(param).then(res => {
            if (res.status === 200) {
              this.$router.push({ name: '商品分类', params: { isshow: 1, info: '修改商品分类： 成功！' }})
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }
      },
      goBack() {
        this.$router.push({ path: '/goodstypemanage/index' })
      }
    },
    computed: {
      getDescLen() {
        if (this.formData.description) {
          return (60 - this.formData.description.length) < 0 ? 0 : (60 - this.formData.description.length)
        } else {
          return 60
        }
      }
    }
  }
</script>

<style scoped>

</style>
