<script language="ts">
	import NavBar from '../components/NavBar.svelte';
</script>

<div
	class="m-5 p-2 max-w-screen-lg rounded-xl
	bg-gray-900 shadow-xl "
>
	<NavBar />
	<slot />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
