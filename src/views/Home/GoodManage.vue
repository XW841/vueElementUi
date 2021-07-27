<template>

  <div>
    <el-main>
      <el-table :data="goodList">
        <el-table-column prop="name"
                         label="物品名称"
                         width="300"
                         height='1000'>
        </el-table-column>
        <el-table-column prop="weight"
                         label="重量"
                         width="120">
        </el-table-column>
        <el-table-column prop="price"
                         label="价格"
                         width="120">
        </el-table-column>
        <el-table-column prop="number"
                         label="剩余数量"
                         width="120px">
        </el-table-column>
        <el-table-column prop="isHot"
                         label="参与促销"
                         width="120px">
        </el-table-column>
        <el-table-column prop="hotNumber"
                         label="参与促销数量"
                         width="120px">
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="80"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </el-main>
    <!-- <el-button type="primary"
               @click="taggle">登录</el-button> -->

  </div>
</template>

<script>
// import { Button } from 'element-ui';
import Vue from 'vue'
// Vue.use(Button)


import { getGoodsList } from '../../ajax/api'
export default {
  data () {
    const goodsitem = Array.apply(null, { length: 7 }).map(() => ({
      name: '',
      weight: '',
      price: '',
      number: '',
      isHot: '',
      hotNumber: ''
    }));

    return {

      token: window.sessionStorage.getItem('token'),
      pagenum: 100,  //拿后面的数据
      currentIndex: 1,
      goodList: goodsitem


    };
  },
  mounted () {

    getGoodsList(this.pagenum).then(data => {
      console.log(data)

      this.setValue(data)



    })
  },
  components: {},

  computed: {},

  methods: {

    handleCurrentChange (currentIndex) {

      this.currentIndex = currentIndex + 8
      this.pagenum = this.currentIndex;
      getGoodsList(this.pagenum).then(data => {
        console.log(data.data.goods)
        this.setValue(data)
      })
    },
    //赋值
    setValue (data) {

      const goods = data.data.goods


      goods.forEach((item, index) => {
        // console.log(item.goods_name)

        this.goodList[index].name = item.goods_name
        this.goodList[index].weight = item.goods_weight
        this.goodList[index].price = item.goods_price
        this.goodList[index].number = item.goods_number
        this.goodList[index].isHot = item.is_promote == 'true' ? '是' : '否'
        this.goodList[index].hotNumber = item.hot_mumber
      })

    },

    taggle () {
      this.pagenum++;
      getGoodsList(this.pagenum).then(data => {

        console.log(data.goods)
        this.setValue(data.goods)
      })

    }
  },
  // beforeRouteLeave (to, from, next) {
  //   if (to.path === '/Login') {
  //     if (!from.meta.keepLive) {
  //       from.meta.keepAlive = false;
  //     }
  //   } else {
  //     from.meta.keepAlive = true;
  //     to.meta.keepAlive = true;
  //     this.$destroy();
  //   }
  //   next();
  // },
}
</script>
<style lang="scss" scoped>
.el-main {
}
>>> .el-pagination {
  margin: 5px 200px;
}
>>> .cell {
  height: 50px;
  overflow: hidden;
}
</style>