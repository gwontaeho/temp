"use client";
import { NumericFormat } from "react-number-format";

export const Price = ({ price, className }) => {
    return (
        <NumericFormat
            value={price}
            thousandSeparator=","
            displayType="text"
            renderText={(v) => <p className={className}>{!!price ? `${v}원` : "계약 시 협의"}</p>}
        />
    );
};
