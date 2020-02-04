import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
const normal = {
  auth: true,
  firstTime: true
};
const firstTime = {
  auth: true,
  firstTime: false
};
export default new Router(
  {
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: normal
      },
      {
        path: '/project/index',
        name: 'project.index',
        component: () => import('./views/Projects/ProjectIndex.vue'),
        meta: normal
      },
      {
        path: '/team/index',
        name: 'team.index',
        component: () => import('./views/Team/TeamIndex.vue'),
        meta: normal
      },
      {
        path: '/forms',
        name: 'forms',
        component: () => import('./views/Forms.vue'),
        meta: {
          auth: false
        }
      },
      {
        path: '/admin/index',
        name: 'admin.index',
        component: () => import ('./views/Admin/AdminIndex.vue'),
        meta: normal
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('./views/Profile.vue'),
        meta: normal

      },
      {
        path: '/company/profile',
        name: 'company.profile',
        component: () => import('./views/Companies/CompaniesForm.vue'),
        meta: normal

      },
      {
        path: '/client/index',
        name: 'client.index',
        component: () => import('./views/Clients/ClientIndex.vue'),
        meta: normal

      },
      {
        path: '/file/:id',
        name: 'file.view',
        component: () => import('./views/File/FileView.vue'),
        meta: normal
      },
      {
        path: '/client/new',
        name: 'client.new',
        component: () => import('./views/Clients/ClientForm.vue'),
        meta: normal
      },
      {
        path: '/project/:id',
        name: 'component.index',
        component: () => import('./views/Projects/Component/ComponentIndex.vue'),
        meta: normal,
      },
      {
        path: '/component/entity/:id',
        name: 'component.entity',
        component: () => import('./views/Projects/Component/ComponentView.vue'),
        meta: normal,
      },
      {
        path: '/timesheet/overview',
        name: 'timesheet.overview',
        component: () => import('./views/Timesheet/TimesheetIndex.vue'),
        meta: normal,
      },
      {
        path: '/timesheet/report',
        name: 'timesheet.report',
        component: () => import('./views/Timesheet/TimesheetSchedule.vue'),
        meta: normal
      },
      {
        path: '/timesheet/schedule',
        name: 'timesheet.schedule',
        component: () => import('./views/Timesheet/TimesheetSchedule.vue'),
        meta: normal
      },
      {
        path: '/timesheet/stage',
        name: "timesheet.stage",
        component: () => import('./views/Timesheet/TimesheetStage.vue'),
        meta: normal
      },
      {
        path: '/invoice/overview',
        name: 'invoice.overview',
        component: () => import('./views/Invoice/InvoiceOverview.vue'),
        meta: normal
      },
      {
        path: '/invoice/index',
        name: 'invoice.index',
        component: () => import('./views/Invoice/InvoiceIndex.vue'),
        meta: normal
      },
      {
        path: '/invoice/new',
        name: 'invoice.new',
        component: () => import('./views/Invoice/InvoiceForm.vue'),
        meta: normal
      },
      {
        path: '/register/step',
        name: 'stepForm',
        component: () => import('./views/StepForm/StepDefault.vue'),
        meta: firstTime
      }
    ],

    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    }
  })
