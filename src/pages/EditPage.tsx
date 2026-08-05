import { useParams } from "react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { BsPeople } from "react-icons/bs";
import { HiOutlineBookOpen, HiOutlineClock, HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getReport } from "../api/getReport";
import Footer from "../components/Footer";


type State = {
  date: string;
  hours: number;
  visits: number;
  studies: number;
  videos: number;
  books: number;
  comment: string;
}

type Action = { type: "set_date"; date: string } | 
              { type: "set_hours"; hours: number } |
              { type: "set_visits"; visits: number } |
              { type: "set_studies"; studies: number } |
              { type: "set_videos"; videos: number } |
              { type: "set_books"; books: number } |
              { type: "set_comment"; comment: string } |
              { type: "reset" }

function reducer (state: State, action: Action): State {

  switch (action.type) {
    case "set_date":
      return {...state, date: action.date};
    
    case "set_hours":
      return {...state, hours: action.hours};

    case "set_visits":
      return {...state, visits: action.visits};

    case "set_studies":
      return {...state, studies: action.studies};

    case "set_videos":
      return {...state, videos: action.videos};

    case"set_books":
      return {...state, books: action.books};
    
    case "set_comment":
      return {...state, comment: action.comment};
    
    case "reset":
      return state;

    default:
      return state;
  }
  

}

export default function EditPage() {

  const { id } = useParams();

  const { data: report } = useQuery({
    queryKey: ["report", id],
    queryFn: () => getReport(id!)
  });

  const initialState = {
    date: report?.date,
    hours: report?.hours,
    visits: report?.visits,
    studies: report?.studies,
    videos: report?.videos,
    books: report?.books,
    comment: report?.comment
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    {
      mutationFn: async (id: string) => {

        const response = await axios.put(`http://localhost:3000/report/edit/${id}`, state, { withCredentials: true });
        return response.data;

      },

      onSuccess: () => { 
        toast.success("Report updated successfully"); 

        queryClient.invalidateQueries({
          queryKey: ["reports"],
        });

        queryClient.invalidateQueries({
          queryKey: ["reports-stats"],
        });

        queryClient.invalidateQueries({
          queryKey: ["monthly-stats"],
        });
      },

      onError: (error) => {
        if(axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    }

  )

  async function changeReport (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
     
    mutation.mutate(id!);
  };

  return (
    <div className="bg-bg pt-6">

      <Helmet>

        <title>Pioneer | Create New Report</title>

        <meta name="description" content="Create a new report" />

      </Helmet>

      <div className="font-normal text-xl font-[family-name:var(--bric)] ml-4 mb-4">Edit Report</div>
    
      <form onSubmit={changeReport} className="ml-4 w-full pr-8 mb-20">

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 border-1 border-gray-400 rounded-lg p-4">

            <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Change Date</label>
              
              <div className="flex items-center justify-between p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <input type="date" value={state.date} onChange={(e) => {dispatch({type: "set_date", date: e.target.value})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" required/>
              </div>
            </div>

             <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Adjust Hours</label>
              
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <HiOutlineClock className="text-gray-500"/>
                <input type="number" value={state.hours} onChange={(e) => {dispatch({type: "set_hours", hours: parseInt(e.target.value)})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="How many hours did you spend in the field?" required/>
              </div>
            </div>


            <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Edit Return Visits</label>
              
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <BsPeople className="text-gray-500"/>
                <input type="number" value={state.visits} onChange={(e) => {dispatch({type: "set_visits", visits: parseInt(e.target.value)})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="How many return visits did you get today?" required/>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Change Bible Studies</label>
              
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <HiOutlineBookOpen className="text-gray-500"/>
                <input type="number" value={state.studies} onChange={(e) => {dispatch({type: "set_studies", studies: parseInt(e.target.value)})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="Did you manage to get any Bible Studies today?" required/>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Change Videos</label>
              
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <HiOutlinePlayCircle className="text-gray-500"/>
                <input type="number" value={state.videos} onChange={(e) => {dispatch({type: "set_videos", videos: parseInt(e.target.value)})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="Number of videos you showed?" required/>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Edit Number of Books</label>
              
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <HiOutlineDocumentText className="text-gray-500"/>
                <input type="number" value={state.books} onChange={(e) => {dispatch({type: "set_books", books: parseInt(e.target.value)})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="How many books did you place?" required/>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Add a different Comment</label>
              
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-20 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <textarea value={state.comment} onChange={(e) => {dispatch({type: "set_comment", comment: e.target.value})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="What was field service like today?"/>
              </div>
            </div>

        </div>

        <button type="submit" disabled={mutation.isPending} className={`bg-main rounded-full p-3 mt-5 font-[family-name:var(--bric)] text-white text-lg flex items-center justify-center min-w-45 ${mutation.isPending ? "cursor-not-allowed" : "cursor-pointer"} hover:opacity-85`}>{ mutation.isPending ? "Updating Report..." : "Save Changes"}</button>

      </form>

      <Footer />

    </div>
  )
}

