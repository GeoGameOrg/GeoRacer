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
	joinRoom(id)
</script>

<Lobby lobbyCode={id}/>


