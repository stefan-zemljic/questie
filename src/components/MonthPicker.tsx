import {Box, Button, Flex} from "@chakra-ui/react";
import {FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight} from "react-icons/all";
import dayjs, {Dayjs} from "dayjs";
import {useState} from "react";

function MonthPicker(props: { date: Dayjs, onChange: (date: Dayjs) => void }) {
    const [firstOfMonth, setFirstOfMonth] = useState(() => props.date.startOf('M'));

    function add(years: number, months: number) {
        let next = firstOfMonth;
        if (years) next = next.add(years, 'y');
        if (months) next = next.add(months, 'M');
        setFirstOfMonth(next);
        props.onChange(next);
    }

    function reset() {
        const next = dayjs().startOf('M');
        setFirstOfMonth(next);
        props.onChange(next);
    }

    return <Flex p="8px" gap="8px" direction="row" justifyContent="center" overflowX="auto" pointerEvents="auto">
        <Button flexShrink={0} colorScheme="blue" onClick={() => add(-1, 0)}><FiChevronsLeft/></Button>
        <Button flexShrink={0} colorScheme="blue" onClick={() => add(0, -1)}><FiChevronLeft/></Button>
        <Box flexGrow={1}/>
        <Button flexShrink={0} colorScheme="blue" onClick={() => reset()}>{firstOfMonth.format('MMM YYYY')}</Button>
        <Box flexGrow={1}/>
        <Button flexShrink={0} colorScheme="blue" onClick={() => add(0, 1)}><FiChevronRight/></Button>
        <Button flexShrink={0} colorScheme="blue" onClick={() => add(1, 0)}><FiChevronsRight/></Button>
    </Flex>
}

export default MonthPicker;