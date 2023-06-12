"use client";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTags, getExpert, updateExpert } from "@/apis";

export default function Expert() {
    const queryClient = useQueryClient();

    const placeholderData = { nickname: "", contact: "", introduction: "", tags: "" };
    const expertQuery = useQuery({
        queryKey: ["expert"],
        queryFn: () => getExpert(),
        placeholderData,
    });
    const values = Boolean(expertQuery.data) ? { ...expertQuery.data, tags: expertQuery.data.tags.split(",").filter((v) => Boolean(v)) } : placeholderData;

    const tagsQuery = useQuery({
        queryKey: ["tags"],
        queryFn: () => getTags(),
        placeholderData: [],
    });

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ values });

    const [nickname, introduction, tags] = watch(["nickname", "introduction", "tags"]);

    const { mutate } = useMutation({
        mutationFn: (variables) => updateExpert(variables),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(["expert"], () => variables);
            alert("전문가 정보가 저장되었습니다");
        },
    });

    const p = tagsQuery.data.filter(({ type }) => type === "P");
    const t = tagsQuery.data.filter(({ type }) => type === "T");

    const handleClickTag = (tag) => {
        const nt = [...tags];
        if (nt.includes(tag)) {
            const index = nt.findIndex((v) => v === tag);
            nt.splice(index, 1);
        } else nt.push(tag);
        setValue("tags", nt);
    };

    const onSubmit = (data) => {
        const { nickname, contact, introduction, tags } = data;
        mutate({ nickname, contact, introduction, tags: tags.toString() });
    };

    return (
        <main className="flex-1 p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-1 flex justify-between">
                    <label htmlFor="nickname" className="text-sm">
                        이름을 입력해주세요
                    </label>
                    <p className="text-xs self-end">{nickname.length}/10</p>
                </div>
                <input id="nickname" className="input mb-8" {...register("nickname", { required: true })} maxLength={10} />

                <label htmlFor="contact" className="text-sm mb-1">
                    연락처를 입력해주세요
                </label>
                <input id="contact" className="input mb-8" {...register("contact", { required: true })} maxLength={11} />

                <div className="mb-1 flex justify-between">
                    <label htmlFor="introduction" className="text-sm">
                        소개를 입력해주세요
                    </label>
                    <p className="text-xs self-end">{introduction.length}/1000</p>
                </div>
                <textarea id="introduction" className="textarea mb-8 h-80" {...register("introduction", { required: true })} maxLength={1000} />

                <p className="text-sm mb-1">프로젝트 진행방식을 선택해주세요</p>
                <div className="mb-8 min-h-[32px]">
                    {p.map(({ id, name }) => {
                        return (
                            <button
                                type="button"
                                className="tag mr-1"
                                key={`tag-${id}`}
                                aria-selected={String(tags.includes(name))}
                                onClick={() => handleClickTag(name)}
                            >
                                {name}
                            </button>
                        );
                    })}
                </div>
                <p className="text-sm mb-1">해당하는 태그를 선택해주세요</p>
                <div className="mb-7 min-h-[36px]">
                    {t.map(({ id, name }) => {
                        return (
                            <button
                                type="button"
                                className="tag mr-1 mb-1"
                                key={`tag-${id}`}
                                aria-selected={String(tags.includes(name))}
                                onClick={() => handleClickTag(name)}
                            >
                                {name}
                            </button>
                        );
                    })}
                </div>
                <button className="button">저장하기</button>
            </form>
        </main>
    );
}
