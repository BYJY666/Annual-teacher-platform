<template>
  <div>
    <Breadcrumb firstName="作品管理" secondName="作品审核"></Breadcrumb>
    <WorkList url="/work/backgroundWork">
      <template v-slot:List="{ workList }">
        <el-table :data="workList" border stripe>
          <el-table-column prop="id" width="50px"></el-table-column>
          <el-table-column label="作品名称" prop="work_name"></el-table-column>
          <el-table-column label="用户名" prop="user_name"></el-table-column>
          <el-table-column label="电话" prop="phone"></el-table-column>
          <el-table-column label="学校" prop="school"></el-table-column>
          <el-table-column
            label="上传时间"
            prop="upload_time"
          ></el-table-column>
          <el-table-column label="审核状态" prop="state">
            <template slot-scope="scope">
              <el-switch
                style="display: block"
                v-model="scope.row.state"
                active-color="#13ce66"
                active-text="已审核"
                inactive-text="未审核"
                @change="workChangeState(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </WorkList>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue'
import WorkList from '../components/WorkList.vue'

export default {
  name: 'Details',
  components: { Breadcrumb, WorkList },
  methods: {
    async workChangeState(workInfo) {
      const { data: res } = await this.$http({
        url: '/work/changeState',
        method: 'PUT',
        data: {
          id: workInfo.id,
          state: workInfo.state,
        },
      })
      if (res.status !== 200) {
        this.$message({
          showClose: true,
          message: '修改失败,请重试!',
          type: 'error',
        })
      }
      this.$message.closeAll()
      this.$message({
        showClose: true,
        message: res.message,
        type: 'success',
      })
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