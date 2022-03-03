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

    <div class="ml-5 flex justify-between w-full items-center">
      <div>
        <h1 class="text-lg font-semibold w-full">{{ name }}</h1>
        <p class="text-sm inline-block">🤙 {{ owner }}</p>
        <p class="text-sm ml-3 inline-block">📍 {{ city }}</p>
        <p class="text-sm ml-3 inline-block">🕐 {{ date }}</p>

        <div class="flex">
          <span class="text-sm m-0 mt-2">
            📧 <a :href="`mailto:${mail}`">{{ mail }}</a>
          </span>
          <span class="text-sm m-0 ml-3 mt-2">
            📞 <a :href="`tel:${phone}`">{{ phone }}</a>
          </span>
        </div>
      </div>

      <p class="m-0 text-xl font-semibold">
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
