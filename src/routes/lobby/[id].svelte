<script lang="ts" context="module">
	export async function load({ page }) {
		return {
			props: { id: page.params.id }
		};
	}
</script>

<script lang="ts">
	import Lobby from '../../components/Lobby.svelte';
	export let id: string;
	import { SocketClient } from 'api-client';

	const client = new SocketClient();
	
	let loaded = true;
	client.joinLobby(id).then((response) => {
		console.log(response);
	});
</script>

{#if loaded}
	<Lobby lobbyCode={id} />
{:else}
	<div class="text-white text-center animate-pulse">loading...</div>
{/if}
