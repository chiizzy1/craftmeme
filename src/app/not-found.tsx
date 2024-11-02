import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Custom404() {
  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-primary mb-2">404</CardTitle>
          <p className="text-2xl font-semibold text-foreground">Oops! Page Not Found</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative w-full aspect-square max-w-[200px] mx-auto">
              <svg className="absolute inset-0 w-full h-full text-muted-foreground/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary">?!</p>
            </div>
            <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
