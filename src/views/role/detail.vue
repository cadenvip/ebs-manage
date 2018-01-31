<template>
  <div class="app-container">
    <h3 class="title">角色信息详情</h3>
    <el-form label-width="120px">
      <el-form-item label="角色名称：" prop="rolename">
        <el-input v-model="roleForm.rolename" style="width: 600px;" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色类型：" prop="roletype">
        <el-select v-model="roleForm.roletype" clearable placeholder="请选择" style="width: 600px;" disabled >
          <el-option label="系统管理" value="1"></el-option>
          <el-option label="企业" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色描述：" prop="description">
        <el-input type="textarea" v-model="roleForm.description" style="width: 600px;" placeholder="请输入角色描述" disabled ></el-input>
      </el-form-item>
      <el-form-item label="权限绑定：" prop="resourceids">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :highlight-current="true"
          :default-expand-all="false"
          :props="defaultProps"
          v-loading="loading"
          ref="tree">
        </el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
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
  methods: {
    getRoleInfo() {
      return new Promise((resolve, reject) => {
        getRoleDetail(this.$route.query.id).then(response => {
          this.roleForm.rolename = response.data.rolename
          this.roleForm.roletype = response.data.roletype
          this.roleForm.description = response.data.description
          this.roleForm.resourceids = response.data.resourceids.split(',')
          this.getAllPermissions()
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAllPermissions() {
      this.data = []
      var issystem = ''
      // 1系统管理 2企业 （roletype: 1----> issystem: 1, roletype: 2---->issystem: 0)
      if (this.roleForm.roletype === '1') {
        issystem = 0
      } else {
        issystem = 1
      }
      this.loading = true
      return new Promise((resolve, reject) => {
        getAllResources(issystem).then(response => {
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
          resolve(response)
        }).catch(error => {
          this.loading = false
          reject(error)
        })
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
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>