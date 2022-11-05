import { Tooltip, Row, Col } from "antd";
import type { TraductionItem } from "../Edit/EditTable";

const Translate = (props: TraductionItem) => {
  const defaultTraduction = props.default;

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Tooltip title={`Traduction propose by GOOGLE for ${defaultTraduction}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://img.icons8.com/color/48/000000/google-logo.png"
          alt="logo google"
          width={20}
          height={20}
        />
      </Tooltip>

      <Tooltip title={`Traduction propose by DEEPL for ${defaultTraduction}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          dl-test="dl_header_menu_v2__logo__img"
          src="https://static.deepl.com/img/logo/DeepL_Logo_darkBlue_v2.svg"
          alt="DeepL logo"
          width={20}
          height={20}
        />
      </Tooltip>
    </div>
  );
};

export default Translate;
