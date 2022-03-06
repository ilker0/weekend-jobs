<script>
import sectors from '@/constants/sectors'
import currencies from '@/constants/currencies'

export default {
  data() {
    return {
      sectors,
      currencies,
      show: false
    }
  },

  props: {
    name: {
      default: () => null,
      type: String
    },

    owner: {
      default: () => null,
      type: String
    },

    city: {
      default: () => null,
      type: String
    },

    date: {
      default: () => null,
      type: String
    },

    mail: {
      default: () => null,
      type: String
    },

    phone: {
      default: () => null,
      type: String
    },

    sector: {
      default: () => null,
      type: String
    },

    price: {
      default: () => null,
      type: Number
    },

    currency: {
      default: () => null,
      type: String
    },

    description: {
      default: () => null,
      type: String
    }
  }
}
</script>

<template>
  <div tabindex="0" class="collapse rounded-xl border-2 p-0">
    <div class="collapse-title cursor-pointer p-0">
      <div class="rounded-xl p-4 cursor-pointer bg-white">
        <div class="flex items-start">
          <span class="text-4xl pt-1">{{
            sectors.find((item) => item.value === sector).emoji
          }}</span>

          <div class="ml-5 grid grid-cols-4 flex w-full items-center">
            <div class="col-span-4 md:col-span-3">
              <h1 class="text-lg font-semibold w-full">
                I'm looking a {{ name }} for the weekend
              </h1>
              <p class="text-sm inline-block">🤙 {{ owner }}</p>
              <p class="text-sm ml-3 inline-block">📍 {{ city }}</p>
              <p class="text-sm md:ml-3 inline-block w-full md:w-auto">
                🕐 {{ date }}
              </p>

              <div class="flex w-full flex-col md:flex-row">
                <span class="text-sm m-0 mt-2">
                  📧 <a :href="`mailto:${mail}`">{{ mail }}</a>
                </span>
                <span class="text-sm m-0 mt-2 md:ml-3">
                  📞 <a :href="`tel:${phone}`">{{ phone }}</a>
                </span>
              </div>
            </div>

            <p
              class="m-0 text-xl font-semibold col-span-4 md:col-span-1 md:mt-0 mt-3"
            >
              {{
                price
                  ? currencies.find((item) => item.value === currency).emoji
                  : '-'
              }}{{ price }}<span class="text-sm font-normal">/Hour</span>
            </p>
          </div>
        </div>

        <hr class="mt-5 mb-5" v-if="show && description" />
      </div>
    </div>
    <div class="collapse-content bg-white">
      <p class="pt-5" v-html="description"></p>
    </div>
  </div>
</template>

<style></style>
