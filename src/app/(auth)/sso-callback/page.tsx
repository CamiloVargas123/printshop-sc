import { Shell } from "@/components/Shell"
import { type HandleOAuthCallbackParams } from "@clerk/types"
import SSOCallback from "./components/SSOCallback"

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

export default function SSOCallbackPage({ searchParams }: SSOCallbackPageProps) {
  return (
    <Shell variant={"centered"}>
      <SSOCallback searchParams={searchParams} />
    </Shell>
  )
}
