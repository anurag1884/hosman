export let pendingCsrfFetch = null;
export function readXsrfCookie() {
    const raw = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];
    return raw ? decodeURIComponent(raw) : "";
}
export async function getCsrfToken() {
    const existing = readXsrfCookie();
    if (existing)
        return existing;
    if (!pendingCsrfFetch) {
        pendingCsrfFetch = fetch("/csrf", { credentials: "same-origin" })
            .then((res) => {
            if (!res.ok) {
                throw new Error(`Failed to fetch CSRF token: ${res.status}`);
            }
            return readXsrfCookie();
        })
            .finally(() => {
            pendingCsrfFetch = null;
        });
    }
    return pendingCsrfFetch;
}
export async function sendRequest(url, options = {}) {
    const method = (options.method ?? "GET").toUpperCase();
    const headers = new Headers(options.headers ?? {});
    if (!["GET", "HEAD", "OPTIONS", "TRACE"].includes(method)) {
        const token = await getCsrfToken();
        if (token && !headers.has("X-XSRF-TOKEN")) {
            headers.set("X-XSRF-TOKEN", token);
        }
    }
    return fetch(url, {
        credentials: "same-origin",
        ...options,
        headers,
    });
}
export const sortState = {};
export function escapeHtml(str) {
    return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
export function compareValues(valA, valB, type) {
    if (type === "number") {
        const numA = valA == null || valA === ""
            ? Number.NEGATIVE_INFINITY
            : Number(valA);
        const numB = valB == null || valB === ""
            ? Number.NEGATIVE_INFINITY
            : Number(valB);
        return numA - numB;
    }
    return String(valA ?? "").localeCompare(String(valB ?? ""), undefined, { sensitivity: "base" });
}
export function isAlreadySorted(rows, key, type, dir) {
    for (let i = 1; i < rows.length; i++) {
        const cmp = compareValues(rows[i - 1][key], rows[i][key], type);
        if ((dir === "asc" && cmp > 0) || (dir === "desc" && cmp < 0)) {
            return false;
        }
    }
    return true;
}
export function attachTableSorting(tableId, getDataFn, renderRowFn) {
    const table = document.getElementById(tableId);
    if (!table)
        return;
    const headers = table.querySelectorAll("th.sortable");
    headers.forEach((th) => {
        th.addEventListener("click", () => {
            const key = th.dataset.sortKey;
            if (!key)
                return;
            const type = th.dataset.sortType === "number" ? "number" : "text";
            const rows = getDataFn();
            const current = sortState[tableId];
            let direction;
            if (current && current.key === key) {
                direction = current.dir === "asc" ? "desc" : "asc";
            }
            else {
                direction = rows.length > 1 && isAlreadySorted(rows, key, type, "asc") ? "desc" : "asc";
            }
            sortState[tableId] = { key, type, dir: direction };
            headers.forEach((h) => {
                h.classList.remove("sorted-asc", "sorted-desc");
                const icon = h.querySelector(".sort-icon");
                if (icon)
                    icon.className = "fa-solid sort-icon";
            });
            th.classList.add(direction === "asc" ? "sorted-asc" : "sorted-desc");
            const activeIcon = th.querySelector(".sort-icon");
            if (activeIcon) {
                activeIcon.className = `fa-solid ${direction === "asc" ? "fa-arrow-up" : "fa-arrow-down"} sort-icon`;
            }
            renderSorted(tableId, rows, renderRowFn);
        });
    });
}
export function renderSorted(tableId, rows, renderRowFn) {
    const state = sortState[tableId];
    const sorted = [...rows];
    if (state) {
        sorted.sort((a, b) => {
            const cmp = compareValues(String(a[state.key] ?? ""), String(b[state.key] ?? ""), state.type);
            return state.dir === "asc" ? cmp : -cmp;
        });
    }
    renderRowFn(sorted);
}
export function normalizeBloodGroup(rawValue) {
    switch (rawValue.trim().toUpperCase()) {
        case "AB+":
            return "AB_POS";
        case "AB-":
            return "AB_NEG";
        case "A+":
            return "A_POS";
        case "A-":
            return "A_NEG";
        case "B+":
            return "B_POS";
        case "B-":
            return "B_NEG";
        case "O+":
            return "O_POS";
        case "O-":
            return "O_NEG";
        default:
            return rawValue;
    }
}
export function normalizeGender(rawValue) {
    const value = rawValue.trim().toUpperCase();
    switch (value) {
        case "MALE":
        case "FEMALE":
        case "OTHER":
            return value;
        default:
            return rawValue;
    }
}
export function normalizeEmergencyContactRelation(rawValue) {
    const value = rawValue.trim().toUpperCase();
    switch (value) {
        case "OTHER":
        case "SPOUSE":
        case "PARENT":
        case "GUARDIAN":
        case "SIBLING":
        case "CHILD":
        case "FRIEND":
            return value;
        default:
            return rawValue;
    }
}
