const isValidLinkPenelitian = ({ source_link }) => {
  if (source_link) {
    const url = new URL(source_link);

    return (
      url?.hostname.includes("sinta.kemdikbud") ||
      url?.hostname.includes("scholar.google")
    );
  }
};
export default isValidLinkPenelitian;
