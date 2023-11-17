import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persons } from '../../data';
import { getPersons } from '../../app/firebase';

export const fetchPersons = createAsyncThunk(
  'persons/fetchPersons',
  async(_, thunkAPI) => {
    const response = await getPersons();
    return response;
  }
)


export const loadPersons = ()=> {
  console.log(persons)
  return {
    type: 'persons/loadPersons',
    payload: persons
  }
}


const personsSlice = createSlice({
  name: 'persons',
  initialState: {},
  reducers: {
  },
  extraReducers: {
    [fetchPersons.fulfilled]: (state, action) => {
      return action.payload;
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