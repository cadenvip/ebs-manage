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
        <span style="padding-right: 20px;font-size:18px;color: #666;">请选择您的商品类别:</span>
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
  import { getGoodsType, checkGoStepTwo } from '@/api/goodsRelease'
  import { mapMutations, mapGetters } from 'vuex'
  import { getGoodsDetail } from '@/api/noshelfgoods'
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
      isFromModify() {
        this.goodsId = this.$route.query.goodsId
        this.modifyFlag = String(this.$route.query.modifyFlag)
        // 修改状态为驳回，应该显示放弃按钮
        this.gFlag = this.$route.query.gFlag
        console.log(typeof this.modifyFlag)
        if (this.goodsId) {
          if (this.modifyFlag === '2') {
            this.isFromModifyFlag = 2
          } else {
            this.isFromModifyFlag = 1
          }
          getGoodsDetail(this.goodsId).then(res => {
            if (res.status === 200) {
              this.goodstype = []
              this.goodstype.push(res.data.goodsBean.typeCode.substring(0, 4))
              this.goodstype.push(res.data.goodsBean.typeCode)
              this.goodsCode = res.data.goodsBean.goodsCode
              this.handleChange(this.goodstype)
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else if (this.getSelectedOption.length > 0) {
          this.goodstype = this.getSelectedOption
        }
      },
      _getGoodsType() {
        getGoodsType().then((res) => {
          if (res.status === 200) {
            this.goodsTypeTemplate = res.data[0]
            this.format()
            this.isFromModify()
          } else {
            this.$message.error('网络错误' + res.status)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      format() {
        if (this.goodsTypeTemplate) {
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
        var label = ''
        var subLabel = ''
        for (var i in this.goodsTypeTemplate) {
          if (this.goodsTypeTemplate[i].categoryId === value[0]) {
            label = this.goodsTypeTemplate[i].categoryName
            for (var j in this.goodsTypeTemplate[i].subCategories) {
              if (this.goodsTypeTemplate[i].subCategories[j].categoryId === value[1]) {
                subLabel = this.goodsTypeTemplate[i].subCategories[j].categoryName
              }
            }
          }
        }
        this.goodstype = value
        this.setSelectedOption(value)
        this.setSelectedLabel({
          label: label,
          subLabel: subLabel
        })
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
        if (this.isFromModifyFlag === 1) {
          this.$router.push({ path: '/goodsmanage/noshelfgoods' })
        } else if (this.isFromModifyFlag === 2) {
          this.$router.push({ path: '/goodsmanage/onsalegoods' })
        } else {
          this.$router.push({ path: '/goodsmanage/publishgoods' })
        }
      },
      goNext() {
        if (this.goodstype.length > 0) {
          const params = {
            typeCode: this.goodstype[1],
            pattern: 0
          }
          if (this.isFromModifyFlag === 1) {
            checkGoStepTwo(params).then(res => {
              if (res.status === 200) {
                this.$router.push({ name: 'publishstep2', query: { typeCode: this.goodstype[1], goodsCode: this.goodsCode, goodsId: this.goodsId, isFromModifyFlag: this.isFromModifyFlag }})
              } else {
                this.$message.error(res.msg)
              }
            }).catch(err => {
              this.$message.error(err)
            })
          } else if (this.isFromModifyFlag === 2) {
            checkGoStepTwo(params).then(res => {
              if (res.status === 200) {
                if (this.gFlag) {
                  this.$router.push({ name: 'publishstep2', query: { typeCode: this.goodstype[1], goodsCode: this.goodsCode, goodsId: this.goodsId, isFromModifyFlag: this.isFromModifyFlag, gFlag: this.gFlag }})
                } else {
                  this.$router.push({ name: 'publishstep2', query: { typeCode: this.goodstype[1], goodsCode: this.goodsCode, goodsId: this.goodsId, isFromModifyFlag: this.isFromModifyFlag }})
                }
              } else {
                this.$message.error(res.msg)
              }
            }).catch(err => {
              this.$message.error(err)
            })
          } else {
            checkGoStepTwo(params).then(res => {
              if (res.status === 200) {
                this.$router.push({ name: 'publishstep2', query: { typeCode: this.goodstype[1] }})
              } else {
                this.$message.error(res.msg)
              }
            }).catch(err => {
              this.$message.error(err)
            })
          }
        } else {
          this.$message.error('请选择您的商品类别')
        }
      },
      ...mapMutations({
        setSelectedOption: 'SET_SELECTEDOPTION',
        setSelectedLabel: 'SET_SELECTEDLABELS'
      })
    }
  }
</script>
<style scoped>
.el-cascader-menu{height: 350px;}
</style>
