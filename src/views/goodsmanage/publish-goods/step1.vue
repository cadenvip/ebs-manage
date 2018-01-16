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
        <el-cascader @change="handleChange" :options="optionsWithDisabled">
        </el-cascader>
      </div>
      <div style="margin-top: 50px;">
        <span style="padding-right: 20px;font-size:20px;">请选择您的商品类型:</span>
        <el-radio v-model="radio" label="1">普通商品</el-radio>
        <el-radio v-model="radio" label="2">急推商品</el-radio><i @click="open" style="padding-left: 10px;cursor:pointer;" class="el-icon-question "></i>
      </div>
      <div style="margin-top: 50px; text-align: center;">
        <el-button @click="goBack" type="primary">返回上一步</el-button>
        <el-button @click="goNext" type="primary">保存并下一步</el-button>
      </div>
    </el-main>
    
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        radio: '1',
        optionsWithDisabled: [{
          value: '1',
          label: '米面粮油',
          children: [{
            value: '11',
            label: '食用油'
          }, {
            value: '12',
            label: '大米'
          },
          {
            value: '11',
            label: '挂面'
          }, {
            value: '12',
            label: '杂粮'
          },
          {
            value: '11',
            label: '面粉'
          }]
        },
        {
          value: '2',
          label: '生鲜水果',
          children: [{
            value: '21',
            label: '水果'
          }, {
            value: '22',
            label: '蔬菜'
          },
          {
            value: '23',
            label: '肉类'
          }, {
            value: '24',
            label: '蛋类'
          },
          {
            value: '25',
            label: '水产'
          }, {
            value: '26',
            label: '家禽'
          }]
        }]
      }
    },
    methods: {
      handleChange(value) {
        console.log(value)
      },
      open() {
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
        this.$router.push({ path: '/goodsmanage/publishstep2' })
      }
    }
  }
</script>
