"use client";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTags, getProjects } from "@/apis";
import { Price } from "@/components/Price";
import { Pagination } from "@/components/Pagination";
import { Time } from "@/components/Time";
import { Tag } from "@/components/Tag";

const Project = ({ data }) => {
    const { id, title, content, price, duration, isOpen, isApplied, isRequested, createdAt } = data;

    const className = {
        s: !isOpen ? "text-red-500" : isRequested ? "text-blue-500" : isApplied ? "text-green-500" : "",
    };

    return (
        <div className="border-b md:p-4">
            <Link href={`/projects/${id}`}>
                <div className="flex flex-col flex-1 p-4 w-full rounded transition hover:bg-gray-50">
                    <div className="flex justify-between text-xs mb-1">
                        <p className={className.s}>
                            {!isOpen ? "마감된 프로젝트입니다" : isRequested ? "의뢰한 프로젝트입니다" : isApplied ? "지원한 프로젝트입니다" : ""}
                        </p>
                        <Time time={createdAt} className="text-gray-500" />
                    </div>
                    <p className="md:line-clamp-1 text-lg mb-1 md:h-[28px]">{title}</p>
                    <p className="h-10 line-clamp-1 text-sm mb-4 text-gray-500">{content}</p>
                    <div className="flex">
                        <div className="flex-1" />
                        <div className="flex-1 text-sm">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">금액</p>
                                <Price price={price} />
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">기간</p>
                                <p>{!!duration ? `${duration}일` : "계약 시 협의"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export const ProjectList = () => {
    const searchParams = useSearchParams();
    let page = searchParams.get("page") || "1";
    let tags = searchParams.get("tags") || "";

    if (isNaN(page) || page.includes(".")) page = "1";
    page = Number(page);
    const perPage = 10;

    const router = useRouter();
    const pathname = usePathname();

    const { data: allTags } = useQuery({
        queryKey: ["tags"],
        queryFn: () => getTags(),
        placeholderData: [],
        suspense: true,
    });

    const {
        data: { count, rows },
    } = useQuery({
        queryKey: ["projects", page, tags],
        queryFn: () => getProjects({ perPage, page, tags }),
        placeholderData: { count: 0, rows: [] },
    });

    const handleClickTag = (v) => {
        const t = tags.split(",").filter((vv) => allTags.some((vvv) => String(vvv.sequence) === vv));
        if (t.includes(String(v))) {
            const index = t.findIndex((vv) => vv === String(v));
            t.splice(index, 1);
        } else t.push(v);
        const tagsQuery = t.length === 0 ? "" : "&tags=" + t.toString();
        router.push(pathname + "?page=1" + tagsQuery);
    };

    const handleChangePage = (v) => {
        const t = tags.split(",").filter((vv) => allTags.some((vvv) => String(vvv.sequence) === vv));
        const tagsQuery = t.length === 0 ? "" : "&tags=" + t.toString();
        router.push(pathname + "?page=" + String(v) + tagsQuery);
    };

    return (
        <div>
            <div className="min-h-[36px] px-2 pt-2 pb-1 md:px-4 md:pt-4 md:pb-3 border-b">
                {allTags.map(({ id, name, sequence }) => {
                    return (
                        <Tag
                            key={`tag-${id}`}
                            className="mr-1 mb-1"
                            label={name}
                            checked={tags.split(",").includes(String(sequence))}
                            onChange={() => handleClickTag(sequence)}
                        />
                    );
                })}
            </div>
            <div className="grid md:grid-cols-2">
                {rows.map((row) => {
                    const { id } = row;
                    return <Project key={id} data={row} />;
                })}
            </div>
            <div className="p-4 flex items-center justify-center">
                <Pagination page={page} perPage={perPage} count={count} onChange={handleChangePage} range={5} />
            </div>
        </div>
    );
};
