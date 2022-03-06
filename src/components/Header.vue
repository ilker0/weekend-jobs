<script>
export default {
  props: {
    postButton: {
      default: () => true,
      type: Boolean
    }
  }
}
</script>

<template>
  <div class="b-5">
    <div class="container mx-auto px-5 lg:px-0">
      <header class="flex justify-between items-center mt-5">
        <h1>Weekend Jobs</h1>

        <router-link
          v-if="postButton"
          to="/post-job"
          class="btn btn-primary text-white"
          >📨 Post Job
        </router-link>
      </header>

      <vue-writer class="md:hidden" :array="arr" />
    </div>

    <hr class="mt-5" />
  </div>
</template>
