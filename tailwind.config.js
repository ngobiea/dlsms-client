/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      margin: {
        chat: '24rem',
      },
      height: {
        welcome: 'calc(100vh - 6rem)',
        webcam: '25rem',
      },
      width: {
        webcam: '35rem',
      },
    },
    colors: {
      title: '#064f32',
      sidebar: '#06603a',
      sidebarHover: '#2b7858',
    },
    backgroundImage: {
      'session-profile': 'url("./src/renderer/public/images/sessionProfile.jpg")',
    }
  },
  plugins: [require('flowbite/plugin')],
};
