import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom"

function TeamCard({team}) {
    return (
        <Card className ="h-100 text-center">
            <Card.Body>
                {team.strBadge && (
                    <img
                        src={team.strBadge}
                        alt={`${team.strTeam} badge`}
                        style={{ width: '80px',  objectFit: 'contain' }}
                        className="mb-3"
                    />
                )}
                <Card.Title>{team.strTeam}</Card.Title>
                <Card.Text>
                    {team.strLeague}
                    <br />
                    {team.strCountry}
                    </Card.Text>
                    <Link to ={`/team/${team.idTeam}`} className="btn btn-primary">
                        View team
                        </Link>
            </Card.Body>
        </Card>
    )
}
export default TeamCard