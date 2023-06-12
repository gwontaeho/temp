"use client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createApplication } from "@/apis";

export const ProjectApplicationForm = ({ ProjectId }) => {
    const placeholder = "등록한 전문가 정보와 함께\n전달할 내용을 입력해주세요\n\n제안 사항, 관련 프로젝트 경험 등";
    const { register, handleSubmit } = useForm();

    const { mutate } = useMutation({
        mutationFn: (content) => createApplication({ content, ProjectId }),
        onSuccess: () => location.reload(),
    });

    const onSubmit = ({ content }) => {
        mutate(content);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea className="textarea mb-2 h-40" {...register("content")} placeholder={placeholder} />
            <button className="button bg-white">프로젝트 지원하기</button>
        </form>
    );
};
