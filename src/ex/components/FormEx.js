import { Group } from "@/components";
import { useForm } from "@/hooks";

const SCHEMA_SEARCH = {
  __form__: "search",
  text_1: { type: "text", maxLength: 5, label: "text 필드", required: true },
  number_1: { type: "number", label: "number 필드" },
  password_1: { type: "password", label: "password 필드" },
  select_1: { type: "select", label: "select 필드" },
  checkbox_1: { type: "checkbox", label: "checkbox 필드" },
  radio_1: { type: "radio", label: "radio 필드" },
  textarea_1: { type: "textarea", label: "textarea 필드" },
  date_1: { type: "date", label: "Date 필드" },
  time_1: { type: "time", label: "time 필드" },
  datetime_1: { type: "datetime", label: "datetime" },
  between: { type: "between", label: "bw d", schema: { begin1: { type: "date" }, end1: { type: "date" } } },
  between1: { type: "between", label: "bw t", schema: { begin2: { type: "date" }, end2: { type: "date" } } },
  between2: { type: "between", label: "bw dt", schema: { begin3: { type: "date" }, end3: { type: "date" } } },
};

const OPTION = [
  { label: "1", value: "1" },
  { label: "2", value: "3" },
  { label: "2", value: "3" },
];

export const FormEx = () => {
  const { schema, getValues } = useForm({ defaultSchema: SCHEMA_SEARCH });

  return (
    <div className="space-y-4">
      <Group>
        <Group.Header>Form Example</Group.Header>
        <Group.Body>
          <Group.Row>
            <Group.Control {...schema.text_1} />
            <Group.Control {...schema.number_1} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.password_1} />
            <Group.Control {...schema.select_1} options={OPTION} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.checkbox_1} options={OPTION} />
            <Group.Control {...schema.radio_1} options={OPTION} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.textarea_1} />
            <Group.Control {...schema.date_1} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.time_1} />
            <Group.Control {...schema.datetime_1} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.time_1} />
            <Group.Control {...schema.datetime_1} />
          </Group.Row>
          <Group.Row>
            <Group.Col label="aa">asd</Group.Col>
            <Group.Col label="bbbb">asdqwd</Group.Col>
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.between} options="date1" />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.between1} options="date2" />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.between2} options="date3" />
          </Group.Row>
        </Group.Body>
        <Group.Footer>
          <Group.Left>
            <Group.Button>초기화</Group.Button>
          </Group.Left>
          <Group.Right>
            <Group.Button>삭제</Group.Button>
            <Group.Button>수정</Group.Button>
            <Group.Button onClick={() => console.log(getValues())}>목록</Group.Button>
          </Group.Right>
        </Group.Footer>
      </Group>
    </div>
  );
};
