import { createRouter, createWebHistory } from 'vue-router'

//http://localhost:5173/admin/dashboard
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin/Homepage.vue'),
      meta: { requiredAuth: true, requiredAdmin: true},
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/Admin/Dashboard.vue'),
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('../views/Admin/Account/Account.vue'),
        },
        {
          path: 'add-account',
          name: 'addAccount',
          component: () => import('../views/Admin/Account/AddAccount.vue'),
        },
        {
          path: 'update-account/:idAccount',
          name: 'updateAccount',
          component: () => import('../views/Admin/Account/UpdateAccount.vue'),
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('../views/Admin/Category/Category.vue'),
        },{
          path: 'add-category',
          name: 'addCategory',
          component: () => import('../views/Admin/Category/AddCategory.vue'),
        },{
          path: 'update-category/:idCategory',
          name: 'updateCategory',
          component: () => import('../views/Admin/Category/UpdateCategory.vue'),
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('../views/Admin/Product/Product.vue'),
        },
        {
          path: 'add-product',
          name: 'AddProduct',
          component: () => import('../views/Admin/Product/AddProduct.vue'),
        },
        {
          path: 'update-product/:idProduct',
          name: 'updateProduct',
          component: () => import('../views/Admin/Product/UpdateProduct.vue'),
        },
        {
          path: 'order-admin',
          name: 'orderAdmin',
          component: () => import('../views/Admin/Order.vue'),
        },
        {
          path: 'order-admin-detail/:order_id',
          name: 'orderAdminDetail',
          component: () => import('../views/Admin/OrderDetail.vue'),
        },
      ]
    },
    {
      path: '/',
      name: 'user',
      component: () => import('../views/User/HomePage.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/User/Dashboard.vue'),
        },
        {
          path: 'product-category/:idCategory',
          name: 'productCategory',
          component: () => import('../views/User/ProductCategory.vue'),
        },
        {
          path: 'product-detail/:idProduct',
          name: 'productDetail',
          component: () => import('../views/User/ProductDetail.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/User/Cart.vue'),
        },
        {
          path: 'pay-ment',
          name: 'payMent',
          component: () => import('../views/User/Checkout.vue')
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/User/Order.vue')
        },
        {
          path: 'order-detail/:order_id',
          name: 'orderDetail',
          component: () => import('../views/User/OrderDetail.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },

  ]
})


router.beforeEach((to, from, next) =>{
  let userLogin = localStorage.getItem("userLogin");
  if(to.meta.requiredAuth && userLogin == null){
    next({path: '/login'})
  }else {
    userLogin = JSON.parse(userLogin);
    if(to.meta.requiredAdmin && userLogin.role != 'admin'){
      next({path: '/'});
    }else{
      next()
    }
  }
})

export default router
