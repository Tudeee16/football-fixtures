import { useState } from "react"

const STORAGE_KEY = "favorite-teams"

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites)

  function saveFavorites(updated) {
    setFavorites(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  function isFavorite(id) {
    return favorites.some((team) => team.idTeam === id)
  }

  function toggleFavorite(team) {
    if (isFavorite(team.idTeam)) {
      saveFavorites(favorites.filter((t) => t.idTeam !== team.idTeam))
    } else {
      saveFavorites([
        ...favorites,
        {
          idTeam: team.idTeam,
          strTeam: team.strTeam,
          strBadge: team.strBadge,
          strLeague: team.strLeague,
          strCountry: team.strCountry,
        },
      ])
    }
  }

  return { favorites, isFavorite, toggleFavorite }
}