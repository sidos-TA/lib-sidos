import { Image } from "antd";
import { fallbackImage } from "../constants";
import ImageStyled from "../styled/ImageStyled";

const ImageSidos = ({ src, ...props }) => {
  return (
    <ImageStyled>
      <Image
        style={{
          borderRadius: "100%",
          border: `1px solid ${src === fallbackImage ? "#4a4a4a" : "#1677ff"} `,
          padding: "20px",
        }}
        width={250}
        src={src}
        fallback={fallbackImage}
        {...props}
      />
    </ImageStyled>
  );
};

export default ImageSidos;
