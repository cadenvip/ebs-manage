<template>
  <div style="padding: 40px;">
    <h1 style="font-size: 15px; font-weight: bold;">基础信息</h1>
    <el-form label-width="120px" :model="formData">
      <el-form-item label="商品分类名称" prop="typeName" :rules="[{ required: true, message: '请输入商品分类名称', trigger: 'blur' }]">
        <el-input style="width: 35%;" v-model.trim="formData.typeName"></el-input>
      </el-form-item>
      <el-form-item label="上级商品分类" :rules="[{ required: true}]">
        <el-input @focus="showDialog = true" style="width: 35%;" prop="sjfl" v-model="formData.superTypeName"></el-input>
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

    <el-dialog title="选择上级商品分类" :visible.sync="showDialog" center>
      <el-form :model="dialogForm">
        <el-form-item label="商品分类" label-width="120px">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>

          <el-tree style="margin-top: 20px;"
            class="filter-tree"
            :data="treeData"
            accordion
            :props="defaultProps"
            @node-click="handleNodeClick"
            :filter-node-method="filterNode"
            ref="tree">
          </el-tree>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmTypeCode">确 定</el-button>
      </div>
    </el-dialog>     
  </div>
</template>

<script>
  import { getGoodsType } from '@/api/goodsRelease'
  import { goodsTypeSave } from '@/api/goodstype'
  export default {
    created() {
      this._getGoodsType()
    },
    data() {
      return {
        filterText: '',
        showDialog: false,
        formData: {
          typeName: '',
          superTypeCode: '',
          superTypeName: '',
          clevel: 0,
          description: ''
        },
        dialogForm: {},
        treeData: [],
        defaultProps: {
          children: 'subCategories',
          label: 'categoryName'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        this.tempData = data
      },
      _getGoodsType() {
        getGoodsType().then(res => {
          if (res.status === 200) {
            this.treeData = res.data
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.categoryName.indexOf(value) !== -1
      },
      confirmTypeCode() {
        this.showDialog = false
        this.formData.superTypeName = this.tempData.categoryName
        this.formData.superTypeCode = this.tempData.categoryId
        this.formData.clevel = this.tempData.cLevel
      },
      submit() {
        var level = this.formData.clevel
        if (this.formData.typeName === '') {
          this.$message.error('请输入商品分类名称！')
        } else if (this.formData === '') {
          this.$message.error('请输入上级分类名称！')
        } else {
          if (level <= 1) {
            this.$message.error('不能添加一级、二级商品分类')
          } else if (level >= 4) {
            this.$message.error('不能添加三级以下商品分类')
          } else {
            const param = {
              superId: this.formData.superTypeCode,
              caption: this.formData.typeName,
              cDesc: this.formData.description
            }
            goodsTypeSave(param).then(res => {
              if (res.status === 200) {
                this.$router.push({ name: '商品分类', params: { isshow: 1, info: '新增商品分类： 成功！' }})
              } else {
                this.$message.error(res.msg)
              }
            }).catch(err => {
              this.$message.error(err.msg)
            })
          }
        }
        // level 接口未给
        // 判断上级分类level是否为 1 2 或者 大于等于5
        // 满足条件访问接口
      },
      goBack() {
        this.$router.push({ path: '/goodstypemanage/index' })
      }
    },
    computed: {
      getDescLen() {
        return (60 - this.formData.description.length) < 0 ? 0 : (60 - this.formData.description.length)
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    }
  }
</script>

<style scoped>
</style>

