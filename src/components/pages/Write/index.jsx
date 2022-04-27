import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
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
import { WEEK_OPTIONS, TIME_OPTIONS, DEFAULT_OPEN_TIME } from "../../constants";

export const Write = () => {
    const imgInputRef = useRef();

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [tipOptions, setTipOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [introduction, setIntroduction] = useState("");
    const [wayToGo, setWayToGo] = useState("");
    const [tips, setTips] = useState([]);
    const [imgs, setImgs] = useState([]);
    const [openTimes, setOpenTimes] = useState([]);

    useEffect(() => {
        axios
            .all([
                axios.get("/api/restaurants/categories"),
                axios.get("/api/restaurants/tips"),
            ])
            .then(
                axios.spread((categoriesRes, tipsRes) => {
                    setCategoryOptions(categoriesRes.data.information);
                    setTipOptions(tipsRes.data.information);
                })
            )
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        console.log(openTimes);
    }, [tips, categories, openTimes]);

    const postRestaurant = useCallback(async () => {
        try {
            const response = await axios.post("/api/restaurants", {
                name: "안녕하세요",
                categories: ["RESTAURANT"],
                introduction: "ㅎㅎ",
                wayToGo: "우리집에서 기어서 2년",
                zipcode: "123123",
                state: "아메리카ㅋ",
                city: "아메리카ㅋ",
                simpleAddress: "네ㅋ네치킨",
                detailAddress: "굽네ㅋ치킨",
                latitude: 11.11,
                longitude: 22.22,
                tipIds: [1, 2],
                openTimes: [
                    {
                        day: "MONDAY",
                        operationStart: "09:00:00",
                        operationEnd: "21:00:00",
                        breakStart: "14:00:00",
                        breakEnd: "16:00:00",
                    },
                    {
                        day: "MONDAY",
                        operationStart: "09:00:00",
                        operationEnd: "21:00:00",
                        breakStart: "14:00:00",
                        breakEnd: "16:00:00",
                    },
                    {
                        day: "TUESDAY",
                        operationStart: "09:00:00",
                        operationEnd: "21:00:00",
                        breakStart: "14:00:00",
                        breakEnd: "16:00:00",
                    },
                    {
                        day: "WEDNESDAY",
                        operationStart: "09:00:00",
                        operationEnd: "21:00:00",
                        breakStart: "14:00:00",
                        breakEnd: "16:00:00",
                    },
                    {
                        day: "THURSDAY",
                        operationStart: "09:00:00",
                        operationEnd: "21:00:00",
                        breakStart: "14:00:00",
                        breakEnd: "16:00:00",
                    },
                    {
                        day: "FRIDAY",
                        operationStart: "09:00:00",
                        operationEnd: "21:00:00",
                        breakStart: "14:00:00",
                        breakEnd: "16:00:00",
                    },
                    {
                        day: "SATURDAY",
                        operationStart: "09:00:00",
                        operationEnd: "21:00:00",
                        breakStart: "14:00:00",
                        breakEnd: "16:00:00",
                    },
                ],
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        console.log(imgs);
    }, [imgs]);

    const handleChangeImgs = useCallback((e) => {
        const newFiles = Array.from(e.target.files);
        const newImgs = newFiles.map(async (file, i) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            const preview = await new Promise((resolve) => {
                fileReader.onload = () => {
                    resolve(fileReader.result);
                };
            });
            return { key: `${new Date().getTime()}_${i}`, file, preview };
        });
        Promise.all(newImgs).then((v) => setImgs((prev) => [...prev, ...v]));
    }, []);

    const upload = useCallback(() => {
        imgs.forEach((img) => {
            const storageRef = ref(storage, `/images/${img.key}`);
            uploadBytes(storageRef, img.file).then((snapshot) => {
                console.log(snapshot);
                console.log("Uploaded a blob or file!");
            });
        });
    }, [imgs]);

    const handleClick = useCallback(
        (target) => {
            setImgs((prev) => prev.filter((img) => img.key !== target.key));
        },
        [imgs]
    );

    const handleComplete = useCallback((data) => {
        console.log(data);
        console.log("asd");
    }, []);

    return (
        <Flex vertical width="600px">
            <Modal open={open} onClose={() => setOpen(false)}>
                <div
                    style={{
                        position: "absolute",
                        width: "50%",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <DaumPostcode onComplete={handleComplete} />
                </div>
            </Modal>
            <Typography variant="h3">식당 등록</Typography>
            <Spacer size="l" />
            <TextField variant="filled" fullWidth label="이름" />
            <Spacer size="s" />
            <FormControl>
                <InputLabel>카테고리</InputLabel>
                <Select
                    variant="filled"
                    fullWidth
                    multiple
                    label="카테고리"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                >
                    {categoryOptions.map((category) => (
                        <MenuItem key={category.name} value={category.name}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Spacer size="s" />
            <TextField variant="filled" multiline fullWidth label="소개" />
            <Spacer size="s" />
            <TextField
                variant="filled"
                multiline
                fullWidth
                label="주소"
                InputProps={{
                    readOnly: true,
                }}
                onClick={() => setOpen(true)}
            />
            <Spacer size="s" />

            <TextField variant="filled" fullWidth label="가는 방법" />
            <Spacer size="s" />
            <FormControl>
                <InputLabel>팁</InputLabel>
                <Select
                    variant="filled"
                    fullWidth
                    multiple
                    label="팁"
                    value={tips}
                    onChange={(e) => setTips(e.target.value)}
                >
                    {tipOptions.map((tip) => (
                        <MenuItem key={tip.id} value={tip.id}>
                            {tip.content}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Spacer size="m" />
            <Divider />
            <Spacer size="m" />
            <Typography>운영시간</Typography>
            <Spacer size="s" />
            <Flex>
                {WEEK_OPTIONS.map((day, i) => (
                    <FormControlLabel
                        key={day}
                        control={
                            <Checkbox
                                onChange={(e) => {
                                    setOpenTimes((prev) => {
                                        let newOpenTimes = [...prev];
                                        if (e.target.checked)
                                            newOpenTimes[i] = {
                                                day,
                                                ...DEFAULT_OPEN_TIME,
                                            };
                                        else
                                            newOpenTimes.splice(
                                                i,
                                                1,
                                                undefined
                                            );
                                        return newOpenTimes;
                                    });
                                }}
                            />
                        }
                        label={day}
                    />
                ))}
            </Flex>
            <Spacer size="s" />
            <Flex vertical>
                {openTimes.map(
                    (openTime, i) =>
                        openTime && (
                            <Flex
                                key={openTime.day}
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <div>{openTime.day}</div>
                                <Flex vertical>
                                    <Flex
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography>영업 시간</Typography>
                                        <Flex>
                                            <Select
                                                variant="filled"
                                                value={openTime.operationStart}
                                                onChange={(e) => {
                                                    setOpenTimes((prev) => {
                                                        let newOpenTimes = [
                                                            ...prev,
                                                        ];
                                                        newOpenTimes[
                                                            i
                                                        ].operationStart =
                                                            e.target.value;
                                                        return newOpenTimes;
                                                    });
                                                }}
                                            >
                                                {TIME_OPTIONS.map((time) => (
                                                    <MenuItem
                                                        key={time.value}
                                                        value={time.value}
                                                    >
                                                        {time.text}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <Select
                                                variant="filled"
                                                value={openTime.operationEnd}
                                                onChange={(e) => {
                                                    setOpenTimes((prev) => {
                                                        let newOpenTimes = [
                                                            ...prev,
                                                        ];
                                                        newOpenTimes[
                                                            i
                                                        ].operationEnd =
                                                            e.target.value;
                                                        return newOpenTimes;
                                                    });
                                                }}
                                            >
                                                {TIME_OPTIONS.map((time) => (
                                                    <MenuItem
                                                        key={time.value}
                                                        value={time.value}
                                                    >
                                                        {time.text}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Flex>
                                    </Flex>
                                    <Flex
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography>브레이크 타임</Typography>
                                        <Flex>
                                            <Select
                                                variant="filled"
                                                value={openTime.breakStart}
                                            >
                                                {TIME_OPTIONS.map((time) => (
                                                    <MenuItem
                                                        key={time.value}
                                                        value={time.value}
                                                    >
                                                        {time.text}
                                                    </MenuItem>
                                                ))}
                                            </Select>

                                            <Select
                                                variant="filled"
                                                value={openTime.breakEnd}
                                            >
                                                {TIME_OPTIONS.map((time) => (
                                                    <MenuItem
                                                        key={time.value}
                                                        value={time.value}
                                                    >
                                                        {time.text}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                )}
            </Flex>
            <Spacer size="m" />
            <Divider />
            <Spacer size="m" />
            <Typography>이미지</Typography>
            <Spacer size="s" />
            <input
                ref={imgInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={(e) => handleChangeImgs(e)}
            />
            <Button
                variant="contained"
                onClick={() => imgInputRef.current.click()}
            >
                업로드
            </Button>
            <ImageList cols={3} gap={20}>
                {imgs.map((img) => (
                    <ImageListItem key={img.key}>
                        <img src={img.preview} loading="lazy" />
                        <IconButton
                            size="large"
                            color="error"
                            style={{ position: "absolute", right: 0 }}
                            onClick={() => handleClick(img)}
                        >
                            <RemoveCircleOutlineIcon fontSize="inherit" />
                        </IconButton>
                    </ImageListItem>
                ))}
            </ImageList>
            <div onClick={upload}>dasdasd</div>
        </Flex>
    );
};
