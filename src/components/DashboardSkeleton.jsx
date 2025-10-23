import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-background p-3 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <Skeleton className="h-8 sm:h-12 w-64 sm:w-80 mx-auto" />
        <Skeleton className="h-4 sm:h-6 w-96 sm:w-[500px] mx-auto" />
      </div>

      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="card-industrial">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="card-industrial">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Grid Skeleton */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="card-industrial">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="text-center p-3 bg-muted/30 rounded-lg">
                    <Skeleton className="h-6 w-12 mx-auto mb-1" />
                    <Skeleton className="h-3 w-16 mx-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
