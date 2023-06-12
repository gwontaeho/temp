"use client";
import { useMutation } from "@tanstack/react-query";
import { closeProject } from "@/apis";

export const ProjectCloseButton = ({ ProjectId }) => {
    const { mutate } = useMutation({
        mutationFn: () => closeProject({ ProjectId }),
        onSuccess: () => location.reload(),
    });

    const handleClick = () => {
        if (confirm("프로젝트를 마감하시겠습니까?")) mutate();
    };

    return (
        <button className="button mt-2 bg-white" onClick={handleClick}>
            프로젝트 마감하기
        </button>
    );
};
