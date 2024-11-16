import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userAPIService from './userAPIService';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  loggedIn: false,
  success: false,
  loading: false,
  registered: false,
  message: "",
  error: ""
}

//Register user
export const register = createAsyncThunk("user/register", async (userData,thunkAPI) => { 
    try {
      const response = await userAPIService.register(userData);// API call
      return response;
    } catch (error) {
      const message = 
        (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//login user
export const login = createAsyncThunk("user/login", async (userData, thunkAPI) => {
    try {
      const response = await userAPIService.login(userData);// API call
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//log out user
export const logout = createAsyncThunk("user/logout", async (userData, thunkAPI) => {
    try {
      const response = await userAPIService.logout();// API call
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//login status
export const getLogInStatus = createAsyncThunk("user/loginstatus", async (userData, thunkAPI) => {
    try {
      const response = await userAPIService.getLogInStatus();// API call
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//getUser
export const getUser = createAsyncThunk("user/getuser", async (userData, thunkAPI) => {
    try {
      const response = await userAPIService.getUser();// API call
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


//update user
export const updateUser = createAsyncThunk("user/updateuser", async (userData, thunkAPI) => {
    try {
      const response = await userAPIService.updateUser(userData);// API call
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//update photo
export const updatePhoto = createAsyncThunk("user/updatephoto", async (userData, thunkAPI) => {
    try {
      const response = await userAPIService.updatePhoto(userData);// API call
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//update photo
export const activateAccount = createAsyncThunk("user/activate", async (userData, thunkAPI) => {
    try {
      const response = await userAPIService.activateUser(userData);// API call
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//Redux slice to handle user registration state (consider above register API call)
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //Reset user
    RESET_USER: (state) => { 
      state.success = false;
      state.loading = false;
      state.message = "";
      state.error = "";
    }
  },
  extraReducers: (builder) => { 
    builder
      //Register user
      .addCase(register.pending, (state) => { //Checking for pending state, still no result on API call
        state.loading = true;
        state.error = null; //clearing previous errors
      })
      .addCase(register.fulfilled, (state, action) => { // API call results return  with successful state  
        state.loading = false; // Stop loading when the request succeeds
        state.registered = true;
        state.user = action.payload;// Set the user data from the response
        state.error = null; // Clear errors
        toast.success("Registration successful");
        state.message = "Registration successful"; //Set message
      })
      .addCase(register.rejected, (state, action) => { //API calls returned with failed state
        state.loading = false;// Stop loading when the request fails
        state.error = action.payload;
        state.success = false;
        state.message = action.payload; //Set error message
        state.user = null; //Clear prevoius user data
        toast.error(action.payload);
      })
    
    //login user
      .addCase(login.pending, (state) => { //Checking for pending state, still no result on API call
        state.loading = true;
        state.success = false;
        state.error = null; //clearing previous errors
      })
      .addCase(login.fulfilled, (state,action) => { // API call results return  with successful state  
        state.loading = false; // Stop loading when the request succeeds
        state.success = true;
        state.loggedIn = true;
        state.user = action.payload;// Set the user data from the response
        state.error = null; // Clear errors
        toast.success("Logged in successfully");
        state.message = "Logged in successfully"; // Set message
      })
      .addCase(login.rejected, (state,action) => { //API calls returned with failed state
        state.loading = false;// Stop loading when the request fails
        state.error = action.payload;
        state.success = false;
        state.message = action.payload;
        state.user = null; //Clear prevoius user data
        toast.error(action.payload);
      })
      
      //logout user
      .addCase(logout.pending, (state) => { //Checking for pending state, still no result on API call
        state.loading = true;
        state.error = null; //clearing previous errors
      })
      .addCase(logout.fulfilled, (state) => { // API call results return  with successful state  
        state.loading = false; // Stop loading when the request succeeds
        state.success = true;
        state.loggedIn = false;
        state.error = null; // Clear errors
        state.user = null; //Clear prevoius user data
        state.message = "Logged out successfully"; // Set message
        toast.success("Logged out successfully");
      })
      .addCase(logout.rejected, (state,action) => { //API calls returned with failed state
        state.loading = false;// Stop loading when the request fails
        state.error = action.payload;
        state.success = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
    
          //login status
      .addCase(getLogInStatus.pending, (state) => { //Checking for pending state, still no result on API call
        state.loading = true;
        state.error = null; //clearing previous errors
      })
      .addCase(getLogInStatus.fulfilled, (state,action) => { // API call results return  with successful state  
        state.loading = false; // Stop loading when the request succeeds
        state.success = true;
        if (action.payload === false) {
          state.loggedIn = false;
        } else {
          state.loggedIn = true;
        }
        // state.error = null; // Clear errors
        state.user = action.payload; //set user data
      })
      .addCase(getLogInStatus.rejected, (state,action) => { //API calls returned with failed state
        state.loading = false;// Stop loading when the request fails
        state.error = action.payload;
        state.loggedIn = false;
        state.success = false;
        state.message = action.payload;
      })
    
    //get user
      .addCase(getUser.pending, (state) => { //Checking for pending state, still no result on API call
        state.loading = true;
        state.error = null; //clearing previous errors
      })
      .addCase(getUser.fulfilled, (state,action) => { // API call results return  with successful state  
        state.loading = false; // Stop loading when the request succeeds
        state.success = true;
        state.user = action.payload;
        state.error = null; // Clear errors
        toast.success(action.payload);
      })
      .addCase(getUser.rejected, (state,action) => { //API calls returned with failed state
        state.loading = false;// Stop loading when the request fails
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

    //update user
      .addCase(updateUser.pending, (state) => { //Checking for pending state, still no result on API call
        state.loading = true;
        state.error = null; //clearing previous errors
      })
      .addCase(updateUser.fulfilled, (state,action) => { // API call results return  with successful state  
        state.loading = false; // Stop loading when the request succeeds
        state.success = true;
        state.login = true;
        state.user = action.payload;
        state.error = null; // Clear errors
         state.message = "user updated successful"; //Set message
        toast.success("Updated successful");
      })
      .addCase(updateUser.rejected, (state,action) => { //API calls returned with failed state
        state.loading = false;// Stop loading when the request fails
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
    
    //update photo
      .addCase(updatePhoto.pending, (state) => { //Checking for pending state, still no result on API call
        state.loading = true;
        state.error = null; //clearing previous errors
      })
      .addCase(updatePhoto.fulfilled, (state,action) => { // API call results return  with successful state  
        state.loading = false; // Stop loading when the request succeeds
        state.success = true;
        state.user = action.payload;
        state.error = null; // Clear errors
         state.message = "user image updated successful"; //Set message
        toast.success("user image Updated successful");
      })
      .addCase(updatePhoto.rejected, (state,action) => { //API calls returned with failed state
        state.loading = false;// Stop loading when the request fails
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
    //activate User
      .addCase(activateAccount.pending, (state) => { //Checking for pending state, still no result on API call
        state.loading = true;
        state.error = null; //clearing previous errors
      })
      .addCase(activateAccount.fulfilled, (state,action) => { // API call results return  with successful state  
        state.loading = false; // Stop loading when the request succeeds
        state.success = true;
        state.user = action.payload;
        state.error = null; // Clear errors
        state.message = "Account activated successful"; //Set message
      })
      .addCase(activateAccount.rejected, (state,action) => { //API calls returned with failed state
        state.loading = false;// Stop loading when the request fails
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
        })
  }
});

export const {
  RESET_USER
} = userSlice.actions

export default userSlice.reducer