<script>
import regions from '@/constants/regions'
import sectors from '@/constants/sectors'
import { supabase } from '../supabase'

export default {
  methods: {
    async getPopularCities() {
      try {
        this.loading = true

        let { data: cities } = await supabase
          .from('cities')
          .select(
            `
            id,
            name,
            photo,
            jobs:id ( name )
            `
          )
          .order('name', { foreignTable: 'jobs', count: 'exact' })

        this.cities = cities
      } catch (err) {
        console.error('List popular error ->', err)
      } finally {
        this.loading = false
      }
    }
  },

  created() {
    this.getPopularCities()
  },

  data() {
    return {
      cities: [],
      loading: false,
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
      <h2 class="text-white font-bold mb-2 text-4xl">Search Job 🔍</h2>
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

    <div class="w-full mt-5 space-x-4 carousel carousel-center rounded-box">
      <template v-if="loading">
        <div class="carousel-item" v-for="(item, index) in 6" :key="index">
          <div class="h-44 w-64 bg-slate-100"></div>
        </div>
      </template>

      <template v-else>
        <div
          class="carousel-item rounded-box h-44 w-64 bg-center cursor-pointer"
          :style="`background: url(${city.photo}) center center / cover`"
          :key="city.id"
          v-for="city in cities"
        >
          <div
            class="h-44 w-64 bg-black/[.3] rounded-box flex justify-center flex-col p-5"
          >
            <h1 class="text-white text-center block w-full text-3xl">
              {{ city.name }}
            </h1>

            <p class="text-white block w-full text-center text-sm">
              {{ city.jobs.length }}+ Jobs
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style></style>
