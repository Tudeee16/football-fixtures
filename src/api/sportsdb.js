
const BASE_URL = "https://www.thesportsdb.com/api/v1/json/123";

// Cache and duplicate request prevention
const cache = new Map();
const pendingRequests = new Map();

// Cache durations
const CACHE_DURATION = {
    search: 10 * 60 * 1000, // 10 minutes
    team: 24 * 60 * 60 * 1000, // 24 hours
    events: 15 * 60 * 1000 // 15 minutes
};

// Reusable fetching function
async function fetchCached(url, duration) {
    // Check cache
    const cached = cache.get(url);

    if (cached && Date.now() < cached.expiry) {
        console.log("Using cached data:", url);
        return cached.data;
    }

    // Check for an existing request
    if (pendingRequests.has(url)) {
        return pendingRequests.get(url);
    }

    const request = (async () => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `request failed with status ${response.status}`
            );
        }

        const data = await response.json();

        // Save successful response
        cache.set(url, {
            data,
            expiry: Date.now() + duration
        });

        return data;
    })();

    pendingRequests.set(url, request);

    try {
        return await request;
    } finally {
        pendingRequests.delete(url);
    }
}

// Search teams
export async function searchTeams(name) {
    const data = await fetchCached(
        `${BASE_URL}/searchteams.php?t=${encodeURIComponent(name)}`,
        CACHE_DURATION.search
    );

    return data.teams ?? [];
}

// Get team information
export async function getTeam(id) {
    const data = await fetchCached(
        `${BASE_URL}/lookupteam.php?id=${id}`,
        CACHE_DURATION.team
    );

    return data.teams ? data.teams[0] : null;
}

// Get upcoming matches
export async function getNextEvents(id) {
    const data = await fetchCached(
        `${BASE_URL}/eventsnext.php?id=${id}`,
        CACHE_DURATION.events
    );

    return data.events ?? [];
}

// Get previous matches
export async function getLastEvents(id) {
    const data = await fetchCached(
        `${BASE_URL}/eventslast.php?id=${id}`,
        CACHE_DURATION.events
    );

    return data.results ?? [];
}
