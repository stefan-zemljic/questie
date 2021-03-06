import {TabPanels, Tabs, Tab, TabList, TabPanel, Box, Button, Center, Link, Flex, Input,} from "@chakra-ui/react";
import {Session, SupabaseClient, User} from "@supabase/supabase-js";
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

function Login(props: { supabaseClient: SupabaseClient, onLoggedIn: (user: User, session: Session) => void }) {
    const supabase = props.supabaseClient;
    const [state, setState] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState<string>();

    const location = useLocation();
    const [hash, setHash] = useState(() => Object.fromEntries(
        location.hash
            .substring(1).split('&')
            .map(it => it.split('='))
    ));
    const {'access_token': accessToken} = hash;

    async function savePassword() {
        if (password !== password2) {
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
    }

    async function sendResetLink() {
        const {error} = await supabase.auth.api.resetPasswordForEmail(email);
        if (error) {
            setError(JSON.stringify(error))
        } else {
            setError(undefined);
            setState(3);
        }
    }

    async function login() {
        const {user, session, error} = await supabase.auth.signIn({
            email: email,
            password: password
        })
        if (error) {
            setError(JSON.stringify(error))
        } else if (user && session) {
            setError(undefined);
            props.onLoggedIn(user, session);
        } else {
            setError("Internal Error 127")
        }
    }

    async function register() {
        if (password !== password2) {
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
    }

    if (accessToken) {
        return centerCard(<Flex flexDir="column" gap="8px">
            <Box height="4px"/>
            <Input placeholder="new password" type="password" value={password}
                   onChange={e => setPassword(e.target.value)}
                   onKeyPress={e => {
                       if (e.key === 'Enter') savePassword().then();
                   }}
            />
            <Input placeholder="retype password" type="password" value={password2}
                   onChange={e => setPassword2(e.target.value)}/>
            <Box textColor="#FF3377">{error ?? ''}</Box>
            <Button colorScheme="blue" onClick={savePassword}>Save Password</Button>
        </Flex>);
    }

    if (state === 1) {
        return centerCard(<>Validation mail sent</>);
    }


    if (state === 2) {
        return centerCard(<Flex flexDir="column" gap="8px">
            <Input placeholder="email" type="email" value={email}
                   onChange={e => setEmail(e.target.value)}
                   onKeyPress={e => {
                       if (e.key === 'Enter') sendResetLink().then();
                   }}
            />
            <Box textColor="#FF3377">{error ?? ''}</Box>
            <Button colorScheme="blue" onClick={sendResetLink}>Send reset Link</Button>
        </Flex>);
    }

    if (state === 3) {
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
                           onChange={(e) => setPassword(e.target.value)}
                           onKeyPress={e => {
                               if (e.key === 'Enter') login().then();
                           }}/>
                    <Link color="#4477ff" onClick={() => setState(2)}>forgot password?</Link>
                    <Box textColor="#FF3377">{error ?? ''}</Box>
                    <Button colorScheme="blue" onClick={login}>Login</Button>
                </Flex>
            </TabPanel>
            <TabPanel>
                <Flex flexDir="column" gap="8px">
                    <Box height="4px"/>
                    <Input placeholder="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <Input placeholder="password" type="password" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <Input placeholder="retype password" type="password" value={password2}
                           onChange={e => setPassword2(e.target.value)}
                           onKeyPress={e => {
                               if (e.key === 'Enter') register().then();
                           }}/>
                    <Box textColor="#FF3377">{error ?? ''}</Box>
                    <Button colorScheme="blue" onClick={register}>Register</Button>
                </Flex>
            </TabPanel>
        </TabPanels>
    </Tabs>);
}

export default Login;