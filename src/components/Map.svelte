<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	class Map {
		private _loaded = false;
		private _map: null | google.maps.Map = null;
		private _items: google.maps.Marker[] = [];
		get loaded() {
			return this._loaded;
		}
		set map(map: google.maps.Map) {
			this._loaded = true;
			this.resolvePromise();
			this._map = map;
		}
		resolvePromise: Function;

		wait = new Promise<void>((resolve) => {
			this.resolvePromise = resolve;

			if (this._loaded) {
				resolve();
			}
		});

		addItem({ position, icon, title }) {
			if (this._loaded) {
				this._items.push(
					new google.maps.Marker({
						position,
						map: this._map,
						icon,
						title
					})
				);
			} else {
				throw 'couldnt add items to Map bc its not loaded';
			}
		}
	}
	export const map = writable(new Map());
</script>

<script lang="ts">
	import { Loader } from '@googlemaps/js-api-loader';
	const loader = new Loader({
		apiKey: 'AIzaSyAD6HVJHgRC0i5nqcX7Pnu9veKbSRSN5C0'
	});

	loader
		.load()
		.then(() => {
			$map.map = new google.maps.Map(
				document.getElementById('map') as HTMLElement,
				{
					center: { lat: 42.345573, lng: -71.098326 },
					zoom: 8,
					mapId: '1deb78b225b46ac6',
					disableDefaultUI: true
				} as google.maps.MapOptions
			);
		})
		.catch((e) => console.log(e));
</script>

<div id="map" class="w-full h-screen rounded-xl shadow-xl" />

<style>
</style>
