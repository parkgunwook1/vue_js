import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import ProductCart from '../views/ProductCart.vue'
import ProductCreate from '../views/ProductCreate.vue'
import ProductUpdate from '../views/ProductUpdate.vue'
import SalesList from '../views/SalesList.vue'
import ImageInsert from '../views/ImageInsert.vue'
import ProductOrder from '../views/ProductOrder.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProductList
  },
  {
    path: '/detail',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
  path: '/order',
    name: 'ProductOrder',
    component: ProductOrder
  },
  {
    path: '/create',
    name: 'ProductCreate',
    component: ProductCreate
  },
  {
    path: '/update',
    name: 'ProductUpdate',
    component: ProductUpdate
  },
  {
    path: '/sales',
    name: 'SalesList',
    component: SalesList
  },
  {
    path: '/image_insert',
    name: 'ImageInsert',
    component: ImageInsert
  },
    {
      path: '/cart',
      name: 'ProductCart',
      component: ProductCart
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router