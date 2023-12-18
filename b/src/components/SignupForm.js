"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "@/apis";

export const SignupForm = () => {
    const [isSent, setIsSent] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { mutate, isError } = useMutation({
        mutationFn: (email) => sendEmail({ email }),
        onError: () => setIsSent(false),
    });

    const onSubmit = (data) => {
        setIsSent(true);
        const { email } = data;
        mutate(email);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <input
                disabled={isSent}
                className="input"
                type="email"
                placeholder="이메일"
                aria-invalid={String(!!errors.email)}
                {...register("email", {
                    required: true,
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "잘못된 이메일 형식입니다",
                    },
                })}
            />
            {errors.email && <p className="err mt-1">{errors.email.message}</p>}
            <button className="button mt-2" disabled={isSent}>
                {isSent ? "메일이 전송되었습니다" : "메일 보내기"}
            </button>
            {isError && <p className="err mt-1">메일 전송에 실패하였습니다</p>}
        </form>
    );
};
