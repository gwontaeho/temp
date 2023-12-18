import { cookies, headers } from "next/headers";
import { RequestForm } from "@/components/RequestForm";
import { redirect } from "next/navigation";

export const metadata = {
    title: "프로젝트 의뢰하기 - 외주123",
    description: "수수료 부담 없이 프로젝트를 진행해보세요 (외주, 상주)",
};

export default function Request() {
    const h = headers();
    const c = cookies();
    const to = h.get("x-invoke-path");
    if (!c.get("token")) return redirect(`/signin?to=${to}`);

    return (
        <main className="flex flex-1 justify-center">
            <div className="w-full max-w-5xl flex flex-col">
                <RequestForm />
            </div>
        </main>
    );
}
