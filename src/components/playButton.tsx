import { Button } from "reactstrap";

interface Props {
  disabled?: boolean;
  color?: string;
  clicked: React.MouseEventHandler<HTMLButtonElement>;

}
export function PlayButton({ disabled = false,color = "secondary", clicked }: Props) : JSX.Element {
  return (
    <Button color={color} className="play-button" onClick={clicked} disabled= {disabled}>
      PLAY!
    </Button>
  );
}
