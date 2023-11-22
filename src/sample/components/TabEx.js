import { Layout, Tab } from "@/com/components";
import { FormEx } from "./FormEx";
import { TreeEx } from "./TreeEx";

export const TabEx = () => {
  return (
    <Layout>
      <Tab tab={["tab1", "tab2", "tab3"]}>
        <Tab.Panel>
          <FormEx />
        </Tab.Panel>
        <Tab.Panel>
          <FormEx />
        </Tab.Panel>
        <Tab.Panel>
          <TreeEx />
        </Tab.Panel>
      </Tab>
    </Layout>
  );
};
