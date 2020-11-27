// tailwind.config.js

module.exports = {
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },

    // extend: {
    //   backgroundOpacity: {
    //     10: '0.1',
    //     25: '0.25',
    //     50: '0.5',
    //     95: '0.95',
    //   },
    // },
  },

  variants: {
    extend: {
      opacity: ['active'],
    },
  },
};
