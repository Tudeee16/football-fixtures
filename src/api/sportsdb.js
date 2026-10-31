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