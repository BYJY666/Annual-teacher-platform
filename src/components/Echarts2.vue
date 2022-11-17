<template>
  <div>
    <div ref="main2" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GridComponent, BarChart, CanvasRenderer])

export default {
  name: 'Echarts2',
  methods: {
    async echarts() {
      const { data: res } = await this.$http.get('/work/everyyear')
      if (res.meta.status !== 200) return this.$message.error(res.meta.message)

      let chartDom = this.$refs.main2
      let myChart = echarts.init(chartDom)
      let option

      option = {
        title: {
          text: '作品提交概况',
          left: 'left',
        },
        xAxis: {
          type: 'category',
          data: res.data.x,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: res.data.y,
            type: 'bar',
          },
        ],
      }

      option && myChart.setOption(option)
    },
  },
  mounted() {
    this.echarts()
  },
}
</script>

<style>
</style>