<template>
  <div style="padding: 20px;">
    <el-form label-width="0px">
      <el-row :gutter="20" style="border-bottom: 1px dotted #e5e5e5;">
        <el-col :span="4">
          <el-form-item>
            <el-input placeholder="请输入商品分类名称" :maxlength="20" v-model="filterText"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0 10px 0;background-color: #6ebfec; text-align: center;">
        <el-col :span="2">
          <p style="font-size: 14px; color: #fff;font-weight: bold;">商品分类树:</p>
        </el-col>
        <el-col :span="2">
          <el-button @click="addGoodsType" icon="el-icon-plus" style="margin: 8px;" size="mini" type="">新增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="modifyGoodsType" icon="el-icon-edit" style="margin: 8px;" size="mini" type="">修改</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="deleteGoodsType" icon="el-icon-delete" style="margin: 8px;" size="mini" type="">删除</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="goodsTypeDetail" icon="el-icon-info" style="margin: 8px;" size="mini" type="">详情</el-button>
        </el-col>
      </el-row>
      <el-tree
        :data="data"
        :props="defaultProps"
        accordion
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="handleNodeClick">
      </el-tree>
    </el-form>  
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <span>{{tipInfo}}</span>
      <span slot="footer" >
        <el-button type="primary" size="mini" @click="closeDialog">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%"
      center>
      <span>是否确认删除该商品分类?</span>
      <span slot="footer" >
        <el-button type="primary" @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeleteGoodsType">确 定</el-button>
      </span>
    </el-dialog> 
  </div>
</template>

<script>
  import { getGoodsType } from '@/api/goodsRelease'
  import { CategoryDelete } from '@/api/goodstype'
  export default {
    mounted () {
      this._getGoodsType()
      if (this.$route.params.isshow === 1) {
        this.dialogVisible = true
      } else {
        this.dialogVisible = false
      }
      this.tipInfo = this.$route.params.info
    },
    data() {
      return {
        tipInfo: '',
        dialogVisible: false,
        dialogVisible2: false,
        filterText: '',
        data: [],
        defaultProps: {
          children: 'subCategories',
          label: 'categoryName'
        },
        selectedObj: {
        }
      }
    },
    methods: {
      _getGoodsType() {
        getGoodsType().then(res => {
          if (res.status === 200) {
            this.data = res.data
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        })
      },
      addGoodsType() {
        this.$router.push({ path: '/goodstype/add' })
      },
      handleNodeClick(data) {
        this.selectedObj = data
      },
      filterNode(value, data) {
        if (!value) return true
        return data.categoryName.indexOf(value) !== -1
      },
      modifyGoodsType() {
        if (this.selectedObj.categoryId === undefined) {
          this.$message.error('未选商品分类')
        } else if (this.selectedObj.cLevel <= 2) {
          this.$message.error('不能修改一级、二级商品分类')
        } else {
          this.$router.push({ path: '/goodstype/modify', query: { csid: this.selectedObj.categoryId, name: this.selectedObj.categoryName }})
        }
      },
      deleteGoodsType() {
        if (this.selectedObj.categoryId === undefined) {
          this.$message.error('未选商品分类')
        } else if (this.selectedObj.cLevel <= 2) {
          this.$message.error('不能删除一级、二级商品分类')
        } else {
          this.dialogVisible2 = true
        }
      },
      confirmDeleteGoodsType() {
        CategoryDelete(this.selectedObj.categoryId).then(res => {
          if (res.status === 200) {
            this.tipInfo = '删除商品分类： 成功！'
            this.dialogVisible2 = false
            this.dialogVisible = true
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        })
      },
      goodsTypeDetail() {
        if (this.selectedObj.categoryId === undefined) {
          this.$message.error('未选商品分类')
        } else {
          this.$router.push({ path: '/goodstype/detail', query: { csid: this.selectedObj.categoryId }})
        }
      },
      closeDialog() {
        this.dialogVisible = false
        this.tipInfo = ''
        this._getGoodsType()
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
.dialog-footer{
  text-align: center;
}
</style>

