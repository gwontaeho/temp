import Link from "next/link";
import { HomeRecents } from "@/components/HomeRecents";

export const metadata = {
    title: "중개 수수료 없는 외주 플랫폼 - 외주123",
    description: "수수료 부담 없이 프로젝트를 진행해보세요 (외주, 상주)",
};

export default function Home() {
    return (
        <main className="flex flex-1 justify-center">
            <div className="w-full max-w-5xl">
                <div className="p-8">
                    <div className="flex justify-between items-end mb-4">
                        <div className="text-xl">최근 등록된 프로젝트</div>
                        <Link href="/projects" className="text-sm text-gray-500 hover:underline underline-offset-2">
                            더 보기
                        </Link>
                    </div>
                    <HomeRecents />
                </div>
            </div>
        </main>
    );
}
