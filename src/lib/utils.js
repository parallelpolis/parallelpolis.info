import { addDays } from "date-fns"
export { filesize } from "filesize"

export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function shortText(str, maxSize = 400) {
    if (str.length > maxSize) {
        return str.substr(0, maxSize) + "..";
    }
    return str;
}

export function imgHashUrl(type, hash, size = "s") {
    return `https://atlas.pp0.co/img/${type}/${size}/${hash}.webp`
}

export function imgSourceUrl(type, path) {
    return `https://atlas.pp0.co/img/${type}/${path}`
}

export function archiveStorageUrl(path) {
    return `https://archive.pp0.co${path}`
}

export function eventToIntervalString(e) {
    const start = new Date(e.date)
    const end = addDays(start, (e.days - 1) || 0)
    if (!e.days || e.days === 1) {
        return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${start.getFullYear()}`
    }
    if (start.getMonth() === end.getMonth()) {
        return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}-${end.getDate()}, ${start.getFullYear()}`
    }
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${start.getFullYear()}`
}

const langMatrix = {
    cs: '🇨🇿',
    en: '🇬🇧',
}
export function langToFlag(lang) {
    if (langMatrix[lang]) {
        return langMatrix[lang]
    }
    return lang
}