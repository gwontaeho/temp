import styled from "@emotion/styled";

const getSize = (size) => {
    switch (size) {
        case "l":
            return 30;
        case "s":
            return 10;
        default:
            return 20;
    }
};

export const Container = styled.div`
    margin: ${(props) =>
        props.vertical
            ? `0 ${getSize(props.size)}px`
            : `${getSize(props.size)}px 0`};
`;
