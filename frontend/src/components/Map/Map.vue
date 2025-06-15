<template>
  <main>
    <MapSearch v-if="!openBottom" />
    <div id="map"></div>
    <MapBottom v-if="openBottom" :selectedData="selectedData" />
  </main>
</template>

<script>
import MapBottom from './MapBottom.vue'
import MapSearch from './MapSearch.vue'

export default {
  data() {
    return {
      map: null,
      latitude: 0,
      longitude: 0,
      markers: [],
      openBottom: false,
      selectedData: null,
    }
  },
  computed: {
    markerPositions() {
      return this.$store.state.place.markerPositions
    },
    datas() {
      return this.$store.state.place.datas
    },
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.latitude = pos.coords.latitude
          this.longitude = pos.coords.longitude

          if (window.kakao && window.kakao.maps) {
            // this.initMap()
            this.initMap(() => {
              this.initPlaces()
            })
          } else {
            const script = document.createElement('script')
            script.onload = () =>
              kakao.maps.load(() => {
                this.initMap(() => {
                  this.initPlaces()
                })
              })
            script.src =
              '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=46941455d312ab0ca03444dd520c40b9&libraries=services'
            document.head.appendChild(script)
          }
        },
        (err) => {
          console.error('Geolocation error:', err)
        },
      )
    }
  },
  methods: {
    initMap(callback) {
      const container = document.getElementById('map')
      const options = {
        center: new kakao.maps.LatLng(this.latitude, this.longitude),
        level: 5,
      }
      this.map = new kakao.maps.Map(container, options)
      this.marker = new kakao.maps.Marker({
        map: this.map,
        position: options.center,
      })

      // this.map.addListener('idle', () => {
      //   const center = this.map.getCenter()
      //   console.log('지도 idle 발생!', center.getLat(), center.getLng())
      // })
      if (callback) callback()
    },
    initPlaces() {
      let ps = new kakao.maps.services.Places()
      const center = new kakao.maps.LatLng(this.latitude, this.longitude)

      ps.keywordSearch(
        '맛집',
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            // 기존 마커 제거
            // this.markers.forEach((m) => m.setMap(null))
            // this.markers = []
            this.markers.forEach(({ overlay }) => overlay.setMap(null))
            this.markers = []

            data.forEach((place) => {
              const pos = new kakao.maps.LatLng(place.y, place.x)

              // 커스텀 마커 HTML을 문자열로 작성
              const content = document.createElement('div')
              const category = place.category_name.split('>')[1].trim()
              // console.log(place)
              const iconSrc =
                category === '카페'
                  ? '/svg/cafe.svg'
                  : category === '한식'
                    ? '/svg/rice.svg'
                    : category === '양식'
                      ? '/svg/burger.svg'
                      : category === '술집'
                        ? '/svg/beer.svg'
                        : category === '일식'
                          ? '/svg/sushi.svg'
                          : category === '중식'
                            ? '/svg/chinese.svg'
                            : category === '치킨'
                              ? '/svg/chicken.svg'
                              : category === '간식'
                                ? '/svg/bread.svg'
                                : category === '샐러드'
                                  ? '/svg/salad.svg'
                                  : '/svg/cutlery.svg'

              content.innerHTML = `
                <div class="custom-marker">
                  <div class="category-group">
                    <img src="${iconSrc}" alt="아이콘" class="category" />
                  </div>
                  <h3 class="place-name">${place.place_name}</h3>
                </div>
              `
              content.style.transition = 'opacity 0.3s'

              content.addEventListener('click', () => {
                // 클린한건 1 유지
                content.style.opacity = '1.0'
                // 나머지 마커는 opacity 낮춤
                this.markers.forEach(({ element }) => {
                  if (element !== content) {
                    element.style.opacity = '0.5'
                  }
                })

                // 클릭하면 bottom sheet open
                this.selectedData = { ...place, category: category }
                this.openBottom = true
              })
              // 커스텀 오버레이로 마커처럼 보이게 표시
              const overlay = new kakao.maps.CustomOverlay({
                content: content,
                position: pos,
                xAnchor: 0.5,
                yAnchor: 1.0,
              })

              overlay.setMap(this.map)
              // DOM도 함께 저장
              this.markers.push({ overlay, element: content })
            })

            // 검색된 결과에 맞춰 지도 범위 조정
            const bounds = new kakao.maps.LatLngBounds()
            data.forEach((place) => {
              bounds.extend(new kakao.maps.LatLng(place.y, place.x))
            })
            this.map.setBounds(bounds)
          }
        },
        {
          location: center,
          radius: 3000, // 반경 3km
          sort: 'distance',
        },
      )
    },
    displayMaker(markerPositions) {
      // if (this.markers.length > 0) {
      //   this.markers.forEach((marker) => marker.setMap(null))
      //   this.markers = []
      // }

      for (let i = 0; i < this.datas.length; i++) {
        let pos = new kakao.maps.LatLng(this.datas[i].y, this.datas[i].x)

        // 커스텀 마커 HTML을 문자열로 작성
        const content = document.createElement('div')
        const category = this.datas[i].category_name.split('>')[1].trim()
        console.log(this.datas[i])
        const iconSrc =
          category === '카페'
            ? '/svg/cafe.svg'
            : category === '한식'
              ? '/svg/rice.svg'
              : category === '양식'
                ? '/svg/burger.svg'
                : category === '술집'
                  ? '/svg/beer.svg'
                  : category === '일식'
                    ? '/svg/sushi.svg'
                    : category === '중식'
                      ? '/svg/chinese.svg'
                      : category === '치킨'
                        ? '/svg/chicken.svg'
                        : category === '간식'
                          ? '/svg/bread.svg'
                          : category === '샐러드'
                            ? '/svg/salad.svg'
                            : '/svg/cutlery.svg'

        content.innerHTML = `
                <div class="custom-marker">
                  <div class="category-group">
                    <img src="${iconSrc}" alt="아이콘" class="category" />
                  </div>
                  <h3 class="place-name">${this.datas[i].place_name}</h3>
                </div>
              `
        content.style.transition = 'opacity 0.3s'

        content.addEventListener('click', () => {
          // 클린한건 1 유지
          content.style.opacity = '1.0'
          // 나머지 마커는 opacity 낮춤
          this.markers.forEach(({ element }) => {
            if (element !== content) {
              element.style.opacity = '0.5'
            }
          })

          // 클릭하면 bottom sheet open
          this.selectedData = { ...this.datas[i], category: category }
          this.openBottom = true
        })
        // 커스텀 오버레이로 마커처럼 보이게 표시
        const overlay = new kakao.maps.CustomOverlay({
          content: content,
          position: pos,
          xAnchor: 0.5,
          yAnchor: 1.0,
        })

        overlay.setMap(this.map)
        // DOM도 함께 저장
        this.markers.push({ overlay, element: content })
      }
      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position),
      )
      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds(),
      )
      this.map.setBounds(bounds)
    },
  },
  watch: {
    markerPositions() {
      this.displayMaker(this.markerPositions)
    },
  },
  components: { MapBottom, MapSearch },
}
</script>

<style lang="scss">
main {
  position: relative;
  width: 100%;
  height: 100%;
}
#map {
  height: calc(var(--vh, 1vh) * 100);
  .custom-marker {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .category-group {
    background-color: $color-primary;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid #fff;
  }
  .category {
    width: 14px;
    height: 14px;
  }
  .place-name {
    text-align: center;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    font-weight: 500;
    font-size: 12px;
    word-break: keep-all;
    text-shadow:
      -1px -1px 0 #fff,
      1px -1px 0 #fff,
      -1px 1px 0 #fff,
      1px 1px 0 #fff;
  }
}
</style>
