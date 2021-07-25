import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalstorage=()=>{
  let List= localStorage.getItem("list");
  if(List){
    return JSON.parse(localStorage.getItem("list"))
  }
  else{
    return []
  }
}
const getLocalCats=()=>{
  let categoryList= localStorage.getItem("cats");
  if(categoryList){
    return JSON.parse(localStorage.getItem("cats"))
  }
  else{
    return []
  }
}





function App() {
  const [input, setInput] = useState("");
  const [itemCat, setItemCat] = useState("");

  const [allcontents, setAllcontents] = useState(true);
  const[newItems,setNewItems]=useState([]);

  // active class 
  const[activeIndex,setActiveIndex]=useState(0);
  
  const [items, setItems] = useState(getLocalstorage());
  const [categories, setCategories] = useState(getLocalCats());

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const saveItems = (e) => {
    e.preventDefault();
    if (!input || !itemCat) {
      // show alert
      showAlert(true, "please enter name and category!", "danger");
    } else if (input && itemCat && editing) {
      // deal with edit
      setItems(
        items.map((item) => {
          if (item.id === editId) {
            return { ...item, name: input, category: itemCat }
          }
          return item;
        })
      );
      setCategories(
        categories.map((category)=>{
          if (category.id === editId) {
            return { ...category,category: itemCat }
          }
          return category;
        })
      );
      // setNewItems(
      //   newItems.map((newitem)=>{
      //     if (newitem.id === editId) {
      //       return { ...newitem,name: input, category: itemCat}
      //     }
      //     return newitem;
      //   })
      // );
      setActiveIndex(0);
      setAllcontents(true);
      setEditId(null);
      setEditing(false);
      setInput("");
      setItemCat("");
      showAlert(true, "item edited successfully", "success");
    } else {
      showAlert(true, "name and category added successfully :)", "success");
      const newItem = {
        id: new Date().getTime().toString(),
        name: input,
        category: itemCat
      };
      const newCategory = {
        id: new Date().getTime().toString(),
        category: itemCat
      };
      setAllcontents(true);
      setItems([...items, newItem]);
      setCategories([...categories, newCategory]);
      setInput("");
      setItemCat("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  const clearAlert = () => {
    showAlert(true, "the list is empty", "danger");
    setItems("");
    setCategories("");
    setEditing(false);
    setAllcontents(true);
    setActiveIndex(0);
  };
  const deleteItem = (id) => {
    showAlert(true, "item is deleted", "danger");
    setItems(items.filter((item) => item.id !== id));
    setCategories(categories.filter((categoree) => categoree.id !== id));
    setAllcontents(true);
    setActiveIndex(0);
    // setNewItems(newItems.filter((neitem) => neitem.id !== id));
  };
  const editItem = (id) => {
    const editableItem = items.find((item) => item.id === id);
    setEditing(true);
    setEditId(id);
    setInput(editableItem.name);
    setItemCat(editableItem.category);
  };

  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(items));
  },[items]);
  useEffect(()=>{
    localStorage.setItem("cats",JSON.stringify(categories));
  },[categories]);
  useEffect(()=>{
    setAllcontents(true);
  },[]);


  const filterItems = (cate,ind) => {
    setActiveIndex(ind);
    if (cate === "all") {
      setAllcontents(true);
      return;
    } else {
      setAllcontents(false);
      setNewItems(items.filter((item) => item.category === cate));
      return;
    }
  };


  return (
    <section className="main">
      <div className="container">
        <div className="title">
          <h2>Item saver 2</h2>
        </div>
        <div className="form">
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} items={items} />
          )}
          <form action="" onSubmit={saveItems}>
            <div className="name-input">
              <label htmlFor="name">name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="type your item name!"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="category-input">
              <label htmlFor="category">category</label>
              <input
                id="category"
                type="text"
                name="category"
                placeholder="type your item category!"
                value={itemCat}
                onChange={(e) => setItemCat(e.target.value)}
              />
            </div>
            <button className="submit" type="submit">
              {editing ? "edit" : "save"}
            </button>
          </form>
        </div>
        <div className="items">
          {items.length > 0 && (
            <List
              items={items}
              clearAlert={clearAlert}
              deleteItem={deleteItem}
              editItem={editItem}
              categories={categories}
              filterItems={filterItems}
              allcontents={allcontents}
              newItems={newItems}
              activeIndex={activeIndex}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
