<script>
    import Board from './Board.svelte';

    let board = new Array(9).fill(null);
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Tic Tac Toe game in Cafe Lyco Reco" />
</svelte:head>

<Board board={board} result={null} showModal={false}/>