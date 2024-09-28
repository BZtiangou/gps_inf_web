<template>
    <div id="app">
      <div class="left">
        <ul class="left-side-bander">
          <img src="@/svgImage/img1.svg" alt="">
          <!-- <router-link class="btn" to="/CreateQuestion"><span class="iconfont icon-wenjuan"></span>NEW QUESTION</router-link> -->
          <!-- <router-link class="btn" to="/CreateSurvey"><span class="iconfont icon-wenjuan"></span>CREATE Survey</router-link> -->
          <router-link class="btn" to="/QuestionList"><span class="iconfont icon-wenjuan"></span>SURVEY DETAILS</router-link>
          <router-link class="btn" to="/LocationAPI"><span class="iconfont icon-ditu-dibiao"></span>LOCATION</router-link>
          <router-link class="btn" to="/EchartsAccelerometers"><span class="iconfont icon-caidan-MDjiasujisuan"></span>Accelerometers</router-link>
          <router-link class="btn" to="/BlueTooth"><span class="iconfont icon-icon"></span>BlueTooth</router-link>
          <a class="btn" @click="logOut()"><span class="iconfont icon-yonghu"></span>Log Out</a>
        </ul>
      </div>
      <div class="area">
        <router-view></router-view>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'App',
    methods:{
      logOut(){
        confirm("Sure to Log Out?")
        localStorage.removeItem("access")
        if(!localStorage.getItem("access")){
          alert("Log Out Successfully!")
          this.$router.push({
            path: '/LogIn'
          })
        }else{alert("Log Out Failed!")}
      }
    }
  }
</script>
  
<style scoped>
/* 让iconfont图标与页面的字体样式保持一致 */
.iconfont{
  display: inline-block;
  font-family: iconfont;
  color: #696969;
  font-size: 25px;
  margin-right: 0.5rem;
}

*{
    padding: 0;
    margin: 0;
    background-color: #f4f7f9;
}

  /* 滚动条整体的宽度 */
::-webkit-scrollbar {
  width: 8px; /* 垂直滚动条的宽度 */
  height: 12px; /* 水平滚动条的高度 */
}

/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #696969;
  border-radius: 6px;
}

/* 滚动条的轨道 */
::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}

  #app{
    display: flex;
  }
  .left{
    width: 17em;
  }
  .left-side-bander{
      overflow: auto;
      list-style: none;
      position: fixed;
      left: 1rem;
      display: flex;
      flex-direction: column;
      width: 15em;
      background-color: #fff;
      top: 2vh;
      height: 96vh;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  }
  .left-side-bander a{
        display: block;
        font-size: 20px;
        text-decoration: none;
        background-color: #fff;
        text-transform: uppercase;
        transition: 0.5s ease;
        cursor: pointer;
        padding: 1.5rem 0;
        margin: 0.3rem 0;
        text-align: center;
        color: black;
    }
    .left-side-bander a:hover {
        background-color: #EfEfEf;
    }
    .left-side-bander a.router-link-active{
       background-color: rgba(114,84,187);
       color: #fff;
    }
    .area{
      width: calc(100% - 17em);
      min-height: 100vh;
      right: 0;
    }
</style>
  