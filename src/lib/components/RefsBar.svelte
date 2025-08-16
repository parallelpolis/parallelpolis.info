<script>
    let { refs } = $props();

    function formatWeb(url) {
        const title = url
            .replace(/^https?:\/\//, "")
            .replace(/\/$/, "")
            .split("/");

        if (title.length <= 2) {
            return title.join("/");
        }
        return [title[0], "..", title[title.length - 1]].join("/");
    }

    if (refs) {
            if (refs.bsky && typeof(refs.bsky) === "string") {
            const [ did, handle ] = refs.bsky.includes("|") ? refs.bsky.split('|') : [ refs.bsky, refs.bsky ];
            refs.bsky = { did, handle }
        }
    }
</script>

{#if refs}
    <div class="flex flex-wrap gap-4 items-center mt-2 ml-2">
        {#if refs.web}
            <div class="flex gap-2 items-center">
                <div class="text-2xl">@</div>
                <a href={refs.web} class="hover:underline"
                    >{formatWeb(refs.web)}</a
                >
            </div>
        {/if}
        {#if refs.bsky}
            <div class="flex gap-2 items-center">
                <div class="text-2xl">
                    <img
                        src="/bsky.svg"
                        class="w-5 dark:invert"
                        alt="bluesky"
                    />
                </div>
                <a
                    href="https://bsky.app/profile/{refs.bsky.did}"
                    class="hover:underline"
                    >{refs.bsky.handle}
                </a>
            </div>
        {/if}
        {#if refs.nostr}
            <div class="flex gap-2 items-center">
                <div class="text-2xl">
                    <img
                        src="/nostr.webp"
                        class="w-5 dark:invert"
                        alt="Nostr"
                    />
                </div>
                <a
                    href="https://primal.net/p/{refs.nostr}"
                    class="hover:underline"
                    >{refs.nostr.slice(0, 15)}..
                </a>
            </div>
        {/if}
        {#if refs.github}
            <div class="flex gap-2 items-center">
                <div class="font-semibold">
                    <img
                        src="/github.svg"
                        class="w-5 dark:invert"
                        alt="GitHub"
                    />
                </div>
                <a
                    href="https://github.com/{refs.github}"
                    class="hover:underline"
                    >{refs.github}
                </a>
            </div>
        {/if}
        {#if refs.meetup}
            <div class="flex gap-2 items-center">
                <a href={refs.meetup} class="hover:underline">meetup.com</a>
            </div>
        {/if}
        {#if refs.luma}
            <div class="flex gap-2 items-center">
                <a href="https://lu.ma/{refs.luma}" class="hover:underline"
                    >lu.ma</a
                >
            </div>
        {/if}
        {#if refs.amazon}
            <div class="flex gap-2 items-center">
                <a href={refs.amazon} class="hover:underline">amazon</a>
            </div>
        {/if}
    </div>
{/if}
