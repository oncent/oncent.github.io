/// <reference types="vite/client" />

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare const __APP_VERSION__: string;
