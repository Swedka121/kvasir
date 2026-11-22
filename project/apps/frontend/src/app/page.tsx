import { Button } from "@/components/ui/button"
import * as Card from "../components/ui/card"
import Link from "next/link"

export default function Page() {
  return (<section className="grid grid-cols-2 grid-rows-1 w-full h-screen">
    <div className="w-full h-full flex justify-center items-center bg-foreground/5 border-r-4 border-accent/50">
      Some image or 3d scene after here
    </div>
    <div className="w-full h-full flex justify-center items-center">
      <Card.Card className="min-w-200">
        <Card.CardHeader>
          <Card.CardTitle>Kvasir</Card.CardTitle>
        </Card.CardHeader>
        <Card.CardContent>
          <h1 className="text-4xl font-bold">Welcome to Kvasir</h1>
          <p className="text-md font-light">Your deep learning platform</p>

          <div className="mt-20 flex flex-row gap-2 items-end">
            <Link href={"/login"}>
              <Button size={"lg"}>Start learning</Button>
            </Link>
            <Button variant={"ghost"}>Read more</Button>
          </div>
        </Card.CardContent>
      </Card.Card>
    </div>
  </section>)
}