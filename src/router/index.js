import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:"/",
            require:'/Login'
        },
        {
            path: '/Login',
            component: resolve => require(['../components/page/Login'], resolve)
        },
        {
            path: '/home',
            component: resolve => require(['../components/common/Home'], resolve),
            meta: { title: '项目管理',us:'Project' },
            children:[
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm'], resolve),
                    meta: { title: '用户列表',us:'User List' },
                    name:'300'
                },
                {
                    path: '/newList',
                    component: resolve => require(['../components/newCases/newList'], resolve),
                    meta: { title: '患者信息',us:'Patient Info' }
                },
                {
                    path: '/caselist',
                    component: resolve => require(['../components/newCases/caselist'], resolve),
                    meta: { title: '病例列表',us:'Case List' }
                },
                {
                    path: '/Drug',
                    component: resolve => require(['../components/newCases/pjcDrug'], resolve),
                    meta: { title: '相关药史',us:'' }
                },
                {
                    path: '/dise',
                    component: resolve => require(['../components/newCases/pjcdisease'], resolve),
                    meta: { title: '相关病史',us:'Correlation Drug' }
                },
                {
                    path: '/ptsInfo',
                    component: resolve => require(['../components/newCases/parentsInfo'], resolve),
                    meta: { title: '父母信息',us:'Parent Info' }
                },
                {
                    path: '/details',
                    component: resolve => require(['../components/newCases/casedetails'], resolve),
                    meta: { title: '病例详情',us:'Case Details' }
                },
                {
                    path: '/ptsdise',
                    component: resolve => require(['../components/newCases/parentsdise'], resolve),
                    meta: { title: '父母相关病史',us:'Parent Drug' }
                },
                {
                    path: '/ptsDrug',
                    component: resolve => require(['../components/newCases/parentsDrug'], resolve),
                    meta: { title: '父母相关药史',us:'Parent Drug' }
                },
                {
                    path: '/deadinfo',
                    component: resolve => require(['../components/newCases/deadInfo'], resolve),
                    meta: { title: '死亡病例信息',us:'Die Info' }
                },
                {
                    path: '/onchuan',
                    component: resolve => require(['../components/newCases/onchuan'], resolve),
                    meta: { title: '上传',us:'Upload' }
                },
                {
                    path: '/autopsy',
                    component: resolve => require(['../components/newCases/autopsy'], resolve),
                    meta: { title: '尸检死因',us:'Death' }
                },
                {
                    path: '/substance',
                    component: resolve => require(['../components/druginfo/substance'], resolve),
                    meta: { title: '物质规格',us:'Standard' }
                },
                {
                    path: '/druginfo',
                    component: resolve => require(['../components/druginfo/drugInfos'], resolve),
                    meta: { title: '药物信息',us:'Drug' }
                },
                {
                    path: '/dose',
                    component: resolve => require(['../components/druginfo/dose'], resolve),
                    meta: { title: '剂量信息',us:'Dosage' }
                },
                {
                    path: '/adapt',
                    component: resolve => require(['../components/druginfo/adapt'], resolve),
                    meta: { title: '病例适应症',us:'Case indication' }
                },
                {
                    path: '/model',
                    component: resolve => require(['../components/druginfo/eventModel'], resolve),
                    meta: { title: '事件模型',us:'Model' }
                },
                {
                    path: '/evalua',
                    component: resolve => require(['../components/druginfo/evaluation'], resolve),
                    meta: { title: '事件评估',us:'Event evaluation' }
                },
                {
                    path: '/eventinfo',
                    component: resolve => require(['../components/newCases/eventinfo'], resolve),
                    meta: { title: '事件信息',us:'Event information' }
                },
                {
                    path: '/laboratory',
                    component: resolve => require(['../components/newCases/laboratory'], resolve),
                    meta: { title: '实验室检查',us:'Laboratory' }
                },
                {
                    path: '/summary',
                    component: resolve => require(['../components/newCases/summary'], resolve),
                    meta: { title: '病例总结',us:'Case summary' }
                },
                {
                    path: '/otherinfo',
                    component: resolve => require(['../components/druginfo/otherinfo'], resolve),
                    meta: { title: '其他信息',us:'Other' }
                },
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard'], resolve),
                    meta: { title: '公告管理',us:'Announcement'},
                    name:'2'
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable'], resolve),
                    meta: { title: '项目列表',us:'Project List' },
                    name:"2011"
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs'], resolve),
                    meta: { title: '机构管理',us:'Organization' },
                    name:'4'
                },
                {
                    path: '/newsend',
                    component: resolve => require(['../components/center/newsend'], resolve),
                    meta: { title: '新建发送者',us:'Send' }
                },
				{
				    path: '/modifsend',
				    component: resolve => require(['../components/center/modifsend'], resolve),
				    meta: { title: '编辑发送者',us:'Compile Send' }
				},
				{
				    path: '/charts',
				    component: resolve => require(['../components/center/charts'], resolve),
                    meta: { title: '报表展示',us:'Statement' },
                    name:"2008"
				},
                {
                    path: '/companylist',
                    component: resolve => require(['../components/center/companylist'], resolve),
                    meta: { title: '公司列表',us:'Company list' },
                    name:'8'
                },
                {
                    path: '/reporter',
                    component: resolve => require(['../components/center/reporter'], resolve),
                    meta: { title: '报告者信息',us:'Reporter' }
                },
                {
                    path: '/menu',
                    component: resolve => require(['../components/center/menu'], resolve),
                    meta: { title: '菜单权限',us:'Menu'},
                    name:"2024"
                },
                {
                    path: '/control',
                    component: resolve => require(['../components/center/control'], resolve),
                    meta: { title: '用户',us:'User' },
                    name:'2023'
                },
                {
                    path: '/log',
                    component: resolve => require(['../components/log/loginlog'], resolve),
                    meta: { title: '登录日志',us:'Log' },
                    name:'500',
                },
                {
                    path: '/tran',
                    component: resolve => require(['../components/log/tran'], resolve),
                    meta: { title: '传输日志',us:'Transport log' },
                    name:'2026',
                },
                {
                    path: '/online',
                    component: resolve => require(['../components/page/online'], resolve),
                    meta: { title: '在线用户',us:'Online users' },
                    name:"301"
                },
                {
                    // markdown组件
                    path: '/sendlist',
                    component: resolve => require(['../components/center/sendlist'], resolve),
                    meta: { title: '发送者列表',us:'SendList' }    
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList'], resolve),
                    meta: { title: '用户监控',us:'User monitoring' },
                    name:'2022'
                },
                {
                  
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog'], resolve),
                    meta: { title: '数据监控',us:'Monitoring' },
                    name:'600'
                },
                {
                   
                    path: '/i18n',
                    component: resolve => require(['../components/page/I18n'], resolve),
                    meta: { title: '操作日志',us:'Operation log' },
                    name:'501'
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
