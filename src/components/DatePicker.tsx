import {Dayjs} from "dayjs";
import {Box} from "@chakra-ui/react";
import MonthPicker from "./MonthPicker";
import DateGrid from "./DateGrid";
import {useState} from "react";

function DatePicker(props: { date: Dayjs, onChange: (date: Dayjs) => void }) {
    const [date, setDate] = useState(() => props.date);
    const [firstOfMonth, setFirstOfMonth] = useState(() => props.date.startOf('M'));

    return <Box>
        <MonthPicker date={firstOfMonth} onChange={(date) => setFirstOfMonth(date)}/>
        <DateGrid date={date} firstOfMonth={firstOfMonth} onChange={date => {
            props.onChange(date);
            setDate(date);
        }}/>
    </Box>;
}

export default DatePicker;