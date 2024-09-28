// 第一步是导入vue，为什么？
import Vue from 'vue'
// 第二步是导入组件，为什么？
import VueRouter from 'vue-router'
import CreateQuestionArea from '@/components/CreateQuestionArea';
import CreateSurveyArea from '@/components/CreateSurveyArea';
import CanNotFind from '@/components/CanNotFind'
import QuestionListArea from '@/components/QuestionListArea';
import LogIn from '@/views/Log_In';
import InformationsDisplay from '@/views/InformationsDisplay';
import LocationAPI from '@/components/LocationAPI';
import EchartsAccelerometers from '@/components/EchartsAccelerometers';
import BlueTooth from '@/components/BlueTooth';
// 第三步是注册，记住注册的代码
Vue.use(VueRouter)
// 第四步就是配置路由项
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/LogIn',
        },
        {
            path: '/InformationsDisplay',
            component: InformationsDisplay,
            children: [
                {
                    path: '/CreateQuestion',
                    component: CreateQuestionArea
                },
                {
                    path: '/QuestionList',
                    component: QuestionListArea
                },
                {
                    path: '/CreateSurvey',
                    component: CreateSurveyArea
                },
                {
                    path:'/LocationAPI',
                    component: LocationAPI
                },
                {
                    path:'/EchartsAccelerometers',
                    component: EchartsAccelerometers
                },
                {
                    path:'/BlueTooth',
                    component: BlueTooth

                },
                {
                    path: '*',
                    component: CanNotFind
                }
            ]
        },
        {
            path: '/LogIn',
            component: LogIn
        },
        {
            path: '*',
            component: CanNotFind
        }
    ]
})
export default router