<template>
  <div>
    <el-main>
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="商品名称"
                      prop="goodName">
          <el-input v-model="ruleForm.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品分类"
                      prop="goodSort">
          <el-input v-model="ruleForm.sort"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品数量"
                      prop="goodNum">
          <el-input v-model.number="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item label="商品价格"
                      prop="goodPrice">
          <el-input v-model.number="ruleForm.price"></el-input>

        </el-form-item>
        <el-form-item label="商品重量"
                      prop="goodWeght">
          <el-input v-model.number="ruleForm.weight"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import { addGoods } from '../ajax/api'
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        sort: '',
        number: '',
        price: '',
        weight: '',

      },

    };
  },

  components: {},

  computed: {},
  mounted () {
    addGoods().then(data => {
      console.log(data)
    })
  },
  methods: {
    getD () {
      addGoods(this.name, this.sort, this.number, this.price, this.whight).then(data => {
        console.log(data)
      })
    },


    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getD()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }

  }
}
</script>
<style lang='css' scoped>
</style>