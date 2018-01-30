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
      <el-form-item label="权限绑定：" prop="permissions">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :highlight-current="true"
          :default-expand-all="false"
          :props="defaultProps"
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
import { getAllPermissions } from '@/api/authentication'

export default {
  data() {
    return {
      roleForm: {
        rolename: '',
        roletype: '',
        description: '',
        permissions: ''
      },
      data: [],
      resources: [],
      filterText: '',
      defaultProps: {
        id: '',
        label: 'label',
        children: 'children',
        parentId: ''
      }
    }
  },
  created() {
    this.getRoleInfo()
  },
  mounted () {
    this.getAllPermissions()
  },
  methods: {
    getRoleInfo() {
      return new Promise((resolve, reject) => {
        getRoleDetail(this.$route.query.id).then(response => {
          this.roleForm = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAllPermissions() {
      return new Promise((resolve, reject) => {
        // TODO 根据用户id（不一定是id，可能是其他用户信息）获取所有可选权限
        getAllPermissions().then(response => {
          this.resources = response.list
          var permissions = []
          response.list.forEach(v => {
            v.label = v.name
            delete v.type
            delete v.url
            delete v.permission
            delete v.ordernum
            delete v.createdate
            delete v.statusdate
            delete v.image
            delete v.typestr
            delete v.rootNode
            permissions.push(v)
          })
          // 整理数据
          this.data = this.list2Tree(permissions, { 'idKey': 'id', 'parentKey': 'parentid', 'childrenKey': 'children' })
          resolve(response)
        }).catch(error => {
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