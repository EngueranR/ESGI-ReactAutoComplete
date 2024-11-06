import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import React from "react";

const ProductTemplate = ({ suggestion, index, onClick }) => {
  return (
    <li key={index} onClick={() => onClick(suggestion)}>
      {suggestion.icon && <FontAwesomeIcon icon={icon[suggestion.icon]} />}
      {typeof suggestion === "string"
        ? suggestion
        : suggestion.label || suggestion.titre}
      {suggestion.price && (
        <div>
          <FontAwesomeIcon icon={icon["faDollar"]} />
          {suggestion.price}
        </div>
      )}
    </li>
  );
};

export default ProductTemplate;
