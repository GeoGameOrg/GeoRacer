<script language="ts">
	import { createRoom, joinRoom } from '../helper.ts';

	var responseTxt = '';

    function parseResponse(response) {
        responseTxt = JSON.stringify(response, null, 2)
    }

    // Bindings
    let joinRoomId = '';
</script>

<div class="flex justify-center text-white"><span>Beta</span></div>
<div class="text-white">
	<pre class="text-white bg-black">
        {responseTxt}
    </pre>
	<div>
		<button on:click={() => createRoom(parseResponse)}> Create Room </button>
        <div>
            <button on:click={() => joinRoom(joinRoomId, parseResponse)}> Join Room </button>
            <input bind:value={joinRoomId} placeholder="enter room id">
        </div>
	</div>
</div>

<style>
	.button {
		border: none;
		color: white;
        background-color: pink;
        border-radius: 10px;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
	}
</style>
