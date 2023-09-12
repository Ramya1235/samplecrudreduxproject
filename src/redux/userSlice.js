import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
   
  ],
}

export const addUserData = (user) => {
  return (dispatch) => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(response => {
        dispatch(addUser(user))
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

export const deleteUserData = (id) => {
  return (dispatch) => {
    fetch("https://jsonplaceholder.typicode.com/users/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(response => {
        dispatch(deleteUser(id))
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

export const updateUserData = (user) => {
  return (dispatch) => {
    fetch("https://jsonplaceholder.typicode.com/users/" + user.id, {
      method: "PUT",
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(response => {
        dispatch(updateUser(user))
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

export const getUserData = () => {
  return (dispatch) => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
    })
      .then(res => res.json())
      .then(response => {
        dispatch(getUser(response))
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addUser: (state, action) => {
      let newUserId = state.data.length + 1;
      let newUser = { id: newUserId, ...action.payload }
      state.data.push(newUser);
    },
    deleteUser: (state, action) => {
      let index = state.data.findIndex((user) => user.id === action.payload);
      state.data.splice(index, 1);
    },
    updateUser: (state, action) => {
      let index = state.data.findIndex((user) => user.id === action.payload.id);
      state.data[index] = action.payload;
    },
    getUser: (state, action) => {
      state.data = [...state.data, ...action.payload]
    }
  }
})

export const { addUser, deleteUser, updateUser, getUser } = userSlice.actions;

export default userSlice.reducer;