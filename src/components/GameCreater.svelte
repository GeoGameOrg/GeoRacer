<script lang="ts">
	import Map from './Map.svelte';
	enum PointTypes {
		checkpoint,
		item,
		start,
		end
	}
	class Point {
		marker: google.maps.Marker;
		type: PointTypes;
		index: number | null;
	}
	class Game {
		title = '';
		description = '';
		points: Point[];
    boundaries: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
	}
	const gameForm = new Game();
</script>

<h1 class="text-white text-xl font-bold text-center">Create Game</h1>
<form class="grid text-white m-5">
	<label class="items-center">Game Title</label>
	<input
		type="text"
		placeholder="Sightseeing London Ralley"
		class="text-black shadow-md rounded-md m-5 p-2"
		value={gameForm.title}
    on:input={(e) => gameForm.title = e.target.value }
	/>
	<label>Description</label>
	<input
		type="text"
		placeholder="most visited tourist locations in London"
		class="text-black shadow-md rounded-md m-5 p-2"
		value={gameForm.description}
    on:input={(e) => gameForm.description = e.target.value }
	/>
	<button
		on:click={(e) => {
			e.preventDefault();
			console.log(gameForm);
		}}>log game</button
	>
</form>
<Map />
