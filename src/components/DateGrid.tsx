import {Box, Button, SimpleGrid} from "@chakra-ui/react";
import dayjs, {Dayjs} from "dayjs";
import "dayjs/plugin/weekday";

function DateGrid(props: { firstOfMonth: Dayjs, date: Dayjs, onChange: (date: Dayjs) => void }) {
    const buttons = [] as JSX.Element[];
    let current = props.firstOfMonth.weekday(0);
    const month = props.firstOfMonth.month();
    let i = 0;
    while (i < 42) {
        const thisDate = current;
        buttons.push(
            <Button m={1} key={i++} disabled={current.month() !== month} style={
                current.isSame(dayjs().startOf('d')) ? {textDecoration: "underline", fontWeight: "800"} : {}
            } colorScheme={current.isSame(props.date)? "blue" : undefined}
            onClick={() => props.onChange(thisDate)}>
                {current.date()}
            </Button>
        );
        current = current.add(1, 'd');
    }
    return <SimpleGrid columns={7}>
        {buttons}
    </SimpleGrid>;
}

export default DateGrid;