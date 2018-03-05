<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">{{seller.ratingCount}}</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stess">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul class="supports">
					<li class="support-item" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import BScroll from 'better-scroll';
	const star = resolve => {import('../star/star.vue')
	.then((star)=>{resolve(star)})}; 
	const split = resolve => {import('../split/split.vue')
	.then((split)=>{resolve(split)})}; 
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data() {
			return {
				classMap:['decrease', 'discount', 'special', 'invoice', 'guarantee']
			}
		},
		created() {
			this._intScroll()
			
		},
		methods:{
			_intScroll(){
				this.$nextTick(()=>{
				this.scroll = new BScroll(this.$refs.seller,{click:true});
			})
			}
		},
		watch:{
			seller() {
				this._intScroll()
			}
		},
		components:{
			star,split
		}
	}
</script>
<style lang="less" scoped>
	@import "../../common/less/mixin.less";
	.seller{
		position:absolute;
		top:174px;
		bottom:0;
		left:0;
		width:100%;
		overflow:hidden;
		.overview{
			padding:18px;
			padding:relative;
			.title{
				margin-bottom: 8px;
				line-height: 14px;
				color: rgb(7, 17, 27);
				font-size: 14px;
			}
			.desc{
				padding-bottom: 18px;
				.border-1px(rgba(7, 17, 27, 0.1));
				font-size: 0;
				.star{
					display: inline-block;
					margin-right: 8px;
					vertical-align: top;
				}
				.text{
					display: inline-block;
					margin-right: 12px;
					line-height: 18px;
					vertical-align: top;
					font-size: 10px;
					color: rgb(77, 85, 93);
				}
			}
			.remark{
				display: flex;
				padding-top: 18px;
				.block{
					flex: 1;
					text-align: center;
					border-right: 1px solid rgba(7, 17, 27, 0.1);
					&:last-child{
						border:none;
					}
					h2{
						margin-bottom: 4px;
						line-height: 10px;
						font-size: 10px;
						color: rgb(147, 153, 159);
					}
					.content{
						line-height: 24px;
						font-size: 10px;
						color: rgb(7, 17, 27);
					}
					.stress{
						font-size:24px;
					}
				}
			}
		}
	}
	.bulletin{
		padding: 18px 18px 0 18px;
		.title{
			margin-bottom: 8px;
			line-height: 14px;
			color: rgb(7, 17, 27);
			font-size: 14px;
		}
		.content-wrapper{
			padding: 0 12px 16px 12px;
			.border-1px(rgba(7, 17, 27, 0.1));
			.content{
				line-height: 24px;
				font-size: 12px;
				color: rgb(240, 20, 20);      
			}
			
		}
		.supports{
				.support-item{
					padding: 16px 12px;
					.border-1px(rgba(7, 17, 27, 0.1));
					font-size: 0;
					&:last-child{
						border:none;
					}
				}
				.icon{
					display: inline-block;
					width: 16px;
					height: 16px;
					vertical-align: top;
					margin-right: 6px;
					background-size: 16px 16px;
					background-repeat: no-repeat;
					&.decrease{
						.bg-image("../../components/seller/decrease_4")
					}
					&.discount{
						.bg-image("../../components/seller/discount_4")
					}
					&.guarantee{
						.bg-image("../../components/seller/guarantee_4")
					}
					&.invoice{
						.bg-image("../../components/seller/invoice_4")
					}
					&.special{
						.bg-image("../../components/seller/special_4")
					}
				}
				.text{
					line-height: 16px;
					font-size: 12px;
					color: rgb(7, 17, 27);
				}
			}
	}
</style>