<template>
  <div>
    <div class="personal">
      <el-card class="m">
        <div class="left">
          <div class="imgBox">
            <img
              :src="'http://127.0.0.1:3007/images/' + userinfo.avatar"
              fit="cover"
              id="avatar"
            />
          </div>
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:3007/user/uploadAvatar"
            :limit="1"
            accept=".png,.jpg"
            :show-file-list="false"
            :data="user"
            ref="upload"
            :on-success="success"
            :on-change="changeUpload"
            :before-upload="beforeUpload"
            :headers="headers"
          >
            <el-button size="small" type="primary">更换头像</el-button>
          </el-upload>
          <el-button class="outLogin" @click="outLogin">退出登录</el-button>
        </div>
        <div class="right">
          <div class="title">
            <h3>基础资料</h3>
            <div>
              <i class="el-icon-edit"></i>
              <span class="edit" @click="editBtn">编辑</span>
            </div>
          </div>
          <div>
            <div class="userinfo">
              用户名：<span>{{ userinfo.username }}</span>
            </div>
            <div class="userinfo">
              电话：<span>{{ userinfo.phone }}</span>
            </div>
            <div class="userinfo">
              任教学校：<span>{{ userinfo.school }}</span>
            </div>
          </div>
          <div class="title" style="margin-top: 22px; padding-top: 10px">
            <h3>我的作品</h3>
          </div>
          <el-table
            :data="workList"
            style="width: 100%"
            stripe
            height="308"
            size="mini"
            :default-sort="{ prop: 'upload_time', order: 'descending' }"
          >
            <el-table-column
              type="index"
              label="序号"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="work_name"
              label="作品名称"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="upload_time" label="上传时间" align="center">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-dialog
        title="编辑个人信息"
        width="40%"
        :visible.sync="dialogVisible"
        @close="addDialogClosed"
      >
        <el-form
          :model="editUser"
          ref="userinfoRef"
          :rules="userinfoRules"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editUser.username"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="editUser.phone"></el-input>
          </el-form-item>
          <el-form-item label="任教学校" prop="school">
            <el-input v-model="editUser.school"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRequest">修 改</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personal',
  data() {
    let checkPhone = (rule, value, cb) => {
      const regPhone =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (regPhone.test(value.trim())) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      userinfo: {
        username: '',
        phone: '',
        school: '',
        avatar: '',
        oldPhone: window.sessionStorage.getItem('phone'),
      },
      workList: [],
      dialogVisible: false,
      userinfoRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur',
          },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: checkPhone,
            trigger: 'blur',
          },
        ],
        school: [{ required: true, message: '请输入学校名', trigger: 'blur' }],
      },
      user: {
        phone: window.sessionStorage.getItem('phone'),
        oldAvatar: '',
      },
      headers: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      isloading: false,
      editUser: {},
    }
  },
  methods: {
    outLogin() {
      window.sessionStorage.clear()
      this.$router.push('/index/loginAndRegistration/login')
    },
    changeUpload(file) {
      let fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)
      const whiteList = ['jpg', 'png']
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$refs.upload.clearFiles()
        this.$message.warning('上传文件只能是jpg、png格式!')
        return
      }
    },
    beforeUpload(file) {
      let isLt = file.size / 1024 < 500
      if (!isLt) {
        this.$refs.upload.clearFiles()
        this.$message.warning('上传文件不能超过500KB! 请重新上传')
        return false
      } else if (file.size <= 0) {
        this.$message.warning('文件' + file.name + '不能为空')
        return false
      }
    },
    async getUser() {
      const { data: res } = await this.$http.get('/user/getUser', {
        params: {
          phone: window.sessionStorage.getItem('phone'),
        },
      })
      if (res.meta.status !== 200) return this.$message.error(res.message)
      this.userinfo.username = res.data.user.username
      this.userinfo.phone = res.data.user.phone
      this.userinfo.school = res.data.user.school
      this.userinfo.avatar = res.data.user.avatar
      this.user.oldAvatar = res.data.user.avatar
      this.workList = res.data.workList
    },
    success(response) {
      if (response.meta.status !== 200)
        return this.$message.error('更换头像失败!')
      this.$message.success(response.meta.message)
      this.userinfo.avatar = response.data.avatar
    },
    addDialogClosed() {
      this.$refs.userinfoRef.resetFields()
    },
    editBtn() {
      this.editUser = { ...this.userinfo }
      this.dialogVisible = true
    },
    async editRequest() {
      this.$message.closeAll()
      const { data: res } = await this.$http.put(
        '/user/uploadUserinfo',
        this.editUser
      )
      if (res.status !== 200) return this.$message.error('服务器繁忙')
      this.userinfo.username = this.editUser.username
      this.userinfo.phone = this.editUser.phone
      this.userinfo.school = this.editUser.school
      window.sessionStorage.setItem('phone', this.editUser.phone)
      this.$message.success(res.message)
      this.dialogVisible = false
    },
  },
  created() {
    this.getUser()
  },
}
</script>

<style lang="less" scoped>
.personal {
  background-color: #f6f7f9;
  padding: 50px 0;
  .el-card {
    height: 600px;
    padding-top: 10px;
    .left,
    .right {
      float: left;
      height: 550px;
    }
    .left {
      position: relative;
      width: 35%;
      .imgBox {
        width: 100%;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 200px;
          height: 200px;
          overflow: hidden;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .upload-demo {
        display: flex;
        justify-content: center;
        .el-button {
          background-color: transparent;
          border: none;
          color: #409eff;
        }
      }
      .outLogin {
        background-color: #ff7d27;
        border: none;
        color: #fff;
        position: absolute;
        bottom: 5px;
        left: 158px;
      }
    }
    .right {
      width: 65%;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 3px solid #cdc9c9;
        padding-left: 10px;
        padding-bottom: 10px;
        .edit {
          font-size: 14px;
          color: #409eff;
          cursor: pointer;
        }
      }
      .userinfo {
        width: 100%;
        height: 40px;
        font-size: 14px;
        color: #303133;
        font-weight: 700;
        padding-left: 10px;
        line-height: 40px;
        border-bottom: 1px dashed #cdc9c9;
        margin-bottom: 5px;
        span {
          color: #646464;
          font-weight: 400;
        }
      }
      .el-table {
        max-height: 308px;
      }
    }
  }
}
</style>