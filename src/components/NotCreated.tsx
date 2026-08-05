import type { IconType } from 'react-icons';

type Props = {
    Icon: IconType;
    errorText: string;
}



export default function NotCreated({ Icon, errorText = "Nothing to show here" }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-gray-400 mb-5">
      <Icon className="w-36 h-36" />
      <p className="text-center text-xl font-sora text-blue pl-4">{errorText}</p>
    </div>
  )
}
