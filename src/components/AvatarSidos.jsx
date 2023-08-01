import { Space, Typography } from "antd";
import { fallbackImage } from "../constants";
import BadgeSidos from "./BadgeSidos";
import ImageSidos from "./ImageSidos";

const AvatarSidos = ({
  badgeText,
  colorBadge = "#52c41a",
  mainInfo,
  subInfo,
  src,
}) => {
  return (
    <Space direction="vertical" size="small" style={{ textAlign: "center" }}>
      <BadgeSidos count={badgeText} color={colorBadge} offset={[-145, 270]}>
        <ImageSidos
          style={{ borderRadius: 500 }}
          width={280}
          // preview={false}
          src={src}
          // src={fallbackImage}
        />
      </BadgeSidos>
      <Typography.Title level={5}>{mainInfo}</Typography.Title>
      <Typography.Text>{subInfo}</Typography.Text>
    </Space>
  );
};

export default AvatarSidos;
