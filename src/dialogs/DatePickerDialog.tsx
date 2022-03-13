import dayjs, {Dayjs} from "dayjs";
import {createRef, useState} from "react";
import {Box, Button, Flex, FormControl, FormErrorMessage, Input, ModalBody, ModalContent} from "@chakra-ui/react";
import DatePicker from "../components/DatePicker";
import {MdClear} from "react-icons/all";

function DatePickerDialog(props: { date: Dayjs, onChange: (date: Dayjs) => void }) {
    const [text, setText] = useState('')
    const [error, setError] = useState<string>();
    const input = createRef<HTMLInputElement>()

    function submitText() {
        let t = text.replaceAll(/[^0-9]+/ig, " ");
        t.trim();
        let parts = t.split(' ').filter(it => it.length).map(it => parseInt(it));
        console.log(JSON.stringify(parts));
        if (parts.length === 0 || parts.length > 3) {
            setError('Please enter a valid date');
            return;
        }
        let date = dayjs().startOf('d');
        if (parts[0] === 0 || parts[0] > 31) {
            setError('Day should be between 1 and 31');
            return;
        }
        date = date.set('date', parts[0]);
        if (parts.length > 1) {
            if (parts[1] === 0 || parts[1] > 12) {
                setError('Month should be between 1 and 12');
                return;
            }
            date = date.set('month', parts[1] - 1);
            if (parts.length > 2) {
                if (parts[2] < 100) parts[2] += 2000;
                if (parts[2] < 1900 || parts[2] > 2200) {
                    setError('Year should be between 1900 and 2200');
                    return;
                }
                date = date.set('year', parts[2]);
            }
        }
        props.onChange(date);
    }

    return <ModalContent>
        <ModalBody p="12px">
            <DatePicker date={props.date} onChange={props.onChange}/>
            <Box h="8px"/>
            <FormControl isInvalid={error !== undefined}>
                <Flex gap="8px">
                    <Flex direction="column" flexGrow={1}>
                        <Input placeholder="Enter Date" autoFocus={true} value={text} onKeyPress={e => {
                            if (e.key === 'Enter') submitText();
                        }} onChange={e => setText(e.target.value)} ref={input}/>
                        <FormErrorMessage m="0" marginLeft="4px">{error}</FormErrorMessage>
                    </Flex>
                    <Button flexShrink={0} colorScheme="blue" onClick={() => {
                        setText('');
                        setError(undefined);
                        input.current?.focus();
                    }}><MdClear/></Button>
                    <Button colorScheme="blue" onClick={submitText}>Select</Button>
                </Flex>
            </FormControl>
        </ModalBody>
    </ModalContent>
}

export default DatePickerDialog