import { Group, Tab } from "@/components";
import { FormEx } from "./FormEx";
import { GridEx } from "./GridEx";

export const TabEx = () => {
  return (
    <div>
      <Tab tab={["tab1", "tab2", "tab3"]}>
        <Tab.Panel>
          <FormEx />
        </Tab.Panel>
        <Tab.Panel>
          <FormEx />
        </Tab.Panel>
        <Tab.Panel>
          <FormEx />
        </Tab.Panel>
      </Tab>
    </div>
  );
};
