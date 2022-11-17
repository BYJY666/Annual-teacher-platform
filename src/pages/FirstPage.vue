<template>
  <div>
    <Banner :banner="banner"></Banner>
    <ExamTerm></ExamTerm>
    <Instructions></Instructions>
    <Works></Works>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import ExamTerm from '../components/ExamTerm.vue'
import Instructions from '../components/Instructions.vue'
import Works from '../components/Works.vue'

export default {
  name: 'FirstPage',
  components: { Banner, ExamTerm, Instructions, Works },
  data() {
    return {
      banner: [
        {
          imgsrc: require('../assets/images/banner1.png'),
          title: '历练 成长',
          content:
            '历练是铁杵磨成针，是习以为常的早睡早起。它不仅能修剪你的残枝败叶，还能破开你心头的氤氲。成长是经历失败还傲然挺立的霸气;成长是历经磨难却心怀感恩的沉着;成长是面对困难却坦然微笑的信心。',
        },
        {
          imgsrc: require('../assets/images/banner2.png'),
          title: '责任 情感',
          content:
            '责任心与人生观、价值观、道德、理想、集体主义、爱国主义紧密相联。如果他的价值取向以奉献为乐，那么他就会有很强的责任心，反之，则对人对事漠然置之。走过老师窗前，看见老师那认真备课的样子；走过老师窗前，看见老师改作业的身影。',
        },
        {
          imgsrc: require('../assets/images/banner3.png'),
          title: '敬业 奉献',
          content:
            '人民教师是一个光荣的职业，兢兢业业爱岗敬业的教师更是令人尊敬。在我们身边有许多敬业的老师，他们时刻为我们学生服务。无论是什么时候都不忘记，潜心教学，一心一意地工作，帮我们学生批改作业，没有一丝怨言。默默奉献地耕耘于三尺讲台上，他们的事业平凡而又伟大。',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
</style>