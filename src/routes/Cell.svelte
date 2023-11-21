<script>
    import { createEventDispatcher } from 'svelte';
    import { turn } from './stores.js';
    import empty_cell from '$lib/images/empty-cell.png';
    import chisato from '$lib/images/chisato-cell.png';
    import takina from '$lib/images/takina-cell.png';

    export let index;
    export let state;

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

<button on:click={handleCellClick} style="background: transparent; border: none; padding: 0;">
    {#if state == null}
        <img src={empty_cell} alt="empty">
    {:else if state == 'X'}
        <img src={chisato} alt="chisato">
    {:else if state == 'O'}
        <img src={takina} alt="takina">
    {/if}
</button>

<style>
    img {
        width: 8em;
        height: 8em;
        border-radius: 50%;
        object-fit: cover;
        margin: 20px;
    }
</style>
