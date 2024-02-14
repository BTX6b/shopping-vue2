<template>
  <div class="home-container">
    <!-- 引用的全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floorList" :key="item.id" :list="item"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/views/home/listContainer/ListContainer.vue'
import Recommend from '@/views/home/recommend/Recommend.vue'
import Rank from '@/views/home/rank/Rank.vue'
import Like from '@/views/home/like/Like.vue'
import Floor from '@/views/home/floor/Floor.vue'
import Brand from '@/views/home/brand/Brand.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList
    })
  },
  mounted() {
    this.$store.dispatch('getFloorList')
  }
}
</script>

<style lang="less" scoped></style>
