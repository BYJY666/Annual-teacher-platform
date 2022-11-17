<template>
  <div>
    <el-card>
      <el-row>
        <el-button size="mini" @click="comeBack" class="comeBack"
          >返回</el-button
        >
      </el-row>
      <el-row>
        <el-col :span="6">
          <label for="workname">作品名称：</label
          ><input
            id="workname"
            type="text"
            v-model="CheckDetailsObj.work_name"
          />
        </el-col>
        <el-col :span="6">
          <label for="username">用户名：</label
          ><input
            id="username"
            type="text"
            v-model="CheckDetailsObj.user_name"
          />
        </el-col>
        <el-col :span="6">
          <label for="school">学校：</label
          ><input id="school" type="text" v-model="CheckDetailsObj.school" />
        </el-col>
        <el-col :span="6">
          <label>审核状态：</label
          ><span style="color: black">{{
            CheckDetailsObj.state ? '已审核' : '未审核'
          }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <label for="workdescription">作品描述：</label>
          <textarea
            id="workdescription"
            cols="30"
            rows="10"
            v-model="CheckDetailsObj.work_description"
          ></textarea>
        </el-col>
        <el-col :span="12">
          <label for="">教学设计文档：</label>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <label for="workvideo">视频：</label>
          <video id="workvideo" src=""></video>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CheckDetails',
  data() {
    return {}
  },
  computed: {
    ...mapState(['CheckDetailsObj']),
  },
  methods: {
    ...mapMutations(['BECOMESTATE']),
    comeBack() {
      this.BECOMESTATE(false)
    },
  },
}
</script>

<style lang="less" scoped>
.comeBack {
  float: right;
  background-color: #f5f5f5;
}

.el-row {
  margin-bottom: 50px;
  font-size: 14px;
  color: #909399;
  &:last-child {
    margin-bottom: 10px;
  }
  &:first-child {
    margin-bottom: 20px;
  }
}

.el-col {
  padding-left: 40px;
  label {
    font-weight: 600;
  }
  input {
    width: 11vw;
    border: none;
    outline: none;
    padding: 5px;
    cursor: pointer;
    color: #606266;
  }
  input:focus {
    background-color: #f4f4f4;
  }
  textarea {
    width: 30vw;
    height: 150px;
    resize: none;
    vertical-align: text-top;
    border: none;
    outline: none;
    cursor: pointer;
    color: #606266;
    padding: 5px;
    background-color: #f4f4f4;
  }
  video {
    width: 200px;
    vertical-align: text-top;
  }
}
</style>