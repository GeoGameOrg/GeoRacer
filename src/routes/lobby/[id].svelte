<script lang="ts" context="module">
	export async function load({ page}) {
		return {
			props: {id: page.params.id}
		}
	}
</script>

<script lang="ts">
	import Lobby from "../../components/Lobby.svelte"
	export let id: Number
	import {joinRoom} from "../../helper.ts"
	let loaded = true
	joinRoom(id)
</script>

{#if loaded}
<Lobby lobbyCode={id}/>

{:else}

	<div class="text-white text-center animate-pulse">loading...</div>

{/if}


