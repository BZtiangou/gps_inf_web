<template>
  <div>
    <form class="question">
        <div class="title">
          <h1>NEW QUESTION</h1>
        </div>
        <hr>
        <div class="radio-group">
            <h3>Question type:</h3>
            <label class="custom-radio ">
                <input name="questionType" type="radio" value="" @click="questionType='text'">
                <span class="checkmark"></span>
                Subjective item
            </label>
            <label class="custom-radio" style="margin-bottom:2rem ;">
                <input name="questionType" type="radio" value="multiple_choice" @click="questionType='multipleChoice'">
                <span class="checkmark" ></span>
                Multiple choice
            </label>
        </div>
        <hr>
        <!-- 分类讨论，如果选择是主观题，就会显示以下部分 -->
        <div v-if="questionType === 'text'">
            <h3>Your Question:</h3>
            <div class="input-container">
              <input type="text" id="input" v-model="question_text">
              <label for="input" class="label">Enter Text</label>
              <div class="underline"></div>
            </div>
            <!-- <input id="description" class="question-input" name="question_text" type="text"
                placeholder="Your Question Text" v-model="question_text"><br> -->
            <button type="button" class="submit-btn" @click="sumbit()">SUBMIT</button>
            <button type="button" class="cancel-btn" @click="reset()" style="margin-left: 8rem;">RESET</button>
            <img src="@/svgImage/img1.svg" alt="" id="expectation">
        </div>

        <div v-if="questionType == 'multipleChoice'">
            <img src="@/svgImage/img1.svg" alt="" id="expectation">
            <h3>Your Questuin</h3>
            <div class="input-container">
              <input type="text" id="input" v-model="question_text">
              <label for="input" class="label">Enter Text</label>
              <div class="underline"></div>
            </div>
            <h3>Your Options number:</h3>
            <div class="input-container">
              <input type="text" id="input" v-model.number="choiceAmount">
              <label for="input" class="label">Enter Question Number</label>
              <div class="underline"></div>
            </div>
            <div v-if="choiceAmount">
              <h3>Your Options description:</h3>
                <div class="input-container" v-for="index in choiceAmount" :key="index">
                  <input type="text" id="input">
                  <label for="input" class="label">Your Options Description:</label>
                <div class="underline"></div>
            </div>
                <!-- 根据choiceQuestionAmount来生成相应数量的输入框 -->
            </div>
            <button type="button" class="submit-btn" @click="sumbit()">SUBMIT</button>
            <button type="button" class="cancel-btn" @click="reset()" style="margin-left: 8rem;">RESET</button>
        </div>
    </form>
    
  <!-- 这个div不要改动 -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      questionType: "",
      choiceAmount: '',
      question_text: '',
    }
  },
  methods: {
    sumbit(){
      axios({
        method: 'post',
        url: 'http://gps.primedigitaltech.com:8000/survey/submitQuestion/',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        },
        data: {
          question_text: this.question_text,
          question_type: this.questionType
        }
      }).then(res => {
        console.log(res);
        alert("submit success!");
        this.questionType="",
        this.choiceAmount='',
        this.question_text= ''
      }).catch(err => {
        console.log(err);
        alert("Fail to submit!");
      })
    },
    reset(){
      this.questionType="",
      this.choiceAmount='',
      this.question_text= ''
    }
  }
}
</script>

<style scoped> 
@import url(https://fonts.googleapis.com/css?family=Josefin+Sans:700);
.question{
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

.radio-group {
    display: flex;
    flex-direction: column; /* 使单选按钮垂直排列 */
}

.radio-group label {
    margin-bottom: 10px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-size: 16px;
    color: #333;
    transition: color 0.3s;
}

.radio-group input[type="radio"] {
    display: none;
}

.radio-group .checkmark {
    width: 24px;
    height: 24px;
    border: 2px solid #333;
    border-radius: 50%;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, border-color 0.3s;
}

.radio-group input[type="radio"]:checked + .checkmark {
    background-color: #333;
    border-color: #333;
}

.radio-group input[type="radio"]:checked + .checkmark::before {
    content: '';
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 50%;
}

.radio-group label {
    width: 100%;
}
/* 美化输入框 */
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

/* button的样式 */
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
  box-shadow: 0px 0px 20px -18px ;
  color: #fff;
  /* transform: scale(0.8); */
}

button:active {
  transform: scale(0.95);
}
#expectation{
  width: 400px;
  position: absolute;
  right: 10%;
  top: 40%;
}
</style>