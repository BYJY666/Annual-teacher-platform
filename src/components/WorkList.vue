<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="queryInfo.query"
            @input="forceUpdate"
            @keyup.enter.native="getWorkList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getWorkList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" @click="WatchAll">显示全部</el-button>
        </el-col>
        <el-col :span="1.5">
          <slot name="AddBtn"></slot>
        </el-col>
      </el-row>
      <!-- <el-table :data="workList" border stripe> -->
      <slot name="List" v-bind="{ workList }"></slot>
      <!-- </el-table> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagaNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <slot name="AddDialog"></slot>
  </div>
</template>

<script>
export default {
  name: 'Details',
  props: ['url'],
  data() {
    return {
      queryInfo: {
        query: '',
        pageSize: 10,
        pagaNum: 1,
      },
      workList: [],
      total: 0,
    }
  },
  methods: {
    forceUpdate() {
      this.$forceUpdate()
    },
    async getWorkList() {
      const { data: res } = await this.$http({
        url: this.url,
        method: 'GET',
        params: {
          query: this.queryInfo.query,
          pageSize: this.queryInfo.pageSize,
          pageNum: this.queryInfo.pagaNum,
        },
      })
      if (res.meta.status !== 200)
        return this.$message({
          showClose: true,
          message: '获取作品列表失败',
          type: 'error',
        })
      this.workList = res.data.works
      this.total = res.data.total
    },
    //监听 pageSize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getWorkList()
    },

    handleCurrentChange(newCurrent) {
      this.queryInfo.pagaNum = newCurrent
      this.getWorkList()
    },
    WatchAll() {
      this.queryInfo.query = ''
      this.getWorkList()
    },
  },
  created() {
    this.getWorkList()
  },
}
</script>

<style scoped>
.el-pagination {
  margin-top: 15px;
}
</style>