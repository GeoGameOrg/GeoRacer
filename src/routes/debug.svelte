<script language="ts">
	import { onMount } from 'svelte';
	import { SocketClient } from 'api-client';

	const client = new SocketClient();
	function parseJSON(response) {
		return JSON.stringify(response, null, 2);
	}

	onMount(() => {
		var coll = document.getElementsByClassName('collapsible');
		var i;

		for (i = 0; i < coll.length; i++) {
			coll[i].addEventListener('click', function () {
				this.classList.toggle('active');
				var content = this.nextElementSibling;
				if (content.style.display === 'block') {
					content.style.display = 'none';
				} else {
					content.style.display = 'block';
				}
			});
		}

		var secs = document.getElementsByClassName('section-toggle');

		for (i = 0; i < secs.length; i++) {
			secs[i].addEventListener('click', function () {
				this.classList.toggle('active');
				var content = this.nextElementSibling;
				if (content.style.display === 'block') {
					content.style.display = 'none';
				} else {
					content.style.display = 'block';
				}
			});
		}
	});

	const responses = {};

	let store = {
		createLobby: { response: {} },
		joinLobby: {
			response: {},
			inputs: {
				id: ''
			}
		}
	};
</script>

<main class="text-white">
	<section>
		<button type="button" class="section-toggle"><h1>Lobbies</h1></button>
		<div class="section-content">
			<div class="collapse-container">
				<button type="button" class="collapsible">Create Lobby</button>
				<div class="content none">
					<button
						type="button"
						class="send-btn"
						on:click={() =>
							client.createLobby().then((response) => {
								store.createLobby.response = response;
							})}
					>
						Send
					</button>
					<pre class="response">{parseJSON(store.createLobby.response)}</pre>
				</div>
			</div>

			<div class="collapse-container">
				<button type="button" class="collapsible">Join Lobby</button>
				<div class="content">
					<form>
						<label class="block text-gray-700 text-sm font-bold mb-2" for="username">
							Lobby ID
						</label>
						<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							bind:value={store.joinLobby.inputs.id}
							placeholder="lobby id"
						/>
					</form>
					<button
						type="button"
						class="send-btn"
						on:click={() =>
							client.joinLobby(store.joinLobby.inputs.id).then((response) => {
								store.joinLobby.response = response;
							})}
					>
						Send
					</button>
					<pre class="response">{parseJSON(store.joinLobby.response)}</pre>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	.send-btn {
		background-color: lightblue;
		border-radius: 5px;
		width: 100%;
		height: 35px;
		font-weight: bold;
		margin-bottom: 10px;
		margin-top: 10px;
	}

	.section-toggle {
		width: 100%;
		font-size: larger;
		font-weight: bold;
		background-color: lightcoral;
		border-radius: 15px;
		padding: 15px;
	}

	.collapse-container {
		background-color: #eee;
		border-radius: 15px;
		padding-bottom: 20;
		margin: 10px;
	}

	main {
		width: 100%;
	}

	.collapsible {
		background-color: rgb(255, 191, 191);
		border-radius: 15px;
		color: #444;
		cursor: pointer;
		padding: 18px;
		width: 100%;
		border: none;
		text-align: left;
		outline: none;
		font-size: 15px;
	}

	.content {
		display: none;
		margin: 20px;
		color: black;
		border-radius: 5px;
		padding: 10px;
	}

	.response {
		background-color: rgb(46, 46, 46);
		color: white;
		min-height: 300px;
	}
</style>
