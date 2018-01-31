<template>
  <div class="Authenticater" style="margin: 20px">
    <h3 class="title">授权管理</h3>
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
    <br/>
    <div class="buttons" >
      <!-- <el-button type="primary" @click="getCheckedNodes">提交</el-button> -->
      <el-button type="primary" @click="getCheckedKeys">提交</el-button>
      <el-button type="primary" @click="resetChecked">清空</el-button>
    </div>
  </div>
</template>

<script>
  import store from '../../store'
  import { getAllResources } from '@/api/authentication'

  export default {
    data() {
      return {
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
    mounted () {
      this.getAllPermissions()
    },
    methods: {
      getAllPermissions() {
        this.loading = true
        return new Promise((resolve, reject) => {
          console.log(store.getters.userinfos)
          // 1系统管理 2企业 （roletype: 1----> issystem: 0, roletype: 2---->issystem: 1)
          getAllResources(1).then(response => {
            this.allResources = response.data
            var aliveResources = []
            response.data.forEach(v => {
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
              if (v.status === 0) {
              // status: 0-激活，1-禁用（激活后页面可见，功能可用）
                aliveResources.push(v)
              }
            })
            // 整理数据
            this.data = this.list2Tree(aliveResources, { 'idKey': 'id', 'parentKey': 'parentid', 'childrenKey': 'children' })
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
      getCheckedKeys() {
        var checkedKeys = console.log(this.$refs.tree.getCheckedKeys())
        // 提交选择
        this.$emit('commited', checkedKeys)
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([])
      }
    }
  }
</script>