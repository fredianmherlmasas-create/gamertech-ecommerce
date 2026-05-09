import { cn } from '../utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-md bg-dark-800', className)} />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-dark-900 border border-dark-800 rounded-3xl overflow-hidden p-6 space-y-4 h-full">
      <Skeleton className="aspect-[4/3] rounded-2xl w-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}
