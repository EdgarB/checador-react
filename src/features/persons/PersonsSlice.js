import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPersons, createOrUpdatePerson } from '../../app/firebase';
import { updateAppStatus } from '../appStatus/AppStatusSlice';

export const fetchPersons = createAsyncThunk(
  'persons/fetchPersons',
  async(_, {dispatch}) => {
    dispatch(updateAppStatus({
      isLoading: true,
      status: 'Cargando registros'
    }))
    const response = await getPersons();
    dispatch(updateAppStatus({
      isLoading: false,
      status: null
    }))
    return response;
  }
)

export const createOrUpdatePersonAction = createAsyncThunk(
  'persons/createOrUpdatePersons',
  async(person, {dispatch}) => {
    dispatch(updateAppStatus({
      isLoading: true,
      status: 'Actualizando registros'
    }))
    const response = await createOrUpdatePerson(person);
    dispatch(updateAppStatus({
      isLoading: false,
      status: null
    }))
    return response;
  }
)


const personsSlice = createSlice({
  name: 'persons',
  initialState: {},
  reducers: {
  },
  extraReducers: {
    [fetchPersons.fulfilled]: (state, action) => {
      return action.payload;
    },
    [createOrUpdatePersonAction.fulfilled]: (state, action) => {  
      state[action.payload.id] = action.payload;
      return state;
    }
  }
})

export const selectPersons = (state) => {
  return state.persons;
}

export const selectPersonsAsArray = (state) => {
  return Object.values(selectPersons(state));
}

export const selectPerson = (id) => {
  return (state)=> {
     return selectPersons(state)[id];
  }
}


export const personsReducer = personsSlice.reducer;
export default personsReducer;