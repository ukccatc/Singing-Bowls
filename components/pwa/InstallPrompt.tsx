'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getPWAManager } from '@/lib/pwa';

interface InstallPromptProps {
  className?: string;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ className }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | 'unknown'>('unknown');
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const pwaManager = getPWAManager();
    
    const handleInstallPrompt = (canInstall: boolean) => {
      if (canInstall && !pwaManager.isInstalled()) {
        setShowPrompt(true);
        setPlatform(pwaManager.getInstallPrompt().platform);
      } else {
        setShowPrompt(false);
      }
    };

    pwaManager.onInstallPromptAvailable(handleInstallPrompt);
  }, []);

  const handleInstall = async () => {
    setIsInstalling(true);
    
    try {
      const pwaManager = getPWAManager();
      const success = await pwaManager.promptInstall();
      
      if (success) {
        setShowPrompt(false);
      }
    } catch (error) {
      console.error('Install failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Set a flag to not show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  const getInstallInstructions = () => {
    switch (platform) {
      case 'ios':
        return {
          title: 'Install Himalayan Sound App',
          description: 'Add to your home screen for the best experience',
          steps: [
            'Tap the share button in Safari',
            'Select "Add to Home Screen"',
            'Tap "Add" to install'
          ]
        };
      case 'android':
        return {
          title: 'Install Himalayan Sound App',
          description: 'Get app-like experience with offline access',
          steps: [
            'Tap "Install" below',
            'Confirm installation',
            'Launch from your home screen'
          ]
        };
      case 'desktop':
        return {
          title: 'Install Himalayan Sound',
          description: 'Install for quick access and offline browsing',
          steps: [
            'Click "Install" below',
            'Confirm installation',
            'Access from your desktop'
          ]
        };
      default:
        return {
          title: 'Install App',
          description: 'Get the best experience',
          steps: []
        };
    }
  };

  if (!showPrompt) {
    return null;
  }

  const instructions = getInstallInstructions();
  const IconComponent = platform === 'desktop' ? Monitor : Smartphone;

  return (
    <Card className={cn('fixed bottom-4 left-4 right-4 z-50 shadow-lg border-gold-200 bg-white', className)}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
            <IconComponent className="h-5 w-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-charcoal-900">
              {instructions.title}
            </h3>
            <p className="text-sm text-charcoal-600 mt-1">
              {instructions.description}
            </p>
            
            {/* Benefits */}
            <div className="mt-2 space-y-1">
              <div className="flex items-center space-x-2 text-xs text-charcoal-600">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                <span>Offline access to products</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-charcoal-600">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                <span>Fast loading and smooth experience</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-charcoal-600">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                <span>Push notifications for new products</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="p-1 h-6 w-6 text-charcoal-400 hover:text-charcoal-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <Button
            onClick={handleInstall}
            disabled={isInstalling}
            className="flex-1 bg-gold-500 hover:bg-gold-600 text-white"
          >
            {isInstalling ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Installing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Install App</span>
              </div>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleDismiss}
            className="px-4"
          >
            Not Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstallPrompt;