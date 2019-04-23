<template>
  <div id="app">
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">票房预测</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3">消息中心</el-menu-item>
    <el-menu-item index="4">影库</el-menu-item>
  </el-menu>
    <div class="main container" :md="20">
      <div class="left col-md-3">
        <div class="name">{{movieData.title}}</div>
        <div class="enName">{{movieData.englishTitle}}</div>
      </div>
      <div class="left col-md-2">
        <img :src="movieData.address" style="height:260px">
      </div>
      <div class="right col-md-3">
        <div class="text">类型：{{movieData.types}}</div>
        <div class="text">片长：{{movieData.runtime}}</div>
        <div class="text">上映时间：{{movieData.releaseTime}}</div>
        <div class="text">制式：{{movieData.effect}}</div>
        <div class="text">国家及地区：{{movieData.country}}</div>
        <div class="text">发行公司：{{movieData.company}}</div>
        <div class="text">豆瓣评分:{{movieData.vote}}</div>
      </div>
      <div class="right col-md-4">
        <div class="right_text">主演</div>
        <div class="wrapper">
          <div class="col-md-6">
            <img src="http://pic.entgroup.cn/Person/d/201808281254301257967.jpg" style="height:110px">
          </div>
          <div class="col-md-6 content">
            <div class="actor">于谦</div>
          </div>
        </div>
        <div class="wrapper">
          <div class="col-md-6">
            <img src="http://pic.entgroup.cn/Person/d/201808282151442208517.jpg" style="height:110px">
          </div>
          <div class="col-md-6 content">
            <div class="actor">于谦</div>
          </div>
        </div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="header col-md-12">
        <div class="board">影片资料</div>
      </div>
      <div class="left col-md-12">
        导演：
        张栾

        主演：
        于谦 Qian Yu

        徐子力 Zili Xu

        制作公司：
        骉马影业（北京）有限公司

        三只喜鹊文化传媒（北京）有限公司 San Zhi Xi Que Culture Media（Beijing）Co.,Ltd

        华影纵横影业（北京）有限公司 Huaying Zongheng Pictures(Beijing)Co.,Ltd

        发行公司：
        耳东影业（天津）有限公司

        天津猫眼文化传媒有限公司 Tianjin Maoyan Media Co.,Ltd

        上海腾讯影业文化传播有限公司 Shanghai Tencent Pictures Co.,Ltd
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="header col-md-12">
        <div class="board">内地票房</div>
      </div>
      <div class="left-content col-md-3 piao-fang">
        <div>累计票房</div>
        <div>3.11亿</div>
      </div>
      <div class="left-content col-md-3 piao-fang">
        <div>首日票房</div>
        <div>1657.3万</div>
      </div>
      <div class="left-content col-md-3 piao-fang">
        <div>首周票房</div>
        <div>8004.1万</div>
      </div>
      <div class="left-content col-md-3">
        <div>预测票房</div>
        <div>3.38亿</div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="header col-md-12">
        <div class="board">营销事件</div>
      </div>
      <div class="right col-md-12">
        <div class="block">
          <div class="radio">
            排序：
            <el-radio-group v-model="reverse">
              <el-radio :label="true">倒序</el-radio>
              <el-radio :label="false">正序</el-radio>
            </el-radio-group>
          </div>

          <el-timeline :reverse="reverse">
            <el-timeline-item class="col-md-12 time-line"
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="header col-md-12 viewer">
        <div class="board" >观影者画像</div>
        <div class="detail">>>详细情况</div>
      </div>
      <div class="col-md-12 compare">
        <div class="boy col-md-6">
          <div class="col-md-6 boy-left">男</div>
          <div class="col-md-6 boy-right">45%</div>
        </div>
        <div class="girl col-md-6">
          <div class="col-md-6 boy-left">女</div>
          <div class="col-md-6 boy-right">55%</div>
        </div>
      </div>
      <div class="col-md-12 compare-below">
        <div class="boy col-md-6">
          <div class="col-md-6 boy-left">二线城市</div>
          <div class="col-md-6 boy-right">15%</div>
        </div>
        <div class="boy col-md-6">
          <div class="col-md-6 boy-left">四线城市</div>
          <div class="col-md-6 boy-right">35%</div>
        </div>
        <div class="boy col-md-6">
          <div class="col-md-6 boy-left">三线城市</div>
          <div class="col-md-6 boy-right">35%</div>
        </div>
        <div class="boy col-md-6">
          <div class="col-md-6 boy-left">一线城市</div>
          <div class="col-md-6 boy-right">55%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../base/api.js"
import util from "../base/util.js"

let urlParams = util.parseQueryString(window.location.search)
export default {
  name: 'app',
  data () {
    return {
      activeIndex2: '1',
      isCollapse: true,
      date:'1997-11-22',
      movieId:urlParams.movieId,
      movieData:'',
      reverse: true,
      activities: [{
          content: '曝“苗宛秋来了”特辑 于谦真情演绎共赴好时 由张栾导演，于谦监制并领衔主演的电影《老师·好》自3月22日在全国影院火爆热映之后，凭借口口相传的口碑走势，成为了新上映影片中的最大惊喜。截止发布，电影《老师·好》已经突破2.5亿票房大关，不少观众走出电影院之后发出感慨：于谦这次把我感动坏了！阅读全部',
          timestamp: '2019-04-05'
        }, {
          content: '曝手绘海报 质朴细腻刻画八十年代由张栾导演，于谦监制兼领衔主演，汤梦佳、王广源、秦鸣悦、徐子力、孙艺杨、徐紫茵、郝鹏飞、锆玄铭主演的电影《老师·好》在3月22日上映之后，热度和口碑持续上涨。八十年代校园景象真实还原，旧时光师生情谊有笑有泪。阅读全部',
          timestamp: '2019-04-03'
        }, {
          content: '曝青春有你特辑 于谦领衔“教师圈101”由张栾导演、于谦监制兼领衔主演的电影《老师·好》已于3月22日全国公映，上映五日票房正式突破一亿大关，截至目前累计票房超过一亿两千万，连续六日位列同档期新片票房第一。阅读全部',
          timestamp: '2019-03-28'
      }]
    }
  },
  created(){
    let self=this
    api.getMovieById({id:this.movieId})
    .onSuccess(function(resp){
      self.movieData=resp.data
      console.log(self.movieData)
    })
    .onFail(function(){
      console.log("error")
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if(key==4){
        this.activeIndex2=4;
        location.replace("/html/movieList.html");

      }
      if(key==3){
        this.activeIndex2=3;
        location.href="/html/movieList.html";

      }
      if(key==2){
        this.activeIndex2=2;
        location.href="/html/movieList.html";

      }
      if(key==1){
        this.activeIndex2=1;
        location.href="/html/index.html";

      }
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
body{
  background: #f2f2f2;
}
.main{
  background: #fff;
  margin:20px auto;
}
.text{
  text-align: left;
  height: 30px;
  line-height: 30px;
  margin-left: 30px;
}
.name{
  margin: 80px auto 20px auto;
  font-size:30px;
}
.enName{
  margin: 20px auto;
  font-size: 25px;
  color: #999;
}
.right_text{
  height: 20px;
  line-height: 20px;
}
.wrapper{
  height: 110px;
  margin-bottom: 5px;
  width: 100%;
}
.content{
  height: 110px;
}
.actor{
  margin-right: 10px;
  height: 30px;
  line-height: 30px;
  text-align: left;
}
.header{
  height: 40px;
  border-bottom: rgb(84, 92, 100) 1px solid;
}
.board{
  height: 40px;
  width: 100px;
  text-align: center;
  line-height: 40px;
  background: rgb(84, 92, 100);
  color: #fff;
}
.time-line{
  text-align: left;
}
.left-content{
  height: 80px;
  padding: 20px 0;
}
.piao-fang{
  border-right: 1px solid #f3f3f3;
}
.viewer{
  display: flex;
}
.detail{
  justify-content: flex-end;
  height: 40px;
  width: 100px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.compare{
  height: 50px;
  margin: 10px 0;
  line-height: 50px;
}
.compare-below{
  height: 100px;
  margin: 10px 0;
  line-height: 50px;
}
.boy{
  background: #42b983;
  color: #fff;
}
.girl{
  background: #f56c6c;
  color: #fff;
}

.boy-left{
  text-align: left;
}
.boy-right{
  text-align: right;
}
</style>
