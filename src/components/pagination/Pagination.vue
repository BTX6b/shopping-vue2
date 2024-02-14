<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPage', pageNo - 1)">
      上一页
    </button>
    <button v-if="getStartAndEnd.start > 1" @click="$emit('getPage', 1)">
      1
    </button>
    <button v-if="getStartAndEnd.start > 2">···</button>

    <span v-for="(page, index) in getStartAndEnd.end" :key="index">
      <button
        v-if="page >= getStartAndEnd.start"
        @click="$emit('getPage', page)"
        :class="{ active: pageNo === page }"
      >
        {{ page }}
      </button>
    </span>

    <button v-if="getStartAndEnd.end < totalPage - 1">···</button>
    <button
      v-if="getStartAndEnd.end < totalPage"
      @click="$emit('getPage', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == getStartAndEnd.end"
      @click="$emit('getPage', pageNo + 1)"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    getStartAndEnd() {
      const { continues, pageNo, totalPage } = this
      let start = 0
      let end = 0
      // 非正常 总页数小于连续页码
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        // 正常现象
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // start小于1时
        if (start < 1) {
          start = 1
          end = continues
        }
        // end大于总页码时
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
