import "./Loader.scss";

interface LoaderProps {
  text: string;
}

export const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="spinner">
      <div className="loadingio-spinner-ellipsis-57ekl48z0o3">
        <div className="ldio-ogtm8crjy8g">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
      <span className="font-heading text-center font-bold">{text}</span>
    </div>
  );
};
