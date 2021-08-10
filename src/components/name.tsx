import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

interface NameProps {
  value: string;
  hidden ?: boolean;

  nameChanged: React.ChangeEventHandler<HTMLInputElement>;
}
export function Name({ value,hidden = false, nameChanged }: NameProps): JSX.Element {
  return (
    <div hidden= {hidden}>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Name: </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Enter Your Name"
          value={value}
          onChange={nameChanged}
        />
      </InputGroup>
    </div>
  );
}
