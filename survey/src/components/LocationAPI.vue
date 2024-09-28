<template>
    <div class="app">
      <div class="title">
        <h1>Map's location</h1>
      </div>
      <div ref="container" class="map-container"></div>
    </div>
  </template>
  
  <script>
  import AMapLoader from "@amap/amap-jsapi-loader";
  import axios from 'axios';

  export default {
    name: "MapView",
    data() {
      return {
        map: null, // 地图实例
        locations: [], // 位置数据
      };
    },
    mounted() {
      this.fetchGPSData();
    },
    methods: {
      fetchGPSData() {
        axios({
            url: "http://gps.primedigitaltech.com:8000/sensor/getGPSdata/",
            method: "get",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            },
        }).then(res => {
            this.locations = res.data.Locations;
            this.initMap();
          })
          .catch(error => {
            alert("Error fetching GPS data: " + error.message);
          });
      },
      initMap() {
        if (!this.locations || this.locations.length === 0) return;
  
        const lastLocation = this.locations[this.locations.length - 1];
        const center = [lastLocation.longitude, lastLocation.latitude];
  
        window._AMapSecurityConfig = {
          securityJsCode: "d670e54e61c7b8114d417631e9a9e4cb",
        };
  
        AMapLoader.load({
          key: "b53ab26c140c2b1c1ee56e7bcc7c7013", // 请替换为您的开发者Key
          version: "2.0",
          plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.MarkerClusterer"],
        })
          .then((AMap) => {
            this.map = new AMap.Map(this.$refs.container, {
              viewMode: "3D",
              zoom: 19,
              center: center,
              pitch: 40, // 地图的俯仰角度
              rotation: -15, // 地图的旋转角度
            });
  
            this.addMapControls(AMap);
            this.addMarkers(AMap);
          })
          .catch((e) => {
            console.error("Error loading AMap: ", e);
          });
      },
      addMapControls(AMap) {
        this.map.addControl(new AMap.Scale());
        this.map.addControl(new AMap.ToolBar());
      },
      addMarkers(AMap) {
        const markers = this.locations.map((location, index) => {
          return new AMap.Marker({
            position: [location.longitude, location.latitude],
            title: `Location ${index + 1}`, // 可以为每个标记添加标题
          });
        });
  
        this.map.add(markers);
        // 如果需要使用标记聚合器，可以取消下面注释
        this.addMarkerClusterer(AMap, markers);
      },
      addMarkerClusterer(AMap, markers) {
        this.map.plugin(["AMap.MarkerClusterer"], () => {
          const markerClusterer = new AMap.MarkerClusterer(this.map, {
            gridSize: 60,
          });
          markerClusterer.addMarkers(markers);
        });
      },
    },
    // 组件销毁时销毁地图实例
    beforeDestroy() {
      if (this.map) {
        this.map.destroy();
      }
    },
  };
  </script>
  
  <style scoped>
  .title{
    width: 90%;
    margin: 2rem auto;
    color: #56586d;
  }
  .map-container {
    width: 90%;
    height: 33rem;
    margin: 2rem auto;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
  }
  </style>