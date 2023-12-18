import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { MyaccountNav } from "@/components/MyaccountNav";

export const metadata = {
    title: "중개 수수료 없는 외주 플랫폼 - 외주123",
    description: "수수료 부담 없이 여러 프로젝트를 진행해보세요 (외주, 상주)",
};

export default async function Layout({ children }) {
    const h = headers();
    const to = h.get("x-invoke-path");
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (!token) redirect(`/signin?to=${to}`);

    return (
        <div className="flex flex-1 justify-center">
            <div className="flex w-full max-w-5xl">
                <MyaccountNav />
                {children}
            </div>
        </div>
    );
}
