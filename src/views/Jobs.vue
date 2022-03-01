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
  <div class="container mx-auto">
    <header class="flex justify-between items-center mt-5">
      <h1>Logo</h1>
      <router-link to="/post-job" class="btn btn-primary text-white"
        >Post Job 📨</router-link
      >
    </header>
  </div>

  <div
    class="bg-[url('@/assets/palms.jpeg')] w-full bg-cover h-96 bg-no-repeat bg-center mt-5 relative"
  >
    <div
      class="container mx-auto flex items-center justify-center h-full w-full flex-col z-10"
    >
      <h2 class="text-white font-bold mb-2 text-2xl">Search Job 🔍</h2>
      <input
        type="text"
        placeholder="Example: Mechanic"
        class="input input-bordered w-full max-w-xs"
      />
    </div>
  </div>

  <div class="container mx-auto">
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
  </div>
</template>

<style></style>
