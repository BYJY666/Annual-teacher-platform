<template>
  <div>
    <Breadcrumb firstName="作品管理" secondName="作品详情"></Breadcrumb>
    <WorkList url="/work/backgroundWork" v-show="!$store.state.isCheckDetails">
      <template v-slot:List="{ workList }">
        <el-table :data="workList" border stripe @row-click="checkDetails">
          <el-table-column prop="id" width="50px"></el-table-column>
          <el-table-column label="作品名称" prop="work_name"></el-table-column>
          <el-table-column
            label="用户名"
            prop="user_name"
            width="80px"
          ></el-table-column>
          <el-table-column label="电话" prop="phone"></el-table-column>
          <el-table-column label="学校" prop="school"></el-table-column>
          <el-table-column label="视频" prop="video"></el-table-column>
          <el-table-column
            label="教学设计文档"
            prop="document"
          ></el-table-column>
          <el-table-column
            label="作品描述"
            prop="work_description"
          ></el-table-column>
          <el-table-column
            label="上传时间"
            prop="upload_time"
          ></el-table-column>
        </el-table>
      </template>
    </WorkList>
    <CheckDetails v-show="$store.state.isCheckDetails"></CheckDetails>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue'
import WorkList from '../components/WorkList.vue'
import CheckDetails from '../components/CheckDetails.vue'

export default {
  name: 'Details',
  components: { Breadcrumb, WorkList, CheckDetails },
  methods: {
    checkDetails(row) {
      this.$store.commit('BECOMESTATE', true)
      this.$store.commit('PASSOBJ', row)
    },
  },
}
</script>

<style scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
  max-height: 68vh;
  overflow: auto;
}
</style>