import React from "react";
import './Button.scss';

export const Button = (props)=>{
  return(
    <button {...props} className="c-button">{props.children}</button>
  )
}