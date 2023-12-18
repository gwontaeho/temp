import dayjs from "dayjs";

export const ProjectApplication = ({ Application }) => {
    const { content, createdAt, User } = Application;
    const { email, Expert } = User;
    const { nickname, contact, introduction } = Expert;
    const c = dayjs(createdAt).format("YYYY. MM. DD HH:mm");

    return (
        <div className="border-t flex flex-col" id="application">
            <div className="flex md:flex-row flex-col">
                <div className="flex flex-[2] flex-col p-8 md:border-r border-b md:border-b-0">
                    <p className="mb-8 text-2xl">{nickname}님의 지원서</p>
                    <p className="mb-1 text-sm text-gray-500">전문가 소개</p>
                    <pre className="mb-8 whitespace-pre-wrap text-sm">{introduction}</pre>
                    <p className="mb-1 text-sm text-gray-500">전달 내용</p>
                    <pre className="whitespace-pre-wrap text-sm">{content}</pre>
                </div>
                <div className="flex flex-[1] flex-col p-8">
                    <p className="mb-1 text-sm text-gray-500">이메일</p>
                    <p className="mb-8">{email}</p>
                    <p className="mb-1 text-sm text-gray-500">연락처</p>
                    <p className="mb-8">{!contact ? "-" : contact}</p>
                    <p className="text-xs">{c}</p>
                </div>
            </div>
        </div>
    );
};
