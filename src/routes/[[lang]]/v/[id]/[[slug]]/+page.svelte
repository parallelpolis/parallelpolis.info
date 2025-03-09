<script>
    import { marked } from "marked";

    import Video from "$lib/components/Video.svelte";
    import PeopleBar from "$lib/components/PeopleBar.svelte";
    import EventLink from "$lib/components/EventLink.svelte";
    import StructureLink from "$lib/components/StructureLink.svelte";
    import MetaTags from "$lib/components/MetaTags.svelte";

    import { CloudArrowDown, PlayCircle } from "svelte-heros-v2";
    import { config, people } from "$lib/data.js";
    import {
        shortText,
        imgHashUrl,
        archiveStorageUrl,
        filesize,
    } from "$lib/utils.js";
    import { t } from "$lib/i18n.js";

    const { data } = $props();
    let item = $derived(data.item);
    let youtubeId = $derived(item.url.match(/\?v=([^&]+)/) ? item.url.match(/\?v=([^&]+)/)[1] : false);
    let peopleArr = $derived(
        item.people
            ?.map((pid) => people.find((p) => p.id === pid))
            .filter((p) => p),
    );
    let archiveTitle = $derived(
        `${item.name} ${peopleArr && peopleArr.length > 0 ? " - " + peopleArr.map((p) => p.name).join(", ") : ""}`,
    );
    let description = $derived(shortText(item.desc.split("\n")[0]));

    const renderer = new marked.Renderer();
    renderer.link = function ({ href, title, text }) {
        // Add target="_blank" and rel="external" to all links
        const titleAttr = title ? ` title="${title}"` : "";
        return `<a href="${href}"${titleAttr} ${href.slice(0, 1) === "/" ? "" : `target="_blank" rel="external"`}>${text}</a>`;
    };
</script>


<MetaTags
    title={archiveTitle}
    {description}
    url="https://{config.host}/v/{item.id}"
    img={imgHashUrl("archive", item.imgHash, "m")}
    video={item.storage ? archiveStorageUrl(item.storage.source.path) : NULL}
/>
    
<div class="w-full" style="">
    <Video {item} />
</div>

<h1 class="mt-4 grow text-3xl font-semibold">{item.name}</h1>

<div class="mt-2 flex flex-wrap gap-2 items-center">
    {#if item.people}
        <PeopleBar people={item.people} />
    {/if}
    <EventLink event={item.event} />
    <div>
        by <StructureLink id={item.target} />
    </div>
    {#if item.duration}<div class="opacity-50 text-sm">
            {Math.round(item.duration / 60)}m
        </div>{/if}
</div>

<div class="lg:flex gap-8">
    <div class="lg:w-4/6 markdown">{@html marked(item.desc, { renderer })}</div>
    <div class="lg:w-2/6 mt-10 lg:mt-4">
        <div class="grid grid-cols-1 gap-2">
            {#if item.storage && item.storage.source}
                <div>
                    <a
                        href={archiveStorageUrl(item.storage.source.path)}
                        download="{item.slug}.mp4"
                        class="text-lg"
                        ><CloudArrowDown class="inline-block" />
                        {$t`Download video`}</a
                    >
                    ({filesize(item.storage.source.size)})
                </div>
            {/if}
            {#if item.videoId}
                <div>
                    <a
                        href={`https://youtube.com/watch?v=${item.videoId}`}
                        class="text-lg"
                        target="_blank"
                        ><PlayCircle class="inline-block" />
                        {$t`Play on Youtube`}</a
                    >
                </div>
            {/if}
            {#if item.odyseeId}
                <div>
                    <a
                        href={`https://odysee.com/${item.odyseeId}`}
                        class="text-lg"
                        target="_blank"
                        ><PlayCircle class="inline-block" />
                        {$t`Play on Odysee`}</a
                    >
                </div>
            {/if}
        </div>

        <div class="mt-6 grid grid-cols-1 gap-1">
            {#if item.storage && item.storage.source}
                <div>
                    {$t`ID`}: <a href="/v/{item.id}">{item.id}</a> (<a
                        href={archiveStorageUrl(item.storage.path)}
                        >{$t`storage`}</a
                    >)
                </div>

                <div>{$t`Size`}: {filesize(item.storage.source.size)}</div>
                <div>
                    {$t`Hash`}:
                    <span title={item.storage.source.hash}
                        >{item.storage.source.hash.substring(0, 8) +
                            ".." +
                            item.storage.source.hash.substring(
                                item.storage.source.hash.length - 8,
                            )}</span
                    >
                </div>
                <div>{$t`Resolution`}: {item.storage.source.resolution}</div>
                <div>
                    {$t`Video`}: {item.storage.source.videoCodec}
                    ({filesize(item.storage.source.videoBitrate)}
                    {$t`bitrate`})
                </div>
                <div>
                    {$t`Audio`}: {item.storage.source.audioCodec}
                    ({filesize(item.storage.source.audioBitrate)}
                    {$t`bitrate`})
                </div>
            {:else}
                <div>{$t`ID`}: <a href="/v/{item.id}" class="break-words">{item.id}</a></div>
            {/if}
        </div>
    </div>
</div>

<!--div class="mt-4 whitespace-pre-wrap">{item.desc}</div-->
