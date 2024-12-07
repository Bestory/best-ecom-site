import axios from "axios"
const BASE_API_URL = import.meta.env.VITE_API_URL;
const register = async (userData) => {
  const API_URL = `${BASE_API_URL}/v1/users/register`
  try {
    const response = await axios.post(API_URL, userData, {
      headers: {
         'Content-Type': 'application/json'
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(error.response.data.message || error.response.statusText || "Login failed");
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
}

const login = async (userData) => {
  const API_URL = `${BASE_API_URL}/v1/users/login`
  try {
    const response = await axios.post(API_URL, userData , {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
    });
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      if (error.response.data.status & (error.response.data.status !== 1)) {
        throw new Error(error.response.data.status);
      } else {
        console.log('error', error);
        // Server responded with a status other than 2xx, throw a custom error message depending on the status
        throw new Error(
          error.response.data.message ||
            error.response.statusText ||
            "Login failed"
        );
      }
  } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
}

const logout = async () => {
  const API_URL = `${BASE_API_URL}/v1/users/logout`
  try {
    const response = await axios.get(API_URL, "" , {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
    });
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(error.response.data.message || error.response.statusText || "Login failed");
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
}

const getLogInStatus = async () => {
  const API_URL = `${BASE_API_URL}/v1/users/loginstatus`
  try {
    const response = await axios.get(API_URL, "" , {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
    });
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(error.response.data.message || error.response.statusText || "Login failed");
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
}


const getUser = async () => {
  const API_URL = `${BASE_API_URL}/v1/users/getuser`
  try {
    const response = await axios.get(API_URL, "" , {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
    });
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(error.response.data.message || error.response.statusText || 'failed');
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
}

const updateUser = async (userData) => {
  const API_URL = `${BASE_API_URL}/v1/users/updateuser`
  try {
    const response = await axios.patch(API_URL, userData , {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
    });
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(error.response.data.message || error.response.statusText || 'failed to update user');
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
}

const updatePhoto = async (userData) => {
  const API_URL = `${BASE_API_URL}/v1/users/updatephoto`
  try {
    const response = await axios.patch(API_URL, userData , {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
    });
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(error.response.data.message || error.response.statusText || 'failed to update image profile');
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
}

const activateUser = async (userData) => {
  const API_URL = `${BASE_API_URL}/v1/users/activate`
  try {
    const response = await axios.patch(API_URL, userData , {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
    });
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(error.response.data.message || error.response.statusText || 'failed to activate user');
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
}

const resetActivationCode = async (userData) => {
  const API_URL = `${BASE_API_URL}/v1/users/resettoken`
  try {
    const response = await axios.post(API_URL, userData , {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
    });
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(error.response.data.message || error.response.statusText || 'failed to reset token');
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
}


const generateOTP = async (userData) => {
  const API_URL = `${BASE_API_URL}/v1/users/generateotp`;
  try {
    const response = await axios.post(API_URL, userData , {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
    });
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(error.response.data.message || error.response.statusText || 'failed to reset token');
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
}

const verifyOTP = async (userData) => {
  const API_URL = `${BASE_API_URL}/v1/users/verifyotp`
  try {
    const response = await axios.post(API_URL, userData , {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
    });
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(error.response.data.message || error.response.statusText || 'failed to reset token');
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
}

const getCaptcha = async (userData) => {
  const API_URL = `${BASE_API_URL}/v1/users/captcha`;
  try {
    const response = await axios.post(
      `${API_URL}?timestamp=${Date.now()}`,userData,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(
        error.response.data.message ||
          error.response.statusText ||
          "failed to reset token"
      );
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
};


const verifyCaptcha = async (userData) => {
  const API_URL = `${BASE_API_URL}/v1/users/verifycaptcha`;
  try {
    const response = await axios.post(
      `${API_URL}?timestamp=${Date.now()}`,userData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(
        error.response.data.message ||
          error.response.statusText ||
          "failed to verify captacha"
      );
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
};

const changePassword = async (userData) => {
  const API_URL = `${BASE_API_URL}/v1/users/changepwd`;
  try {
    const response = await axios.post(API_URL,userData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx, throw a custom error message depending on the status
      throw new Error(
        error.response.data.message ||
          error.response.statusText ||
          "failed to change password"
      );
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened during the request
      throw new Error("An error occurred. Please try again.");
    }
  }
};

const userAPIService = {
  register,
  login,
  logout,
  getLogInStatus,
  getUser,
  updateUser,
  updatePhoto,
  activateUser,
  resetActivationCode,
  generateOTP,
  verifyOTP,
  getCaptcha,
  verifyCaptcha,
  changePassword,
};
export default userAPIService;