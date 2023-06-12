import Link from "next/link";
import { cookies } from "next/headers";
import { ProjectCloseButton } from "@/components/ProjectCloseButton";
import { ProjectApplicationForm } from "@/components/ProjectApplicationForm";
import { ProjectApplication } from "@/components/ProjectApplication";
import { ProjectApplications } from "@/components/ProjectApplications";
import { Price } from "@/components/Price";
import { Time } from "@/components/Time";

async function getData(ProjectId) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const init = !!token && { headers: { Authorization: `Bearer ${token.value}` } };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/projects/${ProjectId}`, init);
    if (res.ok) return res.json();
}

export async function generateMetadata({ params }) {
    const { ProjectId } = params;
    const data = await getData(ProjectId);
    const { title } = data;

    return {
        title: `${title} - 외주123`,
    };
}

export default async function Project({ params }) {
    const cookieStore = cookies();
    const isSignedIn = !!cookieStore.get("token");
    const { ProjectId } = params;
    const data = await getData(ProjectId);

    const { title, content, price, tags = "", duration, isOpen, isApplied, isRequested, createdAt, Applications, Application } = data;

    const splited = tags.split(",");
    const p = splited.filter((v) => ["상주", "외주"].includes(v)).join(", ");
    const t = splited.filter((v) => !["상주", "외주"].includes(v));

    return (
        <main className="flex flex-1 justify-center">
            <div className="w-full max-w-5xl flex flex-col">
                <div className="flex md:flex-row flex-col flex-1">
                    <div className="flex-[2] border-b md:border-b-0 md:border-r p-8">
                        {!isOpen && <p className="mb-2 text-red-500 underline underline-offset-2">마감된 프로젝트입니다</p>}
                        <h1 className="text-2xl mb-8">{title}</h1>
                        <pre className="whitespace-pre-wrap text-sm">{content}</pre>
                    </div>
                    <div className="flex flex-col flex-[1] p-8 bg-gray-100">
                        <Time time={createdAt} className="text-sm mb-8 text-gray-500" />
                        <p className="text-sm mb-1 text-gray-500">태그</p>
                        <div className="flex flex-wrap mb-7">
                            {t.map((name) => {
                                return (
                                    <button className="tag mr-1 mb-1 bg-white" key={`tag-${name}`} disabled>
                                        {name}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-sm mb-1 text-gray-500">프로젝트 진행방식</p>
                        <p className="mb-8">{p}</p>
                        <p className="text-sm mb-1 text-gray-500">기간</p>
                        <p className="mb-8">{duration}일</p>
                        <p className="text-sm mb-1 text-gray-500">금액</p>
                        <Price className="mb-8" price={price} />
                        {!isSignedIn ? (
                            <Link href={`/signin?to=/projects/${ProjectId}`}>
                                <button className="button bg-white">로그인하고 프로젝트 지원하기</button>
                            </Link>
                        ) : (
                            <>
                                {isRequested && (
                                    <>
                                        <a href="#applications">
                                            <button className="button bg-white">
                                                의뢰한 프로젝트입니다
                                                <br />
                                                지원자 목록 확인하기
                                            </button>
                                        </a>
                                        {isOpen && <ProjectCloseButton ProjectId={ProjectId} />}
                                    </>
                                )}
                                {isApplied && (
                                    <a href="#application">
                                        <button className="button bg-white">
                                            지원한 프로젝트입니다
                                            <br />내 지원서 확인하기
                                        </button>
                                    </a>
                                )}
                                {isOpen && !isRequested && !isApplied && <ProjectApplicationForm ProjectId={ProjectId} />}
                            </>
                        )}
                    </div>
                </div>
                {isApplied && <ProjectApplication Application={Application} />}
                {isRequested && <ProjectApplications Applications={Applications} />}
            </div>
        </main>
    );
}
