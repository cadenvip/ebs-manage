<template>
  <el-container>
    <el-header>
      <el-steps :active="1" simple>
        <el-step title="选择类别" icon="el-icon-document"></el-step>
        <el-step title="填写商品详情" icon="el-icon-edit"></el-step>
        <el-step title="提交入库" icon="el-icon-upload"></el-step>
        <el-step title="审核上架" icon="el-icon-circle-check-outline"></el-step>
      </el-steps>
    </el-header>
    <el-main>
      <div>
        <span style="padding-right: 20px;font-size:20px;">请选择您的商品类别:</span>
        <el-cascader style="width: 300px;" @change="handleChange" :options="goodsOptions" v-model="goodstype">
        </el-cascader>
      </div>
      <div style="display: none;margin-top: 50px;">
        <span style="padding-right: 20px;font-size:20px;">请选择您的商品类型:</span>
        <el-radio v-model="radio" label="1">普通商品</el-radio>
        <el-radio v-model="radio" label="2">急推商品</el-radio><i @click="tip" style="padding-left: 10px;cursor:pointer;" class="el-icon-question "></i>
      </div>
      <div style="margin-top: 50px; text-align: center;">
        <el-button @click="goBack" type="primary">返回上一步</el-button>
        <el-button @click="goNext" type="primary">保存并下一步</el-button>
      </div>
    </el-main>
    
  </el-container>
</template>

<script>
  import { getGoodsType } from '@/api/goodsRelease'
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        goodstype: [],
        radio: '1',
        goodsOptions: []
      }
    },
    created () {
      this._getGoodsType()
      if (this.getSelectedOption.length > 0) {
        this.goodstype = this.getSelectedOption
      }
    },
    computed: {
      getSelectedOption() {
        return this.selectedoption
      },
      ...mapGetters([
        'selectedoption'
      ])
    },
    methods: {
      _getGoodsType() {
        getGoodsType().then((res) => {
          if (res.status === 200) {
            this.goodsTypeTemplate = res.data[0]
            this.format()
          } else {
            this.$message.error('网络错误' + res.status)
          }
        })
      },
      format() {
        if (this.goodsTypeTemplate) {
          console.log('enter')
          this.goodsTypeTemplate = this.goodsTypeTemplate.subCategories
          for (var i = 0; i < this.goodsTypeTemplate.length; i++) {
            var children = []
            var temp = this.goodsTypeTemplate[i]
            for (var j = 0; j < temp.subCategories.length; j++) {
              children.push({ value: temp.subCategories[j]['categoryId'], label: temp.subCategories[j]['categoryName'] })
            }
            this.goodsOptions.push({ value: temp['categoryId'], label: temp['categoryName'], children: children })
          }
        }
      },
      handleChange(value) {
        this.goodstype = value
        this.setSelectedOption(value)
      },
      tip() {
        this.$alert('集推商品主要是展示给移动经销商，进行向集团客户推荐。建议该分类的商品价格低于商城直供价，具有批量订购吸引力，便于集团客户大量订购。', '急推商品', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        })
      },
      goBack() {
        this.$router.push({ path: '/goodsmanage/publishgoods' })
      },
      goNext() {
        if (this.goodstype.length > 0) {
          this.$router.push({ name: 'publishstep2', params: { typeCode: this.goodstype[0], typeCodeName: this.goodstype[1] }})
        } else {
          this.$message.error('请选择您的商品类别')
        }
      },
      ...mapMutations({
        setSelectedOption: 'SET_SELECTEDOPTION'
      })
    }
  }
</script>
<style>
.el-cascader-menu{height: 350px;}
</style>
