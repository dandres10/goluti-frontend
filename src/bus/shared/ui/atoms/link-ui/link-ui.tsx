export interface ILinkUI {
  id: string;
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Functional component that renders a link with specified properties.
 *
 * @param {object} props - The props for the component.
 * @param {number} props.id - The identifier of the link.
 * @param {string} props.text - The text content of the link.
 * @param {string} props.href - The URL to which the link navigates.
 * @param {string} [props.color] - Optional color of the link.
 * @param {string} [props.fontSize] - Optional font size of the link.
 * @param {string} [props.className] - Optional class name for styling purposes.
 * @returns {JSX.Element} The rendered link.
 * @author Marlon Andrés León León
 */
export const LinkUI = (props: ILinkUI): JSX.Element => {
  const { id, text, className, onClick } = props;

  return (
    <div className={`${className} link-core`} onClick={onClick}>
      <a key={id}>
        <span
          style={{
            cursor: "pointer",
          }}
        >
          {text}
        </span>
      </a>
    </div>
  );
};
