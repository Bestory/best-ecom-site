import { useSelector } from 'react-redux'

export const ShowLogin = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.user);
  if (!loggedIn) {
    return children
  }
  else return null;
}

export const ShowLogOut = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.user);
  if (loggedIn) {
    return children
  }
  else return null;
}

