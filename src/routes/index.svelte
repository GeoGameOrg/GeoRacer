<script language="ts">
	import Map, { map } from '../components/Map.svelte';
	import Pano, { pano } from '../components/Pano.svelte';
	$pano.wait.then(() =>{
		$pano.addItem({
			position: { lat: 42.345573, lng: -71.098326 },
			icon: null,
			title: 'test'
		})
		$pano.listenForPositionChange(() =>console.log($pano.pano.getPosition()))
		}
	)
	$map.wait.then(() =>
		$map.addItem({
			position: { lat: 42.345573, lng: -71.098326 },
			icon: null,
			title: 'test'
		})

	);
</script>

<div class="flex justify-center text-white"><span>Beta</span></div>
<Map />
<Pano />
