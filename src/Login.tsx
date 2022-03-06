import {TabPanels, Tabs, Tab, TabList, TabPanel, Box, Button, Center, Link, Flex, Input,} from "@chakra-ui/react";
import {useState} from 'react';

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

function Login() {
    const [state, setState] = useState(0);

    if (state == 1) {
        return centerCard(<>Validation mail sent</>);
    }

    if (state == 2) {
        return centerCard(<Flex flexDir="column" gap="8px">
            <Input placeholder="email" type="email"/>
            <Button colorScheme="blue" onClick={() => setState(3)}>Reset Password</Button>
        </Flex>);
    }

    if (state == 3) {
        return centerCard(<>Link to reset password sent, if the mail address was registered</>);
    }

    if (state == 4) {
        return centerCard(<Flex flexDir="column" gap="8px">
            <Box height="4px"/>
            <Input placeholder="new password" type="password"/>
            <Input placeholder="retype password" type="password"/>
            <Box height="8px"/>
            <Button colorScheme="blue">Save & Login</Button>
        </Flex>);
    }

    return centerCard(<Tabs>
        <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <Flex flexDir="column" gap="8px">
                    <Box height="4px"/>
                    <Input placeholder="email" type="email"/>
                    <Input placeholder="password" type="password"/>
                    <Link color="#4477ff" onClick={() => setState(2)}>forgot password?</Link>
                    <Box height="8px"/>
                    <Button colorScheme="blue">Login</Button>
                </Flex>
            </TabPanel>
            <TabPanel>
                <Flex flexDir="column" gap="8px">
                    <Box height="4px"/>
                    <Input placeholder="email" type="email"/>
                    <Input placeholder="password" type="password"/>
                    <Input placeholder="retype password" type="password"/>
                    <Box height="8px"/>
                    <Button colorScheme="blue" onClick={() => setState(1)}>Register</Button>
                </Flex>
            </TabPanel>
        </TabPanels>
    </Tabs>);
}

export default Login;