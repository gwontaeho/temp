import { redirect } from "next/navigation";
import { PasswordForm } from "@/components/PasswordForm";

export default function Password({ searchParams }) {
    /**
     * saerchParams.t 없을 시 redirect
     */
    if (!searchParams.t) redirect("/");
    return (
        <main className="flex flex-1 justify-center">
            <div className="flex w-full max-w-lg">
                {/* <div className="flex flex-col flex-[1] p-8 border-r justify-center items-center"></div> */}
                <div className="flex flex-col flex-[1] p-8 justify-center">
                    <h1 className="text-xl mb-4">비밀번호 설정</h1>
                    <PasswordForm />
                </div>
            </div>
        </main>
    );
}
