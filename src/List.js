import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
const List = ({
  items,
  clearAlert,
  deleteItem,
  editItem,
  categories,
  filterItems,
  allcontents,
  newItems,
  activeIndex
}) => {
  const allCategories = [
    "all",
    ...new Set(
      categories.map((item) => {
        return item.category;
      })
    ),
  ];

  return (
    <>
      <div className="menus">
        {allCategories.map((cat, index) => {
          return (
            <Link className={`menu ${activeIndex===index && "active"}`} key={index} onClick={() => filterItems(cat,index)}
            >
              {cat}
            </Link>
          );
        })}
      </div>
      <div className="titles">
        <div className="name-title">Name</div>
        <div className="name-cat">Category</div>
        <div className="name-edit">Edit</div>
        <div className="name-delete">Delete</div>
      </div>
      {allcontents &&
        items.map((item) => {
          const { id, name, category } = item;
          return (
            <div className="item" key={id}>
              <div className="item-name">{name}</div>
              <div className="item-category">{category}</div>
              <div className="item-edit">
                <Link>
                  <FaEdit className="edit" onClick={() => editItem(id)} />
                </Link>
              </div>
              <div className="item-delete">
                <Link onClick={() => deleteItem(id)}>
                  <FaTrash className="delete" />
                </Link>
              </div>
            </div>
          );
        })}
      {!allcontents &&
        newItems.map((newItem) => {
          const { id, name, category } = newItem;
          return (
            <div className="item" key={id}>
              <div className="item-name">{name}</div>
              <div className="item-category">{category}</div>
              <div className="item-edit">
                <Link>
                  <FaEdit className="edit" onClick={() => editItem(id)} />
                </Link>
              </div>
              <div className="item-delete">
                <Link onClick={() => deleteItem(id)}>
                  <FaTrash className="delete" />
                </Link>
              </div>
            </div>
          );
        })}
      <button className="clear" onClick={clearAlert}>
        clear all
      </button>
    </>
  );
};

export default List;
