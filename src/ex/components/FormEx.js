import { Group } from "@/components";
import { useForm } from "@/hooks";
import { useEffect } from "react";

const SCHEMA_SEARCH = {
  __form__: "search",
  text_1: { type: "text", maxLength: 5, label: "text", required: true },
  number_1: { type: "number", label: "number", validate: (e) => e > 4 },
  password_1: { type: "password", label: "password", required: true },
  select_1: { type: "select", label: "select", required: true },
  checkbox_1: { type: "checkbox", label: "checkbox", required: true },
  radio_1: { type: "radio", label: "radio", required: true },
  textarea_1: { type: "textarea", label: "textarea", required: true },
  date_1: { type: "date", label: "Date", required: true },
  time_1: { type: "time", label: "time", required: true },
  datetime_1: { type: "datetime", label: "datetime", required: true },
  file: { type: "file", required: true },
  between: {
    type: "between",
    label: "between 1",
    options: "date1",
    schema: { begin1: { type: "date", required: true }, end1: { type: "date", required: true } },
  },
  between1: {
    type: "between",
    label: "between 2",
    options: "date2",
    schema: { begin2: { type: "date" }, end2: { type: "date" } },
  },
  between2: {
    type: "between",
    label: "between 3",
    options: "date3",
    schema: { begin3: { type: "date" }, end3: { type: "date" } },
  },
};

const OPTION = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
];

export const FormEx = () => {
  const {
    schema,
    setSchema,
    setEditable,
    getValues,
    handleSubmit,
    setValue,
    clearErrors,
    resetSchema,
    validate,
    clearValues,
  } = useForm({ defaultSchema: SCHEMA_SEARCH });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {}, []);

  const etr = (v) => {
    setEditable(v);
  };

  return (
    <div className="space-y-4">
      <Group>
        <Group.Header>Form Example</Group.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <Group.Control {...schema.between} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.between1} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.between2} />
            </Group.Row>
            <Group.Row>
              <Group.Label />
            </Group.Row>
          </Group.Body>
        </form>
        <Group.Footer>
          <Group.Right>
            <Group.Button onClick={resetSchema}>reset schema</Group.Button>
            <Group.Button onClick={() => setSchema("text_1", { type: "text" })}>text_1 to text</Group.Button>
            <Group.Button onClick={() => setSchema("text_1", { type: "textarea" })}>text_1 to textarea</Group.Button>
            <Group.Button onClick={() => setSchema("text_1", { required: true })}>text_1 required true</Group.Button>
            <Group.Button onClick={() => setSchema("text_1", { required: false })}>text_1 required false</Group.Button>
          </Group.Right>
        </Group.Footer>
        <Group.Footer>
          <Group.Right>
            <Group.Button onClick={() => clearErrors()}>에러 초기화</Group.Button>
            <Group.Button onClick={clearValues}>값 초기화</Group.Button>
            <Group.Button onClick={etr}>edit true</Group.Button>
            <Group.Button onClick={() => etr(false)}>edit false</Group.Button>
            <Group.Button onClick={validate}>validate</Group.Button>
            <Group.Button onClick={() => console.log(getValues())}>get values</Group.Button>
            <Group.Button onClick={() => console.log(getValues("text_1"))}>get text_1</Group.Button>
          </Group.Right>
        </Group.Footer>
      </Group>
    </div>
  );
};
