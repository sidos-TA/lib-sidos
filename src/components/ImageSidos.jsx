import { Image } from "antd";
import { fallbackImage } from "../constants";
import ImageStyled from "../styled/ImageStyled";

const ImageSidos = ({ src, width = 250, preview, ...props }) => {
  return (
    <ImageStyled>
      <Image
        style={{
          borderRadius: "100%",
          border: `1px solid ${src ? "#1677ff" : "#4a4a4a"} `,
          padding: "20px",
        }}
        width={width}
        src={src}
        preview={preview}
        fallback={fallbackImage}
        {...props}
      />
    </ImageStyled>
  );
};

export default ImageSidos;
