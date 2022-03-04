<script>
import regions from '@/constants/regions'
import sectors from '@/constants/sectors'
import { defineComponent, ref, watch } from 'vue'
import lodash from 'lodash'

export default defineComponent({
  setup(_, { emit }) {
    const filter = ref({
      city: null,
      sector: null,
      minPrice: null,
      maxPrice: null,
      sort: 'DESC,created_at'
    })

    const filterDebounce = lodash.debounce((val) => {
      emit('onChangeFilter', val)
    }, 500)

    watch(
      filter,
      (val) => {
        let items = Object.fromEntries(
          Object.entries(val).filter(([_, v]) => v !== null && v !== '')
        )

        filterDebounce(items)
      },
      { deep: true }
    )

    return {
      regions,
      sectors,
      filter
    }
  }
})
</script>

<template>
  <div class="grid grid-cols-4 gap-5 mt-5">
    <input
      type="text"
      placeholder="Example: Paris"
      class="input input-bordered w-full max-w-xs col-span-2 lg:col-span-1"
      v-model="filter.city"
    />

    <select
      v-model="filter.sector"
      class="select w-full font-normal select-bordered col-span-2 lg:col-span-1"
    >
      <option :value="null" disabled selected>Sector</option>

      <option
        :value="sector.value"
        v-for="(sector, index) in sectors"
        :key="index"
      >
        {{ sector.emoji }} {{ sector.name }}
      </option>
    </select>

    <div class="col-span-4 lg:col-span-1 flex">
      <input
        v-model="filter.minPrice"
        type="text"
        placeholder="Min Price"
        class="input input-bordered w-full"
      />
      <input
        v-model="filter.maxPrice"
        type="text"
        placeholder="Max Price"
        class="input input-bordered w-full ml-5"
      />
    </div>

    <select
      v-model="filter.sort"
      class="select w-full font-normal select-bordered col-span-4 lg:col-span-1"
    >
      <option :value="false" disabled selected>Sort by ↕️</option>
      <option value="ASC,name">Name (A-Z)</option>
      <option value="DESC,name">Name (Z-A)</option>
      <option value="ASC,created_at">Date (A-Z)</option>
      <option value="DESC,created_at">Date (Z-A)</option>
      <option value="ASC,price">Price (A-Z)</option>
      <option value="DESC,price">Price (Z-A)</option>
    </select>
  </div>
</template>
