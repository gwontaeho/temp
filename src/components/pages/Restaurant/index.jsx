import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    ImageList,
    ImageListItem,
    Modal,
    Checkbox,
    FormControlLabel,
    FormControl,
    InputLabel,
    Divider,
} from "@mui/material";
import { Flex, Spacer } from "../../atoms";

export const Restaurant = () => {
    const params = useParams();

    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        axios
            .get(`/api/restaurants/${params.id}`)
            .then((response) => setRestaurant(response.data.information))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Flex vertical>
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
