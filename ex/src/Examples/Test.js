import { useForm, useFieldArray } from "react-hook-form";
import uuid from "react-uuid";

export const Test = () => {
  const { register, getValues, control } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const a = useForm();

  return (
    <div>
      <div className="space-y-4">
        {/* {fields.map((field, index) => {
          return <input className="border" {...register(`test.${index}.cc`)} />;
        })} */}
      </div>

      {/* <input {...register("a")} />
      <input {...register("b")} />
      <input {...register("c")} />
      <input {...register("d")} />
      <input {...register("aa")} type="checkbox" value="a" />
      <input {...register("aa")} type="checkbox" value="ab" />
      <input {...register("aa")} type="checkbox" value="ac" />
      <input {...register("aa")} type="checkbox" value="ad" />
      <input {...register("aa")} type="checkbox" value="af" />
      <input {...register("bb")} />
      <input {...register("cc")} type="radio" value="sc" />
      <input {...register("cc")} type="radio" value="sc" />
      <input {...register("cc")} type="radio" value="sc" />
      <input {...register("cc")} type="radio" value="sc" />
      <input {...register("cc")} type="radio" value="sc" /> */}

      <div className="space-x-4">
        <button onClick={() => append({ asdqw: "asd" })}>asdas</button>
        <button onClick={() => remove(0)}>remove</button>
        <button onClick={() => console.log(getValues())}>asdas</button>
      </div>
    </div>
  );
};
