import "./title-subtitle.scss";

export interface ITitleSubtitleDTO {
  title: string;
  subtitle: string;
  id: string;
}

/**
 * Functional component that renders a title with a subtitle.
 *
 * @param {object} props - The props for the component.
 * @param {string} props.title - The main title.
 * @param {string} props.subtitle - The subtitle.
 * @returns {JSX.Element} The rendered title with subtitle component.
 */
export const TitleSubtitleUI = (props: ITitleSubtitleDTO): JSX.Element => {
  const { title, subtitle, id } = props;

  return (
    <div className="container__title-subtitle" key={id}>
      <strong className="container__title-subtitle__title">{title}</strong>
      <div className="container__title-subtitle__subtitle">{subtitle}</div>
    </div>
  );
};
