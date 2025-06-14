<template>
  <div id="map"></div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      latitude: 0,
      longitude: 0,
      markers: [],
    }
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log(pos)
          this.latitude = pos.coords.latitude
          this.longitude = pos.coords.longitude

          if (window.kakao && window.kakao.maps) {
            this.initMap()
          } else {
            const script = document.createElement('script')
            script.onload = () => kakao.maps.load(this.initMap)
            script.src =
              '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=46941455d312ab0ca03444dd520c40b9&libraries=services,clusterer,drawing'
            document.head.appendChild(script)
          }
        },
        (err) => {
          console.error('Geolocation error:', err)
        },
      )
    }
    this.emitter.on('info', this.onReceive)
  },
  methods: {
    initMap() {
      const container = document.getElementById('map')

      const options = {
        center: new kakao.maps.LatLng(this.latitude, this.longitude),
        level: 5,
      }
      this.map = new kakao.maps.Map(container, options) // 지도 생성
      this.marker = new kakao.maps.Marker({
        map: this.map,
        position: options.center,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
  border: 1px solid black;
}
</style>
