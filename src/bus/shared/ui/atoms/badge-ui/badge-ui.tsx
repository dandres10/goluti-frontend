import "./badge.scss";
import { configAnt } from "@/bus/shared/lib/ant";

import { Badge, BadgeProps, ConfigProvider, Space } from "antd";

export interface IBadgeUI {
  id: string;
  status: BadgeProps["status"];
  text: string;
}

/**
 * Functional component that displays a badge with specified text and status.
 *
 * @param {object} props - The props for the component.
 * @param {string} props.id - The unique identifier of the badge.
 * @param {string} props.status - The status of the badge (can be "success", "error", "warning", or "default").
 * @param {string} props.text - The text displayed in the badge.
 * @returns {JSX.Element} The rendered badge.
 */
export const BadgeUI = ({ id, status, text }: IBadgeUI): JSX.Element => {
  return (
    <ConfigProvider theme={configAnt}>
      <div className="badge-core">
        <Badge key={id} status={status} />
        <div className="badge-text">{text}</div>
      </div>
    </ConfigProvider>
  );
};
