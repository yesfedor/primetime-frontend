<template>
	<div class="app-page-home">
		<h1 class="app-page-home__title">
			{{ $t('welcome') }}
		</h1>
	</div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.app-page-home {
	display: flex;
	align-items: center;
	flex-direction: column;

	&__title {
		color: #121212;
	}
}
</style>
