
import LoginProvider, { LoginContext } from './context/loginContext';
import AppRouter from './routing/AppRouter';
function App() {
  return (
        <LoginProvider>
		<div className='App'>
          	<AppRouter >
          	</AppRouter>
        	</div>
	  </LoginProvider>
  );
}

export default App;
