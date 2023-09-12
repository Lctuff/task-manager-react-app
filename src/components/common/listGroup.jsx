import React from "react";

const ListGroup = (props) => {
  const { items, textProperty, titleProperty, onItemSelect, selectedItem } =
    props;

  return (
    <ul className="list-group">
      <li className="list-group-item list-group-item-info">{titleProperty}</li>
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[textProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
