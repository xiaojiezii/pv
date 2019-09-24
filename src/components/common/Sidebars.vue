<template>
    <div class="sidebar">
         <el-menu  class="sidebar-el-menu" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
                  <div style="width:100px;margin:20px auto;">
                     <el-button type="text" @click="gohome">
                         <i class="el-icon-d-arrow-left"></i>
                         {{$t('btn.homeBtn')}}</el-button>
                  </div>                           
            <template v-for="item in items2">
                <template v-if="item.subs">
                    <el-submenu :index="item.index.toString()" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{en==true ? item.title : item.us}} </span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index.toString()" :key="subItem.index">
                                <template slot="title">
                                    <i :class="subItem.icon"></i>
                                    <span>{{en==true ? subItem.title : subItem.us}}</span>
                                </template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index.toString()">
                                  <span>{{en==true ? threeItem.title : threeItem.us}}</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index.toString()" :key="subItem.index" v-show="subItem.no !== $store.state.die">
                                <span>{{en==true ? subItem.title : subItem.us}}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index.toString()" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{en==true ? item.title : item.us}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>  
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                newList:true,
                en:true,
                die:this.$store.state.die,
                items2:[
                     {
                        icon: 'el-icon-lx-calendar',
                        index: 'details',
                        title: '病例',
                        us:'Case'
                     },
                     {
                        icon: 'el-icon-lx-calendar',
                        index: 'newLists',
                        title: '患者信息',
                        us:'Patient information',
                        subs: [
                                {icon: 'el-icon-lx-right',
                                    index:'newList',
                                    title:'患者信息',
                                    us:'Patient information',
                                    subs:[
                                            {
                                                index:'newList',
                                                title:'患者信息',
                                                us:'Patient information',
                                            },
                                            {
                                                index:'dise',
                                                title:'患者相关病史',
                                                us:'Patient history'
                                            },
                                            {
                                                index:'Drug',
                                                title:'患者相关药史',
                                                us:'Patient Info'
                                            },
                                        ]
                                },
                                {icon: 'el-icon-lx-right',
                                    index:'ptsInfo',
                                    title:'父母信息',
                                    us:'Parent Info',
                                    subs:[
                                            {
                                                index:'ptsInfo',
                                                title:'父母基本信息',
                                                us:'Parents information'
                                            },
                                            {
                                                index:'ptsdise',
                                                title:'父母相关病史',
                                                us:'Parents\' medical history',
                                            },
                                            {
                                                index:'ptsDrug',
                                                title:'父母相关药史',
                                                us:'Parents\' medication history'
                                            },
                                      ]
                                },
                                {
                                    index:'deadinfo',
                                    title:'死亡病例信息',
                                    us:'Die Info',
                                    no:"2", 
                                },
                                {
                                    index:'autopsy',
                                    title:'尸检死因',
                                    us:'Autopsy',
                                    no:"2",
                                },
                             ]
                            },
                            {
                                icon: 'el-icon-lx-like',
                                index:'druginfo',
                                title:'药物信息',
                                us:'Drug Info',
                                subs:[
                                    {
                                       index:'druginfo',
                                       title:'药物信息',
                                       us:'Drug Info'
                                    },
                                    {
                                       index:'substance',
                                       title:'物质规格',
                                       us:'Material specifications',
                                    },
                                    {
                                       index:'dose',
                                       title:'剂量信息',
                                       us:'Dose information',
                                    },
                                    {
                                       index:'adapt',
                                       title:'病例适应症',
                                       us:'Case indication',
                                    },
                                    {
                                       index:'model',
                                       title:'事件模型',
                                       us:'The event model',
                                    },
                                    {
                                       index:'evalua',
                                       title:'事件评估',
                                       us:'Event evaluation'
                                    },
                                    {
                                       index:'otherinfo',
                                       title:'其他信息',
                                       us:'Other Info'
                                    },
                                ]
                            },
                             {
                                icon: 'el-icon-lx-info',
                                index:'eventinfo',
                                title:'事件信息',
                                us:'Event information'
                            },
                            {
                                icon: 'el-icon-lx-friendadd',
                                index:'laboratory',
                                title:'实验室检查',
                                us:'Laboratory examination',
                            },
                            {
                                icon: 'el-icon-lx-read',
                                index:'summary',
                                title:'病例总结',
                                us:'Case summary'
                            },
                ],
            }
        },
        props:[
            "navlist"
        ],
        watch:{
            navlist(val){
                if(val=="zh"){
                    this.en=false
                }else{
                this.en=true
                }
            }
        },
        methods:{
            gohome(){
                bus.$emit("newList",this.newList) 
                 this.$router.push({path:'/caselist'})
            },
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
        },
        created(){
            console.log(this.die)
        //    if(die==2){
        //         this.items2[1].subs.splice(2,2)
        //     }
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏,
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 50px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 220px;
    }
    .sidebar > ul {
        height:100%;
        padding-top:30px;
    }
</style>
