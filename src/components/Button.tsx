interface ButtonProps {
    onClick: () => void;
    label: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick}>
      {props.label}
    </button>
  )
}

export default Button
