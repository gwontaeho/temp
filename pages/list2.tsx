import type { ReactElement } from "react";
import Layout from "components/Layout";

import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
    return <p>리스트</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Page;
