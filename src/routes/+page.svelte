<script>
	import Cell from './Cell.svelte';
	import { turn } from './stores.js';
	
	$: pendingPlayer = `currently player ${$turn}'s turn.`;

	let result;
    let board = new Array(9).fill(null);
	
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
						if (board[winCombos[i][0]] == board[winCombos[i][1]] 
						&& board[winCombos[i][1]] == board[winCombos[i][2]]) {
								console.log(`comparing ${board[winCombos[i][0]]} == ${board[winCombos[i][1]]} == ${board[winCombos[i][2]]}`);
								result = `${board[winCombos[i][0]]} wins`;
								break;
						}
				}
		}
		
	}

	function resetGame() {
		board = new Array(9).fill(null);
		result = null;
		$turn = 'X';
	}
	
    function handleCell(event) {
        const { idx, turn } = event.detail;
        console.log(`GOT MSG cell ${idx} clicked with ${turn}`);

        // update the board
        board[idx] = turn;
        console.log(`board from main: ${board}`);
        checkWinner();
    }

</script>

<section>
	<p>
		{pendingPlayer}
    </p>
	{#if !result}
        <div class="board-container">
            <div class="board">
                {#each board as cell, idx}
                    <Cell on:message={handleCell} index={idx} />
                {/each}
            </div>
        </div>
	{:else}
        <div class="restart">
            <button class="restart" on:click={resetGame}>Restart?</button>
        </div>
	{/if}

    </section>

<style>
    p {
        text-align: center;
        font-size: 1em;
    }

    div.board-container {
        display: flex;
        justify-content: center;
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
        padding: 10px;
        border-radius: 5px;
        background: hsl(0, 100%, 50%);
        color: white;
        border: none;
        margin: 20px;
    }
</style>
