"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signin } from "@/apis";

export const SigninForm = ({ to }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [errorMessage, setErrorMessage] = useState("");

    const { mutate } = useMutation({
        mutationFn: ({ email, password }) => signin({ email, password }),
        onSuccess: () => location.replace(location.origin + to),
        onError: ({ response: { status } }) => {
            const message = status === 400 ? "이메일 또는 비밀번호를 잘못 입력했습니다" : "로그인 할 수 없습니다";
            setErrorMessage(message);
        },
    });

    const onSubmit = (data) => {
        const { email, password } = data;
        mutate({ email, password });
    };

    return (
        <form className="border-b pb-8 mb-8" onSubmit={handleSubmit(onSubmit)} noValidate>
            <input
                className="input"
                type="email"
                placeholder="이메일"
                {...register("email", {
                    required: "이메일을 입력해주세요",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "잘못된 이메일 형식입니다",
                    },
                })}
            />
            {errors.email && <p className="err mt-1">{errors.email.message}</p>}
            <input className="input mt-2 mb-2" type="password" placeholder="비밀번호" {...register("password", { required: true })} />
            <button className="button">로그인</button>
            {!!errorMessage && <p className="err mt-2">{errorMessage}</p>}
        </form>
    );
};
