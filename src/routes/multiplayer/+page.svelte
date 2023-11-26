<script>
    import MultiBoard from './MultiBoard.svelte';

    export let data;

    $: board = data.board;
</script>

<svelte:head>
    <title>Multiplayer</title>
    <meta name="description" content="Multiplayer Tic Tac Toe game" />
</svelte:head>

<div class="text-column">
    <MultiBoard board={board} result={null} showModal={false} />
</div>