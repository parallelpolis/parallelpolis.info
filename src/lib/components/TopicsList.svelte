<script>
    import { glossary } from "$lib/data.js";
    const { topics } = $props();

    function glossaryResolve(key) {
        const found = glossary.find(
            (i) => i.id === key || i.name === key || i.keywords?.includes(key),
        );
        if (found) {
            return {
                ...found,
                name: key,
            };
        }
        return {
            name: key,
        };
    }
</script>

<div class="grid grid-cols-1 gap-4 mt-8">
    {#each topics as t}
        <div>
            <div class="text-3xl font-semibold">{t.category}</div>
            <div class="mt-4 mb-6 flex flex-wrap gap-3">
                {#each t.subtopics.map(glossaryResolve) as st}
                    <div class="text-2xl">
                        <a
                            href={st.id ? `/t/${st.id}` : null}
                            class="block {st.id
                                ? 'hover:bg-gray-200 dark:hover:bg-gray-800'
                                : 'no-underline'} py-1.5 px-2 bg-gray-100 dark:bg-gray-900 rounded"
                            >{st.name}</a
                        >
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>
