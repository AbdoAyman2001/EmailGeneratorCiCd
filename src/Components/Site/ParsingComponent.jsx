import parse from "html-react-parser";
export const ParsingComponent = ({ htmlContent }) => {
  return <div>{parse(htmlContent)}</div>
};
