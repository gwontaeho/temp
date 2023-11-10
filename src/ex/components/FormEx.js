import { Group } from "@/components";
import { useForm } from "@/hooks";

const SCHEMA_SEARCH = {
  __form__: "search",
  text_1: { type: "text", maxLength: 5, label: "text 필드", required: true },
  number_1: { type: "number", label: "number 필드", required: true },
  password_1: { type: "password", label: "password 필드", required: true },
  select_1: { type: "select", label: "select 필드", required: true },
  checkbox_1: { type: "checkbox", label: "checkbox 필드", required: true },
  radio_1: { type: "radio", label: "radio 필드", required: true },
  textarea_1: { type: "textarea", label: "textarea 필드", required: true },
  date_1: { type: "date", label: "Date 필드", required: true },
  time_1: { type: "time", label: "time 필드", required: true },
  datetime_1: { type: "datetime", label: "datetime", required: true },
  between: {
    type: "between",
    label: "bw d",
    options: "date1",
    schema: { begin1: { type: "date", required: true }, end1: { type: "date", required: true } },
  },
  between1: {
    type: "between",
    label: "bw t",
    options: "date1",
    schema: { begin2: { type: "date" }, end2: { type: "date" } },
  },
  between2: {
    type: "between",
    label: "bw dt",
    options: "date1",
    schema: { begin3: { type: "date" }, end3: { type: "date" } },
  },
  file: {
    type: "file",
    required: true,
  },
};

const OPTION = [
  { label: "", value: "" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "6" },
];

export const FormEx = () => {
  const { schema, getValues, handleSubmit } = useForm({ defaultSchema: SCHEMA_SEARCH });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <Group.Control {...schema.between} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.between1} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.between2} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.between2} />
            </Group.Row>
            <Group.Row>
              <Group.Control />
              <Group.Control />
              <Group.Control />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.file} />
              <Group.Button size={4}>삭제</Group.Button>
            </Group.Row>
          </Group.Body>
          <Group.Footer>
            <Group.Left>
              <Group.Button>초기화</Group.Button>
            </Group.Left>
            <Group.Right>
              <Group.Button size={2}>삭제</Group.Button>
              <Group.Button>수정</Group.Button>
              <Group.Button onClick={() => console.log(getValues())}>목록</Group.Button>
            </Group.Right>
          </Group.Footer>
        </Group>
        <button>submit</button>
      </form>

      <div></div>
    </div>
  );
};
