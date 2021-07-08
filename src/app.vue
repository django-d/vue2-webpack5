<template>
	<div class="app-main-wrapper">
		<button class="btn" @click="handleIncrement">Click me</button>
		<p class="display">
			{{ count }}
		</p>
		<p class="display2">
			{{ inputValue }}
		</p>
		<input v-model="inputValue" type="text" />
		<ul class="list flex">
			<li class="item">1</li>
			<li class="item">2dsds</li>
			<li class="item">d2</li>
			<li class="item">ddd</li>
		</ul>
		<button @click="onTestClick">跳转</button>
		<router-view />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import bg1Png from './assets/images/bg1-1.png';
import { useRouter } from './core/router';
export default defineComponent({
	setup() {
		const inputValue = ref('');
		const count = ref(0);
		const handleIncrement = () => {
			count.value += 1;
		};
		const onTestClick = () => {
			const router = useRouter();
			router?.push('/ui');
		};
		return { bg1Png, inputValue, count, handleIncrement, onTestClick };
	},
});
</script>

<style scoped lang="less">
.btn {
	border: none;
	outline: none;
	background-color: #1890ff;
}
.list {
	display: flex;
	justify-content: flex-start;
	list-style-type: none;
	margin: 0;
	padding: 0;
}
</style>
