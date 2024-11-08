import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "./Autocomplete.css";
export default function Autocomplete({
  data = [],
  onSelect,
  searchFunction,
  isMultiSelect = false,
  template: TemplateComponent,
  useSuggestion = false,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const results = data.filter((item) =>
      searchFunction
        ? searchFunction(item, text)
        : typeof item === "string" &&
          item.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(results);
    setIsDropdownVisible(text.length > 0 && results.length > 0);
  }, [text, data, searchFunction]);

  const handleSuggestionClick = (suggestion) => {
    if (isMultiSelect) {
      if (!selectedItems.some((item) => item.label === suggestion.label)) {
        const updatedSelectedItems = [...selectedItems, suggestion];
        setSelectedItems(updatedSelectedItems);
        if (onSelect) {
          onSelect(updatedSelectedItems);
        }
      }
      setText("");
    } else {
      setText(typeof suggestion === "string" ? suggestion : suggestion.label);
      setIsDropdownVisible(false);
      if (onSelect) {
        onSelect(suggestion);
      }
    }
  };

  const suggestion = suggestions.length > 0 ? suggestions[0].label : "";

  return (
    <div className="autocomplete">
      <div className="selected-items">
        {isMultiSelect &&
          selectedItems.map((item, index) => (
            <div key={index} className="selected-item">
              {item.label}
            </div>
          ))}
        {useSuggestion ? <div className="suggestion">{suggestion}</div> : null}

        <input
          type="text"
          onChange={(e) => setText(e.target.value || "")}
          value={text}
        />
      </div>
      <FontAwesomeIcon icon={icon["faSearch"]} className="icon" />
      {isDropdownVisible && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) =>
            TemplateComponent ? (
              <TemplateComponent
                key={index}
                suggestion={suggestion}
                index={index}
                onClick={handleSuggestionClick}
              />
            ) : (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.icon && (
                  <FontAwesomeIcon icon={icon[suggestion.icon]} />
                )}
                {typeof suggestion === "string"
                  ? suggestion
                  : suggestion.label || suggestion}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
