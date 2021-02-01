<template>
  <div class="div">
    <ul>
      <li v-for="k of order.data" :key="k.id">
        <nuxt-link to="/">
          买家： {{ k.buyer }}，卖家：{{ k.seller }}
        </nuxt-link>
      </li>
    </ul>
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-edit"
      @click="addEditFormShow(scope.row)"
    >
      修改
    </el-button>
    <el-pagination
      layout="prev, pager, next"
      :total="order.total"
      :current-page="order.page"
      @current-change="handleChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Order',
  // async asyncData({ $axios, query }) {
  //   const order = await $axios.$get('/api/order/queryList', {
  //     params: query,
  //   })
  //   return { order }
  // },
  data() {
    return {
      order: {},
    }
  },

  methods: {
    handleChange(page) {
      this.$router.push(`/order?page=${page}`)
      // const order = await this.$axios.$get('/api/order/queryList', {
      //   param: { page },
      // })
      // this.order = order
    },
  },
  watchQuery: ['page'],
  head() {
    return {
      title: '订单中心',
    }
  },
}
</script>
