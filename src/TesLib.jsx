import { useState } from "react";
import BtnSidos from "./components/BtnSidos";

function TesLib() {
  const [count, setCount] = useState(0);

  return (
    <BtnSidos
      props={{
        type: "primary",
      }}
      propsMobile={{
        color: "primary",
      }}
      onClick={() => setCount(count + 1)}
    >
      Count {count}
    </BtnSidos>
  );
}

export default TesLib;
