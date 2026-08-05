import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function ChartSkeleton() {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center w-full h-max py-6 px-4 mb-30 bg-white ml-4 mr-6 rounded-xl shadow-sm">

        <Skeleton className="w-full ml-4 mr-4 h-45 bg-gray-500"/>
        <Skeleton className="w-full ml-4 mr-4 h-45 bg-gray-500"/>
        <Skeleton className="w-full ml-4 mr-4 h-45 bg-gray-500"/>
        <Skeleton className="w-full ml-4 mr-4 h-45 bg-gray-500"/>

    </div>
  )
}
