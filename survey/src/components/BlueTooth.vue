<template>
  <div>
    <div class="title">
        <h1>{{ this.title }}</h1>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';
export default {
    data(){
        return{
            title: "",
            conncetedDeviceAmount : [],
            timeline :[]
        }
    },
    mounted() {
      axios({
        url: "http://gps.primedigitaltech.com:8000/sensor/getBTdata/",
        method: "get",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
          },
        }).then(res=>{
            console.log(res)
            this.title = res.data.bluetooths[0].device;
            for (let i = 0; i < res.data.bluetooths.length; i++){
                const connectionDeviceString = res.data.bluetooths[i].connection_device
                const connectionDeviceArray = connectionDeviceString.split(';')
                const deviceCount = connectionDeviceArray.length
                console.log(deviceCount)
                this.conncetedDeviceAmount.push(deviceCount)
                const timepart1 = res.data.bluetooths[i].timestamp.slice(8,10)
                const timepart2 = res.data.bluetooths[i].timestamp.slice(11,19)
                const time = `Date: ${timepart1} , ${timepart2}`
                this.timeline.push(time)
            }
            console.log(this.timeline)
        }).then(() => {
            var myChart = echarts.init(document.querySelector('#container'));
            myChart.setOption({
            xAxis: {
                type: 'category',
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
            series: [
              {
                data: this.conncetedDeviceAmount,
                type: 'bar',
                smooth: true,
                name:"BlueTooths Devices's amount"
              }
            ],
            dataZoom:[{
                start: 10,
                end: 100
            }],
        })
      })
    }
}
</script>

<style>
#container {
  width: 90%; /* 设置宽度 */
  height: 33rem; /* 设置高度 */
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