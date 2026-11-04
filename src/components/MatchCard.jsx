import Card from "react-bootstrap/Card"
import { format, formatDistanceToNow } from "date-fns"

function MatchCard({ match, isUpcoming }) {
  const kickoff = match.strTimestamp
    ? new Date(match.strTimestamp)
    : null
  const hasScore = match.intHomeScore !== null && match.intAwayScore !== null

  return (
    <Card className="mb-3">
      <Card.Body>
        <small className="text-body-secondary">{match.strLeague}</small>
        <div className="d-flex justify-content-between align-items-center my-2">
          <span>{match.strHomeTeam}</span>
          <strong>
            {hasScore ? `${match.intHomeScore} - ${match.intAwayScore}` : "vs"}
          </strong>
          <span>{match.strAwayTeam}</span>
        </div>
    {kickoff && !isNaN(kickoff.getTime()) && (
    <small>
        {format(kickoff, "EEE d MMM yyyy, HH:mm")}
        {isUpcoming &&
            ` (${formatDistanceToNow(kickoff, { addSuffix: true })})`}
    </small>
    )}
        {match.strVenue && (
          <div>
            <small className="text-body-secondary">{match.strVenue}</small>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default MatchCard