"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { signup } from "@/apis";

export const PasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("t");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [password] = watch(["password"]);

    const { mutate } = useMutation({
        mutationFn: (password) => signup({ token, password }),
        onSuccess: () => {
            alert("비밀번호가 설정되었습니다");
            router.replace("/signin");
        },
        onError: () => {
            alert("만료된 링크입니다");
            router.replace("/signup");
        },
    });

    const onSubmit = (data) => {
        const { password } = data;
        mutate(password);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className="input mb-2" type="password" placeholder="비밀번호" {...register("password", { required: true })} />
            <input
                className="input"
                aria-invalid={String(!!errors.rePassword)}
                type="password"
                placeholder="비밀번호 확인"
                {...register("rePassword", { required: true, validate: (value) => value === password })}
            />
            {errors.rePassword && <p className="err mt-1">비밀번호가 서로 일치하지 않습니다</p>}
            <button className="button mt-2">비밀번호 설정하기</button>
        </form>
    );
};
