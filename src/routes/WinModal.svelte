<script>
    export let showModal;
    export let result;

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:click={() => (showModal = false)}
    on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <h1>
            {#if result == 'X'}
                Chisato wins!
            {:else}
                Takina wins!
            {/if}
        </h1>
        <!-- TODO: add winner picture -->
        <div class="close-button">
            <button on:click={() => dialog.close()}>Close</button>
        </div>
    </div>
</dialog>

<style>
    .close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }
</style>