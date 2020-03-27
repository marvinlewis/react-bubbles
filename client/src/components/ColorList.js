import React, { useState } from "react";
import { axiosWithAuth } from "../utility/axiosWithAuth";
import { useParams } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const { id } = useParams();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    //const selectedColor = colors.find(item => `${item.id}` === id)
    // think about where will you get the id from...
    axiosWithAuth()
    .put(`/api/colors/${id}`, colorToEdit )
    .then(res => {
      updateColors(colors.map(color => {
        color.id === res.data.id ? res.data : color 
      }))
      setColorToEdit(initialColor)
      setEditing(false))
      .catch(err => console.log(err))
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    //console.log( "deleted",color)
    const id = color.id
    axiosWithAuth()
    .delete(`/api/colors/${id}`)
    .then(res => {
      updateColors(
        colors.filter(item => item.id !== id)
      )
      setEditing(false)
      setColorToEdit(initialColor)
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
