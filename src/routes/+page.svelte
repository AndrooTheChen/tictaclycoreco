<script>
	import Cell from './Cell.svelte';
    import WinModal from './WinModal.svelte';
	import { turn } from './stores.js';
	
	$: pendingPlayer = `currently player ${$turn}'s turn.`;

	let result;
    let board = new Array(9).fill(null);
    let showModal = false;
	
	function checkWinner() {
		const winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winCombos.length; i++) {
            if (board[winCombos[i][0]] != null) {
                console.log(`comparing ${board[winCombos[i][0]]} to ${board[winCombos[i][1]]} to ${board[winCombos[i][2]]}`)
                if (board[winCombos[i][0]] == board[winCombos[i][1]] 
                && board[winCombos[i][1]] == board[winCombos[i][2]]) {
                        result = `${board[winCombos[i][0]]}`;
                        showModal = true;
                        break;
                }
            }
        }
	}

	function resetGame() {
        console.log(`clearing game, ${board}`);
		board = new Array(9).fill(null);
        console.log(`cleared game, ${board}`);
		result = null;
		$turn = 'X';
	}
	
    function handleCell(event) {
        const { idx, turn } = event.detail;

        // update the board
        board[idx] = turn;
        console.log(`board from main: ${board}`);

        checkWinner();
    }
</script>

<WinModal bind:showModal result={result}>
    <!-- <h1 slot="header">You win!</h1> -->
    <slot />
    <!-- <button slot="footer" on:click={() => showModal = false}>Close</button> -->
</WinModal>

<section>
    <div class="board-container">
        {#if result}
            <div class="restart">
                <button class="restart" on:click={resetGame}>Restart?</button>
            </div>
        {:else}
            <p>{pendingPlayer}</p>
        {/if}
        <div class="board">
            {#each board as state, index }
                <Cell on:message={handleCell} state={state} index={index} />
            {/each}
        </div>
    </div>

</section>

<style>
    p {
        text-align: center;
        font-size: 1em;
    }

    div.board-container {
        display: flex;
        justify-content: center;
        flex-direction: column;;
    }

    div.board {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 3px;
        max-width: 8000px;
    }

    div.restart {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button.restart {
        font-size: 1.5em;
        border-radius: 5px;
        background: hsl(0, 100%, 50%);
        color: white;
        border: none;
        margin: 20px;
    }
</style>
