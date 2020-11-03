import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  theme: {
    themes: {
      light: {
        primary: "#009688",
        secondary: "#ff5722",
        accent: "#607d8b",
        error: "#f44336",
        warning: "#ffc107",
        info: "#03a9f4",
        success: "#4caf50"
      },
      dark: {
        primary: "#009688",
        secondary: "#ff5722",
        accent: "#607d8b",
        error: "#f44336",
        warning: "#ffc107",
        info: "#03a9f4",
        success: "#4caf50"
      }
    }
  }
});
