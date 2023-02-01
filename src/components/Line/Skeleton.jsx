import ContentLoader from "react-content-loader"

export const LineSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={290}
    height={27}
    viewBox="0 0 290 27"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="10" cy="10" r="10" /> 
    <rect x="43" y="0" rx="0" ry="0" width="100%" height="27" />
  </ContentLoader>
);

