"use client";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";
import { useForm } from "react-hook-form";
import { Tag } from "@/components/Tag";
import { getTags, createProject } from "@/apis";

export const RequestForm = () => {
    const router = useRouter();

    const defaultValues = {
        title: "",
        content: "[프로젝트 개요]\n\n\n\n[현재 준비 사항]\n\n\n\n[상세 업무 내용]\n\n\n\n[필요 기술 스택]\n\n\n",
        price: 0,
        duration: 0,
        tags: ["상주", "개발"],
    };

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ defaultValues });

    const [title, content, tags] = watch(["title", "content", "tags"]);

    const { data } = useQuery({
        queryKey: ["tags"],
        queryFn: () => getTags(),
        placeholderData: [],
    });

    const { mutate } = useMutation({
        mutationFn: (variables) => createProject(variables),
        onSuccess: ({ ProjectId }) => {
            alert("프로젝트가 등록되었습니다");
            router.replace(`/projects/${ProjectId}`);
        },
    });

    const p = data.filter(({ type }) => type === "P");
    const ps = p.map(({ name }) => name);
    const t = data.filter(({ type }) => type === "T");

    const handleClickTag = (tag) => {
        const nt = [...tags];
        if (nt.includes(tag)) {
            const index = nt.findIndex((v) => v === tag);
            nt.splice(index, 1);
            if (nt.filter((v) => ps.includes(v)).length === 0) return;
            if (nt.filter((v) => !ps.includes(v)).length === 0) return;
        } else nt.push(tag);
        setValue("tags", nt);
    };

    const onSubmit = (data) => {
        const { title, content, duration, price, tags } = data;
        mutate({ title, content, duration, price, tags: tags.toString() });
    };

    return (
        <form className="flex-1 flex flex-col md:flex-row" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-[2] border-r p-8 border-b md:border-b-0">
                <div className="mb-1 flex justify-between items-end">
                    <label htmlFor="title" className="text-sm">
                        제목을 입력해주세요
                    </label>
                    <p className="text-xs">{title.length}/50</p>
                </div>
                <div className="mb-8">
                    <input
                        id="title"
                        className="input"
                        maxLength={50}
                        aria-invalid={String(!!errors.title)}
                        {...register("title", {
                            required: "10글자 이상 입력해주세요",
                            maxLength: 50,
                            minLength: { value: 10, message: "10글자 이상 입력해주세요" },
                            setValueAs: (value) => value.trim(),
                        })}
                    />
                    {errors.title && <p className="err mt-1">{errors.title.message}</p>}
                </div>
                <div className="mb-1 flex justify-between items-end">
                    <label htmlFor="content" className="text-sm">
                        프로젝트의 내용을 입력해주세요
                    </label>
                    <p className="text-xs">{content.length}/1000</p>
                </div>
                <textarea
                    id="content"
                    className="textarea h-80"
                    maxLength={1000}
                    aria-invalid={String(!!errors.content)}
                    {...register("content", {
                        required: "10글자 이상 입력해주세요",
                        minLength: { value: 10, message: "10글자 이상 입력해주세요", maxLength: 1000 },
                    })}
                />
                {errors.content && <p className="err mt-1">{errors.content.message}</p>}
            </div>
            <div className="flex flex-col flex-[1] p-8">
                <label htmlFor="price" className="text-sm mb-1">
                    금액을 입력해주세요
                </label>
                <NumericFormat
                    id="price"
                    className="input mb-8"
                    allowNegative={false}
                    thousandSeparator=","
                    decimalScale={0}
                    suffix=" 원"
                    maxLength={14}
                    placeholder="계약 시 협의"
                    onValueChange={({ floatValue }) => setValue("price", floatValue)}
                />
                <label htmlFor="duration" className="text-sm mb-1">
                    기간을 입력해주세요
                </label>
                <NumericFormat
                    id="duration"
                    className="input mb-8"
                    allowNegative={false}
                    decimalScale={0}
                    suffix=" 일"
                    maxLength={5}
                    placeholder="계약 시 협의"
                    onValueChange={({ floatValue }) => setValue("duration", floatValue)}
                />
                <p className="text-sm mb-1">진행 방식을 선택해주세요</p>
                <div className="mb-7 min-h-[36px]">
                    {p.map(({ name }) => (
                        <Tag key={`tag-${name}`} label={name} className="mr-1 mb-1" checked={tags.includes(name)} onChange={() => handleClickTag(name)} />
                    ))}
                </div>
                <p className="text-sm mb-1">해당하는 태그를 선택해주세요</p>
                <div className="mb-7 sm:min-h-[36px] md:min-h-[72px]">
                    {t.map(({ name }) => (
                        <Tag key={`tag-${name}`} label={name} className="mr-1 mb-1" checked={tags.includes(name)} onChange={() => handleClickTag(name)} />
                    ))}
                </div>
                <button className="button">프로젝트 등록하기</button>
            </div>
        </form>
    );
};
