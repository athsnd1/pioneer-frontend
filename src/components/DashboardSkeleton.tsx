import { Skeleton } from "@/components/ui/skeleton";
import ChartSkeleton from "./ChartSkeleton";


export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 mt-10">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center w-full h-max py-6 px-4 bg-white rounded-xl shadow-sm ml-4">
            <Skeleton className="w-full ml-4 mr-4 h-30 bg-gray-500"/>
            <Skeleton className="w-full ml-4 mr-4 h-30 bg-gray-500"/>
            <Skeleton className="w-full ml-4 mr-4 h-30 bg-gray-500"/>
            <Skeleton className="w-full ml-4 mr-4 h-30 bg-gray-500"/>
        </div>

        <div className="mt-10 mb-10 px-4 w-full h-max">
          <ChartSkeleton />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center w-full h-max py-6 px-4 mb-30 bg-white ml-4 mr-6 rounded-xl shadow-sm">
            <Skeleton className="w-full ml-4 mr-4 h-45 bg-gray-500"/>
            <Skeleton className="w-full ml-4 mr-4 h-45 bg-gray-500"/>
        </div>

    </div>
  )
}
