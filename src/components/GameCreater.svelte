<script lang="ts">
	import Map, { map } from './Map.svelte';
	import Button from './UI/Button.svelte';
	enum PointTypes {
		checkpoint,
		item,
		start,
		end
	}
	class Location {
		lat: number;
		lng: number;
		constructor(lat: number, lng: number) {
			this.lat = lat;
			this.lng = lng;
		}
		static createLocationFromGoogleMapsObject(overlay: any) {
			let pos = overlay.getPosition();
			return new Location(pos.lat(), pos.lng());
		}
		toJSON() {
			return JSON.stringify({ lat: this.lat, lng: this.lng });
		}
	}
	class Point {
		location: Location;
		type: PointTypes;
		index?: number;
	}
	interface Bounds {
		southWest: Location;
		northEast: Location;
	}
	class Game {
		title = '';
		description = '';
		points: Point[] = [];
		boundaries: Bounds;
	}
	const gameForm = new Game();

	const handleBoundaries = async () => {
		let resolver: Function;
		const promise = new Promise<void>((resolve) => (resolver = resolve));
		const rectangleDrawer = $map.drawRectangle({}, (rec: google.maps.Rectangle) => {
			const bounds = rec.getBounds();
			const ne_bound = bounds.getNorthEast();
			const sw_bound = bounds.getSouthWest();
			gameForm.boundaries = {
				southWest: new Location(sw_bound.lat(), sw_bound.lng()),
				northEast: new Location(ne_bound.lat(), ne_bound.lng())
			};
			rectangleDrawer.clear();
			$map.map.fitBounds(rec.getBounds());
			$map.map.setOptions({ restriction: { latLngBounds: rec.getBounds(), strictBounds: true } });
			resolver();
		});
		return promise;
	};
	const getClosestSVLocation = (marker: google.maps.Marker) =>
		new Promise<void>((resolve, reject) => {
			const sv = new google.maps.StreetViewService();
			sv.getPanorama(
				{
					location: marker.getPosition(),
					preference: google.maps.StreetViewPreference.NEAREST,
					source: google.maps.StreetViewSource.OUTDOOR,
					radius: 1000
				},
				(streetView, status) => {
					if (status === google.maps.StreetViewStatus.OK) {
						marker.setPosition(streetView.location.latLng);
						resolve();
					} else {
						marker.setMap(null);
						marker = null;
						alert('No Street View found in 1000m! Try again!');
						reject('couldnt find start');
					}
				}
			);
		});

	const handleStart = () => {
		let resolver: Function;
		const promise = new Promise<void>((resolve) => (resolver = resolve));

		const markerDrawer = $map.drawMarker({}, async (marker: google.maps.Marker) => {
			try {
				await getClosestSVLocation(marker);
				gameForm.points.push({
					location: Location.createLocationFromGoogleMapsObject(marker),
					type: PointTypes.start
				});
				markerDrawer.stop();
				resolver();
			} catch (e) {
				console.log(e);
			}
		});
		return promise;
	};
	const handleRoute = () => {
		const markerDrawer = $map.drawMarker({}, async (marker: google.maps.Marker) => {
			try {
				await getClosestSVLocation(marker);
				gameForm.points.push({
					location: Location.createLocationFromGoogleMapsObject(marker),
					type: PointTypes.checkpoint
				});
				showSave = true;
			} catch (e) {
				console.log(e);
			}
		});
	};
	let showSave = false;
	const createGame = async () => {
		try {
			alert('Select the playing field');
			await $map.wait;
			await handleBoundaries();
			alert('Select the Start');
			await handleStart();
			alert('Select locations for the players to find');
			handleRoute();
		} catch (e) {
			console.log(e);
		}
	};
	createGame();
</script>

<h1 class="text-white text-xl font-bold text-center">Create Game</h1>
<form class="grid text-white m-5">
	<label class="items-center">Game Title</label>
	<input
		type="text"
		placeholder="Sightseeing London Ralley"
		class="text-black shadow-md rounded-md m-5 p-2"
		value={gameForm.title}
		on:input={(e) => (gameForm.title = e.target.value)}
	/>
	<label>Description</label>
	<input
		type="text"
		placeholder="most visited tourist locations in London"
		class="text-black shadow-md rounded-md m-5 p-2"
		value={gameForm.description}
		on:input={(e) => (gameForm.description = e.target.value)}
	/>
</form>
<div class="text-white p-5 m-2">
	{#if showSave}
		<button on:click={() => console.log(gameForm)}>save game</button>
	{/if}
</div>
<Map />
