<script>
import sectors from '@/constants/sectors'
import currencies from '@/constants/currencies'

export default {
  data() {
    return {
      sectors,
      currencies
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
    }
  }
}
</script>

<template>
  <div class="rounded-xl items-center flex border-2 p-4 cursor-pointer">
    <span class="text-4xl">{{
      sectors.find((item) => item.value === sector).emoji
    }}</span>

    <div class="ml-5 grid grid-cols-4 flex w-full items-center">
      <div class="col-span-4 lg:col-span-3">
        <h1 class="text-lg font-semibold w-full">{{ name }}</h1>
        <p class="text-sm inline-block">🤙 {{ owner }}</p>
        <p class="text-sm ml-3 inline-block">📍 {{ city }}</p>
        <p class="text-sm lg:ml-3 inline-block w-full lg:w-auto">
          🕐 {{ date }}
        </p>

        <div class="flex w-full flex-col lg:flex-row">
          <span class="text-sm m-0 mt-2">
            📧 <a :href="`mailto:${mail}`">{{ mail }}</a>
          </span>
          <span class="text-sm m-0 mt-2 lg:ml-3">
            📞 <a :href="`tel:${phone}`">{{ phone }}</a>
          </span>
        </div>
      </div>

      <p
        class="m-0 text-xl font-semibold col-span-4 lg:col-span-1 lg:mt-0 mt-3"
      >
        {{
          price
            ? currencies.find((item) => item.value === currency).emoji
            : '-'
        }}{{ price }}<span class="text-sm font-normal">/Hour</span>
      </p>
    </div>
  </div>
</template>

<style></style>
