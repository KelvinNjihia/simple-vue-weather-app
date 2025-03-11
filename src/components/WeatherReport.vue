<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';

type WeatherData = {
  location: {
    localtime: Date;
    name: string;
    region: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    precip_mm: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_degree: number;
    wind_kph: number;
    wind_mph: number;
  };
};

type Coords = {
  latitude: number;
  longitude: number;
};

interface Props {
  coords: Coords;
}

const props = defineProps<Props>();

const data: Ref<WeatherData | undefined> = ref();

const fetchWeather = async (coords: Coords): Promise<WeatherData> => {
  const { latitude, longitude } = coords;
  const q = `${latitude},${longitude}`;
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_WEATHER_API_KEY}&q=${q}`,
  );
  const data = (await response) && response.json();
  return data;
};

onMounted(async () => {
  const { latitude, longitude } = props.coords;
  const weatherResponse = await fetchWeather({ latitude, longitude });
  data.value = weatherResponse;
});
</script>

<template>
  <div>
    <article v-if="data && data.current">
      <h1>{{ data.location.name }}</h1>
      <p>{{ data.location.region }}</p>
      <p>{{ data.location.localtime }}</p>
      <p>{{ data.current.temp_c }}</p>
      <p>{{ data.current.temp_f }}</p>
      <p>{{ data.current.precip_mm }}</p>

      {{ data.current }}
    </article>
    <div v-else>Loading...</div>
  </div>
</template>
