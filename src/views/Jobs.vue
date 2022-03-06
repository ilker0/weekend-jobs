<script>
import { supabase } from '@/supabase'
import Work from '@/components/Work.vue'
import JobFilter from '@/components/JobFilter.vue'
import FooterLayout from '@/components/Footer.vue'
import HeaderLayout from '@/components/Header.vue'
import Tags from '@/components/Tags.vue'
import moment from 'moment'
import _ from 'lodash'
import regions from '@/constants/regions'
import VueWriter from 'vue-writer'

export default {
  components: {
    Work,
    JobFilter,
    FooterLayout,
    HeaderLayout,
    Tags,
    VueWriter
  },

  data() {
    return {
      regions,
      cities: [],
      jobs: [],
      cityLoading: false,
      jobLoading: false,
      moreLoading: false,
      page: {
        from: 0,
        to: 19
      }
    }
  },

  computed: {
    popularCities() {
      this.cities.forEach((city) => {
        this.regions.forEach((region) => {
          if (city.region === region.value) {
            city.regionName = region.name
            city.regionEmoji = region.emoji
          }
        })
      })

      return this.cities
    }
  },

  methods: {
    async getPopularCities() {
      try {
        this.cityLoading = true
        let { data: cities } = await supabase.rpc('popular_cities')

        // .range(0, 19)
        this.cities = cities
      } catch (err) {
        console.error('List popular error ->', err)
      } finally {
        this.cityLoading = false
      }
    },

    async getJobs(filter, query) {
      try {
        let supaQuery = supabase
          .from('jobs')
          .select(
            `
            *,
            city!inner(*)
            `
          )
          .range(this.page.from, this.page.to)

        if (query.name) {
          supaQuery = supaQuery.ilike('name', `%${query.name}%`)
        }

        if (query.city) {
          supaQuery = supaQuery.ilike('city.name', `%${query.city}%`)
        }

        if (query.sector) {
          supaQuery = supaQuery.eq('sector', `${query.sector}`)
        }

        if (query.minPrice) {
          supaQuery = supaQuery.gte('price', `${query.minPrice}`)
        }

        if (query.maxPrice) {
          supaQuery = supaQuery.lte('price', `${query.maxPrice}`)
        }

        if (query.sort) {
          const [operator, key] = query.sort.split(',')
          supaQuery = supaQuery.order(key, { ascending: operator === 'ASC' })
        } else {
          supaQuery = supaQuery.order('created_at', { ascending: false })
        }

        let { data: jobs } = await supaQuery

        if (filter) {
          this.jobs = jobs
        } else {
          this.jobs = [...this.jobs, ...jobs]
        }
      } catch (err) {
        console.error('List popular error ->', err)
      } finally {
        this.jobLoading = false
        this.moreLoading = false
      }
    },

    filterReset: _.debounce(
      function () {
        this.$router.push({ name: 'jobs', query: {} })
        this.getJobs(true, {})
      },
      500,
      { trailing: true }
    ),

    routerSetQuery(params) {
      this.$router.push({ name: 'jobs', query: params })
    },

    searchDebounce: _.debounce(
      function (params) {
        this.getJobs(true, params)
      },
      500,
      { trailing: true }
    )
  },

  created() {
    this.getPopularCities()
    this.jobLoading = true
    this.getJobs(true, this.$route.query)

    this.moment = moment
  }
}
</script>

<template>
  <header-layout />
  <div
    class="bg-[url('@/assets/palms.jpeg')] w-full bg-cover h-96 bg-no-repeat bg-center relative"
  >
    <div
      class="container mx-auto flex items-center justify-center h-full w-full flex-col z-10"
    >
      <vue-writer
        class="hidden md:inline text-white text-2xl mb-10 -mt-12 font-bold"
        :array="['Only weekend jobs', 'Saturday, Sunday']"
      />
      <h2 class="text-white font-bold mb-2 text-4xl">Search Job 🔍</h2>
      <input
        type="text"
        placeholder="Example: Mechanic"
        class="input input-bordered w-full max-w-xs"
        @input="
          (e) => {
            this.jobLoading = true

            if (e.target.value.length > 0) {
              searchDebounce({ name: e.target.value })
            } else {
              searchDebounce({})
            }
          }
        "
      />
    </div>
  </div>

  <div class="container mx-auto px-5 lg:px-0">
    <job-filter
      @onChangeFilter="
        (val) => {
          this.jobLoading = true
          searchDebounce(val)
        }
      "
      @clearFilter="
        () => {
          filterReset()
        }
      "
    />

    <h1 class="mt-5 text-2xl font-semibold">Popular Cities ⭐</h1>

    <div class="w-full mt-5 space-x-4 carousel carousel-center rounded-xl">
      <template v-if="cityLoading">
        <div class="carousel-item" v-for="(item, index) in 6" :key="index">
          <div class="h-44 w-64 bg-slate-100 animate-pulse"></div>
        </div>
      </template>

      <template v-else>
        <div
          class="carousel-item rounded-xl h-44 w-64 bg-center cursor-pointer"
          :style="`background: url(${city.photo}) center center / cover`"
          :key="city.id"
          v-for="city in popularCities"
          @click="
            () => {
              this.jobLoading = true
              searchDebounce({ city: city.name })
            }
          "
        >
          <div
            class="h-44 w-64 bg-black/[.4] rounded-xl flex justify-center flex-col p-5 relative"
          >
            <p class="absolute left-0 top-0 pl-3 pt-3 text-white text-xs">
              {{ city.regionEmoji }} {{ city.regionName }}
            </p>
            <h1 class="text-white text-center block w-full text-3xl">
              {{ city.name }}
            </h1>

            <p class="text-white block w-full text-center text-sm">
              {{ city.job }}+ Jobs
            </p>
          </div>
        </div>
      </template>
    </div>

    <div class="mt-10 mb-10 grid grid-cols-2 gap-5 flex items-start">
      <template v-if="jobLoading">
        <div
          class="h-28 w-full bg-slate-100 rounded-xl animate-pulse col-span-2 lg:col-span-1"
          v-for="(item, index) in 6"
          :key="index"
        ></div>
      </template>

      <template v-if="!jobLoading">
        <h1
          v-if="jobs.length === 0"
          class="text-2xl font-semibold mb-5 col-span-2 text-center"
        >
          Job not found 😔
        </h1>

        <work
          class="col-span-2"
          v-for="job in jobs"
          v-else
          :key="job.id"
          :name="job.name"
          :owner="job.owner"
          :city="job.city.name"
          :date="moment(job.created_at).fromNow()"
          :mail="job.email"
          :phone="job.phone"
          :sector="job.sector"
          :price="job.price"
          :currency="job.currency"
          :description="job.description"
        />
      </template>
    </div>

    <div class="flex justify-center" v-if="jobs.length !== 0">
      <button
        @click="
          () => {
            moreLoading = true
            page.from += 20
            page.to += 20

            getJobs(false, $route.query)
          }
        "
        :class="`btn btn-wide btn-primary text-white mb-5 ${
          moreLoading && 'loading'
        }`"
      >
        More Jobs
      </button>
    </div>
  </div>

  <tags
    class="mt-5"
    @onChangeFilter="
      (val) => {
        this.jobLoading = true
        getJobs(true, val)
      }
    "
  />
  <footer-layout />
</template>
