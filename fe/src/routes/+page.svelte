<script lang="ts">

$effect(() => {
    fetch('/api/sample')
        .then((response) => {
            console.log(response)
            response.text().then(data => console.log(data))
        })
        .catch(error => console.error('Error:', error));
})

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
