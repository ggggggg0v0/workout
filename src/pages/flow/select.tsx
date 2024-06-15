import React, { useState } from "react";
import {
  Input,
  List,
  ListItem,
  Button,
  Text,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import "./select.scss";

const AutoCompleteInput = () => {
  const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  console.log(99);
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setSelectedOption("");
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchText(option);
    setIsInputFocused(false);
  };

  const addNewOption = () => {
    if (searchText && !options.includes(searchText)) {
      setOptions([...options, searchText]);
      setSelectedOption(searchText);
      setSearchText(searchText);
      setIsInputFocused(false);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const removeOption = () => {
    setSearchText("");
  };

  const handleInputBlur = () => {
    // setIsInputFocused(false);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  console.log(searchText, !filteredOptions.length, isInputFocused);

  return (
    <div
      style={{
        position: "relative",
        width: "200px",
        padding: "5px",
      }}
    >
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Type to search or add new option"
        width="100%"
        style={{ outline: "none" }}
      />
      {isInputFocused && (
        <div
          style={{
            backgroundColor: "white",
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1,
            width: "100%",
            padding: "5px",
          }}
        >
          <List>
            {filteredOptions.map((option, index) => (
              <ListItem
                py={2} // padding-y
                cursor="pointer"
                _hover={{ background: "gray.100" }}
                key={index}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </ListItem>
            ))}
          </List>
        </div>
      )}
      {searchText && !filteredOptions.length && isInputFocused && (
        <div
          style={{
            width: "100%",
            backgroundColor: "white",
            position: "absolute",
            padding: "5px",
          }}
        >
          <Text p={2} style={{ fontSize: "12px" }}>
            Select an option or create one
          </Text>
          <Text
            p={2}
            style={{ fontSize: "14px", cursor: "pointer" }}
            onClick={addNewOption}
          >
            Create "{searchText}"
          </Text>
        </div>
      )}
      {searchText && (
        <div className="remove" onClick={removeOption}>
          X
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
