<template>
    <div class="sidebar">
        <el-menu  class="sidebar-el-menu" :default-openeds=[menuId] :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in lists">
                <template v-if="item.children.length > 0">
                    <el-submenu :index="item.menuId.toString()" :key="item.menuId">
                        <template slot="title">
                            <i :class="item.icon"></i>
                                <span slot="title">{{en==true ? item.menuName : item.menuUs}}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu v-if="subItem.children.length > 0" :index="subItem.menuId.toString()" :key="subItem.menuId">
                                <template slot="title">{{en==true ? subItem.menuName :subItem.menuUs}}</template>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.menuId.toString()" :key="subItem.menuId" :route="{'name':subItem.menuId}">
                                 <span>{{en==true ? subItem.menuName : subItem.menuUs}}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.menuId.toString()" :key="item.menuId" :route="{'name':item.menuId}">
                        <i :class="item.icon"></i>
                        <span slot="title">{{en==true ? item.menuName : item.menuUs}}</span>
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
                lists:[],
                menuId:1,
                en:true,
                lists:[],
            }
        },
        props:[
            "navlist"
        ],
        watch:{
            menuId(val){
                if(val!==undefined){
                    this.menu()
                }
            },
            navlist(val){
                if(val=="zh"){
                    this.en=false
                }else{
                this.en=true
                }
            }
        },
        methods:{
            menu(){
            var url=this.global.url+"/role/listByRole?roleId="+this.$store.state.role;
            this.$axios.get(url).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                    var menulist=res.data.data
                    var me=[]
                    for(var i = 0; i < menulist.length; i++){
                        var menu=menulist[i]
                        if(menu){
                            if(menu.menuId==this.menuId){
                                me.push(menu)
                                this.lists=me
                                return
                            }
                        }
                    }
                }
            })
            this.$i18n.locale=="en-us" ? this.en=false : this.en=true
        }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏,
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            bus.$on("menuId",msg=>{
                this.menuId = msg
            })
          this.menu()
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
