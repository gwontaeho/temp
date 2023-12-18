import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    width: ${(props) => props.width};
    max-width: ${(props) => props.maxWidth};
    flex-direction: ${(props) => props.vertical && "column"};
    align-items: ${(props) => props.alignItems};
    justify-content: ${(props) => props.justifyContent};
`;
