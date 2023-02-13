import React, { useEffect, useRef, useState } from "react";

import { XSquare, ChevronDown } from "react-bootstrap-icons";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const Dropdown = ({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onChange,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
  const handleInputClick = (e) => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div
          className="dropdown-tags"
          css={css`
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          `}
        >
          {selectedValue.map((option) => (
            <div
              key={option.value}
              className="dropdown-tag-item"
              css={css`
                background-color: #ddd;
                padding: 2px 4px;
                border-radius: 2px;
                display: flex;
                align-items: center;
              `}
            >
              {option.label}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="dropdown-tag-close"
                css={css`
                  display: flex;
                  align-items: center;
                `}
              >
                <XSquare />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return selectedValue.label;
  };

  const removeOption = (option) => {
    return selectedValue.filter((o) => o.value !== option.value);
  };

  const onTagRemove = (e, option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0;
    }

    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    // return options.filter(
    //   (option) =>
    //     option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    // );
  };

  return (
    <div
      className="dropdown-container"
      css={css`
        text-align: left;
        border: 1px solid #ccc;
        position: relative;
        border-radius: 5px;
        background-color: #fff;
        border: 3px solid #111;
        border-radius: 0;
        width: 30vw;
        height: 45px;
        padding-top: 2px;
        padding-left: 16px;
        box-sizing: border-box;
      `}
    >
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className="dropdown-input"
        css={css`
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          user-select: none;
        `}
      >
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <ChevronDown />
          </div>
        </div>
      </div>
      {showMenu && (
        <div
          className="dropdown-menu"
          css={css`
            position: absolute;
            transform: translateY(4px);
            left: -3px;
            width: 100%;
            border: 3px solid #111;
            border-radius: 0;
            overflow: auto;
            max-height: 150px;
            background-color: #fff;
            z-index: 99;
          `}
        >
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
              css={css`
                padding: 5px;
                cursor: pointer;
                }
              `}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
