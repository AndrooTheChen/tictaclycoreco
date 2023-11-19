<script>
    import { createEventDispatcher } from 'svelte';
	import { turn } from './stores.js';

	export let index;
    let state = null;

    const dispatch = createEventDispatcher();

	function handleCellClick() {
        if (state == null) {
            console.log(`marking cell ${index} with ${$turn}`);
            // mark the cell with the current player's turn
            state = $turn;

            // tell the main board which index just got clicked
            dispatch('message', { idx: index, turn: $turn });

            // switch to the next player's turn
    		$turn = $turn === 'X' ? 'O' : 'X';
        }
	}
</script>

<button on:click={handleCellClick}>{state}</button>

<style>
	button {
		font-size: 1.4em;
		width: 6em;
		height: 6em;
		border-radius: 50%;
		background: radial-gradient(circle at 25% 25%, hsl(0, 100%, 50%) 0, hsl(0, 100%, 40%) 100%);
		box-shadow: 0 8px 0 hsl(0, 100%, 30%), 2px 12px 10px rgba(0,0,0,.35);
		color: hsl(0, 100%, 30%);
		text-shadow: -1px -1px 2px rgba(0,0,0,0.3), 1px 1px 2px rgba(255,255,255,0.4);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transform: translate(0, -8px);
		transition: all 0.2s;
		margin: 20px;
	}
</style>
