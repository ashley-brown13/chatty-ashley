import React from 'react';

type AppProps = {
  handleLogin: () => void;
}

const LoginPage = ({ handleLogin }: AppProps): JSX.Element => {

  return (
    <div className="login-page">
				<button onClick={handleLogin}>Google Login</button>
    </div>
  );
}

export default LoginPage;
