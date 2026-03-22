import { Oval } from "react-loader-spinner";

const Loading = ({ text = "載入中..." }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
      <Oval
        height={60}
        width={60}
        color="#748be7"
        secondaryColor="#0c4169"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
      <p className="mt-2">{text}</p>
    </div>
  );
};

export default Loading;
