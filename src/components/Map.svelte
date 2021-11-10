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
		get map(){return this._map}

		wait = new Promise<void>((resolve) => {
			this.resolvePromise = resolve;

			if (this._loaded) {
				resolve();
			}
		});

		drawRectangle(rectangleOptions?: google.maps.RectangleOptions, listener?: Function) {
			let rectangles: google.maps.Rectangle[] = [];
			let drawingManager: null | google.maps.drawing.DrawingManager;
			if (this._loaded) {
				drawingManager = new google.maps.drawing.DrawingManager({
					drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
					drawingControl: true,
					rectangleOptions
				});

				drawingManager.setMap(this._map);
				drawingManager.setOptions({
					drawingControl: false
				});
				google.maps.event.addListener(drawingManager, 'rectanglecomplete', (rectangle) => {
					rectangles.push(rectangle);
					if (listener) {
						listener(rectangle);
					}
				});
				return {
					clear: () => {
						drawingManager.setMap(null);
						rectangles.forEach((m) => m.setMap(null));
					},
					stop: () => {
						drawingManager.setMap(null);
					},
					rectangles
				};
			} else throw 'map is not loaded cannot add marker';
		}
		drawMarker(markerOptions?: google.maps.MarkerOptions, listener?: Function) {
			let points: google.maps.Marker[] = [];
			let drawingManager: null | google.maps.drawing.DrawingManager;
			if (this._loaded) {
				drawingManager = new google.maps.drawing.DrawingManager({
					drawingMode: google.maps.drawing.OverlayType.MARKER,
					drawingControl: true,
					markerOptions
				});

				drawingManager.setMap(this._map);
				drawingManager.setOptions({
					drawingControl: false
				});
				google.maps.event.addListener(drawingManager, 'markercomplete', (marker) => {
					if (listener) {
						listener(marker);
					}
					points.push(marker);
				});
				return {
					clear: () => {
						drawingManager.setMap(null);
						points.forEach((m) => m.setMap(null));
					},
					stop: () => {
						drawingManager.setMap(null);
					},
					points
				};
			} else throw 'map is not loaded cannot add marker';
		}
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
	import {loadGoogleMaps} from "./LoadGoogleMaps.svelte"
	interface MapOptions extends google.maps.MapOptions {
		mapId: string;
	}
	export let mapOptions: MapOptions = {
		center: { lat: 0, lng: 0 },
		zoom: 2,
		mapId: '1deb78b225b46ac6',
		disableDefaultUI: true
	};
	mapOptions.mapId = '1deb78b225b46ac6';

	
		$loadGoogleMaps.then(() => {
			$map.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
		})
		.catch((reason) => {
			// Probably @googlemaps/js-api-loader
			console.log(reason);
		});
</script>

<div id="map" class="w-full h-screen rounded-xl shadow-xl" />

<style>
</style>
