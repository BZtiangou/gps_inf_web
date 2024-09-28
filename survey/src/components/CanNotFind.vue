<template>
  <div>
    <!-- <h1>404 page not found</h1> -->
    <div class="title">
      <h1 class="title">It seems that there is some wrong with the router...</h1>
    </div>
    <img id="with404" src="../svgImage/404.svg" alt="">
    <!-- <img src="survey/src/svgImage/404.svg" alt=""> -->
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#with404{
  width: 50%;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title{
    width: 100%;
    color: #56586d;
    position: relative;
    text-align: center;
}
</style>