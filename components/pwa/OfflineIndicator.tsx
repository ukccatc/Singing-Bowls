'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, CloudOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { NetworkStatus } from '@/lib/pwa';

interface OfflineIndicatorProps {
  className?: string;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ className }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const handleStatusChange = (online: boolean) => {
      setIsOnline(online);
      
      if (!online) {
        setShowOfflineMessage(true);
      } else {
        // Show back online message briefly
        if (showOfflineMessage) {
          setTimeout(() => {
            setShowOfflineMessage(false);
          }, 3000);
        }
      }
    };

    NetworkStatus.onStatusChange(handleStatusChange);
    
    // Initial check
    setIsOnline(NetworkStatus.isOnline());
  }, [showOfflineMessage]);

  const handleRetry = async () => {
    setIsRetrying(true);
    
    // Wait a bit and then check connection
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (NetworkStatus.isOnline()) {
      window.location.reload();
    } else {
      setIsRetrying(false);
    }
  };

  if (!showOfflineMessage) {
    return null;
  }

  return (
    <Card className={cn(
      'fixed top-20 left-4 right-4 z-40 shadow-lg transition-all duration-300',
      isOnline ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200',
      className
    )}>
      <CardContent className="p-3">
        <div className="flex items-center space-x-3">
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center',
            isOnline ? 'bg-green-100' : 'bg-orange-100'
          )}>
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-orange-600" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              'text-sm font-semibold',
              isOnline ? 'text-green-800' : 'text-orange-800'
            )}>
              {isOnline ? 'Back Online!' : 'No Internet Connection'}
            </h3>
            <p className={cn(
              'text-xs',
              isOnline ? 'text-green-700' : 'text-orange-700'
            )}>
              {isOnline 
                ? 'Your connection has been restored.' 
                : 'Some features may be limited. Your cart is saved locally.'
              }
            </p>
          </div>
          
          {!isOnline && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              disabled={isRetrying}
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              {isRetrying ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
        
        {!isOnline && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center space-x-2 text-xs text-orange-700">
              <CloudOff className="h-3 w-3" />
              <span>Offline mode active - Browse cached products</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-orange-700">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
              <span>Your cart and wishlist are saved locally</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OfflineIndicator;