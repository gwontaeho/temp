import { useNavigate } from "react-router-dom";
import { Group, Layout, Wijmo, Navigation, PageHeader, Button } from "@/components";
import { useForm, useFetch, useWijmo } from "@/hooks";
import { OPTIONS, SCHEMA_FORM, SCHEMA_GRID, APIS } from "./SampleService";

export const Sample = () => {
    const navigate = useNavigate();

    const { grid, page, size } = useWijmo({ defaultSchema: SCHEMA_GRID });
    const { schema, handleSubmit, isSubmitted } = useForm({ defaultSchema: SCHEMA_FORM });

    const { data, fetchData, isSuccess } = useFetch({
        api: () => APIS.getComponentGroups(page, size),
        enabled: isSubmitted,
        key: [page, size],
    });

    console.log(data);

    const onSubmit = (data) => {
        fetchData();
    };

    return (
        <Layout>
            <Navigation nodes={[{ label: "a", path: "a" }]} />
            <PageHeader title="페이지 타이틀입니다" description="페이지 설명입니다" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...schema.con1} />
                            <Group.Control {...schema.con2} options={OPTIONS} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...schema._con34} controlSize={10} />
                        </Group.Row>
                    </Group.Body>
                    <Layout.Right>
                        <Button onClick={() => navigate("/page/sample/regist")}>등록</Button>
                        <Button type="submit">검색</Button>
                    </Layout.Right>
                </Group>
            </form>

            <Group>
                <Group.Header>조회결과</Group.Header>
                <Layout.Left>
                    <Button>엑셀업로드</Button>
                    <Button>엑셀다운로드</Button>
                </Layout.Left>
                <Wijmo {...grid} data={data} />
            </Group>
        </Layout>
    );
};
