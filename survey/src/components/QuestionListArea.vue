<template>
  <div id="surveyDetails">
    <img src="@/svgImage/login2.svg" alt="" id="decoration">
    <div class="title">
      <h1>SURVEY DETAILS...</h1>
    </div>
    <hr>
    <h3>Your Survey ID:</h3>
    <div class="input-container">
      <input type="text" id="input" v-model="surveyID">
      <label for="input" class="label">Enter the survey ID:</label>
      <div class="underline"></div>
    </div>
    <button @click="show()">show it</button>
    <div id="questionsList">
      <div class="title">
        <h1>QUESTION LIST</h1>
      </div>
      <hr>
      <div class="question_item" v-for="(item,index) in questionList" :key="index+1">
        <div class="container">
          <img src="@/svgImage/问卷调查.svg" alt="" id="questionSVG">
          <div id="question_info">
            <h2 style="padding-left:0.5rem; letter-spacing: 2px;">{{item.question_text}}</h2>
            <span>question_type: {{ item.question_type }}</span> <span>QS_ID : {{ item.question_id }}</span>
          </div>
        </div>
        <div class="input-container">
            <input type="text" id="input" v-model="answers[item.question_id]">
            <label for="input" class="label">YOUR ANSWER:</label>
            <div class="underline"></div>
        </div>
      </div>
      <button @click="submit()">sumbit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      surveyID:'',
      questionList:[],
      answers: {}, 
    }
  },
  methods:{
    show(){
      if (!this.surveyID) {
        alert("please input survey ID")
        return
      } else {
        axios({
          url:`http://gps.primedigitaltech.com:8000/survey/showQuestion/${this.surveyID}`
        }).then(res=>{
          this.questionList = res.data
          console.log(this.questionList)
        }).catch(err=>{
          alert("Haven't create this survey yet!")
          console.log(err)
        })
      }  
    },
    submit(){
      const answersArray = Object.values(this.answers);
      if (!answersArray.length || !this.surveyID) {
        alert("please filled all the blanks!")
        return
      }
      axios({
        url:`http://gps.primedigitaltech.com:8000/survey/sendRes/`,
        headers:{
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        },
        method:'post',
        data:{
          answers: answersArray,
          survey_id:this.surveyID
        }
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        alert("Fail to submit!")
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#surveyDetails{
  width: 90%;
  margin: 2rem auto;
  height: auto;
}
#decoration{
  width: 35%;
  position: absolute;
  top: 7%;
  right: 5%;
}
.title{
    font-family: 'Josefin Sans', Arial, sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 2rem 0;
    color: #56586d;
}
#SVGIMG{
  width: 40%;
  position: absolute;
  top: 55%;
  left: 55%;
  transform: translate(-50%, -50%);
}
h3{
    text-transform: uppercase;
    letter-spacing: 1px;
    width: 90%;
    margin: 2rem 0;
    /* color: #56586d; */
}

label{
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 600;
}
.input-container {
    position: relative;
    margin: 3rem 0;
    width: 500px;
}

.input-container input[type="text"] {
    font-size: 20px;
    letter-spacing: 2px;
    width: 100%;
    border: none;
    border-bottom: 2px solid #ccc;
    padding: 10px 5px;
    background-color: transparent;
    outline: none;
}

 .input-container .label {
     position: absolute;
     top: 0;
     left: 0;
     color: #ccc;
     transition: all 0.3s ease;
     pointer-events: none;
 }
.input-container input[type="text"]:focus~.label,
.input-container input[type="text"]:valid~.label {
    top: -20px;
    font-size: 16px;
    color: #333;
}
 .input-container .underline {
   position: absolute;
   bottom: 0;
   left: 0;
   height: 2px;
   width: 100%;
   background-color: #333;
   transform: scaleX(0);
   transition: all 0.3s ease;
 }
 .input-container input[type="text"]:focus~.underline,
 .input-container input[type="text"]:valid~.underline {
     transform: scaleX(1);
 }
 button {
  width: fit-content;
  min-width: 100px;
  height: 45px;
  padding: 8px;
  border-radius: 5px;
  border: 2.5px solid #E0E1E4;
  box-shadow: 0px 0px 20px -20px;
  cursor: pointer;
  background-color: white;
  transition: all 0.2s ease-in-out 0ms;
  user-select: none;
  font-family: 'Poppins', sans-serif;
}

button:hover {
  background-color: rgba(114,84,187,0.8);
  color: #fff;
  box-shadow: 0px 0px 20px -18px;
  /* transform: scale(0.8); */
}

button:active {
  transform: scale(0.95);
}

/* 问题展示列表 */

#questionsList{
  margin: 3rem 0;
}
.question_item .container{
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 1.5rem 0;
  height: auto;
  background-color: rgba(0, 0, 0,0.05);
  backdrop-filter: blur(6px);
}
.question_item img{
  width: 50px;
  padding: 1rem;
}
.question_item span{
  display: inline-block;
  font-size: 16px;
  padding: 0.5rem;
}
</style>