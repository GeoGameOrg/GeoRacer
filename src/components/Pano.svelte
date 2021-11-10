<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	class Pano {
		private _loaded = false;
		private _pano: null | google.maps.StreetViewPanorama = null;
		private _items: google.maps.Marker[] = [];
		get loaded() {
			return this._loaded;
		}

		get pano() {
			return this._pano;
		}
		set pano(pano: google.maps.StreetViewPanorama) {
			this._loaded = true;
			this.resolvePromise();
			this._pano = pano;
		}
		resolvePromise: Function;

		wait = new Promise<void>((resolve) => {
			this.resolvePromise = resolve;

			if (this._loaded) {
				resolve();
			}
		});

		listenForPositionChange(handler) {
			if (this._loaded) {
				this._pano.addListener('position_changed', handler);
			} else throw 'cannot add listener pano not loaded';
		}

		addItem({ position, icon, title }) {
			if (this._loaded) {
				this._items.push(
					new google.maps.Marker({
						position,
						map: this._pano,
						icon,
						title
					})
				);
			} else {
				throw 'couldnt add items to Panorama bc its not loaded';
			}
		}

		setPanoId(panoId: string) {
			if (this._loaded) {
				this._pano.setPano(panoId);
			} else {
				throw 'Panorama is not loaded';
			}
		}
	}

	export const pano = writable(new Pano());
</script>

<script lang="ts">
	import {loadGoogleMaps} from "./LoadGoogleMaps.svelte"
	export const position = { lat: 42.345573, lng: -71.098326 };
		$loadGoogleMaps.then(() => {
			$pano.pano = new google.maps.StreetViewPanorama(
				document.getElementById('pano') as HTMLElement,
				{
					position,
					disableDefaultUI: true,
					pov: {
						heading: 34,
						pitch: 10
					}
				} as google.maps.MapOptions
			);
		})
		.catch((reason) => {
			// Probably @googlemaps/js-api-loader
			console.log(reason);
		});
</script>

<div id="pano" class="w-full h-screen rounded-xl shadow-xl" />

<style>
</style>
