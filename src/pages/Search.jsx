import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import {searchTeams} from '../api/sportsdb'
import TeamCard from '../components/TeamCard'

function Search(){
    const [query, setQuery] = useState('')
    const [teams, setTeams] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [hasSearched, setHasSearched] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        const name = query.trim()
        if(!name){
            return
        }

        setIsLoading(true)
        setError(null)

        try{
            const results = await searchTeams(name)
            setTeams(results)
        }
      catch (err) {
    if (err.message.includes("429")) {
        setError("Too many requests. Please try again later.");
    } else if (err.message === "Failed to fetch") {
        setError("Could not connect to the sports database. Please check your internet connection or try again later.");
    } else {
        setError(err.message);
    }

    setTeams([]);
}
        finally{
            setIsLoading(false)
            setHasSearched(true)
        }
    }

        return(
            <>
                <h1 className="mb-4">Football Fixtures</h1>
                <Form onSubmit={handleSubmit} className="d-flex gap-2 mb-4">
                    <Form.Label htmlFor="team-search" className="visually-hidden">
                    Team name
                    </Form.Label>
                    <Form.Control
                        id="team-search"
                        type="text"
                        placeholder="Enter a team name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
            />
                    <Button type="submit" disabled={isLoading}>
                        Search
                    </Button>
                </Form>
                {isLoading && (
                    <div className="text-center my-5">
                        <Spinner animation="border" role="status" >
                        </Spinner>
                    </div>
                )}
                {error && (
                    <Alert variant= "danger">
                        {error}.

                    </Alert>
                )}
                {!isLoading && !error && hasSearched && teams.length === 0 && (
                    <Alert variant="info">
                        No teams found. Please try a different search term.
                    </Alert>
                )}
                <Row xs={1} sm={2} md={3} className="g-4">
                    {teams.map((team) => (
                        <Col key={team.idTeam}>
                            <TeamCard team={team} />
                        </Col>
                    ))}
                </Row>
                </>

                    
        )
    }

export default Search