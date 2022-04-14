import { Box, Button, Container, Grid } from '@mui/material';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { FirebaseContext } from '..';

const Login = () => {
    const { auth } = useContext(FirebaseContext);

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
    };

    return (
        <main>
            <Container>
                <Grid
                    sx={{ my: 4 }}
                    style={{ backgroundColor: '#fafafa', borderRadius: 4 }}
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box p={5}>
                        <Button onClick={login} variant={'contained'}>
                            Log in with Google
                        </Button>
                    </Box>
                </Grid>
            </Container>
        </main>
    );
};

export default Login;
