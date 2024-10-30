import connectDB from "@/lib/db/connectDb";
import { memo } from "react";

const Home =async ()=>{
  return (
    <main  >
      <h1>Welcome Home</h1>
    </main>
  )
};

export default memo(Home);