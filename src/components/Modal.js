import React from "react";
import './Modal.scss';
export const Modal = (props) => {
  return(
    <div className='c-modal'>
      <div className="c-modal__card">
        {props.children}
      </div>
    </div>
  )
}