<template>
	<div class="goods">
	    {{currentIndex}}
		<div class="menu-wrapper" ref="menu-wrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index)">
					<span class="text">
						<span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foods-wrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item" @click="selectFood(food)">
							<div class="icon">
								<img :src="food.icon" alt="" width="57" height="57">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">¥{{food.price}}</span>
									<span v-show="food.oldPrice" class="old">{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<cart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></cart>
		
		<food :food="selectedFood" ref="foods"></food>
	</div>
</template>
<script>
	import axios from 'axios';
	import BScroll from 'better-scroll';
	const cart = (resolve)=>{import('../shopcart/shopcart.vue').then((cart)=>{resolve(cart)})};
	const cartcontrol = resolve=>{import('../cartcontrol/cartcontrol.vue').then((cartcontrol)=>{resolve(cartcontrol)})};
	const food = (resolve)=>{import('../food/food.vue').then((food)=>{resolve(food)})}
	const ERR_OK = 0;
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				goods: [],
				classMap:['decrease','discount','special','invoice','guarantee'],
				listHeight:[],
				scrollY:0,
				selectedFood:{}
			}
		},
		computed:{
			currentIndex() {
				for(let i=0;i <this.listHeight.length;i++){
					let height = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if( !height2 || this.scrollY>=height && this.scrollY<height2){
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count) {
							foods.push(food);
						}
					})
				})
				return foods;
			}
		},
		created(){
			axios.get('/api/goods').then((response)=>{
				if(response.data.errno === ERR_OK){
					this.goods = response.data.data;
					this.$nextTick(()=>{
						this._initScroll()
						this._calculateHeight()
					})	
				}
			})
		},
		methods:{
			//probeType:3表示在滚动的时候实时的告诉我们滚动的位置
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs['menu-wrapper'],{click:true,probeType:3});
				this.foodsScroll = new BScroll(this.$refs['foods-wrapper'],{click:true,probeType:3});

				this.foodsScroll.on('scroll',(pos)=>{
					this.scrollY = Math.abs( Math.round(pos.y));
					console.log(this.scrollY)
				})
			},
			_calculateHeight(){
                 let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
                 let height = 0;
                 this.listHeight.push(height);
                 for(let i=0;i<foodList.length;i++){
                 	let item = foodList[i];
                 	height += item.clientHeight;
                 	this.listHeight.push(height);
                 	console.log(this.listHeight)
                 }
			},
			selectMenu(index){
                   let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
                   let el1 = foodList[index];
                   this.foodsScroll.scrollToElement(el1,300)
			},
			selectFood(food){
				this.selectedFood = food;
				this.$refs['foods'].show();
			}
		},
		components:{
			cart,cartcontrol,food
		}
	}
</script>
<style lang="less" scoped>
	@import "../../common/less/mixin.less";
	.goods{
		position:absolute;
		width:100%;
		top:174px;
		bottom:46px;
		display:flex;
		overflow:hidden;
		.menu-wrapper{
			flex:0 0 80px;
			wdth:80px;
			background:#f3f5f7;
			.menu-item{
				display:table;
				height:54px;
				width:56px;
				line-height:14px;
				padding:0 12px;
				&.current{
					position:relative;
					margin-top:-1px;
					z-index:10;
					background:#fff;
					font-weight:700;
					.text{
						border:none;
					}
				}
				.icon{
					display: inline-block;
					width: 12px;
					height: 12px;
					margin-right: 2px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					vertical-align: top;
					&.decrease{
						.bg-image('../../components/goods/decrease_3');
					}
					&.discount{
						.bg-image('../../components/goods/discount_3');
					}
					&.guarantee{
						.bg-image('../../components/goods/guarantee_3');
					}
					&.invoice{
						.bg-image('../../components/goods/invoice_3');
					}
					&.special{
						.bg-image('../../components/goods/special_3');
					}	
				}
				.text{
					font-size: 12px;
					display:table-cell;
					width:56px;
					vertical-align:middle;
					.border-1px(rgba(7,17,27,.1));
				}
				}			
			}
			.foods-wrapper{
				flex:1;
				.title{
					padding-left:14px;
					height:26px;
					line-height:26px;
					border-left:2px solid #d9dde1;
					font-size:12px;
					color:rgb(147,153,159);
					background:#f3f5f7;
				}
				.food-item{
					display:flex;
					margin:18px;
					padding-bottom:18px;
					.border-1px(rgba(7,17,27,.1));
					&:last-child{
						border:none;
						margin-bottom:0;
					}
					.icon{
                       flex:0 0 57px;
                       margin-right:10px;
					}
					.content{
						flex:1;
						.name{
							margin:2px 0 8px 0;
							height:14px;
							line-height:14px;
							font-size:14px;
							color:rgb(7,17,27);
						}
						.desc,.extra{							
							line-height:14px;
							font-size:10px;
							color:rgb(147,153,159);
						}
						.desc{
							margin-bottom:8px;
						}
						.extra{
							&>.count{
								margin-right:8px;
							}						
						}
						.price{
							font-weight:350;
							line-height:24px;
							.now{
								margin-right:8px;
								font-size:14px;
								//color:rgb(240,20,20);
								color:#ff0000;
							}
							.old{
								text-decoration: line-through;
								font-size:10px;
								color:rgb(147,153,159);
							}
						}
						.cartcontrol-wrapper{
							position:absolute;
							right:0;
							bottom:12px;
						}
					}
				}		
			}
		}
	</style>