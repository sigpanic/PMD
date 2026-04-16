import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Test from '../views/Test.vue';
import Result from '../views/Result.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  }
];

const router = createRouter({
  history: createWebHistory('/XBTI/'),
  routes
});

export default router;
