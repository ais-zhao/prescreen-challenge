import { useMemo } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export enum InputStatus {
    NORAML = "normal",
    RIGHT = "right",
    WRONG = "wrong",
}

interface Props extends TextInputProps {
    status?: InputStatus;
}


export default function InputArea({ status = InputStatus.NORAML, ...rest }: Props) {

    const textInputStyle = useMemo(() => {
        switch (status) {
            case InputStatus.NORAML:
                return styles.textInput;
            case InputStatus.RIGHT:
                return [styles.textInput, styles.right];
            case InputStatus.WRONG:
                return [styles.textInput, styles.wrong];

            default:
                break;
        }
    }, [status])

    return <TextInput
        style={textInputStyle}
        multiline
        {...rest}
    />
}

const styles = StyleSheet.create({
    textInput: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    right: {
        borderColor: 'green',
        color: 'green',
    },
    wrong: {
        borderColor: 'red',
        color: 'red',
    }
})