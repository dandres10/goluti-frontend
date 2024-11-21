import "./text.scss";

export interface ITextUI {
  id?: string;
  text?: string;
  textAlign?: any;
  fontSize?: string;
  className?: string;
}

/**
 * Functional component that renders a text area input field.
 *
 * @param {object} props - The props for the component.
 * @param {string} [props.id] - The unique identifier of the text area.
 * @param {number} [props.text] - The text.
 * @param {number} [props.textAlign] - The text textAlign.
 * @returns {JSX.Element} The rendered text area component.
 */
export const TextUI = (props: ITextUI): JSX.Element => {
  const { id, text, textAlign, fontSize, className } = props;

  return (
    <div
      key={id}
      style={{
        textAlign: textAlign,
        fontSize: fontSize,
      }}
      className={`text-core ${className}`}
    >
      {text}
    </div>
  );
};
