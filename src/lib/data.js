
import genYtOld from '$lib/data/gen/yt-old.json';
import genYtNew from '$lib/data/gen/yt-new.json';
import genYtDtpEthPrague22 from '$lib/data/gen/yt-dtp-ethprague22.json';
import genYtDtpEthPrague23 from '$lib/data/gen/yt-dtp-ethprague23.json';
import peopleSrc from '$lib/data/people.yaml';
import projectsSrc from '$lib/data/projects.yaml';
import configSrc from '$lib/data/config.yaml';
import friendsSrc from "$lib/data/friends.yaml";

export const pkg = __PACKAGE__;
export const build = __BUILD__;

export const config = configSrc;

export const projects = projectsSrc;
export const friends = friendsSrc;

export const events = projectsSrc.map(p => p.events?.map(e => {
    e.project = p.id;
    return e;
})).filter(e => e).flat()

export const archive = [
    genYtDtpEthPrague22,
    genYtDtpEthPrague23,
    genYtNew,
    genYtOld
].flat().sort((x, y) =>
    y.publishedAt > x.publishedAt ? 1 : -1,
);

export const people = peopleSrc.map(p => {
    p.merit = Number((p.roles?.length || 0) * 5) +
        (events.filter(e => e.speakers?.includes(p.id)).length * 1) +
        (archive.filter(i => i.people?.includes(p.id)).length * 2)
    return p
}).sort((x, y) => y.merit > x.merit ? 1 : -1);