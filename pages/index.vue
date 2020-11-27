<template>
  <main
    class="container opacity-100 flex flex-col justify-around my-auto py-4 min-h-screen align-center"
  >
    <nav>
      <the-header />

      <div class="hidden">
        <canvas ref="canvas">Your browser does not support Canvas.</canvas>
      </div>
    </nav>

    <div
      v-if="loader"
      class="text-center text-purple-600 pt-20 text-xl cursor-wait"
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="64"
          height="64"
          class="mx-auto mb-4"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 2a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0v-3a1 1 0 0 1 1-1zm10-5a1 1 0 0 1-1 1h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1zM7 12a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1zm12.071 7.071a1 1 0 0 1-1.414 0l-2.121-2.121a1 1 0 0 1 1.414-1.414l2.121 2.12a1 1 0 0 1 0 1.415zM8.464 8.464a1 1 0 0 1-1.414 0L4.93 6.344a1 1 0 0 1 1.414-1.415L8.464 7.05a1 1 0 0 1 0 1.414zM4.93 19.071a1 1 0 0 1 0-1.414l2.121-2.121a1 1 0 1 1 1.414 1.414l-2.12 2.121a1 1 0 0 1-1.415 0zM15.536 8.464a1 1 0 0 1 0-1.414l2.12-2.121a1 1 0 0 1 1.415 1.414L16.95 8.464a1 1 0 0 1-1.414 0z"
            fill="rgba(113,69,194,1)"
          />
        </svg>
      </div>
      <div>Processing. Please Wait. . .</div>
    </div>

    <div v-else-if="!downloadLink" class="text-center">
      <label for="file">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="cursor-pointer mx-auto"
            width="150"
            height="150"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M9 3h6l2 2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4l2-2zm3 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
              fill="#7145c2"
            />
          </svg>
        </div>
        <a
          class="block w-4/5 py-3 mx-auto border border-purple-800 text-purple-800 font-bold transition-colors duration-150 bg-purple-100 rounded-lg focus:shadow-outline hover:bg-purple-200 cursor-pointer"
        >
          Upload your photo
        </a>
      </label>

      <input
        id="file"
        ref="uploadedPhoto"
        type="file"
        class="hidden"
        accept="image/png, image/jpeg, image/jpg"
        @change="drawAvatar()"
      />
    </div>

    <div v-else-if="downloadLink" class="text-purple-500 text-center">
      <div class="flex justify-center mb-4">
        <a :href="downloadLink" class="border border-purple-300 rounded p-1">
          <img :src="downloadLink" width="250" class="rounded" />
        </a>
      </div>

      <a
        :href="downloadLink"
        download="flier.jpg"
        class="w-4/5 block py-3 mx-auto text-purple-100 font-bold transition-colors duration-150 bg-purple-700 rounded-lg focus:shadow-outline hover:bg-purple-800 cursor-pointer"
      >
        Download
      </a>

      <div class="mt-4">
        <button
          class="w-1/3 block text-sm py-2 mx-auto border border-purple-800 text-purple-700 font-bold transition-colors duration-150 bg-purple-100 rounded-lg focus:shadow-outline hover:bg-purple-200 cursor-pointer"
          @click="reset"
        >
          Reset
        </button>
      </div>
    </div>

    <the-footer />
  </main>
</template>

<script>
  export default {
    data() {
      return {
        loader: false,
        downloadLink: null,

        uploadedPhoto: null,

        ctx: null,
        canvas: null,
        background: {
          src: '/img/rccg-1024.jpg',
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
          if (this.$refs.uploadedPhoto.files) {
            // Convert photo to base64 format (i.e data url)
            const imgData = URL.createObjectURL(
              this.$refs.uploadedPhoto.files[0]
            );

            this.loader = true;
            this.downloadLink = null;

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
            img.src = imgData;

            // Wait a bit
            setTimeout(() => {
              this.downloadLink = this.canvas
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');

              // Disable Loader
              this.loader = false;
            }, 3000);
          }
        } catch (error) {
          // Do nothing
          this.loader = false;
        } finally {
          // this.loader = false;
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
