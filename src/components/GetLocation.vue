<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import WeatherReport from './WeatherReport.vue';
type GeoLocation = {
  latitude: number;
  longitude: number;
};

const coords: Ref<GeoLocation | undefined> = ref();
const geolocationBlockedByUser: Ref<boolean> = ref(false);

const getGeolocation = async (): Promise<void> => {
  await navigator.geolocation.getCurrentPosition(
    async (position: { coords: GeoLocation }) => {
      coords.value = position.coords;
    },
    (error: { message: string }) => {
      geolocationBlockedByUser.value = true;
      console.error(error.message);
    },
  );
};

onMounted(async () => {
  await getGeolocation();
});
</script>

<template>
  <div v-if="coords && !geolocationBlockedByUser">
    <WeatherReport :coords="coords" />
  </div>
  <div v-if="geolocationBlockedByUser">
    <p>Geolocation blocked by user</p>
  </div>
</template>
