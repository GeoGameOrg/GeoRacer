<script language="ts">
	import Map, { map } from '../components/Map.svelte';
	import Pano, { pano } from '../components/Pano.svelte';
	$pano.wait.then(() =>{
		$pano.addItem({
			position: { lat: 42.345573, lng: -71.098326 },
			icon: null,
			title: 'test'
		})

		$pano.listenForPositionChange(() =>$map.addItem({
			position: $pano.pano.getPosition(),
			icon: null,
			title: 'test'
		}))
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
<div class="flex">
<Map />
<Pano />
</div>
