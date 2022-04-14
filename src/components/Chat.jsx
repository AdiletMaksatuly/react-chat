import { Avatar, Button, Container, Grid, TextField } from '@mui/material';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { FirebaseContext } from '..';
import Loader from './Loader';

const Chat = () => {
    const messagesListRef = useRef();
    const [messageText, setMessageText] = useState('');

    const { auth, firestore, firebase } = useContext(FirebaseContext);
    const [user] = useAuthState(auth);

    const [messagesFromDB, setMessagesFromDB] = useState([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(true);
    const [isMessageSent, setIsMessageSent] = useState(false);

    useEffect(async () => {
        setIsMessagesLoading(true);
        await fetchMessages();
        setIsMessagesLoading(false);

        const lastElementIndex = messagesListRef.current?.children.length - 1;
        messagesListRef.current?.children[lastElementIndex].scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(async () => {
        if (isMessageSent === false) return;

        await fetchMessages();
        setIsMessageSent(false);
    }, [isMessageSent]);

    const fetchMessages = async () => {
        const fetchedMessages = [];

        try {
            const messagesQuery = query(
                collection(firestore, 'messages'),
                orderBy('createdAt', 'asc')
            );

            const response = await getDocs(messagesQuery);
            response.forEach((doc) => {
                fetchedMessages.push(doc.data());
            });

            setMessagesFromDB(fetchedMessages);
        } catch (error) {
            console.log(error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(firestore, 'messages'), {
                uid: user.uid,
                displayName: user.displayName,
                text: messageText,
                photoURL: user.photoURL,
                createdAt: serverTimestamp(),
            });
            console.log('Document written with ID: ', docRef.id);
            setMessageText('');
            setIsMessageSent(true);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    if (isMessagesLoading) {
        return <Loader />;
    }

    return (
        <main>
            <Container>
                <Grid sx={{ my: 4 }} container direction="column" justifyContent="center">
                    <ul
                        ref={messagesListRef}
                        style={{
                            height: '70vh',
                            overflowY: 'auto',
                            backgroundColor: '#fafafa',
                            borderRadius: 20,
                        }}
                    >
                        {messagesFromDB.map((messageFromDB) => (
                            <li
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: 10,
                                    backgroundColor:
                                        user.uid === messageFromDB.uid ? '#EFFFFD' : '#ccc',
                                    borderRadius: 20,
                                    padding: '5px 25px 0px 25px',
                                    width: 'fit-content',
                                    marginLeft: user.uid === messageFromDB.uid ? 'auto' : '10px',
                                }}
                                key={messageFromDB.createdAt}
                            >
                                <Grid container alignItems="center">
                                    <Avatar
                                        src={messageFromDB.photoURL}
                                        sx={{ mr: 2, width: 24, height: 24 }}
                                    />
                                    <strong style={{ fontSize: 14 }}>
                                        {messageFromDB.displayName}
                                    </strong>
                                </Grid>
                                <p style={{ textAlign: 'right', fontSize: 12 }}>
                                    {messageFromDB.text}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <form onSubmit={sendMessage} style={{ textAlign: 'right', margin: '20px 0' }}>
                        <TextField
                            fullWidth
                            maxRows={2}
                            variant="outlined"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                        />
                        <Button type={'submit'} sx={{ my: 1 }} variant="outlined">
                            Send
                        </Button>
                    </form>
                </Grid>
            </Container>
        </main>
    );
};

export default Chat;
