import NotoSansRegular from '../assets/fonts/NotoSansKR-Regular.otf';
import NotoSansMedium from '../assets/fonts/NotoSansKR-Medium.otf';
import NotoSansBold from '../assets/fonts/NotoSansKR-Bold.otf';
import NanumBold from '../assets/fonts/NanumSquareRoundOTFB.otf';
import NanumExtraBold from '../assets/fonts/NanumSquareRoundOTFEB.otf';

let fontLoading = `
@font-face {
	font-family: 'Noto Sans KR';
	font-weight: 400;
	src: url(${NotoSansRegular}) format('truetype')
}
@font-face {
	font-family: 'Noto Sans KR';
	font-weight: 500;
	src: url(${NotoSansMedium}) format('truetype')
}
@font-face {
	font-family: 'Noto Sans KR';
	font-weight: 700;
	src: url(${NotoSansBold}) format('truetype')
}

@font-face {
	font-family: 'NanumSquareRound';
	font-weight: 500;
	src: url(${NanumBold}) format('truetype')
}
@font-face {
	font-family: 'NanumSquareRound';
	font-weight: 900;
	src: url(${NanumExtraBold}) format('truetype')
}
`;

export default fontLoading;
