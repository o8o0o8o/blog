import React from "react";
import Gist from "react-gist";

const GhGist = ({ id, file }) => {
  return (
    <div>
      <Gist id={id} file={file} />
    </div>
  );
};

export default GhGist;
