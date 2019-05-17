<template>
  <div id="app">
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">票房预测</el-menu-item>
    <el-menu-item index="3">票房分析</el-menu-item>
    <el-menu-item index="4">影库</el-menu-item>
  </el-menu>
  </div>
</template>

<script>

let Header= {
  data () {
    return {
    }
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
        location.href="/html/analyze.html";

      }
      if(key==1){
        this.activeIndex2=1;
        location.href="/html/index.html";

      }
    },
  }
}
export default Header
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

</style>
