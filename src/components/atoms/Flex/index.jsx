import { forwardRef } from "react";
import { Container } from "./styles";

export const Flex = forwardRef((props, ref) => (
    <Container ref={ref} {...props} />
));
