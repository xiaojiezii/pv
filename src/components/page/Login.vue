<template>
  <div class="bg">     
<div style="float:right;margin:10px 20px;width:50px;">
    <el-button type="info" @click="changeLanguage">{{$t('login.btn')}}</el-button>
</div>
    <div class="lo_fr">
       <div class="lo_input">
           <div class="lo_input1">
              <div>{{$t('login.log')}}</div>
              <div>
                  <el-input :placeholder="$t('login.plName')" v-model="user" clearable></el-input>
              </div>
              <div>
                  <el-input :placeholder=" $t('login.plPass')"  v-model="pwd" show-password></el-input>       
              </div>
              <div class="yan">
                   <div>
                        <el-input id="code" style="width:125px;padding-right:5px;" @keyup.enter.native="queryAdminRole" :placeholder="$t('login.plyanL')" v-model="code" clearable></el-input>              
                   </div>
                   <div class="login-code" @click="refreshCode" :title="$t('login.tit')">
                       <!--验证码组件-->
                       <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
              </div> 
              <div>
                  <el-button :plain="true" type="primary"  style="background:#20a0ff;color:#ffffff;" @click="login">{{$t('login.log')}}
                      <i  :class="icon"></i>
                  </el-button>
              </div>
           </div>
       </div>
       <div class="lo_wing">
           <div class="lo_wing1">
               <img src="../../assets/img/logo-white.png" alt="">
               <p class="letter">{{$t('login.title')}}</p>
                <div class="knwo">
                     <el-button type="primary" @click="btn">{{$t('login.see')}}</el-button>
                </div>
           </div>
       </div>
    </div>
    <div id="bgs" v-show="wings">
        <div style="float:right;margin:10px 20px;width:50px;">
           <el-button type="info" @click="changeLanguage">{{$t('login.btn')}}</el-button>
        </div>
        <h3 class="wing">{{$t("login.name")}}</h3>
        <div class="wing_txt">
           {{$t("login.na_title")}}
        </div>
        <div class="btns">
             <el-button type="success" round @click="gos">{{$t("login.cliF")}}</el-button>
        </div>
        <p>{{$t("login.copyright")}}</p>
    </div>
  </div>
</template>
<script>
import SIdentify  from './sidenify.vue'
export default {
    components: { SIdentify },
    data(){
        return{
            identifyCodes: "1234567890",
            identifyCode: "",
            code:"",//text框输入的验证码
            user:"",
            pwd:"",
            icon:'',
            url:this.global.url,
            wings:false
         }
    },
    methods:{          
        changeLanguage () {
            this.$i18n.locale = this.$i18n.locale == "en-us" ? "zh-cn" : "en-us"
        },
    //验证码
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
      
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                this.randomNum(0, this.identifyCodes.length)
                ];
              }
            },
        login(){
            this.icon="el-icon-loading"
            var postData=this.qs.stringify({
                username:this.user,
                password: this.pwd
            })
            var url=this.url
             if(this.code==""){
                 this.icon=""
                    this.$message({
                        message: this.$t('login.loerro1'),
                        type: 'warning'
                        });
                    return
                }
                if(this.identifyCode !== this.code.toUpperCase()){
                    this.icon=""
                    this.$message.error(this.$t('login.loerro2'));
                    this.code=""
                    this.refreshCode()
                    return
                }else{
                    // alert ("验证码正确，登陆成功")
                    this.$axios.post(url+"/registerLogin/login",postData).then((res)=>{
                        console.log(res)
                    if(res.data.status == 200){
                        this.icon=""
                        sessionStorage.setItem("user",res.data.data.name)
                        sessionStorage.setItem("token",res.data.data.token)
                        this.$store.state.role=res.data.data.role
                        sessionStorage.setItem("usid",res.data.data.id)
                        console.log(res.data)
                        this.$router.push("/table")
                    }else{
                        this.refreshCode()
                        this.code=""
                      this.$message.error(this.$t('login.loerro3'));
                      this.icon=""
                    }                    
                  })
                }
        },
        queryAdminRole(){
            this.login();
        },
        btn(){
           this.wings=true;
        },
        gos(){
            this.wings=false;
        }
    },
    mounted(){
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    created(){
      this.refreshCode();
    }   
}
</script>
<style scoped>
*{margin: 0;padding: 0;}
.bg{
    position: absolute;
    bottom: 0;
    left:0;
    align-items: center;
    width: 100%;height: 100%;
    background-image: url('../../assets/img/3.jpg'); height:100%;
    width:100%;
    overflow: hidden;
    background-size:cover;
}
.lo_fr{
    width: 800px; 
    height: 465px; 
    overflow: auto; 
    background:linear-gradient(120deg, rgb(0, 0, 0, 0.5), rgb(93, 97, 191, 0.5));
    margin: auto; 
    border-radius: 7px;
    display: flex;
    justify-content:space-around;
    align-items:Center;
    position: absolute; 
    top: 0; left: 0; bottom: 0; right: 0;  
    font-size: 14px; 
}
.lo_input,.lo_wing{
    width:45%;
    height:400px;
}
.lo_input{
    /* background: #ffffff; */
    border-radius: 7px;
}
.lo_input1{
    width: 80%;
    margin:0 auto;
    height:250px;
    text-align: center;
    padding: 20px 20px 20px 20px;
    border-bottom:1px solid #cccccc;
}
.lo_input1>div{
    height:40px;margin-bottom: 15px;
}
.lo_input1>div:first-child{
    text-align: center;
    font-size: 25px;
    color:#777ab2;
}
.el-button{
    width:100%;
    height:40px;
}
.lo_wing1{
     width: 90%;
    margin:0 auto;
    height:300px;
    text-align: center;
    color:#ffffff;
    padding: 10px 20px 20px 20px;
}
.know>.el-button{
    width:100px;
    height:30px;
}
img{
    margin-top: 20px;
}
.letter{
    height:130px;
    margin:20px 0 10px 0;
}
#bgs{
    position: absolute;
    bottom: 0;
    left:0;
    color: #ffffff;
    align-items: center;
    text-align: center;
    width: 100%;height: 100%;
    background-image: url('../../assets/img/4.jpg');
}
.wing{
    margin-top: 200px;
    font-size: 1.75rem;
    margin-bottom: .5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
}
.wing_txt{
    margin: 0 auto;
    width:70%;
    font-size: 1.1rem;
    line-height: 25px;
}
.btns{
    width: 100px;
    margin:20px auto 50px auto; 
}
/* 
.code{
    width:50px;
    height:31px;
    border:1px solid rgba(186,186,186,1);
} */
.login-code{
     cursor: pointer;
}
.yan{
    display: flex;
    justify-content: space-between;
}
</style>
