<script language="ts">
	import NavBar from '../components/NavBar.svelte';
</script>

<div>
	<NavBar />
	<slot />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
