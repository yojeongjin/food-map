<template>
  <main>
    <MapSearch
      v-if="!openBottom"
      :latitude="latitude"
      :longitude="longitude"
      :location="location"
      @updateLocation="updateLocation"
    />
    <div id="map"></div>
    <MapBottom
      v-if="openBottom"
      :key="selectedData.id"
      :selectedData="selectedData"
      :location="location"
      @close="closeBottomSheet"
    />
  </main>
</template>

<script>
import MapBottom from './MapBottom.vue'
import MapSearch from './MapSearch.vue'

const getCategoryIcon = (category) => {
  switch (category) {
    case '카페':
      return '/svg/cafe.svg'
    case '한식':
      return '/svg/rice.svg'
    case '양식':
      return '/svg/burger.svg'
    case '술집':
      return '/svg/beer.svg'
    case '일식':
      return '/svg/sushi.svg'
    case '중식':
      return '/svg/chinese.svg'
    case '치킨':
      return '/svg/chicken.svg'
    case '간식':
      return '/svg/bread.svg'
    case '샐러드':
      return '/svg/salad.svg'
    default:
      return '/svg/cutlery.svg'
  }
}

export default {
  components: { MapBottom, MapSearch },
  data() {
    return {
      map: null,
      latitude: 0,
      longitude: 0,
      markers: [],
      openBottom: false,
      selectedData: null,
      location: '',
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

          const loadMap = () => this.initMap(() => this.initPlaces())

          if (window.kakao && window.kakao.maps) {
            loadMap()
          } else {
            const script = document.createElement('script')
            script.onload = () => kakao.maps.load(loadMap)
            script.src =
              '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=46941455d312ab0ca03444dd520c40b9&libraries=services,clusterer'
            document.head.appendChild(script)
          }
        },
        (err) => console.error('Geolocation error:', err),
      )
    }
  },
  methods: {
    updateLocation(value) {
      this.location = value
    },
    closeBottomSheet() {
      this.openBottom = false
      this.markers.forEach(({ element }) => {
        element.style.opacity = '1.0'
      })
    },
    initMap(callback) {
      const container = document.getElementById('map')
      const center = new kakao.maps.LatLng(this.latitude, this.longitude)
      const options = { center, level: 3 }

      this.map = new kakao.maps.Map(container, options)
      this.marker = new kakao.maps.Marker({ map: this.map, position: center })
      if (callback) callback()
    },
    initPlaces() {
      const ps = new kakao.maps.services.Places()
      const center = new kakao.maps.LatLng(this.latitude, this.longitude)

      ps.keywordSearch(
        '맛집',
        (data, status) => {
          if (status !== kakao.maps.services.Status.OK) return

          this.markers.forEach(({ overlay }) => overlay.setMap(null))
          this.markers = []

          data.forEach((place) => {
            const pos = new kakao.maps.LatLng(place.y, place.x)
            const category = place.category_name.split('>')[1]?.trim() || '기타'
            const iconSrc = getCategoryIcon(category)

            const content = document.createElement('div')
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
              content.style.opacity = '1.0'
              this.markers.forEach(({ element }) => {
                if (element !== content) element.style.opacity = '0.5'
              })
              this.selectedData = { ...place, category }
              this.openBottom = true
            })

            const overlay = new kakao.maps.CustomOverlay({
              content,
              position: pos,
              xAnchor: 0.5,
              yAnchor: 1.0,
              zIndex: 10,
            })

            overlay.setMap(this.map)
            this.markers.push({ overlay, element: content })
          })

          const bounds = new kakao.maps.LatLngBounds()
          data.forEach((place) => {
            bounds.extend(new kakao.maps.LatLng(place.y, place.x))
          })
          this.map.setBounds(bounds)
        },
        {
          location: center,
          radius: 2000,
          sort: 'distance',
        },
      )
    },
    displayMaker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach(({ overlay }) => overlay.setMap(null))
        this.markers = []
      }

      this.datas.forEach((place) => {
        const pos = new kakao.maps.LatLng(place.y, place.x)
        const category = place.category_name?.split('>')[1]?.trim() || '기타'
        const iconSrc = getCategoryIcon(category)

        const content = document.createElement('div')
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
          content.style.opacity = '1.0'
          this.markers.forEach(({ element }) => {
            if (element !== content) element.style.opacity = '0.5'
          })
          this.selectedData = { ...place, category }
          this.openBottom = true
        })

        const overlay = new kakao.maps.CustomOverlay({
          content,
          position: pos,
          xAnchor: 0.5,
          yAnchor: 1.0,
        })

        overlay.setMap(this.map)
        this.markers.push({ overlay, element: content })
      })

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
    markerPositions(val) {
      if (Array.isArray(val) && val.length > 0 && this.datas.length > 0) {
        this.displayMaker(val)
      }
    },
  },
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
}
.custom-marker {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}
.category-group {
  background-color: $color-primary;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #fff;
}
.category {
  width: 16px;
  height: 16px;
}
.place-name {
  text-align: center;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  font-weight: 500;
  font-size: 13px;
  word-break: keep-all;
  text-shadow:
    -1px -1px 0 #fff,
    1px -1px 0 #fff,
    -1px 1px 0 #fff,
    1px 1px 0 #fff;
}
</style>
