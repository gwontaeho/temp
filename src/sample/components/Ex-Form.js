import { useEffect } from "react";
import { Group, Button, Layout, FormControl } from "@/com/components";
import { useForm } from "@/com/hooks";

// type FormControlType =
//   | "text"
//   | "number"
//   | "password"
//   | "select"
//   | "radio"
//   | "checkbox"
//   | "textarea"
//   | "date"
//   | "time"
//   | "datetime"
//   | "file"
//   | "between";

const SCHEMA_SEARCH = {
  id: "search",
  schema: {
    text: { type: "text", label: "text" },
    number: { type: "number", label: "number" },
    password: { type: "password", label: "password" },
    textarea: { type: "textarea", label: "textarea" },
    select: { type: "select", label: "select" },
    checkbox: { type: "checkbox", label: "checkbox" },
    radio: { type: "radio", label: "radio" },
    date: { type: "date", label: "date" },
    time: { type: "time", label: "time" },
    datetime: { type: "datetime", label: "datetime" },
    range: {
      type: "range",
      label: "range",
      schema: {
        start: { type: "date" },
        end: { type: "date" },
      },
    },
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

export const ExForm = () => {
  const {
    schema,
    setSchema,
    setFocus,
    setEditable,
    getValues,
    handleSubmit,
    setValue,
    clearErrors,
    resetSchema,
    validate,
    clearValues,
  } = useForm({ defaultSchema: SCHEMA_SEARCH });

  console.log(schema);

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {}, []);

  const etr = (v) => {
    setEditable(v);
  };

  return (
    <Layout>
      <Group>
        <Group.Header>Form Example</Group.Header>
        <form>
          <Group.Body>
            <Group.Row>
              <Group.Control {...schema.text} />
              <Group.Control {...schema.number} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.password} />
              <Group.Control {...schema.textarea} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.select} />
              <Group.Control {...schema.checkbox} />
            </Group.Row>

            <Group.Row>
              <Group.Control {...schema.radio} />
              <Group.Control {...schema.date} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.time} />
              <Group.Control {...schema.datetime} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.range} controlSize={10} />
            </Group.Row>
            {/* <Group.Row>
              <Group.Control {...schema.timerange} />
            </Group.Row> */}
          </Group.Body>
        </form>

        <Layout.Right>
          <Button onClick={resetSchema}>reset schema</Button>
          <Button onClick={() => setValue("text_1", "test123")}>set text_1</Button>
          <Button onClick={() => setSchema("text_1", { type: "text" })}>text_1 to text</Button>
          <Button onClick={() => setSchema("text_1", { type: "textarea" })}>text_1 to textarea</Button>
          <Button onClick={() => setSchema("text_1", { required: true })}>text_1 required true</Button>
          <Button onClick={() => setSchema("text_1", { required: false })}>text_1 required false</Button>
          <Button onClick={() => setSchema("text_1", { leftText: null })}>remove text_1 lefttext</Button>
        </Layout.Right>
        <Layout.Right>
          <Button onClick={() => setFocus("date")}>focus</Button>
          <Button onClick={() => clearErrors()}>에러 초기화</Button>
          <Button onClick={clearValues}>값 초기화</Button>
          <Button onClick={etr}>edit true</Button>
          <Button onClick={() => etr(false)}>edit false</Button>
          <Button onClick={() => setEditable("between3", false)}>bt3 edit false</Button>
          <Button onClick={validate}>validate</Button>
          <Button onClick={() => console.log(getValues())}>get values</Button>
          <Button onClick={() => console.log(getValues("text_1"))}>get text_1</Button>
        </Layout.Right>
      </Group>
    </Layout>
  );
};
