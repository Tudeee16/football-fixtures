import { useState } from "react"
import Button from "react-bootstrap/Button"

function truncateToSentence(text, max = 500) {
  if (text.length <= max) return text

  const cut = text.slice(0, max)
  const match = cut.match(/^[\s\S]*[.!?](?=\s|$)/)

  if (match && match[0].length > 150) {
    return match[0]
  }
  return cut.replace(/\s+\S*$/, "") + "…"
}

function TeamDescription({ text, max = 500 }) {
  const [expanded, setExpanded] = useState(false)

  const short = truncateToSentence(text, max)
  const isTruncated = short.length < text.length

  return (
    <div className="mb-4">
      <p className="mb-1" style={{ whiteSpace: "pre-line" }}>
        {expanded ? text : short}
      </p>
      {isTruncated && (
        <Button
          variant="link"
          className="p-0"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read more"}
        </Button>
      )}
    </div>
  )
}

export default TeamDescription