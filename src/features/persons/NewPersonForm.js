import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { InputText } from "../../components/InputText";
import { createOrUpdatePersonAction } from "./PersonsSlice";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "../../components/Button";
import { Navigate } from "react-router-dom";

export const NewPersonForm = (props) => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [firstSurname, setFirstSurname] = useState('');
  const [secondSurname, setSecondSurname] = useState('');
  const [loggingSince, setLoggingSince] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  const updateCallback = (updateStateFn) => {
    return (event) => {
      updateStateFn(event.currentTarget.value)
    }
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(createOrUpdatePersonAction({
      id: uuidv4(),
      firstName: firstName,
      secondName: secondName,
      firstSurname: firstSurname,
      secondSurname: secondSurname,
      loggingSince: loggingSince,
    }))
    setFirstName('');
    setSecondName('');
    setFirstSurname('');
    setSecondSurname('');
    setLoggingSince('');
    setFormSubmitted(true);
  }

  return(
    <form className='flex flex-col items-center w-full max-w-2xl' onSubmit={handleOnSubmit}>
      <div className="mb-2">
        <label for='new-person-form__first-name'>Primer nombre</label>
        <InputText  required='true' value={firstName} onChange={updateCallback(setFirstName)} id='new-person-form__first-name'/>
      </div>
      <div className="mb-2">
        <label for='new-person-form__second-name'>Segundo nombre</label>
        <InputText required='true'  value={secondName} onChange={updateCallback(setSecondName)} id='new-person-form__second-name'/>
      </div>
      <div className="mb-2">
        <label for='new-person-form__first-surname'>Primer apellido</label>
        <InputText required='true' value={firstSurname} onChange={updateCallback(setFirstSurname)} id='new-person-form__first-surname'/>
      </div>
      <div className="mb-2">
        <label for='new-person-form__second-surname'>Segundo apellido</label>
        <InputText required='true'  value={secondSurname} onChange={updateCallback(setSecondSurname)} id='new-person-form__second-surname'/>
      </div>
      <div className="mb-4 flex flex-col">
        <label for='new-person-form__logging-since'>Fecha comienzo de registro</label>
        <input required='true' type="datetime-local" id='new-person-form__logging-since' value={loggingSince} onChange={updateCallback(setLoggingSince)}/>
      </div>
      <Button className='self-end' type='submit'>Crear</Button>
      {formSubmitted &&  (
          <Navigate to="/persons" replace={true} />
        )}
    </form>
  )
}