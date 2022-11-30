import type { ReactElement } from "react";
import Layout from "components/Layout";

import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
    return <p>ㅅㄷㄴㅅ</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Page;
