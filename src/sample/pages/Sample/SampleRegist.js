import { useNavigate } from "react-router-dom";
import { Wijmo, Group, Layout, Tab } from "@/components";
import { useForm, useWijmo, useFetch, useModal, useToast } from "@/hooks";
import { SCHEMA_FORM_REGIST, SCHEMA_GRID_COMPONENTS, APIS } from "./SampleService";

const options1 = [
    { label: "s1", value: "s1" },
    { label: "s2", value: "s2" },
    { label: "s3", value: "s3" },
];

const option2 = [
    { label: "r1", value: "r1" },
    { label: "r2", value: "r2" },
    { label: "r3", value: "r3" },
];

export const SampleRegist = () => {
    const navigate = useNavigate();
    const { showModal } = useModal();
    const { showToast } = useToast();

    const { schema, handleSubmit } = useForm({ defaultSchema: SCHEMA_FORM_REGIST });
    const grid1 = useWijmo({ defaultSchema: SCHEMA_GRID_COMPONENTS });
    const grid2 = useWijmo({ defaultSchema: SCHEMA_GRID_COMPONENTS });
    const grid3 = useWijmo({ defaultSchema: SCHEMA_GRID_COMPONENTS });

    const cc = useFetch({
        api: [
            (grpId) => APIS.createComponent(grpId, grid1.getData()[0]),
            (grpId) => APIS.createComponent(grpId, grid2.getData()[0]),
            (grpId) => APIS.createComponent(grpId, grid3.getData()[0]),
        ],
    });

    const { data, fetchData } = useFetch({
        api: APIS.createComponentGroup,
        onSuccess: (data) => {
            const grpId = data.id;
            cc.fetchData(grpId);
        },
    });

    const handleRegist = () => {
        handleSubmit((data) => {
            showModal({
                message: "그룹을 등록",
                onConfirm: () => fetchData(data),
            });
        })();
    };

    return (
        <Layout>
            <Group>
                <Group.Header>등록페이지</Group.Header>
                <Group.Body>
                    <Group.Row>
                        <Group.Control {...schema.textField} />
                        <Group.Control {...schema.passwordField} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...schema.integerField} />
                        <Group.Control {...schema.selectField} options={options1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...schema.dateField} />
                        <Group.Control {...schema.radioField} options={option2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...schema.textareaField} />
                    </Group.Row>
                </Group.Body>
                <Group.Section>
                    <Group.Left>
                        <Group.Button onClick={() => navigate("/page/sample")}>목록</Group.Button>
                        <Group.Button>초기화</Group.Button>
                    </Group.Left>
                    <Group.Right>
                        <Group.Button onClick={handleRegist}>저장</Group.Button>
                    </Group.Right>
                </Group.Section>
            </Group>

            <Group>
                <Tab tab={["첫번째", "두번째", "세번째"]}>
                    <Tab.Panel>
                        <Wijmo {...grid1.grid} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <Wijmo {...grid2.grid} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <Wijmo {...grid3.grid} />
                    </Tab.Panel>
                </Tab>
            </Group>
        </Layout>
    );
};
