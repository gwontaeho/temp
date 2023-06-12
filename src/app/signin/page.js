import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SigninForm } from "@/components/SigninForm";

export const metadata = {
    title: "중개 수수료 없는 외주 플랫폼 - 외주123",
    description: "수수료 부담 없이 프로젝트를 진행해보세요 (외주, 상주)",
};

export default function Signin({ searchParams: { to = "" } }) {
    /**
     * cookie.token 없을 시 redirect
     */

    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (!!token) redirect("/");

    return (
        <main className="flex flex-1 justify-center">
            <div className="flex w-full max-w-lg">
                {/* <div className="flex flex-col flex-[1] p-8 border-r justify-center"></div> */}
                <div className="flex flex-col flex-[1] p-8 justify-center">
                    <h1 className="text-xl mb-4">로그인</h1>
                    <SigninForm to={to} />
                    <Link href="/signup">
                        <button className="button">회원가입 · 비밀번호 재설정</button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
