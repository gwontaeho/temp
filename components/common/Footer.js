import { Stack, Typography } from "@mui/material";

export const Footer = () => {
    return (
        <Stack height={120} direction="row" alignItems="center" bgcolor="spirokit.footer" justifyContent="space-between" px={10}>
            <Stack />
            <Stack color="#fff">
                <Typography variant="body2">상호 : 주식회사 티알 / 대표 : 김병수 사업자등록번호 : 685-86-01518</Typography>
                <Typography variant="body2">대전광역시 유성구 대학로 99, 대전팁스타운 405호(궁동, 충남대학교) 전화 : 042-719-8823</Typography>
                <Typography variant="body2">이메일 : qodtn11@theresearcher.co.kr</Typography>
            </Stack>
        </Stack>
    );
};
