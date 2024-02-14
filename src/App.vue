<template>
  <div id="app">
    <Header></Header>
    <!-- 路由显示的位置 占位符-->
    <router-view></router-view>
    <!-- 是否显示footer组件 通过meta值判断 -->
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    // 把数据请求放在根组件可以减少数据访问请求 因为根组件只加载一次
    this.$store.dispatch('categoryList')
  }
}
</script>

<style lang="less" scoped></style>
