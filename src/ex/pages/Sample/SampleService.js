import axios from "axios";

const instance = axios.create({
  baseURL: "http://183.107.31.131:8000/template",
});

export const APIS = {
  getComponentGroups: (page, size) => instance.get(`/com/componentGroups?page=${page}&size=${size}`),
  getComponentGroup: (id) => instance.get(`/com/componentGroups/${id}`),
  getComponents: (grpId) => instance.get(`/com/componentGroups/${grpId}/components`),
  createComponentGroup: (data) => instance.post("/com/componentGroups", data),
  createComponent: (grpId, data) => instance.post(`/com/componentGroups/${grpId}/components`, { grpId, ...data }),
};

export const OPTIONS = [
  { label: "", value: "" },
  { label: "a", value: "a" },
  { label: "b", value: "b" },
  { label: "c", value: "c" },
  { label: "d", value: "d" },
];

export const SCHEMA_FORM = {
  __form__: "form",
  con1: { type: "text", label: "검색조건 1" },
  con2: { type: "select", label: "검색조건 2" },
  _con34: {
    type: "between",
    label: "검색조건 3",
    options: "date1",
    schema: { con3: { type: "date", label: "검색조건 1" }, con4: { type: "date", label: "검색조건 2" } },
  },
};

export const SCHEMA_FORM_REGIST = {
  __form__: "form",
  textField: { type: "text", label: "TEXT_FIELD", required: true },
  passwordField: { type: "password", label: "PASSWORD_FIELD", required: true },
  integerField: { type: "number", label: "INTEGER_FIELD", required: true },
  selectField: { type: "select", label: "SELECT_FIELD", required: true },
  radioField: { type: "radio", label: "RADIO_FIELD", required: true },
  dateField: { type: "date", label: "DATE_FIELD" },
  textareaField: { type: "textarea", label: "TEXTAREA_FIELD" },
};

export const SCHEMA_GRID = {
  __grid__: "grid",
  options: { checkbox: true, pagination: true },
  head: [[{ header: "a" }], [{ header: "d" }], [{ header: "e" }], [{ header: "f" }], [{ header: "e" }]],
  body: [
    {
      colspan: 5,
      cells: [
        { binding: "id" },
        { binding: "doubleField", type: "number" },
        { binding: "integerField", type: "number" },
        { binding: "passwordField" },
        { binding: "selectField", type: "select", options: [{ label: "a", value: "a" }] },
      ],
    },
  ],
};

export const SCHEMA_GRID_COMPONENTS = {
  __grid__: "grid",
  options: { checkbox: true, pagination: "inner", add: true, remove: true },
  head: [
    [{ header: "textField" }],
    [{ header: "passwordField" }],
    [{ header: "integerField" }],
    [{ header: "selectField" }],
    [{ header: "doubleField" }],
  ],
  body: [
    {
      colspan: 5,
      cells: [
        { binding: "textField" },
        { binding: "passwordField", type: "password" },
        { binding: "integerField", type: "number" },
        { binding: "selectField", type: "select", options: [{ label: "a", value: "a" }] },
        { binding: "doubleField", type: "number" },
      ],
    },
  ],
};
