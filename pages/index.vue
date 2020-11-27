<template>
  <div class="container">
    <canvas ref="canvas">Your browser does not support Canvas.</canvas>

    <a @click="drawAvatar">[Draw]</a>
    <a ref="downloadBtn" @click="download">Download</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        }
      },

      download() {
        const download = this.$refs.downloadBtn;
        const image = this.canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');
        download.setAttribute('href', image);
        download.setAttribute('download', 'flier.png');
      },
    },
  };
</script>
