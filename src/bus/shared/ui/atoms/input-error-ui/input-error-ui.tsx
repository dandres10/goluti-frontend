import "./input-error.scss";

export interface IInputErrorUI {
  id: string;
  error: string;
}
/**
 * Functional component that renders an error message for an input field.
 *
 * @param {object} props - The props for the component.
 * @param {string} props.id - The identifier of the input field associated with the error message.
 * @param {string} props.error - The error message to be displayed.
 * @returns {JSX.Element} The rendered error message.
 */
export const InputErrorUI = (props: IInputErrorUI): JSX.Element => {
  const { id, error } = props;

  return (
    <div key={id} className="error-core">
      {error}
    </div>
  );
};
