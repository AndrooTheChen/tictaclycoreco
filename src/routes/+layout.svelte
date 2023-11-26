<script>
    import './styles.css';
    import Header from './Header.svelte';
    import Board from './Board.svelte';
    import chisato from '$lib/images/chisato2.jpg';
    import takina from '$lib/images/taikina2.jpg';

    let board = new Array(9).fill(null);
</script>

<div class="app">
    <Header />
    
    <div class="main-site">
        <div class="item-left">
            <img src={takina} alt="takina"/>
        </div>
    
        <main class="item">
            <!-- <Board board={board} result={null} showModal={false}/> -->
            <slot />
        </main>
    
        <div class="item-right">
            <img src={chisato} alt="chisato"/>
        </div>
    </div>
</div>

<style>
    .main-site {
        display: flex;
        flex-direction: row;
        min-height: 100vh;
        max-width: 100vw;
        overflow: hidden;
    }

    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        max-width: 100vw;
        overflow: hidden;
	}

    .item {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item-left {
        flex: 1;
        background-color: red;
        display: flex;
        overflow: hidden;
        position: relative;
    }

    .item-right {
        flex: 1;
        background-color: red;
        display: flex;
        overflow: hidden;
        position: relative;
    }

    .item-right img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        bottom: 0;
    }

    .item-left img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        bottom: 0;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        box-sizing: border-box;
    }
</style>