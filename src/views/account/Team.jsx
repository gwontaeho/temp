import { Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SubscriptionIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";

export default function Team() {
    const navigate = useNavigate();

    const isExisted = false;

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center">
                <Typography variant="h2">
                    {SubscriptionIcon()}
                    <label style={{ marginLeft: "0.8rem" }}>기관정보</label>
                </Typography>
                {isExisted && <Button color="primary">수정</Button>}
            </Stack>
            <MainCard>
                {isExisted ? (
                    <Stack direction="row">
                        <Stack sx={{ borderRadius: 2, bgcolor: "#eee", width: 160, "*": { height: 80, alignItems: "center", display: "flex", p: 3 } }}>
                            <Typography>기관명</Typography>
                            <Typography>사업자등록번호</Typography>
                            <Typography>대표자 이름</Typography>
                            <Typography>대표번호</Typography>
                            <Typography>주소</Typography>
                            <Typography>U2Check 연계</Typography>
                        </Stack>
                        <Stack sx={{ "& > *": { height: 80, alignItems: "center", display: "flex", p: 3 } }}>
                            <Typography>유투바이오</Typography>
                            <Typography>123-45-789-10</Typography>
                            <Typography>홍길동</Typography>
                            <Typography>1577-1338</Typography>
                            <Typography>서울특별시 거마로 65 여명빌딩 유투바이오</Typography>
                            <Typography>인증완료</Typography>
                        </Stack>
                    </Stack>
                ) : (
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>등록된 기관 정보가 없습니다.</Typography>
                        <Button color="primary" onClick={() => navigate("/account/team/create")}>
                            기관 등록
                        </Button>
                    </Stack>
                )}
            </MainCard>
        </Stack>
    );
}
