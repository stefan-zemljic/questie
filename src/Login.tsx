import {TabPanels, Tabs, Tab, TabList, TabPanel, Box, Button, Center, Link, Flex, Input,} from "@chakra-ui/react";
import {createClient, Session, User} from "@supabase/supabase-js";
import {useState} from 'react';
import {useLocation} from "react-router-dom";

function centerCard(element: JSX.Element) {
    return <Center h="100vh">
        <Box
            maxW={'320px'}
            w={'full'}
            bg="#F5F5F5"
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}>
            {element}
        </Box>
    </Center>
}

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZ' +
    'iI6InZkZXBxdWdibW1wb291cnhham1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU4NTkxNTgsImV4cCI6MTk' +
    '2MTQzNTE1OH0.CC3yGw_x9EFX3tLGlMOr9VZePfRmL4L_6X2X_Efpcu4';

const supabaseUrl = 'https://vdepqugbmmpoourxajml.supabase.co';

function Login() {
    const [state, setState] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [supabase] = useState(() => createClient(supabaseUrl, supabaseAnonKey));
    const [user, setUser] = useState<User>();
    const [session, setSession] = useState<Session>();
    const [error, setError] = useState<string>();

    const location = useLocation();
    const [hash, setHash] = useState(() => Object.fromEntries(
        location.hash
            .substring(1).split('&')
            .map(it => it.split('='))
    ));
    const {'access_token': accessToken} = hash;

    console.log(JSON.stringify(hash));

    if (accessToken) {
        return centerCard(<Flex flexDir="column" gap="8px">
            <Box height="4px"/>
            <Input placeholder="new password" type="password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <Input placeholder="retype password" type="password" value={password2}
                   onChange={(e) => setPassword2(e.target.value)}/>
            <Box textColor="#FF3377">{error ?? ''}</Box>
            <Button colorScheme="blue" onClick={async () => {
                if (password != password2) {
                    setError('Password mismatch')
                    return
                }
                const {error} = await supabase.auth.api.updateUser(accessToken, {password})
                if (error) {
                    setError(JSON.stringify(error))
                } else {
                    setEmail('');
                    setPassword2('');
                    setPassword('');
                    setHash('');
                    setError(undefined);
                    setState(0);
                }
            }}>Save Password</Button>
        </Flex>);
    }

    if (user && session) {
        return <>
            Logged in
            <Button colorScheme="blue" onClick={() => {
                setUser(undefined);
                setSession(undefined);
            }}>Logout</Button>
        </>
    }

    if (state == 1) {
        return centerCard(<>Validation mail sent</>);
    }


    if (state == 2) {
        return centerCard(<Flex flexDir="column" gap="8px">
            <Input placeholder="email" type="email" value={email}
                   onChange={(e) => setEmail(e.target.value)}/>
            <Box textColor="#FF3377">{error ?? ''}</Box>
            <Button colorScheme="blue" onClick={async () => {
                const {error} = await supabase.auth.api.resetPasswordForEmail(email);
                if (error) {
                    setError(JSON.stringify(error))
                } else {
                    setError(undefined);
                    setState(3);
                }
            }}>Send reset Link</Button>
        </Flex>);
    }

    if (state == 3) {
        return centerCard(<>Sent if mail address was registered</>);
    }

    return centerCard(<Tabs>
        <TabList>
            <Tab onClick={() => {
                setEmail('');
                setPassword('');
                setError(undefined);
            }}>Login</Tab>
            <Tab onClick={() => {
                setEmail('');
                setPassword('');
                setPassword2('');
                setError(undefined);
            }}>Register</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <Flex flexDir="column" gap="8px">
                    <Box height="4px"/>
                    <Input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder="password" type="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <Link color="#4477ff" onClick={() => setState(2)}>forgot password?</Link>
                    <Box textColor="#FF3377">{error ?? ''}</Box>
                    <Button colorScheme="blue" onClick={async () => {
                        const {user, session, error} = await supabase.auth.signIn({
                            email: email,
                            password: password
                        })
                        if (error) {
                            setError(JSON.stringify(error))
                        } else {
                            setError(undefined);
                            setUser(user ?? undefined);
                            setSession(session ?? undefined);
                        }
                    }}>Login</Button>
                </Flex>
            </TabPanel>
            <TabPanel>
                <Flex flexDir="column" gap="8px">
                    <Box height="4px"/>
                    <Input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder="password" type="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <Input placeholder="retype password" type="password" value={password2}
                           onChange={(e) => setPassword2(e.target.value)}/>
                    <Box textColor="#FF3377">{error ?? ''}</Box>
                    <Button colorScheme="blue" onClick={async () => {
                        if (password != password2) {
                            setError('Password mismatch');
                            return
                        }
                        const {error} = await supabase.auth.signUp({
                            email: email,
                            password: password
                        });
                        if (error) {
                            setError(JSON.stringify(error))
                        } else {
                            setError(undefined);
                            setState(1);
                        }
                    }}>Register</Button>
                </Flex>
            </TabPanel>
        </TabPanels>
    </Tabs>);
}

export default Login;