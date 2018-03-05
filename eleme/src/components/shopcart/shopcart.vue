<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight': totalCount>0 }">
						<span class="icon-shopping_cart" :class="{'highlight': totalCount>0 }"></span>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight': totalCount>0 }"> ¥ {{totalPrice}} </div>
				<div class="desc"> 另需配送费¥ {{deliveryPrice}}元 </div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
	<transition name="fold">
		<div class="shopcart-list" v-show="listShow">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empth">清空</span>
			</div>
			<div class="list-content">
				<ul>
					<li class="food" v-for="food in selectFoods">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>¥{{food.price * food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
		</transition>
	</div>
</template>
<script>
const cartcontrol = resolve=>{import('../cartcontrol/cartcontrol.vue').then((cartcontrol)=>{resolve(cartcontrol)})};
	export default{
         props:{
         	selectFoods:{
         		type:Array,
         		default(){
         			return [
         			{
         				price:0,
         				count:0
         			}
         			];
         		}
         	},
         	deliveryPrice:{
         		type:Number,
         		default:0
         	},
         	minPrice:{
         		type:Number,
         		default:0
         	}
         },
         data() {
         	return{
         		fold:true        		
         	}
         },
         methods:{
         	toggleList(){
         		if(!this.totalCount) {
         			return;
         		}
         		this.fold = !this.fold;
         	}
         },
         computed:{
         	totalPrice(){
         		let total = 0;
         		this.selectFoods.forEach((food)=>{
         			total += food.price * food.count;
         		})
         		return total;
         	},
         	totalCount(){
         		let count = 0;
         		this.selectFoods.forEach((food)=>{
         			count += food.count;
         		})
         		return count;
         	},
         	payDesc(){
         		if(this.totalPrice === 0){
         			return `¥${this.minPrice}元起送`;
         		}else if(this.totalPrice < this.minPrice){
         			let diff = this.minPrice - this.totalPrice;
         			return `还差¥${diff}元起送`;
         		}else{
         			return '去结算';
         		}
         	},
         	payClass(){
         		if(this.totalPrice < this.minPrice){
         			return 'not-enough'
         		}else{
         			return 'enough'
         		}
         	},
         	listShow() {
         		if(!this.totalCount){
         			this.fold = true;
         			return false;
         		}
         			let show = !this.fold;
         			return show
         		
         	}
         },
         components:{
         	cartcontrol
         }
	}
</script>
<style lang="less" scoped>
	.shopcart{
		position:fixed;
		bottom:0;
		left:0;
		z-index:50;
		width:100%;
		height:48px;
		.content{
			display:flex;
			background:#141d27;
			font-size:0;
			.content-left{
               flex:1;
               .logo-wrapper{
               	display:inline-block;
               	position:relative;
               	top:-10px;
               	margin:0 12px;
               	padding:6px;
               	width:56px;
               	height:56px;
               	box-sizng:border-box;
               	vertical-align:top;
               	border-radius:50%;
               	background:#141d27;
               	.num{
               		position:absolute;
               		top:0;
               		right:0;
               		width:24px;
               		height:16px;
               		line-height:16px;
               		text-align:center;
               		border-radius:16px;
               		font-size:9px;
               		font-weight:700;
               		color:#fff;
               		background:rgb(240,20,20);
               		box-shadow:0 4px 8px 0 rgba(0,0,0,.4);

               	}
               	.logo{
               		width:100%;
               		height:100%;
               		border-radius:50%;
               		background:#2b343c;
               		text-align:center;
               		&.highlight{
                       background:rgb(0,160,220);
               		}
               		.icon-shopping_cart{
               			font-size:24px;               			
               			color:#80858a;
               			line-height:44px;
               			&.highlight{
                       color:#fff;
               		}
               		}
               	}
               }
               .price{
               	display:inline-block;
               	font-size:16px;
               	font-weight:700;
               	vertical-align:top;
               	line-height:24px;
               	margin-top:12px;
               	box-sizng:border-box;
               	padding-right:12px;
               	border-right:1px solid rgba(255,255,255,.1);
               	color:rgba(255,255,255,.1);
               	&.highlight{
                       color:#fff;
               		}
               }
               .desc{
               	display:inline-block;
               	vertical-align:top;
               	line-height:24px;
               	margin:12px 0 0 12px;
               	font-size:10px;
               	color:rgba(255,255,255,.1);
               }
			}
			.content-right{
               flex:0 0 105px;
               width:105px;
               
               .pay{               	
               	height:48px;
               	line-height:48px;
               	text-align:center;
               	font-size:12px;
               	color:rgba(255,255,255,.4);
               	font-weight:700;
               	&.not-enough{
               		background:#2b333b;
               	}
               	&.enough{
               		background:#00b43c;
               		color:#fff;
               	}
               }
			}
		}

	}
</style>