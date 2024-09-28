<template>
  <div>
    <div class="title">
        <h1>{{ this.title }}</h1>
    </div>
    <div id="container"></div> <!-- 使用 ref 而不是 id -->
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';
export default {
  data(){
    return{
      title: "",
      accelerometers : [],
      timeline : [],
    }
  },
  methods:{
    formatDate() {
      const date = new Date(this.timestamp);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const formattedMonthDay = `${month}月${day}日`;
      const formattedTime = `${hours}:${minutes}`;
      this.formattedDate = `${formattedMonthDay} ${formattedTime}`;
    }
  },
  mounted(){
    // const username = localStorage.getItem("username");
    axios({
      url: "http://gps.primedigitaltech.com:8000/sensor/getACCdata/",
      method: "get",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access")}`
      },
      // params: {
      //   username: username
      // }
    }).then(res => {
      console.log(res)
      this.title = res.data.accelerometers[0].device;
      for (let i = 0; i < res.data.accelerometers.length; i++) {
          let valuex = res.data.accelerometers[i].acc_x
          let valuey = res.data.accelerometers[i].acc_y
          let valuez = res.data.accelerometers[i].acc_z
          let time = res.data.accelerometers[i].timestamp
          const date = new Date(time);
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const formattedMonthDay = `${month}月${day}日`;
          const formattedTime = `${hours}:${minutes}`;
          let formattedDate = `${formattedMonthDay} ${formattedTime}`;
          this.timeline.push(formattedDate);
          let value = Math.sqrt(valuex * valuex + valuey * valuey + valuez * valuez)
          this.accelerometers.push(value);
      }
    }).then(() => {
      var myChart = echarts.init(document.querySelector('#container'));
      myChart.setOption({
        xAxis: {
          type: 'category',
          boundaryGap:false,
          data: this.timeline
        },
        grid:{
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '5%',
          containLabel: true
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend:{
          
        },
        dataZoom:[{
          start: 0,
          end: 10
        }],
        series: [
          {
            data: this.accelerometers,
            type: 'line',
            smooth: true,
            name:"accelerometers's value"
          }
        ]
      })
    })
  }
}

</script>

<style scoped>
#container {
  width: 90%; /* 设置宽度 */
  height: 36rem; /* 设置高度 */
  margin: 2rem auto;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
}
.title{
    width: 90%;
    margin: 2rem auto;
    color: #56586d;
}
</style>