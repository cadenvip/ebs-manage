<template>
  <div class="Authenticater">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :highlight-current="true"
      :default-expand-all="false"
      :props="defaultProps"
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
  import { getAllPermissions } from '@/api/authentication'

  export default {
    data() {
      return {
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
    mounted () {
      this.getAllPermissions()
    },
    methods: {
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
      // getCheckedNodes() {
      //   console.log(this.$refs.tree.getCheckedNodes())
      // },
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