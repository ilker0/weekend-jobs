<script>
import moment from 'moment'
export default {
  created() {
    this.moment = moment
  }
}
</script>

<template>
  <p class="text-center text-sm pt-5 pb-5 container mx-auto">
    © {{ moment().year() }}. Weekend Jobs all rights reserved
  </p>
</template>
