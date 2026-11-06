import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"
import Alert from "react-bootstrap/Alert"
import { getTeam, getNextEvents, getLastEvents } from "../api/sportsdb"
import MatchCard from "../components/MatchCard"
import Button from "react-bootstrap/Button"
import { useFavorites } from "../hooks/useFavorites"
import TeamDescription from "../components/TeamDescription"

function Team() {
    const { id } = useParams()
    const [team, setTeam] = useState(null)
    const [nextMatches, setNextMatches] = useState([])
    const [lastMatches, setLastMatches] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const { isFavorite, toggleFavorite } = useFavorites()

    useEffect(() => {
        async function loadTeam(){
            setIsLoading(true)
            setError(null)

            try{
                const[teamData, next, last] = await Promise.all([
                    getTeam(id),
                    getNextEvents(id),
                    getLastEvents(id)
                ])
                setTeam(teamData)
                setNextMatches(next)
                setLastMatches(last)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadTeam()
    }, [id])

    if (isLoading) {
    return (
        <div className="text-center my-5">
            <Spinner animation="border" />
            <p>Loading team...</p>
        </div>
    )
}

if (error) {
    return (
        <Alert variant="danger">
            Something went wrong: {error}
            <Link to="/"> Back to home</Link>
        </Alert>
    )
}

    if(!team){
        return(
            <Alert variant="danger">
                Team not found. <Link to="/">Back to home</Link>
            </Alert>
        )
    }
    return(
        <>
            <Link to ="/">&larr; Back to home</Link>
            <div className="d-flex align-items-center gap-4 my-4">
                {team.strBadge && (
                    <img
                        src={team.strBadge}
                        alt={`${team.strTeam} badge`}
                        style={{ width: "100px", objectFit: "contain" }}
                    />
                )}
                <div>
                    <h1 className="mb-1">{team.strTeam}</h1>
                    <p className="mb-0">
                        {team.strLeague} &middot; {team.strCountry}
                    </p>
                    {team.strStadium && <p className="mb-0">Stadium: {team.strStadium}</p>}
                    <Button
                    className="mt-2"
                            variant={isFavorite(team.idTeam) ? "outline-danger" : "primary"}
                                onClick={() => toggleFavorite(team)}
>
                            {isFavorite(team.idTeam) ? "Remove from My Teams" : "Add to My Teams"}
                        </Button>
                    </div>
                </div>
                {team.strDescriptionEN && (
                    <TeamDescription key={team.idTeam} text={team.strDescriptionEN} />
                    )}
                <Row>
                    <Col md={6}>
                        <h2 className="h4 mb-3">Next Matches</h2>
                        {nextMatches.length === 0 ? (
                            <Alert variant="info">No upcoming matches found.</Alert>
                        ) : (
                            nextMatches.map((match) => (
                                <MatchCard key={match.idEvent} match={match} isUpcoming />

                            ))
                        )}
                    </Col>
                    <Col md={6}>
                        <h2 className="h4 mb-3">Recent results</h2>
                        {lastMatches.length === 0 ? (
                            <Alert variant="info">No recent results found.</Alert>
                        ) : (
                            lastMatches.map((match) => (
                                <MatchCard key={match.idEvent} match={match}  />
                            ))
                        )}
                    </Col>
                </Row>
        </>
    )
}
export default Team