<template>
  <div class="search-container">
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeKey">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeWord">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.tmName }}
              <i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(':')[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @getTradMarkInfo="getTradMarkInfo"
          @getAttrInfo="getAttrInfo"
        ></SearchSelector>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      class="iconfont"
                      :class="{
                        'icon-arrowdown': !isAsc,
                        'icon-arrowup': isAsc
                      }"
                      v-show="isOne"
                    ></span
                  ></a>
                </li>
                <!-- <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li> -->
                <!-- <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li> -->
                <li :class="{ active: !isOne }" @click="changeOrder('2')">
                  <a
                    >价格
                    <span
                      class="iconfont"
                      :class="{
                        'icon-arrowdown': !isAsc,
                        'icon-arrowup': isAsc
                      }"
                      v-show="!isOne"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 此处to应该是动态的 -->
                    <router-link :to="`/detail/${item.id}`">
                      <img :src="item.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ item.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ item.id }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPage="getPage(pageNo)"
          ></Pagination>
          <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeNav from '../../components/typeNav/TypeNav.vue'
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters } from 'vuex'
export default {
  name: 'Search',
  components: {
    SearchSelector,
    TypeNav
  },
  data() {
    return {
      searchParams: {
        // 1级分类
        categoryId1: '',
        categoryId2: '',
        categoryId3: '',
        categoryName: '',
        keyword: '',
        // 排序 1: 综合,2: 价格 asc: 升序,desc: 降序 示例: "1:desc"
        order: '1:desc',
        // 所在页数
        pageNo: 1,
        // 页面显示页数
        pageSize: 10,
        // 关键词
        props: [],
        // 品牌
        trademark: ''
      }
    }
  },
  // 先与mounted之前合并参数
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
    console.log(this.$route.query)
    console.log(this.searchParams)
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters(['goodsList']),
    // 计算order是否拥有active类 css
    isOne() {
      return this.searchParams.order.includes('1')
    },
    // 计算order是否是升序还是降序  asc: 升序,desc: 降序
    isAsc() {
      return this.searchParams.order.includes('asc')
    },
    // 获取总页数
    total() {
      return this.$store.state.search.searchList.total
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // getData() {
    //   this.$store.dispatch('getSearchList', this.searchParams)
    // },
    removeKey() {
      this.searchParams.categoryName = undefined
      this.searchParams.categoryId1 = undefined
      this.searchParams.categoryId2 = undefined
      this.searchParams.categoryId3 = undefined
      this.getData()
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    removeWord() {
      this.searchParams.keyword = undefined
      this.getData()
      this.$bus.$emit('clear')
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    removeTrademark() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 自定义事件回调
    getTradMarkInfo(item) {
      this.searchParams.trademark = item
      this.getData()
    },
    // 自定义事件回调
    getAttrInfo(attrName, attrsList) {
      // console.log(attrName)
      const props = `${attrName}:${attrsList}`
      // 数组去重
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props)
      }
      this.getData()
    },
    // 判断为综合(1)还是价格(2) 升序或降序排列  默认综合降序
    changeOrder(flag) {
      if (flag === '1') {
        this.isAsc === true
          ? (this.searchParams.order = `${flag}:${'desc'}`)
          : (this.searchParams.order = `${flag}:${'asc'}`)
      } else {
        this.isAsc === true
          ? (this.searchParams.order = `${flag}:${'desc'}`)
          : (this.searchParams.order = `${flag}:${'asc'}`)
      }
      this.getData()
    },
    // 自定义事件
    getPage(pageNo) {
      // 更新数据
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  watch: {
    // 监听路由变化 如果变化 发起请求
    $route(newValue, oldValue) {
      // undefined 节约带宽
      this.searchParams.categoryId1 = undefined
      this.searchParams.categoryId2 = undefined
      this.searchParams.categoryId3 = undefined
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
