import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/task",
      name: "task-list",
      component: () => import("../components/TaskList.vue")
    }, {
      path: "/task/:id",
      name: "task-details",
      component: () => import("../components/TaskDetails.vue")
    }, {
      path: "/task/add",
      name: "task-add",
      component: () => import('../components/TaskAdd.vue')
    }, /*{
      path: "/task/edit",
      name: "task-edit",
      component: () => import("./components/TaskEdit")
    }*/
  ]
})

export default router
