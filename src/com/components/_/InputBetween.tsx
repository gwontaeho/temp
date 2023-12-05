// type InputBetweenProps = {
//   hasLeftButton?: boolean;
//   hasRightButton?: boolean;
//   edit?: boolean;
//   button?: keyof typeof BETWEEN_BUTTON_OPTIONS;
//   schema?: { [key: string]: FormControlProps };
//   setValue?: (name: string, value: any) => void;
// };

// const InputBetween = (props: InputBetweenProps) => {
//   const { edit, schema, button, setValue, hasLeftButton, hasRightButton } = props;
//   const [begin, end] = Object.entries(schema);

//   const Begin = () => {
//     const schema = { name: begin[0], ...begin[1] };
//     return (
//       <div
//         className={classNames("[&_.input]:rounded-r-none [&_.button]:rounded-r-none", {
//           "[&_.button]:rounded-l-none": hasLeftButton,
//           "flex-1": edit,
//         })}>
//         <FormControl {...schema} />
//       </div>
//     );
//   };

//   const End = () => {
//     const schema = { name: end[0], ...end[1] };
//     return (
//       <div
//         className={classNames("[&_.input]:rounded-l-none [&_.button]:rounded-l-none", {
//           "[&_.button]:rounded-r-none": button || hasRightButton,
//           "[&_.input]:rounded-r-none": button,
//           "flex-1": edit,
//         })}>
//         <FormControl {...schema} />
//       </div>
//     );
//   };

//   const Buttons = () => {
//     if (!button || !edit) return;

//     const handleClickButton = (unit: BetweenButtonOptionUnitType, value: number) => {
//       if (!setValue) return;
//       const isAdd = value > 0;
//       const today = new Date();
//       if (isAdd) {
//         setValue(begin[0], today);
//         setValue(end[0], dayjs(today).add(value, unit).toDate());
//       } else {
//         setValue(begin[0], dayjs(today).add(value, unit).toDate());
//         setValue(end[0], today);
//       }
//     };

//     return (
//       <div className="flex">
//         {BETWEEN_BUTTON_OPTIONS[button].map(({ label, unit, value }) => {
//           return (
//             <button
//               key={uuid()}
//               onClick={() => handleClickButton(unit, value)}
//               type="button"
//               className={classNames("button bg-header text-sm border-l-0 rounded-none", {
//                 "last:rounded-r": !hasRightButton,
//               })}>
//               {label}
//             </button>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className={classNames("w-full flex")}>
//       <Begin />
//       <div
//         className={classNames("flex items-center justify-center w-5", {
//           "h-7 bg-header border-y": edit,
//         })}>
//         -
//       </div>
//       <End />
//       <Buttons />
//     </div>
//   );
// };

// type BetweenButtonOptionUnitType = "M" | "w" | "d" | "h";
// type BetweenButtonOptionType = {
//   unit: BetweenButtonOptionUnitType;
//   label: string;
//   value: number;
// };
// type BetweenButtonOptionsType = { [key: string]: BetweenButtonOptionType[] };

// const BETWEEN_BUTTON_OPTIONS: BetweenButtonOptionsType = {
//   date1: [
//     { label: "-3M", unit: "M", value: -3 },
//     { label: "-1M", unit: "M", value: -1 },
//     { label: "-1W", unit: "w", value: -1 },
//     { label: "0", unit: "d", value: 1 },
//     { label: "+1W", unit: "w", value: 1 },
//     { label: "+1M", unit: "M", value: 1 },
//     { label: "+3M", unit: "M", value: 3 },
//   ],
//   date2: [
//     { label: "+1D", unit: "d", value: 1 },
//     { label: "+1W", unit: "w", value: 1 },
//     { label: "+1M", unit: "M", value: 1 },
//     { label: "+2M", unit: "M", value: 2 },
//     { label: "+3M", unit: "M", value: 3 },
//     { label: "+6M", unit: "M", value: 6 },
//     { label: "+12M", unit: "M", value: 12 },
//   ],
//   date3: [
//     { label: "-1M", unit: "M", value: -1 },
//     { label: "-1W", unit: "w", value: -1 },
//     { label: "Today", unit: "d", value: 1 },
//     { label: "+1W", unit: "w", value: 1 },
//   ],
//   time1: [
//     { label: "-3H", unit: "h", value: -3 },
//     { label: "-2H", unit: "h", value: -2 },
//     { label: "-1H", unit: "h", value: -1 },
//     { label: "+1H", unit: "h", value: 1 },
//     { label: "+2H", unit: "h", value: 2 },
//     { label: "+3H", unit: "h", value: 3 },
//   ],
// };
export {};
