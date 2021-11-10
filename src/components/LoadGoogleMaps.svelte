<script context="module" lang="ts">
	import { Loader } from '@googlemaps/js-api-loader';
import { writable } from 'svelte/store';
	const loader = new Loader({
		apiKey: 'AIzaSyAD6HVJHgRC0i5nqcX7Pnu9veKbSRSN5C0',
		libraries: ['drawing']
	});
	export const loadGoogleMaps = writable(loader
		.load()
		.catch((reason) => {
			// Probably @googlemaps/js-api-loader
			console.log(reason);
		}))



</script>
