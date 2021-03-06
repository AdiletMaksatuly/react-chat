import { ThemeProvider } from '@mui/material';
import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseContext } from '.';
import './App.css';
import AppRouter from './components/AppRouter';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import theme from './styles/theme';

function App() {
    const { auth } = useContext(FirebaseContext);
    const [user, isLoading, error] = useAuthState(auth);

    if (isLoading) {
        return (
            <main>
                <Loader />
            </main>
        );
    }

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Navbar />
                <AppRouter />
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
