import { forwardRef } from "react";
import { Container } from "./styles";

export const Spacer = forwardRef((props, ref) => (
    <Container ref={ref} {...props} />
));
