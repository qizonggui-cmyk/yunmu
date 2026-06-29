<template>
	<view :class="'wf-page wf-page' + type">
		<!-- left -->
		<view class="wf-column">
			<view id="left" class="wf-column-inner">
				<view v-for="(item, index) in leftList" :key="`left-${item.id || index}-${index}`" class="wf-item" @tap="itemTap(item)">
					<WaterfallsFlowItem :item="item" :isStore="isStore" :type="type" :recommend="recommend" :goDetail="goDetail" />
				</view>
			</view>
		</view>
		<!-- right -->
		<view class="wf-column">
			<view id="right" class="wf-column-inner">
				<view v-for="(item, index) in rightList" :key="`right-${item.id || index}-${index}`" class="wf-item" @tap="itemTap(item)">
					<WaterfallsFlowItem :item="item" :isStore="isStore" :type="type" :recommend="recommend" :goDetail="goDetail" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import WaterfallsFlowItem from './WaterfallsFlowItem.vue';
export default {
	components: {
		WaterfallsFlowItem
	},
	props: {
		// 瀑布流列表
		wfList: {
			type: Array,
			default: () => []
		},
		updateNum: {
			type: Number,
			default: 10
		},
		type: {
			type: Number,
			default: 0
		},
		isStore: {
			type: [String, Number],
			default: '1'
		},
		recommend: {
			type: Boolean,
			default: false
		},
		goDetail: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			allList: [], // 全部列表
			leftList: [], // 左边列表
			rightList: [], // 右边列表
			mark: 0, // 列表标记
			boxHeight: [0, 0], // 下标0和1分别为左列和右列高度
			isBuilding: false
		};
	},
	watch: {
		// 监听列表数据变化
		wfList: {
			handler(val) {
				this.resetWaterfall();
				if (Array.isArray(val) && val.length) {
					this.allList = val.slice();
					this.$nextTick(() => {
						this.waterFall();
					});
				}
			},
			immediate: true,
			deep: true
		}
	},
	methods: {
		resetWaterfall() {
			this.allList = [];
			this.leftList = [];
			this.rightList = [];
			this.boxHeight = [0, 0];
			this.mark = 0;
			this.isBuilding = false;
		},
		// 瀑布流排序：逐个测量左右高度，始终把下一个商品放入较短的一列
		waterFall() {
			if (this.isBuilding || this.mark >= this.allList.length) return;
			this.isBuilding = true;
			const item = this.allList[this.mark];
			if (!item) {
				this.isBuilding = false;
				return;
			}
			if (this.mark === 0) {
				this.leftList.push(item);
			} else if (this.mark === 1) {
				this.rightList.push(item);
			} else if (this.boxHeight[0] <= this.boxHeight[1]) {
				this.leftList.push(item);
			} else {
				this.rightList.push(item);
			}
			this.getViewHeight();
		},
		// 获取列表高度
		getViewHeight() {
			this.$nextTick(() => {
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('#left').boundingClientRect();
					query.select('#right').boundingClientRect();
					query.exec((res) => {
						const leftRect = res && res[0] ? res[0] : { height: 0 };
						const rightRect = res && res[1] ? res[1] : { height: 0 };
						this.boxHeight = [leftRect.height || 0, rightRect.height || 0];
						this.mark += 1;
						this.isBuilding = false;
						if (this.mark < this.allList.length) {
							this.waterFall();
						}
					});
				}, 80);
			});
		},
		// item点击
		itemTap(item) {
			this.$emit('itemTap', item);
		},
		goShop(item) {
			this.$emit('goShop', item);
		}
	}
};
</script>

<style lang="scss" scoped>
$grid-gap: 20rpx;

.wf-page {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	column-gap: $grid-gap;
	width: 100%;
	box-sizing: border-box;
}
.wf-column {
	width: calc((100% - #{$grid-gap}) / 2);
	min-width: 0;
}
.wf-column-inner {
	width: 100%;
}
.wf-item {
	width: 100%;
	margin-bottom: $grid-gap;
	box-sizing: border-box;
}
.wf-page1 .wf-item {
	background-color: #fff;
	border-radius: 20rpx;
}
</style>
