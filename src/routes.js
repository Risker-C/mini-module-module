import Home from "@/pages/Home.vue";
import Supplier from "@/pages/supplier/index.vue"
import SupplierInfo from "@/pages/supplier/info/index.vue"
// import {
//   createRouter,
//   createWebHashHistory
// } from "vue-router";
export default [{
    path: "/module-page",
    name: "modulePage",
    component: Home,
  },
  {
    path: "/supplier",
    name: "supplier",
    hidden: false,
    component: Supplier,
    meta: {
      "title": "供应商",
      "icon": "#",
      "noCache": false,
      "link": null
    },
    children: []
  }, {
    path: "/supplier-info",
    name: "supplierInfo",
    hidden: false,
    component: SupplierInfo,
    meta: {
      "title": "供应商详情",
      "icon": "#",
      "noCache": false,
      "link": null
    },
  }
];
// export default routes

// export const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// })