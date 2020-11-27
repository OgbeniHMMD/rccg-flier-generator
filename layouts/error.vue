<template>
  <main
    class="container opacity-100 flex flex-col justify-center my-auto py-4 min-h-screen align-center"
  >
    <the-header />

    <section class="py-4">
      <div class="font-bold text-2xl text-center mb-2">
        {{ error.statusCode }} Error!
      </div>
      <div class="text-xl text-center">{{ error.message }}</div>
    </section>

    <the-footer />
  </main>
</template>

<script>
  export default {
    props: {
      error: {
        type: Object,
        default: null,
      },
    },
    head() {
      return {
        title: this.error.message,
      };
    },
  };
</script>
