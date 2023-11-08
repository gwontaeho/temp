import axios from "axios";

export const SCHEMA_FORM = {
  __form__: "form",
  text_1: {
    type: "text",
    maxLength: 5,
    label: "text 필드",
  },
  number_1: { type: "number", label: "number 필드" },
  password_1: { type: "password", label: "password 필드" },
  select_1: { type: "select", label: "select 필드" },
  checkbox_1: { type: "checkbox", label: "checkbox 필드" },
  radio_1: { type: "radio", label: "radio 필드" },
  textarea_1: { type: "textarea", label: "textarea 필드" },
  date_1: { type: "date", label: "Date 필드" },
  time_1: { type: "time" },
  datetime_1: { type: "datetime" },
  datebetween_1: { type: "datebetween" },
};

export const SCHEMA_GRID = (options) => {
  console.log("a");
  console.log(options);
  return {
    __grid__: "grid",
    options: {
      checkbox: true,
      edit: true,
    },
    head: [
      [
        { label: "col1" },
        { label: "col2" },
        { label: "col3" },
        { label: "col4" },
        { label: "col5" },
        { label: "col6" },
        { label: "col7" },
      ],
    ],
    body: [
      [
        { cel: [{ id: "col1", type: "select" }] },
        { cel: [{ id: "col2" }] },
        { cel: [{ id: "col3" }] },
        { cel: [{ id: "col4" }] },
        { cel: [{ id: "col5", render: (data) => <div>col5 : {data.col5}</div> }] },
        { cel: [{ id: "col6", onClick: (data) => alert("col6 : " + data.col6) }] },
        { cel: [{ id: "col7" }] },
      ],
    ],
  };
};

export const APIS = {
  getCode: () => axios.get("http://localhost:4000/code"),
  getOption: () => axios.get(`http://localhost:4000/option/en`),
};
