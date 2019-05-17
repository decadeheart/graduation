<template>
  <div id="app">
  <main-header></main-header>
    <div class="main container" :md="20">
      <div class="chartWrap">
        <div class="topTitle">票房前十</div>
        <div class="chartSize">
          <div class="item" v-for="movie in grades" :key="movie">
            <div><img :src="movie.address" style="height:80px"></div>
            <div class="movieTitle">
              <div>{{movie.title}}/{{movie.englishTitle}}</div>
              <div>￥{{movie.grade}}</div>
            </div>
            <div class="movieType">
              {{movie.types}}
            </div>
          </div>
        </div>
      </div>
      <div class="chartWrap">
        <div class="topTitle">评分前十</div>
        <div class="chartSize">
          <div class="item" v-for="movie in scores" :key="movie">
            <div><img :src="movie.imgUrl" style="height:80px"></div>
            <div class="movieTitle">
              <div>{{movie.name}}</div>
              <div>{{movie.score}}</div>
            </div>
            <div class="movieType">
              {{movie.types}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="ageChart">
        <div class="ageChartSize" ref="gradeEchart"></div>
      </div>
      <div class="ageChart">
        <div class="ageChartSize" ref="scoreEchart">
        </div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="ageChart">
        <div class="ageChartSize" ref="gradeCloud"></div>
      </div>
      <div class="ageChart">
        <div class="ageChartSize" ref="scoreCloud">
        </div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="ageChart">
        <div class="ageChartSize" ref="guiderEchart"></div>
      </div>
      <div class="ageChart">
        <div class="ageChartSize" ref="actorEchart">

        </div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="ageChart">
        <div class="topTitle">2012-2018全国电影票房</div>
        <div class="ageChartSize" ref="countryEchart">

        </div>
      </div>
      <div class="ageChart">
        <div class="ageChartSize" ref="workEchart">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../base/api.js"
import Header from "./Header.vue"
import echarts from "echarts"
import fakeda from "../base/fakedata.js"
import fakedata from '../base/fakedata.js';
require('echarts-wordcloud');
export default {
  components: {
    "main-header": Header,
  },
  data () {
    return {
      isCollapse: true,
      grades:'',
      scores:'',
      gradeData:[8,2,1,2,2,1],
      scoreData:[1, 1, 1, 10, 1, 4],
      gradeCloud:fakedata.gradeCloud,
      scoreCloud:fakedata.scoreCloud
    }
  },
  mounted(){
    let self = this
    api.getTopTen().onSuccess(function(resp){
      console.log(resp)
      self.grades=resp.movies
    })
    .onFail(function(){
      console.log("error2")
    })
    api.getTopScore().onSuccess(function(resp){
      console.log(resp)
      self.scores=resp.movies
    })
    .onFail(function(){
      console.log("error2")
    })
    this.initGradeChart()
    this.initScoreChart()
    this.initGuiderChart()
    this.initActorChart()
    this.initCountryChart()
    this.initWorkChart()
    this.initGradeCloud()
    this.initScoreCloud()
  },
  methods: {
    initGradeChart(){
      let self = this
      self.chart = echarts.init(self.$refs.gradeEchart);
      self.chart.setOption({
        title: {
            text: '高票房类型',
            subtext: '数据来自网络'
        },
        tooltip:{
          trigger: 'item',
          formatter:'{c}部'
        },
        xAxis: {
            type: 'category',
            data:  ['喜剧', '动作', '战争', '科幻', '奇幻', '爱情']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} 部 '
                },
            show: true
        },
        series: [{
            data: self.gradeData,
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}部'
                }
            }
        }]
      })
    },
    initScoreChart(){
      let self = this
      self.chart = echarts.init(self.$refs.scoreEchart);
      self.chart.setOption({
        title: {
            text: '高分类型',
            subtext: '数据来自网络'
        },
        tooltip:{
          trigger: 'item',
          formatter:'{c}部'
        },
        xAxis: {
            type: 'category',
            data:  ['喜剧', '动作', '战争', '剧情', '奇幻', '爱情']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} 部 '
                },
            show: true
        },
        series: [{
            data: self.scoreData,
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}部'
                }
            }
        }]
      })
    },
    initGuiderChart(){
      let self = this
      self.chart = echarts.init(self.$refs.guiderEchart);
      self.chart.setOption({
        title: {
            text: '导演票房Top10',
            subtext: '数据来自网络 截至2018'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter:'{c}亿'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['周星驰','迈克尔贝','冯小刚','徐峥','郑保瑞','詹姆斯卡梅隆','徐克','温子仁','乌尔善','许诚毅']
        },
        series: [
            {
                type: 'bar',
                data: [50.37, 39.41, 32.99, 28.8, 28.49, 28.14,24.88,24.26,24.05,23]
            }
        ]
      })
    },
    initActorChart(){
      let self = this
      self.chart = echarts.init(self.$refs.actorEchart);
      self.chart.setOption({
        title: {
            text: '主演票房Top10',
            subtext: '数据来自网络 截至2018'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter:'{c}亿'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['张涵予','周润发','沈腾','吴京','黄渤','井柏然','徐峥','成龙','王宝强','邓超']
        },
        series: [
            {
                type: 'bar',
                data: [63.71, 66.83, 70.94, 75.54, 78.45, 82.37,82.67,86.65,90.68,98.49]
            }
        ]
      })
    },
    initCountryChart(){
      let self = this
      self.chart = echarts.init(self.$refs.countryEchart);
      self.chart.setOption({
        legend: {
        data:['电影票房','全国总GDP']
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: ['2012', '2013', '2014', '2015', '2016', '2017']
        },
        yAxis: {
            type: 'value'
        },
        series: [
          {
            name:'电影票房',
            data: [170.7, 217.7, 296.4,440.7, 457.1, 559.1],
            type: 'line'
        },
        {
            name:'全国总GDP',
            data:[856,961,1048,1106,1119, 1224],
            type:'line',
        },
        ]
      })
    },
    initWorkChart(){
      let self = this
      self.chart = echarts.init(self.$refs.workEchart);
      self.chart.setOption({
        title: {
            text: '近五年国产电影票房超十亿元及亿元电影数量',
            subtext: '数据来自网络'
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: ['2013', '2014', '2015', '2016', '2017']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name:"国产电影超十亿元数量",
            data: [1, 2, 5,7, 7],
            type: 'line'
        },
        {
            name:"国产电影超亿元数量",
            data: [30, 36, 50,47, 49],
            type: 'line'
        }]
      })
    },
    initGradeCloud(){
      let self = this
      self.chart = echarts.init(self.$refs.gradeCloud);
      self.chart.setOption({
      title: {
          text: '高票房电影标签',
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
          data:self.gradeCloud
      }]

      })
    },
    initScoreCloud(){
      let self = this
      self.chart = echarts.init(self.$refs.scoreCloud);
      self.chart.setOption({
      title: {
          text: '高分电影标签',
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
          data:self.scoreCloud
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
  text-decoration: none;
}
.main{
  background: #fff;
  margin:20px auto;
  display: flex;
  flex-wrap: nowrap
}
.chartSize{
  width: 100%;
}
.chartWrap{
  width: 50%;
}
.item{
  width: 100%;
  padding: 5px 0;
  display: flex;
  flex-wrap: nowrap;
  border-bottom: thick dotted #f000;
}
body{
  background: #f2f2f2;
}
.topTitle{
  height: 50px;
  width: 100%;
  line-height: 50px;
  border-bottom: 1px #f861;
}
.movieTitle{
  width: 30%;
  height: 80px;
  margin: 0 10px;
  text-align: center;
}
.movieType{
  width: 30%;
  height: 80px;
  margin-left: 10px;
  text-align: center;
}
.ageChartSize{
  height: 300px;
  width: 100%;
}
.ageChart{
  height: 320px;
  width: 50%;
}
</style>
