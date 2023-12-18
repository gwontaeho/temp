interface IhireSituation {
  date: string;
  status: "채용중" | "계약만료";
  personName: string;
  form: string;
  terms: string;
  time: string;
  dayOfWeek: string;
  pay: string;
}
