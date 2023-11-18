<script>
    import Page from './+page.svelte';
    import './styles.css';

    // create the buttons here, this is what populuates the 3x3 grid for the board.
    // for now we just fill it with nothing.
    let buttons = new Array(9).fill(null);
    let result = null;
    let turn = 'X';
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


    function setValue(i) {
        buttons[i] = turn;
        buttons = [...buttons];

        // flip the turn each round.
        turn = turn === 'X' ? 'O' : 'X';

        if (!buttons.includes(null)) {
            result = "Match Draw";
        } else {
            checkWinner();
        }
    }

    function checkWinner() {
        for (let i = 0; i < winCombos.length; i++) {
            if (buttons[winCombos[i][0]] != null) {
                if (buttons[winCombos[i][0]] == buttons[winCombos[i][1]] 
                && buttons[winCombos[i][1]] == buttons[winCombos[i][2]]) {
                    result = `${buttons[winCombos[i][0]]} wins`;
                    break;
                }
            }
        }
    }

    function restart() {
        buttons = new Array(9).fill(null);
        result = null;
        turn = 'X';
    }
</script>

<div class="app">
    <main>
        {#if !result}
        <div class="tictac">
            <!-- use that `buttons` var we declared earlier to create the grid.-->
            {#each buttons as button, index}
                <button on:click={() => {setValue(index)}}>
                    <!-- ternary operator, if button has val display it, else "" -->
                    {button?button:""}
                </button>
            {/each}
        </div>
        {:else}
            <div>
                <!-- print the result of the match. -->
                <h1>{result}</h1>

                <!-- restart the game.  -->
                <button on:click={restart}>
                    Restart
                </button>
            </div>
        {/if}

        <!-- <slot /> -->
    </main>

    <!-- <footer>
        this is da footer xd
    </footer> -->
</div>

<style>
    .tictac {
        width:300px;
        height:300px;
        display: flex;
        flex-wrap: wrap;
    }
    .tictac button {
        width: 100px;
        height: 100px;
        margin: 0px;
    }
</style>