import { SignupForm } from "@/components/SignupForm";

export const metadata = {
    title: "중개 수수료 없는 외주 플랫폼 - 외주123",
    description: "수수료 부담 없이 프로젝트를 진행해보세요 (외주, 상주)",
};

export default function Signup() {
    return (
        <main className="flex flex-1 justify-center">
            <div className="flex w-full max-w-lg">
                {/* <div className="flex flex-col flex-[1] p-8 border-r justify-center items-center"></div> */}
                <div className="flex flex-col flex-[1] p-8 justify-center">
                    <h1 className="text-xl mb-1">회원가입 · 비밀번호 재설정</h1>
                    <p className="mb-4 text-sm text-gray-500">전송된 메일의 링크로 비밀번호를 설정할 수 있습니다</p>
                    <SignupForm />
                </div>
            </div>
        </main>
    );
}
