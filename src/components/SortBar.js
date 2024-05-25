import React from "react";

function SortBar({ onSort }) {
  return (
    <div className="ui menu">
      <div className="header item">Sort By:</div>
      <a className="item" onClick={() => onSort("health")}>Health</a>
      <a className="item" onClick={() => onSort("damage")}>Damage</a>
      <a className="item" onClick={() => onSort("armor")}>Armor</a>
    </div>
  );
}

export default SortBar;
