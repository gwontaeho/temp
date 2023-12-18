import NextBtnArea from "components/common/enroll/nextBtnArea";
import { useJobPost } from "hooks/useJobPost";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
import { api, eps } from "utils/config";
import styles from "./detailContent.module.scss";
import ProcessBarArea from "./prodessBarArea";

interface Iprops {
  uuid: string;
  process: number;
  setProcess: Function;
}

export default function DetailContent({ uuid, process, setProcess }: Iprops) {
  const [value, setValue] = useState("");
  const { state } = useLocation();
  const { data } = useJobPost(state?.uuid);

  const { handleSubmit } = useForm({});

  useEffect(() => {
    if (data) {
      setValue(data.note);
    }
  }, [data]);

  function handleChange(content: any, delta: any, source: any, editor: any) {
    setValue(content);
  }

  async function onSubmit() {
    try {
      let data = {
        note_: value,
      };
      await api.put(eps["REGISTER_JOB"] + `/uuid/${uuid}`, data);
    } catch (err) {
      console.log(err);
    }
    setProcess(90);
  }

  return (
    <main className={styles.defaultInfo}>
      <section className={styles.titleSec}>
        <h1 className={styles.processTitle}>상세모집내용을 입력해 주세요.</h1>
      </section>

      <section className={styles.contSec}>
        <ProcessBarArea process={process} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={styles.formList}>
            <li className={styles.quillBox}>
              <ReactQuill
                theme="snow"
                modules={{
                  toolbar: {
                    container: [
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { size: ["small", false, "large", "huge"] },
                        { color: [] },
                      ],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                        { align: [] },
                      ],
                    ],
                  },
                }}
                value={value}
                onChange={handleChange}
              />
            </li>
          </ul>

          <NextBtnArea />
        </form>
      </section>
    </main>
  );
}
