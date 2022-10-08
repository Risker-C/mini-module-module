import {
  useModule
} from "vue-module-loader";
import localModule from "./module";
import * as Vue from "vue";
import * as VueRouter from "vue-router";
import 'element-plus/dist/index.css'
import * as Pinia from "pinia"
import * as ElementPlus from "element-plus"
import * as YhRequest from "yh-request"
useModule({
  name: "main",
  install(ctx) {
    ctx.external = {
      Vue,
      VueRouter,
      Pinia,
      ElementPlus,
      YhRequest
    }
    ctx.Vue = Vue;
    ctx.VueRouter = VueRouter;
  }
}).then(() => {
  useModule("http://localhost:5000/module/vue3-module-frame-main.iife.js").then(() => {
    useModule(localModule);
  });
})