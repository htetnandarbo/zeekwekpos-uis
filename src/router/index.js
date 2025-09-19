import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import CartModal from '../pages/CartModal.vue'
import EmailSendingUi from '../pages/EmailSendingUi.vue'
import EmailSendingUi2 from '../pages/EmailSendingUi2.vue'
import Index from '../pages/Index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'home',
        component: Index,
      },
       {
        path: '/cartmodal',
        name: 'cartmodal',
        component: CartModal,
      },
      {
        path: '/emailsendingui1',
        name: 'emailsendingui1',
        component: EmailSendingUi,
      },
       {
        path: '/emailsendingui2',
        name: 'emailsendingui2',
        component: EmailSendingUi2,
      }
      
   
  ],
})

export default router
