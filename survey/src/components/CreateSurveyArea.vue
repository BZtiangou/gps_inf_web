<template>
  <div id="survey">
    <div class="title">
      <h1>NEW SURVEY</h1>
    </div>
    <hr>
    <form class="question">
      <h3>Your Survey Name:</h3>
      <div class="input-container">
        <input type="text" id="input" v-model="surveyName">
        <label for="input" class="label">Enter Text:</label>
        <div class="underline"></div>
      </div>
      <h3>The Description Of The Survey Questionnaire</h3>
      <textarea id="surveyDescription" cols="40" rows="5" v-model="surveyDescription"></textarea><br>
      <h3>enter the ID of the question you wanner choose.</h3>
      <div class="input-container">
        <input type="text" id="input" v-model="QuestionID">
        <label for="input" class="label">Questions ID:</label>
        <div class="underline"></div>
      </div>
      <button type="button" @click="submit">NEW SURVEY</button>
    </form>
    <img src="@/svgImage/login.svg" id="surveyImg" alt="">
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      surveyName: '',
      surveyDescription: '',
      QuestionID: ''
    }
  },
  created(){
    console.log(localStorage.getItem("access"));
  },
  methods: {
    submit(){
      if(this.surveyName == '' || this.surveyDescription == '' || this.QuestionID == ''){
        alert("Please fill in all the blanks!");
        return
      }
      axios({
        method: 'post',
        url: 'http://gps.primedigitaltech.com:8000/survey/createSurvey/',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        },
        data: {
          title: this.surveyName,
          description: this.surveyDescription,
          questions: this.QuestionID
        }
      }).then(res => {
        alert("submit success!");
        this.surveyName = '',
        this.surveyDescription = '',
        this.QuestionID = ''
        console.log(res);
      }).catch(err => {
        alert("Fail to submit!");
        console.log(err);
      })
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
#survey{
  width: 90%;
  margin: 2rem auto;
  height: auto;
}
.title{
    font-family: 'Josefin Sans', Arial, sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    width: 90%;
    margin: 2rem 0;
    color: #56586d;
}
h3{
    font-family: 'Malgun Gothic', Arial, sans-serif;
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
 #surveyDescription{
  border: none;
  width: 470px;
  height: 150px;
  padding: 15px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
 }
 #surveyDescription:focus{
  border: none;
  outline: none;
  box-shadow: none;
  border-radius: 10px;
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

#surveyImg{
  z-index: 0;
  width: 500px;
  position: absolute;
  right: 5%;
  top: 50%;
}
</style>