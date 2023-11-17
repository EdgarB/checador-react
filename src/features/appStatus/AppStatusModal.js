import React from "react";
import { useSelector } from "react-redux";
import { selectAppStatus } from "./AppStatusSlice";
import {Modal} from '../../components/Modal';
import { ThreeDots  } from 'react-loading-icons';
export const AppStatusModal = () => {
  const {isLoading, status} = useSelector(selectAppStatus);
  const content = () => {
    if(!isLoading){
      return null;
    }

    return(
      <Modal>
        <div className="w-full flex flex-col items-center justify-center">
          <span className="mb-2">{status}</span>
          <ThreeDots className='w-8'  stroke='black'/>
        </div>
      </Modal>
    )
  }

  return (
    content()
  )
}