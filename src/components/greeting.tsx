import "./style/greeting.css"

interface Props {
  active: boolean;
  value: string;
  hidden?: boolean;
  doubleClicked: () => void;
  valueChanged: (value: string) => void;
  focusChanged: () => void;
}
export function Greeting({
  active,
  value,
  hidden = false,
  doubleClicked,
  valueChanged,
  focusChanged,
}: Props) {
  return (
    <div hidden={hidden}>
      {active ? (
        <div>
          <label>Hello</label>
          <input
            className="editable-name"
            type="text"
            onChange={(e) => valueChanged(e.target.value)}
            onBlur={focusChanged}
            autoFocus
          />
        </div>
      ) : (
        <label onDoubleClick={doubleClicked}>Hello {value}</label>
      )}
    </div>
  );
}
