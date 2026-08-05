
type Props = {
    title: string;
    value: number;
}

export default function StatCard({ title = "Stat", value = 0 }: Props) {

  return (
    <div className="p-4 rounded-xl bg-[var(--card-color)] font-[family-name:var(--sora)] flex flex-col gap-2 items-center justify-center w-full h-30 border-1 border-gray-300">

        <span className="font-bold text-blue text-3xl"> { value } </span>

        <span className="font-normal text-md text-blue text-center"> { title } </span>

    </div>
  )
}
