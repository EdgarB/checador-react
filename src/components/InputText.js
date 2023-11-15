import React from "react";
import './InputText.scss';

export const InputText = (props) => {
  return(
    <input type="text" {...props} className={`c-input-text ${props.className}`}/>
  )
}