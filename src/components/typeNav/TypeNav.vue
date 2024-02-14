// 三级联动组件
<template>
  <div class="typeNav-container">
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="changeIndex" @mouseenter="enterNav">
          <h2 class="all">全部商品分类</h2>
          <!-- 使用animate库时 在类中使用时需要加上animate__animated -->
          <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <div class="sort" v-show="isShow">
              <div class="all-sort-list2" @click="goSearch">
                <div
                  class="item"
                  v-for="(item1, index) in categoryList"
                  :key="item1.categoryId"
                  @mouseenter="currentIndex(index)"
                  :class="{ changeColor: currenIndex == index }"
                >
                  <h3>
                    <a
                      :data-categoryName="item1.categoryName"
                      :data-categoryId1="item1.categoryId"
                      >{{ item1.categoryName }}</a
                    >
                  </h3>
                  <div class="item-list clearfix" v-show="currenIndex == index">
                    <div
                      class="subitem"
                      v-for="item2 in item1.categoryChild"
                      :key="item2.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categoryName="item2.categoryName"
                            :data-categoryId2="item2.categoryId"
                            >{{ item2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em
                            v-for="item3 in item2.categoryChild"
                            :key="item3.categoryId"
                          >
                            <a
                              :data-categoryName="item3.categoryName"
                              :data-categoryId3="item3.categoryId"
                              >{{ item3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// lodash在module已经有了此工具类库 只需要引入就行了  此处按需默认引入throttle 不要加{}
import throttle from 'lodash/throttle.js'
// 导入动画库
// eslint-disable-next-line no-unused-vars
import animate from 'animate.css'

export default {
  name: 'TypeNav',
  data() {
    return {
      currenIndex: -1,
      isShow: true
    }
  },
  // 组件挂载完毕 向服务器请求数据 created也行
  mounted() {
    if (this.$route.path !== '/home') {
      this.isShow = false
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList
    })
  },
  methods: {
    // throttle节流函数
    currentIndex: throttle(function (index) {
      this.currenIndex = index
    }, 50),
    changeIndex() {
      if (this.$route.path !== '/home') {
        this.isShow = false
      } else {
        this.currenIndex = -1
      }
    },
    goSearch(event) {
      const el = event.target
      console.log(el)
      // 自定义属性 data-名称 可通过dataset来获取
      // 注意 在自定义属性中的属性名如果有大写 会转换成小写 categoryName  => categoryname
      const { categoryname, categoryId1, categoryId2, categoryId3 } = el.dataset
      if (categoryname) {
        // 设置路由参数
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        if (categoryId1) {
          query.categoryId1 = categoryId1
        } else if (categoryId2) {
          query.categoryId2 = categoryId2
        } else if (categoryId3) {
          query.categoryId3 = categoryId3
        }
        // 合并参数对象
        if (this.$route.params) {
          location.params = this.$route.params
          location.query = query
          this.$router.push(location)
        }
      }
    },
    enterNav() {
      if (this.$route.path !== '/home') {
        this.isShow = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  a {
    cursor: pointer;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .changeColor {
          background-color: skyblue;
        }
      }
    }
  }
}
</style>
