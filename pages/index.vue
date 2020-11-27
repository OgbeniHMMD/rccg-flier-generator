<template>
  <main
    class="bg-purple-300 bg-contain bg-center bg-no-repeat bg-opacity-25 min-h-screen"
  >
    <div
      class="container opacity-100 flex flex-col justify-around my-auto py-4 min-h-screen align-center"
    >
      <img src="/icon.png" width="100" class="mx-auto mb-20" />

      <div class="hidden">
        <canvas ref="canvas">Your browser does not support Canvas.</canvas>
      </div>

      <div v-if="loader" class="text-center text-purple-600 pt-20 text-2xl">
        Please, Wait. . .
      </div>

      <button
        v-if="!downloadLink"
        class="w-4/5 h-12 px-6 mx-auto border border-purple-800 text-purple-800 text-xl font-bold transition-colors duration-150 bg-purple-100 rounded-lg focus:shadow-outline hover:bg-purple-200"
        @click="drawAvatar"
      >
        Upload your photo
      </button>

      <div v-if="downloadLink" class="text-purple-500 text-center">
        <img :src="downloadLink" width="250" class="mx-auto mb-8" />

        <a
          :href="downloadLink"
          download="flier.png"
          class="w-4/5 block py-4 mx-auto text-purple-100 text-xl font-bold transition-colors duration-150 bg-purple-700 rounded-lg focus:shadow-outline hover:bg-purple-800"
        >
          Download
        </a>

        <div class="mt-4">
          <a
            class="w-1/3 block py-3 mx-auto border border-purple-800 text-purple-700 font-bold transition-colors duration-150 bg-purple-100 rounded-lg focus:shadow-outline hover:bg-purple-200"
            @click="reset"
          >
            Reset
          </a>
        </div>
      </div>

      <div class="text-center text-purple-500 pt-8">
        Powered by RCCG, Lagos Province 55
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        loader: false,
        downloadLink: null,

        ctx: null,
        canvas: null,
        background: {
          src: '/img/rccg-1024.png',
          width: 1024,
          height: 1024,
        },

        avatar: {
          top: 270, // centerX
          left: 190, // centerY
          width: 483, // radius
        },
      };
    },

    mounted() {
      this.canvas = this.$refs.canvas;

      this.canvas.height = this.background.height;
      this.canvas.width = this.background.width;

      this.ctx = this.canvas.getContext('2d');

      this.drawBackground();
    },

    methods: {
      drawBackground() {
        if (this.canvas.getContext) {
          // Draw Background Picture on canvas on 'image load'
          const img = new Image();
          img.onload = () => {
            this.ctx.drawImage(img, 0, 0);
          };
          img.src = this.background.src;
        }
      },

      drawAvatar() {
        try {
          this.loader = true;
          this.downloadLink = null;

          if (this.canvas.getContext) {
            // Draw User avatar on canvas  on 'image load'
            const img = new Image();
            img.onload = () => {
              // define a path
              this.ctx.beginPath();
              this.ctx.arc(
                this.avatar.top + this.avatar.width / 2,
                this.avatar.left + this.avatar.width / 2,
                this.avatar.width / 2,
                0,
                2 * Math.PI
              );
              this.ctx.closePath();

              // clip new drawings within this path
              this.ctx.clip();
              this.ctx.drawImage(
                img,
                this.avatar.top,
                this.avatar.left,
                this.avatar.width,
                this.avatar.width
              );
            };
            img.src = '/img/avatar.jpg';

            //
            this.downloadLink = this.canvas
              .toDataURL('image/png')
              .replace('image/png', 'image/octet-stream');
          }
        } catch (error) {
          // Do nothing
        } finally {
          this.loader = false;
        }
      },

      reset() {
        this.downloadLink = null;
      },
    },
  };
</script>

<style scoped>
  .bg {
    background-image: url('/icon.png');
  }
</style>
