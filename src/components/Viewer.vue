<template>
  <div id="app">
    <div class="header" :md="24">
      {{movieData.title}} &nbsp;&nbsp;观影者画像
    </div>
    <div class="main container" :md="20">
      <div class="genderChart">
        <div class=genderTitle>受众性别占比</div>
        <div class="chartSize" ref="myEchart"></div>
      </div>
      <div class="genderChart">
        <div class=genderTitle>教育程度</div>
        <div class="chartSize" ref="eduEchart"></div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="ageChart">
        <div class=genderTitle>受众年龄比例</div>
        <div class="ageChartSize" ref="ageEchart"></div>
      </div>
      <div class="ageChart">
        <div class=genderTitle>活跃地区</div>
        <div class="ageChartSize" ref="areaEchart"></div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="ageChart">
        <div class=genderTitle>职业</div>
        <div class="ageChartSize" ref="occupyEchart"></div>
      </div>
      <div class="ageChart">
        <div class=genderTitle>电影类型偏好</div>
        <div class="ageChartSize" ref="preferEchart"></div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="word-Count">
        <div class="ageChartSize" ref="wordCount"></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../base/api.js"
import echarts from "echarts"
import fakedata from "../base/fakedata.js"
import util from "../base/util.js"
let urlParams = util.parseQueryString(window.location.search)
require('echarts-wordcloud');
export default {
  data () {
    return {
      movieData:'',
      activeIndex2: '1',
      isCollapse: true,
      chart: null,
      movieId:urlParams.movieId,
      eduData:[],
      areaData:[],
      genderData:[],
      ageData:[4.3, 33.9, 30, 15.8, 8.4, 7.6],
      occupyData:[
              {value:12.2, name:'学生'},
              {value:55.6, name:'白领'},
              {value:32.2, name:'其他'},
          ],
      preferData:[
              {value:12.2, name:'喜剧'},
              {value:55.6, name:'动作'},
              {value:32.2, name:'爱情'},
      ],
      viewers:[],
    }
  },
  mounted(){
    let self = this
    api.getMovieById({id:this.movieId})
    .onSuccess(function(resp){
      self.movieData=resp.data
      self.areaData = self.movieData.areaData
      self.genderData = self.movieData.genderData
      self.eduData = self.movieData.eduData
      self.viewers = self.movieData.words
      console.log(self.movieData)
      self.initGenderChart()
      self.initEduChart()
      self.initAgeChart()
      self.initAreaChart()
      self.initOccupyChart()
      self.initPreferChart()
      self.initWordConut()
    })
    .onFail(function(){
      console.log("error")
    })

  },
  methods: {
    initGenderChart(){
      let self = this
      self.chart = echarts.init(self.$refs.myEchart);
      self.chart.setOption({
        series:[{
        type: 'treemap',
        data: self.genderData,
        label: {
            normal: {
                show: true,
                position: 'inside',
                formatter: '{b}{c}%'
            }
        }
        }]
      })
    },
    initEduChart(){
      let self = this
      self.chart = echarts.init(self.$refs.eduEchart);
      self.chart.setOption({
        series:[{
        type: 'treemap',
        data: self.eduData,
        label: {
            normal: {
                show: true,
                position: 'inside',
                formatter: '{b}{c}%'
            }
        }
        }]
      })
    },
    initAgeChart(){
      let self = this
      self.chart = echarts.init(self.$refs.ageEchart);
      self.chart.setOption({
        tooltip:{
          trigger: 'item',
          formatter:'{c}%'
        },
        xAxis: {
            type: 'category',
            data: ['20岁以下', '20~24', '25~29', '30~34', '35~39', '40岁以上']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
                },
            show: true
        },
        series: [{
            data: self.ageData,
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}%'
                }
            }
        }]
      })
    },
    initAreaChart(){
      let self = this
      self.chart = echarts.init(self.$refs.areaEchart);
      self.chart.setOption({
        tooltip:{
          trigger: 'item',
          formatter:'{c}%'
        },
        xAxis: {
            type: 'category',
            data: ['一线城市', '二线城市', '三线城市', '四线城市']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
                },
            show: true
        },
        series: [{
            data: self.areaData,
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}%'
                }
            }
        }]
      })
    },
    initOccupyChart(){
      let self = this
      self.chart = echarts.init(self.$refs.occupyEchart);
      self.chart.setOption({
        tooltip:{
          trigger: 'item',
          formatter:'{a} <br/>{b}{c}%'
        },
      series : [
        {
          name:'职业占比',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:self.occupyData,
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
        }
      ]
      })
    },
    initPreferChart(){
      let self = this
      self.chart = echarts.init(self.$refs.preferEchart);
      self.chart.setOption({
        tooltip:{
          trigger: 'item',
          formatter:'{a} <br/>{b}{c}%'
        },
      series : [
        {
          name:'偏好',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:self.preferData,
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
        }
      ]
      })
    },
    initWordConut(){
      let self = this
      self.chart = echarts.init(self.$refs.wordCount);
      self.chart.setOption({
      title: {
          text: '影片标签',
          link: 'https://www.baidu.com/s?wd=' + encodeURIComponent('ECharts'),
          x: 'center',
          textStyle: {
              fontSize: 23
          }

      },
      backgroundColor: '#F7F7F7',
      tooltip: {
          show: true
      },
      toolbox: {
          feature: {
              saveAsImage: {
                  iconStyle: {
                      normal: {
                          color: '#FFFFFF'
                      }
                  }
              }
          }
      },
      series: [{
          name: '热点分析',
          type: 'wordCloud',
          //size: ['9%', '99%'],
          sizeRange: [6, 66],
          //textRotation: [0, 45, 90, -45],
          rotationRange: [-45, 90],
          //shape: 'circle',
          textPadding: 0,
          autoSize: {
              enable: true,
              minSize: 6
          },
          textStyle: {
              normal: {
                  color: function() {
                      return 'rgb(' + [
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160)
                      ].join(',') + ')';
                  }
              },
              emphasis: {
                  shadowBlur: 10,
                  shadowColor: '#333'
              }
          },
          data:self.viewers
      }]

      })
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header{
  height: 60px;
  background: rgb(84, 92, 100);
  color:#fff;
  line-height: 60px;
}
body{
  background: #f2f2f2;
}
.main{
  background: #fff;
  margin:20px auto;
  display: flex;
  flex-wrap: nowrap
}
.genderChart{
  height: 150px;
  width: 50%;
}
.chartSize{
  height: 100px;
  width: 100%;
}
.ageChartSize{
  height: 300px;
  width: 100%;
}
.ageChart{
  height: 320px;
  width: 50%;
}
.word-Count{
  height: 320px;
  width: 100%;
}
</style>
