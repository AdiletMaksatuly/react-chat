import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { FirebaseContext } from '..';
import { LOGIN_ROUTE } from '../utils/consts';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const { auth } = useContext(FirebaseContext);
    const [user] = useAuthState(auth);

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container justifyContent={'flex-end'}>
                    {user ? (
                        <Button onClick={() => signOut(auth)} color="inherit" variant={'outlined'}>
                            Log out
                        </Button>
                    ) : (
                        <NavLink to={LOGIN_ROUTE}>
                            <Button color="inherit" variant={'outlined'}>
                                Log in
                            </Button>
                        </NavLink>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
