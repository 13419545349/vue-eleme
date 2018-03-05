<template>
	<div class="cartcontrol">
	  <transition name="move">
		<div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" 
		@click.stop="decreaseCart"></div>
	</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop="addCart"></div>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default{
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			addCart(){
				if(!this.food.count){
					Vue.set(this.food,'count',1)

				}else{
					this.food.count ++;
				}
			},
			decreaseCart() {
				if(this.food.count){
					this.food.count --
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.cartcontrol{
		font-size:0;
		
		.cart-decrease{
			display:inline-block;
			padding:6px;
			line-height:24px;
			font-size:24px;
			color:rgb(0,160,220);
			opacity:1;
			//transform:translate3D(0,0,0);
		}
		.cart-count{
			display:inline-block;
			vertical-align:top;
			width:12px;
			padding-top:6px;
			line-height:24px;
			text-align:center;
			font-size:10px;
        
		}
		.cart-add{
			display:inline-block;
			line-height:24px;
			font-size:24px;
			padding:6px;
			color:rgb(0,160,220);

		}
	}
	.move-leave-to,.move-enter{
          opacity:0;
          transform:translate3D(24px,0,0);      
	}
	.move-enter-ative,.move-leave-active{
		transition:all .4s ease
	}
</style>