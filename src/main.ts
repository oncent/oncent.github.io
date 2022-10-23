import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:windi.css";
import "@/styles/main.scss";
import { initI18n } from "./locale";
// import { addRandomTestData } from "./test/test";

const app = createApp(App);

app.use(router);

initI18n().then((i18n) => {
  app.use(i18n);
  app.mount("#app");
});

// document.body.addEventListener("click", () => {
//   if (confirm("add ?")) {
//     addRandomTestData();
//   }
// });
