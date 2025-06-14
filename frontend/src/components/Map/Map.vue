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
            // this.initMap()
            this.initMap(() => {
              this.searchPlaces()
            })
          } else {
            const script = document.createElement('script')
            script.onload = () =>
              kakao.maps.load(() => {
                this.initMap(() => {
                  this.searchPlaces()
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
      if (callback) callback()
    },
    searchPlaces() {
      const ps = new kakao.maps.services.Places()
      const center = new kakao.maps.LatLng(this.latitude, this.longitude)

      ps.keywordSearch(
        '맛집',
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            // 기존 마커 제거
            this.markers.forEach((m) => m.setMap(null))
            this.markers = []
            console.log(data)
            data.forEach((place) => {
              const pos = new kakao.maps.LatLng(place.y, place.x)

              // 커스텀 마커 HTML을 문자열로 작성
              const content = document.createElement('div')
              const category = place.category_name.split('>')[1].trim()

              content.innerHTML = `
                <div class="custom-marker">
                  <div class="category-group">
                    <span class="category">
                      ${
                        category === '카페'
                          ? '☕️'
                          : category === '한식'
                            ? '🍚'
                            : category === '양식'
                              ? '🍔'
                              : category === '술집'
                                ? '🍺'
                                : category === '일식'
                                  ? '🍣'
                                  : category === '중식'
                                    ? '🍜'
                                    : category === '치킨'
                                      ? '🍗'
                                      : category === '간식'
                                        ? '🍞'
                                        : '🍴'
                      }
                      </span>
                    <h4 class="category-name">${category}</h4>
                  </div>
                  <h3 class="place-name">${place.place_name}</h3>
                </div>
              `

              // 커스텀 오버레이로 마커처럼 보이게 표시
              const overlay = new kakao.maps.CustomOverlay({
                content: content,
                position: pos,
                xAnchor: 0.5,
                yAnchor: 1.0,
              })

              overlay.setMap(this.map)
              this.markers.push(overlay)
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
  },
}
</script>

<style lang="scss">
#map {
  height: calc(var(--vh, 1vh) * 100);
  .custom-marker {
    background-color: #fff;
    position: relative;
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 0 6px 0 2px;
    height: 24px;
    border-radius: 24px;
    box-shadow:
      rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    .category-group {
      background-color: $color-primary;
      padding: 2px 6px 2px 3px;
      border-radius: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      .category {
        background-color: #fff;
        display: inline-block;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 10px;
      }
      .category-name {
        color: #fff;
        font-weight: 400;
        font-size: 12px;
      }
    }
    .place-name {
      font-weight: 500;
      font-size: 13px;
      margin-bottom: 2px;
      // letter-spacing: -0.3px;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background: #fff;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
  }
}
</style>
