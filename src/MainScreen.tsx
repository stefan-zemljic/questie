import {Session, SupabaseClient, User} from "@supabase/supabase-js";
import {Box, Button, Center, Flex} from "@chakra-ui/react";
import {
    AiOutlineCamera,
    AiOutlineCarryOut,
    AiOutlineEdit,
    AiOutlineFile,
    AiOutlineVideoCamera,
    BiText,
    BsMic, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight,
    HiOutlineFilter,
    MdMenu
} from "react-icons/all";
import {useState} from "react";

type State = {
    date: Date,
    dialogs: ((state: State) => void)[],
    datePicker?: {
        year: number,
        month: number,
        current: Date,
        onSet: (state: State, date: Date) => void,
    },
    update: () => void,
};

function MainScreen(props: { supabaseClient: SupabaseClient, user: User, session: Session }) {
    let [prevState, setState] = useState<State>({
        date: new Date(),
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
        {state.dialogs.length ? <Box w="100%" h="100%" backgroundColor="#00000060" position="absolute" top={0}
                                     onClick={() => state.dialogs.pop()!(state)}/> : null}
        {state.datePicker ? buildDatePicker(state) : null}
    </Box>
}

function openDatePicker(state: State, current: Date, onSet: (state: State, date: Date) => void) {
    state.dialogs.push((state: State) => {
        state.datePicker = undefined;
        state.update();
    });
    state.datePicker = {
        year: current.getFullYear(),
        month: current.getMonth(),
        current: current,
        onSet: onSet,
    };
    state.update();
}

function formatMonth(date: Date) {
    return Intl.DateTimeFormat('de-DE', {
        month: 'long',
        year: 'numeric'
    }).format(date);
}

function buildDatePicker(state: State) {
    const subState = state.datePicker!;
    const firstDate = new Date(subState.year + "/" + (subState.month + 1) + "/01");

    const add = (years: number, months: number) => {
        subState.year += years;
        subState.month += months;
        while (subState.month < 0) {
            subState.year -= 1;
            subState.month += 12;
        }
        while (subState.month >= 12) {
            subState.year += 1;
            subState.month -= 12;
        }
        state.update();
    };

    const setToToday = () => {
        const now = new Date();
        subState.year = now.getFullYear();
        subState.month = now.getMonth();
        state.update();
    }

    return <Center pointerEvents="none" position="absolute" left={0} right={0} top={0} bottom={0}>
        <Flex backgroundColor="#E0E0E0" borderRadius="8px" p="8px" gap="8px" direction="row" justifyContent="center"
              overflowX="auto">
            <Button colorScheme="blue" onClick={() => add(-1, 0)}><FiChevronsLeft/></Button>
            <Button colorScheme="blue" onClick={() => add(0, -1)}><FiChevronLeft/></Button>
            <Button colorScheme="blue" onClick={() => setToToday()}>{formatMonth(firstDate)}</Button>
            <Button colorScheme="blue" onClick={() => add(0, 1)}><FiChevronRight/></Button>
            <Button colorScheme="blue" onClick={() => add(1, 0)}><FiChevronsRight/></Button>
        </Flex>
    </Center>
}

function formatDate(date: Date) {
    return Intl.DateTimeFormat(Intl.NumberFormat().resolvedOptions().locale, {
        weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(date).replace(".", "")
}

function buildHeader(state: State) {
    return <Flex p="8px" gap="8px" direction="row" alignItems="center" justifyContent="space-between">
        <Button colorScheme="blue"><MdMenu/></Button>
        <Button colorScheme="blue" onClick={() => openDatePicker(state, state.date, (state, date) => {
            state.date = date;
            state.update();
        })}>{formatDate(state.date)}</Button>
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

