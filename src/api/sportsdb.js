const BASE_URL = "https://www.thesportsdb.com/api/v1/json/123"

export async function searchTeams(name){
    const response = await fetch(
        `${BASE_URL}/searchteams.php?t=${encodeURIComponent(name)}`
    )

    if(!response.ok){
        throw new Error(`request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data.teams ?? []
}
export async function getTeam(id){
    const response = await fetch(
        `${BASE_URL}/lookupteam.php?id=${id}`
    )
    if(!response.ok){
        throw new Error(`request failed with status ${response.status}`)
    }
    const data = await response.json()
    return data.teams ? data.teams[0] : null
}

export async function getNextEvents(id){
    const response = await fetch(
        `${BASE_URL}/eventsnext.php?id=${id}`
    )
    if(!response.ok){
        throw new Error(`request failed with status ${response.status}`)
    }
    const data = await response.json()
    return data.events ?? []
}
export async function getLastEvents(id){
    const response = await fetch(
        `${BASE_URL}/eventslast.php?id=${id}`
    )
    if(!response.ok){
        throw new Error(`request failed with status ${response.status}`)
    }
    const data = await response.json()
    return data.results ?? []
}