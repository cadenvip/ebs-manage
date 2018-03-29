<template>
  <div class="app-container">
    <h3 class="title">角色信息详情</h3>
    <div style="color: #606266;font-size:14px;width:960px;overflow:auto;">
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
        <el-col :span="4" style="text-align:right">
          <span>
            角色名称：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ roleForm.rolename }}
          </span> 
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            角色类型：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ formatRoleType }}
          </span> 
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            角色描述：
          </span> 
        </el-col>
        <el-col :span="8">
          <span>
            {{ roleForm.description }}
          </span> 
        </el-col>
      </el-row>
    </div>
    <el-tree
      style="text-align:center;margin-top:20px;margin-left:320px"
      :data="data"
      show-checkbox
      node-key="id"
      :highlight-current="true"
      :default-expand-all="false"
      :props="defaultProps"
      v-loading="loading"
      ref="tree">
    </el-tree>
    <br/>
    <div style="text-align: center">
      <el-button type="primary" @click="onCancel">返回</el-button>
    </div>
  </div>
</template>

<script>

import { getRoleDetail } from '@/api/role'
import { getAllResources } from '@/api/authentication'

export default {
  data() {
    return {
      roleForm: {
        rolename: '',
        roletype: '',
        description: '',
        resourceids: []
      },
      data: [],
      allResources: [],
      filterText: '',
      defaultProps: {
        id: '',
        label: 'label',
        children: 'children',
        parentId: ''
      },
      loading: false
    }
  },
  created() {
    this.getRoleInfo()
  },
  computed: {
    formatRoleType: function() {
      var type = ''
      switch (this.roleForm.roletype) {
        case '1':
          type = '管理角色'
          break
        case '2':
          type = '商家角色'
          break
        case '3':
          type = '商家角色'
          break
        default:
          type = ''
          break
      }
      return type
    }
  },
  methods: {
    getRoleInfo() {
      getRoleDetail(this.$route.query.id).then(response => {
        if (response.status === 200) {
          this.roleForm.rolename = response.data.rolename
          this.roleForm.roletype = response.data.roletype
          this.roleForm.description = response.data.description
          this.roleForm.resourceids = response.data.resourceids.split(',')
          this.getAllPermissions()
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    getAllPermissions() {
      this.data = []
      var issystem = ''
      // 1系统管理 2企业 （roletype: 1----> issystem: 1, roletype: 2(3)---->issystem: 0)
      if (this.roleForm.roletype === '1') {
        issystem = 0
      } else {
        issystem = 1
      }
      this.loading = true
      getAllResources(issystem).then(response => {
        if (response.status === 200) {
          this.allResources = response.data
          var aliveResources = []
          response.data.forEach(v => {
            // 所有节点禁用
            v.label = v.name
            v.disabled = true
            delete v.type
            delete v.url
            delete v.permission
            delete v.ordernum
            delete v.createdate
            delete v.statusdate
            delete v.image
            delete v.typestr
            delete v.rootNode
            if (v.status === 0) {
              // status: 0-激活，1-禁用（激活后页面可见，功能可用）
              aliveResources.push(v)
            }
          })
          // 整理数据
          this.data = this.list2Tree(aliveResources, { 'idKey': 'id', 'parentKey': 'parentid', 'childrenKey': 'children' })
          // 设置选中
          this.$refs.tree.setCheckedKeys(this.roleForm.resourceids)
          this.loading = false
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.loading = false
        this.$message.error(error)
      })
    },
    list2Tree(arr, options) {
      options = options || {}
      var ID_KEY = options.idKey || 'id'
      var PARENT_KEY = options.parentKey || 'parent'
      var CHILDREN_KEY = options.childrenKey || 'children'

      var tree = []
      var childrenOf = {}
      var item, id, parent

      for (var i = 0, length = arr.length; i < length; i++) {
        item = arr[i]
        id = item[ID_KEY]
        parent = item[PARENT_KEY] || 0
        // every item may have children
        childrenOf[id] = childrenOf[id] || []
        // init its children
        item[CHILDREN_KEY] = childrenOf[id]
        // 顶层节点
        if (parent !== 0) {
          // init its parent's children
          childrenOf[parent] = childrenOf[parent] || []
          // push it into its parent's children
          childrenOf[parent].push(item)
        } else {
          tree.push(item)
        }
      }
      return tree
    },
    onCancel() {
      this.$router.push({ path: '/system/role/list' })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>