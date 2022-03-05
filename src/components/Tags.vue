<script>
import { supabase } from '@/supabase'
import sectors from '@/constants/sectors'

export default {
  data() {
    return {
      list: [],
      loading: false,
      sectors
    }
  },

  computed: {
    tags() {
      this.list.forEach((job) => {
        job.emoji = sectors.find((item) => item.value === job.sector).emoji
      })

      return this.list
    }
  },

  methods: {
    async getTags() {
      try {
        this.loading = true

        let { data: tags } = await supabase.from('tags').select(
          `
           *,
           city!inner(name)
            `
        )

        this.list = tags
      } catch (err) {
        console.error('List popular error ->', err)
      } finally {
        this.loading = false
      }
    },

    onClick(tag) {
      this.$emit('onChangeFilter', {
        city: tag.city.name,
        name: tag.name
      })
    }
  },

  created() {
    this.getTags()
  }
}
</script>

<template>
  <div class="bg-gray-100 pt-5 pb-5 px-8 lg:px-0">
    <div class="container mx-auto grid grid-cols-4 gap-5">
      <template v-if="loading">
        <div
          v-for="(item, index) in 12"
          :key="index"
          class="h-5 w-64 bg-white animate-pulse rounded-xl"
        ></div>
      </template>
      <template v-else>
        <p
          class="cursor-pointer col-span-4 text-center md:text-left md:col-span-2 lg:col-span-1 text-sm hover:underline"
          v-for="tag in tags"
          :key="tag.id"
          @click="
            () => {
              onClick(tag)
            }
          "
        >
          {{ tag.emoji }} {{ tag.name }}, {{ tag.city.name }}
        </p>
      </template>
    </div>
  </div>
</template>
