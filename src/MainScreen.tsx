import {Session, SupabaseClient, User} from "@supabase/supabase-js";
import {Box, Button, Flex} from "@chakra-ui/react";
import {
    AiOutlineCamera,
    AiOutlineCarryOut,
    AiOutlineEdit,
    AiOutlineFile,
    AiOutlineVideoCamera,
    BiText,
    BsMic,
    HiOutlineFilter,
    MdMenu
} from "react-icons/all";

function MainScreen(props: { supabaseClient: SupabaseClient, user: User, session: Session }) {
    return <Flex justifyContent="center" alignItems="center" height="100vh">
        <Flex direction="column" height="80%" backgroundColor="#F1F1F1" borderRadius="8px">
            {buildHeader()}
            <Box flexGrow={1}/>
            {buildFooter()}
        </Flex>
    </Flex>
}

function buildHeader() {
    return <Flex p="8px" gap="8px" direction="row" alignItems="center" justifyContent="space-between">
        <Button colorScheme="blue"><MdMenu/></Button>
        <Button colorScheme="blue">Mi, 08.03.2022</Button>
        <Button colorScheme="blue"><HiOutlineFilter/></Button>
    </Flex>
}

function buildFooter() {
    return <Flex p="8px" gap="8px" direction="row" alignItems="center" justifyContent="space-between">
        <Button colorScheme="blue"><BiText/></Button>
        <Button colorScheme="blue"><AiOutlineCarryOut/></Button>
        <Button colorScheme="blue"><AiOutlineCamera/></Button>
        <Button colorScheme="blue"><AiOutlineVideoCamera/></Button>
        <Button colorScheme="blue"><BsMic/></Button>
        <Button colorScheme="blue"><AiOutlineEdit/></Button>
        <Button colorScheme="blue"><AiOutlineFile/></Button>
    </Flex>
}

export default MainScreen;

