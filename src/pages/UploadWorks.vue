<template>
  <div>
    <div class="UploadWorks">
      <el-card class="m">
        <el-steps
          :active="active"
          finish-status="wait"
          align-center
          process-status="process"
        >
          <el-step
            title="步骤 1"
            description="填写作品信息"
            :status="step1"
          ></el-step>
          <el-step
            title="步骤 2"
            description="选择教学设计文档"
            ref="step2"
            :status="step2"
          ></el-step>
          <el-step
            title="步骤 3"
            description="选择视频"
            :status="step3"
          ></el-step>
        </el-steps>
        <el-form :model="work" :rules="workRules" ref="workFormRef">
          <!-- 上传作品名称 -->
          <el-form-item v-show="active == 0" label="作品名称" prop="title">
            <el-input v-model="work.title"></el-input>
          </el-form-item>
          <!-- 上传作品描述 -->
          <el-form-item v-show="active == 0" label="作品描述" prop="text">
            <el-input
              type="textarea"
              :rows="8"
              v-model="work.text"
              placeholder="内容不能超过100个字"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
          <!-- 上传教学设计word文档 -->
          <el-form-item v-show="active == 1" label="教学设计文档">
            <el-upload
              class="upload-demo"
              drag
              action=""
              :auto-upload="false"
              :limit="1"
              ref="upload1"
              accept=".doc,.docx"
              :on-change="changeUpload1"
              :before-upload="beforeUpload1"
              :on-remove="remove1"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点这里</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传1个word文档，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <!-- 上传视频 -->
          <el-form-item v-show="active == 2" label="视频">
            <el-upload
              class="upload-demo"
              drag
              action=""
              :auto-upload="false"
              :limit="1"
              ref="upload2"
              accept=".mp4"
              :on-change="changeUpload2"
              :before-upload="beforeUpload2"
              :on-remove="remove2"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点这里</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传1个mp4文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-button class="back" @click="back" ref="back">上一步</el-button>
        <el-button class="back" @click="next" ref="next">下一步</el-button>
        <el-button class="uploadBtn" @click="uploadBtn">点击上传</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadWorks',
  data() {
    return {
      active: 0,
      step1: '',
      step2: '',
      step3: '',
      file1: [],
      work: {
        title: '',
        text: '',
      },
      workRules: {
        title: [
          { required: true, message: '请输入作品名', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在1~20个字符之间',
            trigger: 'blur',
          },
        ],
        text: [
          { required: true, message: '请输入作品描述', trigger: 'blur' },
          {
            min: 5,
            max: 100,
            message: '长度在5~100个字符之间',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    video() {
      this.$refs.upload2.submit()
    },
    back() {
      if (this.active == 0) return
      this.active--
    },
    next() {
      if (this.active == 2) return
      this.active++
      this.$refs.workFormRef.validate((valid) => {
        if (!valid) return (this.step1 = '')
        this.step1 = 'success'
      })
    },

    changeUpload1(file) {
      let fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)
      const whiteList = ['doc', 'docx']
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$refs.upload2.clearFiles()
        this.$message.warning('上传文件只能是doc、docx格式!')
        return
      } else if (file.size <= 0) {
        this.$refs.upload2.clearFiles()
        this.$message.warning('文件' + file.name + '不能为空')
        return
      }
      this.step2 = 'success'
    },
    beforeUpload1(file) {
      let isLt = file.size / 1024 < 500
      if (!isLt) {
        this.$refs.upload2.clearFiles()
        this.$message.warning('上传文件不能超过500KB! 请重新上传')
        return false
      }
    },
    remove1() {
      this.step2 = ''
    },
    async submitUpload1() {
      let file = this.$refs.upload1.uploadFiles.pop().raw
      let formData = new FormData()
      formData.append('file', file)
      const { data: res } = await this.$http({
        method: 'POST',
        url: '/work/uploadDocument',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (res.meta.status !== 200) return this.$message.error('文档上传失败！')
      return res.data.documentName
    },
    changeUpload2(file) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'mp4'
      if (!extension) {
        this.$refs.upload1.clearFiles()
        this.$message.warning('上传文件只能是mp4格式!')
        return
      } else if (file.size <= 0) {
        this.$refs.upload1.clearFiles()
        this.$message.warning('视频' + file.name + '不能为空')
        return
      }
      this.step3 = 'success'
    },
    beforeUpload2(file) {
      let isLt = file.size / 1024 < 500
      if (!isLt) {
        this.$refs.upload1.clearFiles()
        this.$message.warning('上传视频不能超过500KB! 请重新上传')
        return false
      }
    },
    remove2() {
      this.step3 = ''
    },
    async submitUpload2() {
      let file = this.$refs.upload2.uploadFiles.pop().raw
      let formData = new FormData()
      formData.append('file', file)
      const { data: res } = await this.$http({
        method: 'POST',
        url: '/work/uploadVideo',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (res.meta.status !== 200) return this.$message.error('视频上传失败！')
      return res.data.videoName
    },
    uploadBtn() {
      this.$refs.workFormRef.validate(async (valid) => {
        if (
          valid &&
          this.$refs.upload1.uploadFiles.length == 1 &&
          this.$refs.upload2.uploadFiles.length == 1
        ) {
          let documentName = await this.submitUpload1()
          let videoName = await this.submitUpload2()
          const { data: res } = await this.$http.post('/work/addWork', {
            workName: this.work.title,
            workDescription: this.work.text,
            phone: window.sessionStorage.getItem('phone'),
            documentName,
            videoName,
          })
          if (res.meta.status !== 200)
            return this.$message.error(res.meta.message)
          this.$message.success(res.meta.message)
          this.step1 = ''
          this.step2 = ''
          this.step3 = ''
          this.$refs.workFormRef.resetFields()
          this.active = 0
        } else {
          this.$message.closeAll()
          return this.$message.warning('请完整填写上传资料！')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.UploadWorks {
  width: 100%;
  padding: 50px 0;
  background-color: #f6f7f9;
  .el-card {
    height: 600px;
    background-color: #fff;
  }
  .el-form {
    width: 100%;
    height: 360px;
    margin-top: 50px;
    border-top: 1px dashed #dcdcdc;
    border-bottom: 1px dashed #dcdcdc;
    .upload-demo {
      width: 360px;
      margin: 60px auto 0;
    }
    .el-form-item {
      margin: 10px auto 0;
      width: 800px;
    }
  }

  .back,
  .uploadBtn {
    width: 100px;
    height: 40px;
    background-color: #ff7d27;
    color: #fff;
    float: left;
    border: none;
    margin-top: 30px;
  }
  .uploadBtn {
    float: right;
    background-color: #67c23a;
  }
}
</style>