import { Space, Typography } from "antd";
import BadgeSidos from "./BadgeSidos";
import ImageSidos from "./ImageSidos";

const AvatarSidos = ({
  badgeText,
  colorBadge = "#52c41a",
  mainInfo,
  subInfo,
  src,
  body,
}) => {
  return (
    <Space direction="vertical" size="small" style={{ textAlign: "center" }}>
      <BadgeSidos count={badgeText} color={colorBadge} offset={[-145, 270]}>
        <ImageSidos
          style={{ borderRadius: 500 }}
          width={280}
          height={280}
          src={src}
        />
      </BadgeSidos>
      <Typography.Title level={5}>{mainInfo}</Typography.Title>
      <Typography.Text>{subInfo}</Typography.Text>
      <Typography.Text
        strong
        ellipsis={{ tooltip: body }}
        style={{ width: 200 }}
      >
        {body}
      </Typography.Text>
    </Space>
  );
};

export default AvatarSidos;
