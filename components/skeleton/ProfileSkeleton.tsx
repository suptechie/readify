'use client';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="flex-1 space-y-2 w-full">
            <div>
              <Skeleton className="h-4 w-16 mb-1" /> 
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-1" /> 
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Skeleton className="h-4 w-16 mb-1" /> 
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-16 mb-1" /> 
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div>
          <Skeleton className="h-4 w-16 mb-1" /> 
          <Skeleton className="h-10 w-full" />
        </div>

        <div>
          <Skeleton className="h-4 w-16 mb-1" /> 
          <Skeleton className="h-24 w-full" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  );
}