export const Tag = ({ label, checked, className, onChange }) => {
    const cn = "inline-block" + (!!className && typeof className === "string" ? ` ${className}` : "") + (!!onChange ? " cursor-pointer" : "");

    return (
        <label className={cn}>
            {!!onChange && <input type="checkbox" className="appearance-none peer" checked={checked} onChange={onChange} />}
            <p className="inline-flex justify-center items-center border px-4 h-8 rounded text-xs peer-checked:border-[#004aad]">{label}</p>
        </label>
    );
};
