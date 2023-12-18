import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Typography, Modal } from "@mui/material";
import { Flex, Spacer } from "../../atoms";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
};

export const Restaurant = () => {
    const params = useParams();

    const [restaurant, setRestaurant] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios
            .get(`/api/restaurants/${params.id}`)
            .then((response) => setRestaurant(response.data.information))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Flex vertical>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Flex style={style}>asd</Flex>
            </Modal>
            <div onClick={() => setOpen(true)}>열기</div>
            <Typography variant="h6">미나리 해장국</Typography>
            <Typography variant="h5">카테고리</Typography>
            <Typography variant="h6">카페, 레스토랑</Typography>
            <Spacer />
            <Typography variant="h5">가는길</Typography>
            <Typography variant="h6">뿌빠ㅏ빠</Typography>
            <Spacer />
            <Typography variant="h5">이용팁</Typography>
            <Typography variant="h6">뿌빠ㅏ빠</Typography>
            <Spacer />
            <Typography variant="h5">소개</Typography>
            <Typography variant="h6">뿌빠ㅏ빠</Typography>
            <Spacer />
            <Typography variant="h5">주소</Typography>
            <Typography variant="h6">뿌빠ㅏ빠</Typography>
            <Spacer />
            <Typography variant="h5">이용가능시간</Typography>
            <Typography variant="h6">뿌빠ㅏ빠</Typography>
        </Flex>
    );
};
