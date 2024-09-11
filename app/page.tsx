import { Navbar } from "@/components/navbar/Navbar"


export default function Dashboard() {
  console.log(process.env.DRIZZLE_DATABASE_URL)
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar/>
      
 
    </div>
  )
}

