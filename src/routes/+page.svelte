<script>
	import { onMount } from 'svelte';

	let guilds,
		guildUi = false;
	let selectedGuilds = new Set();
	let searchQuery = '';

	async function getGuilds() {
		const res = await fetch('/server', { method: 'GET' });
		guilds = await res.json();
	}

	function toggleGuild(id) {
		if (selectedGuilds.has(id)) {
			selectedGuilds.delete(id);
		} else {
			selectedGuilds.add(id);
		}
	}

	async function sendMessage() {
		const messageInput = document.getElementById('message');
        const channelInput = document.getElementById('channel')
		let data = {
			message: messageInput.value,
            channel:channelInput.value,
			guilds: Array.from(selectedGuilds)
		};

		const res = await fetch('/server', { method: 'POST', body: JSON.stringify(data) });
		const response = await res.json();

		if (response.status === 200) {
			alert('Message sent successfully');
		}
	}

	onMount(() => {
		getGuilds();
	});
</script>

<form>
	{#if guildUi}
		<input type="text" placeholder="Search by name or ID" bind:value={searchQuery} />

		{#each guilds as guild}
			{#if guild.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) || guild.id.includes(searchQuery)}
				<div class="guilds">
					<input
						type="checkbox"
						checked={selectedGuilds.has(guild.id)}
						on:change={() => toggleGuild(guild.id)}
						id={guild.id}
					/>
					<label for={guild.id}>{guild.name}</label>
					<button style="margin-left: 15px;" on:click={() => (guild.showId = !guild.showId)}> ID </button>
					{#if guild.showId}
						<span>(ID: {guild.id})</span>
					{/if}
				</div>
			{/if}
		{/each}

		<button type="button" on:click={() => (guildUi = false)}>Done</button>
	{:else}
		<button on:click={() => (guildUi = true)} type="button">Add servers</button>
		<input type="text" placeholder="Message" id="message" />
        <input type="text" placeholder="Channel to send to" id="channel">
		<button type="button" on:click={sendMessage}>Send</button>
	{/if}
</form>

<style>
	/* Add your custom styling here to make it look more like Discord */
	form {
		display: flex;
		flex-direction: column;
		max-width: 400px;
		margin: auto;
		padding: 20px;
		background-color: #36393f;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	label {
		color: #fff;
		margin-bottom: 5px;
	}

	input[type='checkbox'] {
		margin-right: 5px;
		appearance: none;
		width: 20px;
		height: 20px;
		border: 2px solid #7289da;
		border-radius: 4px;
		background-color: #36393f;
		cursor: pointer;
	}

	input[type='checkbox']:checked {
		background-color: #7289da;
	}

	input[type='text'] {
		padding: 10px;
		margin-bottom: 10px;
		border: 1px solid #72767d;
		border-radius: 4px;
		background-color: #202225;
		color: #fff;
	}

	button {
		padding: 10px;
		background-color: #7289da;
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	button:hover {
		background-color: #677bc4;
	}

	div.guilds {
		display: flex;
		align-items: center;
		margin-bottom: 5px;
	}
</style>