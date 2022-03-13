import {Button, SimpleGrid, Text} from "@chakra-ui/react";
import dayjs, {Dayjs} from "dayjs";
import "dayjs/plugin/weekday";

function DateGrid(props: { firstOfMonth: Dayjs, date: Dayjs, onChange: (date: Dayjs) => void }) {
    const buttons = [] as JSX.Element[];
    let current = props.firstOfMonth.weekday(0);
    const month = props.firstOfMonth.month();
    let i = 0;
    const today = dayjs().startOf('d');
    while (i < 42) {
        const thisDate = current;
        buttons.push(
            <Button m={1} key={i++} disabled={current.month() !== month} style={
                current.isSame(today) ? {textDecoration: "underline", fontWeight: "800"} : {}
            } colorScheme={current.isSame(props.date) ? "blue" : "teal"}
                    onClick={() => props.onChange(thisDate)}>
                {current.date()}
            </Button>
        );
        current = current.add(1, 'd');
    }
    return <SimpleGrid columns={7}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            return <Text key={i} align="center" marginY="4px">{current.add(i, 'd').format('dd')}</Text>
        })}
        {buttons}
    </SimpleGrid>;
}

export default DateGrid;