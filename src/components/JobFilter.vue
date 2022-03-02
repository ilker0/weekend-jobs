<script>
import regions from '@/constants/regions'
import sectors from '@/constants/sectors'

export default {
  data() {
    return {
      regions,
      sectors
    }
  }
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5 mt-5">
    <select class="select font-normal w-full select-bordered col-span-1">
      <option :value="null" disabled selected>Region</option>
      <option
        :value="region.value"
        v-for="(region, index) in regions"
        :key="index"
      >
        {{ region.emoji }} {{ region.name }}
      </option>
    </select>

    <select class="select w-full font-normal select-bordered col-span-1">
      <option :value="null" disabled selected>Sector</option>

      <option
        :value="sector.value"
        v-for="(sector, index) in sectors"
        :key="index"
      >
        {{ sector.emoji }} {{ sector.name }}
      </option>
    </select>

    <div class="col-span-1 flex">
      <input
        type="text"
        placeholder="Min Price"
        class="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        placeholder="Max Price"
        class="input input-bordered w-full max-w-xs ml-1"
      />
    </div>

    <select class="select w-full font-normal select-bordered col-span-1">
      <option :value="null" disabled selected>Sort by ↕️</option>

      <option
        :value="sector.value"
        v-for="(sector, index) in sectors"
        :key="index"
      >
        {{ sector.emoji }} {{ sector.name }}
      </option>
    </select>
  </div>
</template>
