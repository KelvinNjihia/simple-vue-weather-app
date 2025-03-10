<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

type GeoLocation = Ref<{
  latitude: number;
  longitude: number;
}>;

const coords: Ref<GeoLocation | undefined> = ref();
const geolocationBlockedByUser: Ref<boolean> = ref(false);
</script>
