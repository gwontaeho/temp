import { ProjectList } from "@/components/ProjectList";

export const metadata = {
    title: "중개 수수료 없는 외주 플랫폼 - 외주123",
    description: "수수료 부담 없이 여러 프로젝트를 진행해보세요 (외주, 상주)",
};

export default function Projects() {
    return (
        <main className="flex flex-1 justify-center">
            <div className="w-full max-w-5xl">
                <ProjectList />
            </div>
        </main>
    );
}
