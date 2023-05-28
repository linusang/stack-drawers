import Home from "./pages/Home.vue";
import Product from "./pages/Product.vue";
import ProductEdit from "./pages/ProductEdit.vue";
import Products from "./pages/Products.vue";

export const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
    children: [
      {
        name: "products",
        path: "products",
        component: Products,
        children: [
          {
            name: "product",
            path: ":id",
            component: Product,
            children: [
              {
                name: "product-edit",
                path: "edit",
                component: ProductEdit,
              },
            ],
          },
        ],
      },
    ],
  },
];
