import axios from "axios";

const instance = axios.create({
  baseURL: "http://183.107.31.131:8000/template",
});

export const APIS = {
  getComponentGroups: (page, size) => instance.get(`/com/componentGroups?page=${page}&size=${size}`),

  getComponentGroup: (id) => instance.get(`/com/componentGroups/${id}`),
  createComponentGroup: (data) => instance.post("/com/componentGroups", data),
  deleteComponentGroup: (id) => instance.delete(`/com/componentGroups/${id}`),
  updateComponentGroup: (id, data) => instance.put(`/com/componentGroups/${id}`, { id, ...data }),

  getComponents: (grpId) => instance.get(`/com/componentGroups/${grpId}/components`),
  createComponent: (grpId, data) => instance.post(`/com/componentGroups/${grpId}/components`, { grpId, ...data }),
  createGroupComponents: (data) => instance.post("/com/groupComponents", data),
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
  passwordField: { type: "password", label: "PASSWORD_FIELD" },
  integerField: { type: "number", label: "INTEGER_FIELD" },
  selectField: { type: "select", label: "SELECT_FIELD" },
  radioField: { type: "radio", label: "RADIO_FIELD" },
  dateField: { type: "date", label: "DATE_FIELD" },
  textareaField: { type: "textarea", label: "TEXTAREA_FIELD" },
};

export const SCHEMA_GRID = {
  __grid__: "grid",
  options: { checkbox: true, pagination: true, isReadOnly: true },
  head: [{ cells: [{ header: "id", binding: "id" }] }, { cells: [{ header: "textField", binding: "textField" }] }],
  body: [
    { cells: [{ binding: "id", link: (data) => console.log(data), width: "*" }] },
    { cells: [{ binding: "textField" }] },
  ],
};

export const SCHEMA_GRID_COMPONENTS = {
  __grid__: "grid",
  options: { pagination: "inner", isReadOnly: true },
  head: [
    { cells: [{ header: "textField" }] },
    { cells: [{ header: "passwordField" }] },
    { cells: [{ header: "integerField" }] },
    { cells: [{ header: "selectField" }] },
    { cells: [{ header: "doubleField" }] },
  ],
  body: [
    {
      colspan: 5,
      cells: [
        { binding: "textField", width: "*" },
        { binding: "passwordField", type: "password" },
        { binding: "integerField", type: "number" },
        { binding: "selectField", type: "select", options: [{ label: "a", value: "a" }] },
        { binding: "doubleField", type: "number" },
      ],
    },
  ],
};

export const SCHEMA_GRID_COMPONENTS_REGIST = {
  __grid__: "grid",
  options: { checkbox: true, pagination: "inner", add: true, remove: true },
  head: [
    { cells: [{ header: "textField" }] },
    { cells: [{ header: "passwordField" }] },
    { cells: [{ header: "integerField" }] },
    { cells: [{ header: "selectField" }] },
    { cells: [{ header: "doubleField" }] },
  ],
  body: [
    {
      colspan: 5,
      cells: [
        { binding: "textField", width: "*" },
        { binding: "passwordField", type: "password" },
        { binding: "integerField", type: "number" },
        { binding: "selectField", type: "select", options: [{ label: "a", value: "a" }] },
        { binding: "doubleField", type: "number" },
      ],
    },
  ],
};
