<template>
  <div>
    <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form">
          <h2 class="title">LOG IN</h2>
          <div class="input-field">
            <span class="iconfont icon-yonghu"></span>
            <input type="text" placeholder="username" name="username" v-model="username"/>
          </div>
          <div class="input-field">
            <span class="iconfont icon-suoding"></span>
            <input type="password" placeholder="password" name="password" v-model="password"/>
          </div>
          <button type="button" class="btn solid" @click="sumbit">LOG IN</button>
        </form>

        <!-- 这个表单是管理员进行管理的 -->
        <!-- <form action="#" class="sign-up-form">
          <h2 class="title">Administrators</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="username" name="username" />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" placeholder="e-mail" name="e-mail" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="password" name="password" />
          </div>
          <input type="submit" class="btn" value="LOG IN" />
        </form> -->
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h2 style="letter-spacing: 2px;">MOBILE SENSERING</h2>
          <p>
            LOG IN TO VISIT YOUR MODILE SENSERING INFORMATIONS
          </p>
          <button class="btn transparent" id="sign-up-btn">
            LOGIN
          </button>
        </div>
        <img src="@/svgImage/login2.svg" class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h2 style="letter-spacing: 2px;">USER</h2>
          <p>
            Log in, to view the sensing information
          </p>
          <button class="btn transparent" id="sign-in-btn">
            USER
          </button>
        </div>
        <!-- <img src="./image/img1.svg" class="image" alt="" /> -->
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
      return{
        username:'',
        password:''        
      }
    },
    methods:{
      sumbit(){
        if (!this.username || !this.password) {
        alert("please input username and password!")
        return
      } else {
        axios({
          url: "http://gps.primedigitaltech.com:8000/api/login/",
          method: "post",
          data: {
            username: this.username,
            password: this.password
          }
        }).then(result => {
          console.log(result)
          alert(`${result.data.username}，欢迎您！`)
          let access = result.data.access
          localStorage.setItem("access", access)
          localStorage.setItem("username", this.username)
          this.username = ''
          this.password = ''
          // this.$router.push('/LocationAPI');
        })
      }  
    }
  }
}
</script>

<style src="@/css/login.css" scoped>

</style>