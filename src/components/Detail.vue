<template>
  <div id="app">
  <main-header></main-header>
    <div class="main container" :md="20">
      <div class="left col-md-3">
        <div class="name">{{movieData.title}}</div>
      </div>
      <div class="left col-md-2">
        <img :src="movieData.imgUrl" style="height:260px">
      </div>
      <div class="right col-md-3">
        <div class="text">类型：{{movieData.types}}</div>
        <div class="text">片长：{{movieData.runtime}}分钟</div>
        <div class="text">上映时间：{{movieData.releaseTime}}</div>
        <div class="text">制式：{{movieData.effect}}</div>
        <div class="text">国家及地区：{{movieData.country}}</div>
        <div class="text">类型：{{movieData.types}}</div>
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
            <div class="actor">徐子力</div>
          </div>
        </div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="header col-md-12">
        <div class="board">影片标签</div>
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
        <div>{{movieData.box_offic_all}}
          <span v-if="parseFloat(movieData.box_offic_all)>100">万</span>
          <span v-else>亿</span></div>
      </div>
      <div class="left-content col-md-3 piao-fang">
        <div>首日票房</div>
        <div>{{movieData.box_offic_1d}}
          <span v-if="parseFloat(movieData.box_offic_1d)>100">万</span>
          <span v-else>亿</span></div>
      </div>
      <div class="left-content col-md-3 piao-fang">
        <div>首周票房</div>
        <div>{{movieData.box_offic_1w}}
          <span v-if="parseFloat(movieData.box_offic_1w)>100">万</span>
          <span v-else>亿</span>
          </div>
      </div>
      <div class="left-content col-md-3">
        <div>预测票房</div>
        <div>{{movieData.box_offic_predict}}
          <span v-if="parseFloat(movieData.box_offic_predict)>100">万</span>
          <span v-else>亿</span></div>
      </div>
    </div>
    <div class="main container" :md="20" v-if="movieData.genderData">
      <div class="header col-md-12 viewer">
        <div class="board" >观影者画像</div>
        <div class="detail" @click="toMore(movieId)">>>详细情况</div>
      </div>
      <div class="col-md-12 compare">
        <div class="boy col-md-6">
          <div class="col-md-6 boy-left">男</div>
          <div class="col-md-6 boy-right">{{movieData.genderData[0].value}}%</div>
        </div>
        <div class="girl col-md-6">
          <div class="col-md-6 boy-left">女</div>
          <div class="col-md-6 boy-right">{{movieData.genderData[1].value}}%</div>
        </div>
      </div>
      <div class="col-md-12 compare-below">
        <div class="boy col-md-6">
          <div class="col-md-6 boy-left">二线城市</div>
          <div class="col-md-6 boy-right">{{movieData.areaData[0]}}%</div>
        </div>
        <div class="boy col-md-6">
          <div class="col-md-6 boy-left">四线城市</div>
          <div class="col-md-6 boy-right">{{movieData.areaData[1]}}%</div>
        </div>
        <div class="boy col-md-6">
          <div class="col-md-6 boy-left">三线城市</div>
          <div class="col-md-6 boy-right">{{movieData.areaData[2]}}%</div>
        </div>
        <div class="boy col-md-6">
          <div class="col-md-6 boy-left">一线城市</div>
          <div class="col-md-6 boy-right">{{movieData.areaData[3]}}%</div>
        </div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="header col-md-12 viewer">
        <div class="board" >推荐类似电影</div>
      </div>
      <div class="col-md-12 movieWrapper">
        <div class="item-wrapper col-md-1" v-for="movie in movieData.imgDatas" :key="movie">
          <img :src="movie.url" style="height:80px">
          <div>{{movie.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../base/api.js"
import util from "../base/util.js"
import Header from "./Header.vue"
import fakedata from "../base/fakedata.js"

let urlParams = util.parseQueryString(window.location.search)
export default {
  components: {
    "main-header": Header,
  },
  data () {
    return {
      activeIndex2: '1',
      isCollapse: true,
      date:'1997-11-22',
      movieId:urlParams.movieId,
      movieData:'',
      reverse: true,
      viewers:fakedata.viewers,
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
    toMore(movieId){
      location.href=`/html/viewer.html?movieId=${movieId}`
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
.movieWrapper{
  display:flex;
  flex-wrap: wrap;
}
.item-wrapper{
  height: 120px;
  margin: 10px 0;
}
</style>
