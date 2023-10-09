import DOMPurify from "dompurify";

type DescriptionProps = {
  imageUrl: string;
  description: string;
};

const Description: React.FC<DescriptionProps> = ({ imageUrl, description }) => {
  return (
    <>
      <img src={imageUrl} style={{ maxWidth: "66%" }} />
      <div
        style={{ margin: "20px 0 20px 0" }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
      />
    </>
  );
};

export default Description;
