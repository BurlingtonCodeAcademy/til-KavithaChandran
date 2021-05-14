/*import { useState } from 'react';

function UseToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };
console.log(`usetoken`,saveToken)
console.log(`usetoken`,getToken)
console.log(`usetoken`,setToken)
  return {
    setToken: saveToken,
    token
  }
}

export default  UseToken*/