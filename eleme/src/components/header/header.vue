<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[1].type]"></span>
					<span class="text">{{seller.supports[1].description}}</span>
				</div>
			</div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-right">&gt;</i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
         <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
         <i class="icon-right">&gt;</i>
     </div>
     <div class="background">
        <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <transition name="fade">  
    <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
            <div class="detail-main">
             <h1 class="name">{{seller.name}}</h1>
             <div class="star-wrapper">
                 <star :size="48" :score="seller.score"></star> 
             </div> 
             <div class="title">
                 <div class="line"></div>
                 <div class="text">优惠信息</div>
                 <div class="line"></div>
             </div>
             <ul class="supports">
                 <li class="support-item" v-for="(item,index) in seller.supports">
                     <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                     <span class="text">{{seller.supports[index].description}}</span>
                 </li>
             </ul> 
             <div class="title">
                 <div class="line"></div>
                 <div class="text">商家公告</div>
                 <div class="line"></div>
             </div>
             <div class="bulletin">
                 <p class="content">{{seller.bulletin}}</p>
             </div>                               
         </div>
     </div>
     <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
    </div>
    </div>
    </transition>
</div>
</div>
</template>

<script>
 //import star from '../star/star.vue';
 const star  = (resolve)=>{import('../star/star.vue').then((star)=>{resolve(star)})}
 export default{
     props:{
        seller:{
           type:Object
       }
   },
   data(){
      return{
        classMap:['decrease','discount','special','invoice','guarantee'],
        detailShow:false
    }
},
methods:{
    showDetail() {
        this.detailShow = true;
    },
    hideDetail(){
        this.detailShow = false;
    }
},
components:{
    star
}
}
</script>
<style lang="less" scoped>
   @import '../../common/less/mixin.less';
   .header{
      color:#fff;
      position:relative;
      background-color:rgba(7,17,27,.5);
      overflow:hidden;
      .content-wrapper{
        padding:24px 12px 18px 24px;
        position:relative;
        .avatar{
           display:inline-block;
           img{
              border-radius: 2px;
          }
      }
      .content{
       display:inline-block;
       vertical-align:top;       
       margin-left:16px;
       font-size:14px;
       .title{
          margin-bottom: 8px;
          margin-top:2px;
          .brand{
            width:30px;
            height:18px;
            display:inline-block;
            vertical-align:top;
            .bg-image('../../components/header/brand');
            background-size:30px 18px;
            background-repeat:no-repeat;
        }
        .name{
            vertical-align:top;
            margin-left:6px;
            font-weight:bold;
            line-height:18px;
            font-size:16px;
        }
    }
    .description{
      margin-bottom:10px;
      font-size:12px;
      font-weight:100;
      line-height:12px;
  }
  .support{

    .icon{
        display:inline-block;
        width:12px;
        height:12px;
        margin-right:4px;
        background-size:12px 12px;
        background-repeat:no-repeat;
        vertical-align:top;
        &.decrease{
           .bg-image('../../components/header/decrease_1');
       }
       &.discount{
           .bg-image('../../components/header/discount_1');
       }
       &.guarantee{
           .bg-image('../../components/header/guarantee_1');
       }
       &.invoice{
           .bg-image('../../components/header/invoice_1');
       }
       &.special{
           .bg-image('../../components/header/special_1');
       }
   }
   .text{
    vertical-align:top;
    font-size:10px;
    font-weight:100;
    line-height: 12px;
}
}
}
.support-count{
    position:absolute;
    right:12px;
    bottom:18px;
    padding:0 8px;
    height:24px;
    line-height:24px;
    border-radius:14px;
    background:rgba(0,0,0,.2);
    text-align: center;
    .count{
        font-size:10px;
        vertical-align:top;
    }
    .icon-right{
        font-size:10px;
        line-height:24px;
        vertical-align:top;
        margin-left:2px;
    }
}

}
.bulletin-wrapper{
    position:relative;
    height:28px;
    line-height:28px;
    padding:0 22px 0 12px;
    background-color:rgba(7,17,27,.2);
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    .bulletin-title{
        display:inline-block;
        width:22px;
        height:12px;
        .bg-image('../../components/header/bulletin');
        background-size:22px 12px;
        background-repeat:no-repeat;
        vertical-align:top;
        margin-top:8px;
    }
    .bulletin-text{
        font-size:10px;
        vertical-align:top;
        margin:0 4px;
    }
    .icon-right{
        position:absolute;
        font-size:10px;
        right:12px;
        top:2px;
    }
}
.background{
    position:absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
    width:100%;
    height:100%;
    z-index:-1;
    filter:blur(10px)
}
.detail{
    position:fixed;
    z-index:100;
    width:100%;
    height:100%;
    overflow:auto;
    background:rgba(7,17,27,.8);
    top:0;
    left:0;
    .detail-wrapper{
        min-height:100%;
        width:100%;
        .detail-main{
            margin-top:64px;
            padding-bottom:64px;
            .name{
                line-height:16px;
                text-align:center;
                font-size:16px;
                font-weight:350;
            }
            .star-wrapper{
                margin-top:18px;
                padding:2px 0;
                text-align:center;
            }
            .title{
                display:flex;
                width:80%;
                margin:30px auto 24px auto;
                .line{
                    flex:1;
                    position:relative;
                    top:-6px;
                    border-bottom:1px solid rgba(255,255,255,.2)
                }
                .text{
                    padding:0 12px;
                    font-size:14px;
                    font-weight:700;

                }
            }
            .supports{
                width:80%;
                margin:0 auto;
                .support-item{
                    padding:0 12px;
                    margin-bottom:12px;
                    font-size:0;
                    &:last-child{
                        margin-bottom:0;
                    }
                    .icon{
                        display:inline-block;
                        width:16px;
                        height:16px;
                        vertical-align:top;
                        margin-right:6px;
                        background-size:16px 16px;
                        background-repeat:no-repeat;
                        &.decrease{
                           .bg-image('../../components/header/decrease_2');
                       }
                       &.discount{
                           .bg-image('../../components/header/discount_2');
                       }
                       &.guarantee{
                           .bg-image('../../components/header/guarantee_2');
                       }
                       &.invoice{
                           .bg-image('../../components/header/invoice_2');
                       }
                       &.special{
                           .bg-image('../../components/header/special_2');
                       }
                   }
                   .text{
                    line-height:12px;
                    font-size:12px;
                   }
               }
           }
           .bulletin{
            width:80%;
            margin:0 auto;
            .content{
                padding:0 12px;
                line-height:24px;
                font-size:12px;
            }
           }
       }
   }
   .detail-close{
    position:relative;
    width:32px;
    height:32px;
    margin:-64px auto 0 auto;
    clear:both;
    font-size:32px;
}
}
}
.fade-enter,.fade-leave-to{
    opacity:0;
    background:rgba(7,17,27,0)
}
.fade-enter-active,.fade-leave-active{
    transition:all .8s;
}
</style>