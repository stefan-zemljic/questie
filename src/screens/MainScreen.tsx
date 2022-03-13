import {Session, SupabaseClient, User} from "@supabase/supabase-js";
import {Box, Button, Center, Flex, Modal, ModalOverlay} from "@chakra-ui/react";
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
import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import DatePickerDialog from "../dialogs/DatePickerDialog";

type State = {
    date: Dayjs,
    dialogs: {
        onClose: (state: State) => void,
        buildContent: (state: State) => JSX.Element,
    }[],
    datePicker?: {
        current: Dayjs,
        onChange: (state: State, date: Dayjs) => void,
    },
    update: () => void,
};

function MainScreen(props: { supabaseClient: SupabaseClient, user: User, session: Session }) {
    let [prevState, setState] = useState<State>({
        date: dayjs().startOf('d'),
        dialogs: [],
        update: () => undefined,
    });

    const state: State = {...prevState};
    state.update = () => setState(state);

    return <Box h="100%" w="100%">
        <Flex direction="column" h="100%">
            {buildHeader(state)}
            <Box flexGrow={1}/>
            {buildFooter()}
        </Flex>
        {buildDialogs(state)}
    </Box>
}

function buildDialogs(state: State) {
    if (!state.dialogs.length) return null;

    return <>{state.dialogs.map((dialog, i) => {
        return <Modal key={i} isOpen={true} onClose={() => state.dialogs.pop()!.onClose(state)}>
            <ModalOverlay/>
            {dialog.buildContent(state)}
        </Modal>
    })}</>
}

function openDatePicker(state: State, current: Dayjs, onChange: (state: State, date: Dayjs) => void) {
    state.dialogs.push({
        onClose: (state: State) => {
            state.datePicker = undefined;
            state.update();
        },
        buildContent: state => <DatePickerDialog
            date={state.datePicker!.current}
            onChange={date => {
                state.datePicker!.onChange(state, date)
                state.dialogs.pop();
                state.update();
            }}/>
    });
    state.datePicker = {
        current: current,
        onChange: onChange,
    };
    state.update();
}

function buildHeader(state: State) {
    return <Flex p="8px" gap="8px" direction="row" alignItems="center" justifyContent="space-between">
        <Button colorScheme="blue"><MdMenu/></Button>
        <Button colorScheme="blue" onClick={() => openDatePicker(state, state.date, (state, date) => {
            state.date = date;
            state.update();
        })}>{state.date.format("dddd, DD.MM.YYYY")}</Button>
        <Button colorScheme="blue"><HiOutlineFilter/></Button>
    </Flex>
}

function buildFooter() {
    return <Center><Flex p="8px" gap="8px" direction="row" alignItems="center" justifyContent="start" overflowX="auto">
        <Button colorScheme="blue" flexShrink={0}><BiText/></Button>
        <Button colorScheme="blue" flexShrink={0}><AiOutlineCarryOut/></Button>
        <Button colorScheme="blue" flexShrink={0}><AiOutlineCamera/></Button>
        <Button colorScheme="blue" flexShrink={0}><AiOutlineVideoCamera/></Button>
        <Button colorScheme="blue" flexShrink={0}><BsMic/></Button>
        <Button colorScheme="blue" flexShrink={0}><AiOutlineEdit/></Button>
        <Button colorScheme="blue" flexShrink={0}><AiOutlineFile/></Button>
    </Flex></Center>
}

export default MainScreen;

