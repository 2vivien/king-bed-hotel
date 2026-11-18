const avatarSamples = [
  { initials: "SJ", bg: "bg-[#1F3A2C] text-white" },
  { initials: "HL", bg: "bg-[#D8C7A8] text-[#111111]" },
  { initials: "AL", bg: "bg-[#3A4D3E] text-white" },
  { initials: "MK", bg: "bg-[#EFE6D6] text-[#111111]" },
  { initials: "ER", bg: "bg-[#2C2C2A] text-white" },
] as const;

export function AvatarStack() {
  return (
    <div className="flex items-center -space-x-2.5" aria-hidden="true">
      {avatarSamples.map((item) => (
        <span
          key={item.initials}
          className={`w-9 h-9 rounded-full border-2 border-[#FAF9F6] flex items-center justify-center text-[11px] font-medium tracking-tight ${item.bg}`}
        >
          {item.initials}
        </span>
      ))}
    </div>
  );
}
