interface InfoProps {
    timeLeft: number;
    score: number;
}
export function Info({score = 0,timeLeft}: InfoProps) {
    return (
        <div>
        <span style={{ float: "left" }}>
          <strong>Score: [{score}]</strong>
        </span>
        <span style={{ float: "right" }}>
          <strong>Time Left: [{timeLeft}]</strong>
        </span>
      </div>
    )
}
