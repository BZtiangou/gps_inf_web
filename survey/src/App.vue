<template>
  <div id="app">
    <router-view></router-view>
    <!-- <ul class="left-side-bander">
      <router-link class="btn" to="/CreateQuestion">CREATE QUESTION</router-link>
      <router-link class="btn" to="/CreateSurvey">CREATE Survey</router-link>
      <router-link class="btn" to="/QuestionList">QUESTION LIST</router-link>
    </ul>
    <div class="area">
      <router-view></router-view>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scrope>
*{
  padding: 0;
  margin: 0;
}
</style>
