import { Card } from '@/components/ui/card';

interface LoadingSkeletonProps {
  variant?: 'character' | 'gallery' | 'list' | 'model' | 'panel';
  count?: number;
  className?: string;
}

const LoadingSkeleton = ({ variant = 'character', count = 1, className = "" }: LoadingSkeletonProps) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'character':
        return (
          <Card className="bg-black/30 border-cyan-500/20 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
            
            {/* Main content skeleton */}
            <div className="relative z-10 p-6">
              {/* Top info */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="w-20 h-4 bg-gradient-to-r from-cyan-500/30 to-transparent rounded mb-2 loading-shimmer"></div>
                  <div className="w-32 h-6 bg-gradient-to-r from-white/20 to-transparent rounded mb-1 loading-shimmer"></div>
                  <div className="w-24 h-3 bg-gradient-to-r from-cyan-400/30 to-transparent rounded loading-shimmer"></div>
                </div>
                <div className="w-16 h-4 bg-gradient-to-r from-gold/30 to-transparent rounded loading-shimmer"></div>
              </div>

              {/* Center content */}
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 bg-gradient-to-r from-gray-400/30 to-transparent rounded loading-shimmer"></div>
                <div className="w-3/4 h-3 bg-gradient-to-r from-gray-400/30 to-transparent rounded loading-shimmer"></div>
                <div className="w-1/2 h-3 bg-gradient-to-r from-gray-400/30 to-transparent rounded loading-shimmer"></div>
              </div>

              {/* Bottom action area */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-24 h-3 bg-gradient-to-r from-white/20 to-transparent rounded mb-1 loading-shimmer"></div>
                  <div className="w-20 h-3 bg-gradient-to-r from-cyan-400/30 to-transparent rounded loading-shimmer"></div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full loading-shimmer"></div>
              </div>
            </div>

            {/* Floating particles simulation */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-gold/20 rounded-full loading-shimmer"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </Card>
        );

      case 'gallery':
        return (
          <Card className="bg-black/40 border-cyan-500/20 backdrop-blur-xl">
            <div className="p-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full loading-shimmer"></div>
                <div className="flex-1">
                  <div className="w-24 h-4 bg-gradient-to-r from-white/20 to-transparent rounded mb-1 loading-shimmer"></div>
                  <div className="w-20 h-3 bg-gradient-to-r from-cyan-400/30 to-transparent rounded loading-shimmer"></div>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="w-full h-3 bg-gradient-to-r from-gray-400/30 to-transparent rounded loading-shimmer"></div>
                <div className="w-2/3 h-3 bg-gradient-to-r from-gray-400/30 to-transparent rounded loading-shimmer"></div>
              </div>
              
              <div className="flex gap-2 mb-3">
                <div className="w-16 h-5 bg-gradient-to-r from-cyan-500/30 to-transparent rounded loading-shimmer"></div>
                <div className="w-20 h-5 bg-gradient-to-r from-purple-500/30 to-transparent rounded loading-shimmer"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="w-16 h-3 bg-gradient-to-r from-gray-400/30 to-transparent rounded loading-shimmer"></div>
                <div className="w-4 h-4 bg-gradient-to-r from-green-400/30 to-transparent rounded loading-shimmer"></div>
              </div>
            </div>
          </Card>
        );

      case 'list':
        return (
          <Card className="bg-black/40 border-cyan-500/20 backdrop-blur-xl">
            <div className="p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-lg loading-shimmer"></div>
              <div className="flex-1">
                <div className="w-32 h-4 bg-gradient-to-r from-white/20 to-transparent rounded mb-2 loading-shimmer"></div>
                <div className="w-full h-3 bg-gradient-to-r from-gray-400/30 to-transparent rounded mb-2 loading-shimmer"></div>
                <div className="w-3/4 h-3 bg-gradient-to-r from-gray-400/30 to-transparent rounded mb-2 loading-shimmer"></div>
                <div className="flex gap-2">
                  <div className="w-16 h-4 bg-gradient-to-r from-cyan-500/30 to-transparent rounded loading-shimmer"></div>
                  <div className="w-20 h-4 bg-gradient-to-r from-purple-500/30 to-transparent rounded loading-shimmer"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400/30 to-transparent rounded loading-shimmer"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-green-400/30 to-transparent rounded loading-shimmer"></div>
              </div>
            </div>
          </Card>
        );

      case 'model':
        return (
          <div className="w-full h-full bg-black/20 rounded-lg border border-cyan-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-pink-900/10"></div>
            
            {/* Center loading indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
                <div className="w-32 h-3 bg-gradient-to-r from-cyan-400/30 to-transparent rounded loading-shimmer"></div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400/20 rounded-full loading-shimmer"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'panel':
        return (
          <Card className="bg-black/50 border-cyan-500/20 backdrop-blur-xl">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500/30 to-transparent rounded-full loading-shimmer"></div>
                <div className="flex-1">
                  <div className="w-20 h-3 bg-gradient-to-r from-white/20 to-transparent rounded mb-1 loading-shimmer"></div>
                  <div className="w-16 h-3 bg-gradient-to-r from-cyan-400/30 to-transparent rounded loading-shimmer"></div>
                </div>
              </div>
              
              <div className="w-24 h-4 bg-gradient-to-r from-white/20 to-transparent rounded mb-2 loading-shimmer"></div>
              
              <div className="space-y-2 mb-3">
                <div className="w-full h-3 bg-gradient-to-r from-gray-400/30 to-transparent rounded loading-shimmer"></div>
                <div className="w-5/6 h-3 bg-gradient-to-r from-gray-400/30 to-transparent rounded loading-shimmer"></div>
                <div className="w-3/4 h-3 bg-gradient-to-r from-gray-400/30 to-transparent rounded loading-shimmer"></div>
              </div>
              
              <div className="w-full h-8 bg-gradient-to-r from-purple-500/20 to-transparent rounded loading-shimmer"></div>
            </div>
          </Card>
        );

      default:
        return (
          <div className="w-full h-32 bg-gradient-to-r from-gray-400/20 to-transparent rounded loading-shimmer"></div>
        );
    }
  };

  return (
    <div className={className}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={count > 1 ? "mb-4" : ""}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
