import axios from "axios";

const instance = axios.create({
  baseURL: "http://183.107.31.131:8000/template",
});

export const APIS = {
  getComponentGroups: (page, size) => instance.get("/com/componentGroups", { params: { page, size } }),
  getComponentGroup: (id) => instance.get(`/com/componentGroups/${id}`),
  getComponents: (grpId) => instance.get(`/com/componentGroups/${grpId}/components`),
  createComponentGroup: (data) => instance.post("/com/componentGroups", data),
};

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

export const SCHEMA_GRID = ({ navigate }) => {
  return {
    __grid__: "grid",
    options: {
      checkbox: true,
      edit: false,
    },
    head: [
      [
        { label: "id" },
        { label: "TEXT_FIELD" },
        { label: "PASSWORD_FIELD" },
        // { label: "INTEGER_FIELD" },
        // { label: "SELECT_FIELD" },
        // { label: "RADIO_FIELD" },
        // { label: "DATE_FIELD" },
        // { label: "TEXTAREA_FIELD" },
      ],
    ],
    body: [
      [
        { cel: [{ id: "id", onClick: ({ id }) => navigate(`/page/sample/${id}`) }] },
        { cel: [{ id: "textField" }] },
        { cel: [{ id: "passwordField" }] },
        // { cel: [{ id: "integerField" }] },
        // { cel: [{ id: "selectField" }] },
        // { cel: [{ id: "radioField" }] },
        // { cel: [{ id: "dateField" }] },
        // { cel: [{ id: "textareaField" }] },
      ],
    ],
  };
};

export const SCHEMA_GRID_COMPONENTS = () => {
  return {
    __grid__: "grid",
    options: {
      checkbox: true,
      edit: false,
    },
    head: [
      [
        { label: "id" },
        { label: "TEXT_FIELD" },
        { label: "PASSWORD_FIELD" },
        { label: "INTEGER_FIELD" },
        { label: "SELECT_FIELD" },
        { label: "RADIO_FIELD" },
        { label: "DATE_FIELD" },
        { label: "TEXTAREA_FIELD" },
      ],
    ],
    body: [
      [
        { cel: [{ id: "id" }] },
        { cel: [{ id: "textField" }] },
        { cel: [{ id: "passwordField" }] },
        { cel: [{ id: "integerField" }] },
        { cel: [{ id: "selectField" }] },
        { cel: [{ id: "radioField" }] },
        { cel: [{ id: "dateField" }] },
        { cel: [{ id: "textareaField" }] },
      ],
    ],
  };
};
