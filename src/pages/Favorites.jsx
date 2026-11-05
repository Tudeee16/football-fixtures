import { Link } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import TeamCard from "../components/TeamCard"
import { useFavorites } from "../hooks/useFavorites"

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <>
      <h1 className="mb-4">My Teams</h1>

      {favorites.length === 0 ? (
        <Alert variant="info">
          You haven't saved any teams yet. <Link to="/">Search for a team</Link>{" "}
          and press "Add to My Teams".
        </Alert>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {favorites.map((team) => (
            <Col key={team.idTeam}>
              <TeamCard team={team} />
              <Button
                variant="outline-danger"
                size="sm"
                className="mt-2 w-100"
                onClick={() => toggleFavorite(team)}
              >
                Remove
              </Button>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Favorites