import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import CartModal from '../pages/CartModal.vue'
import EmailSendingUi from '../pages/EmailSendingUi.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'home',
        component: App,
      },
       {
        path: '/cartmodal',
        name: 'cartmodal',
        component: CartModal,
      },
      {
        path: '/emailsendingui',
        name: 'emailsendingui',
        component: EmailSendingUi,
      }
      
   
  ],
})

export default router
