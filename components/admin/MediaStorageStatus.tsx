'use client';

import { formatBytes, formatPercent } from '@/lib/media/storage';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { Cloud, ExternalLink, HardDrive, ImageIcon, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MediaUsageData {
  provider: string;
  providerUrl: string;
  cloudName: string | null;
  plan: string | null;
  lastUpdated: string | null;
  credits: {
    usage: number;
    limit: number;
    usedPercent: number;
    unit: string;
  } | null;
  storage: {
    usageBytes: number;
    limitBytes: number | null;
    usedPercent: number | null;
  } | null;
  bandwidth: {
    usageBytes: number;
    limitBytes: number | null;
  } | null;
  resources: number | null;
  limits: {
    appMaxUploadBytes: number;
    cloudinaryImageMaxBytes: number;
    folder: string;
  };
}

function UsageBar({ percent }: { percent: number | null | undefined }) {
  const value = Math.min(100, Math.max(0, percent ?? 0));
  const tone =
    value >= 90 ? 'bg-copper-600' : value >= 70 ? 'bg-bronze-500' : 'bg-gold-600';

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-cream-200">
      <div className={cn('h-full rounded-full transition-all', tone)} style={{ width: `${value}%` }} />
    </div>
  );
}

export function MediaStorageStatus() {
  const [data, setData] = useState<MediaUsageData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch('/api/cloudinary/usage');
        const json = await response.json();
        if (!cancelled) {
          setData(json.data || null);
          setError(json.success === false ? json.error || 'Could not load usage' : null);
        }
      } catch {
        if (!cancelled) setError('Could not load storage usage');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className={cn(ui.card, 'animate-pulse')}>
        <div className="h-4 w-48 rounded bg-cream-200" />
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-lg bg-cream-100" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={ui.banner.warning}>
        {error || 'Media storage status unavailable.'}
      </div>
    );
  }

  const storagePercent =
    data.storage?.usedPercent ?? data.credits?.usedPercent ?? null;
  const creditsLimitLabel =
    data.credits?.limit != null ? `${data.credits.limit} credits` : '—';

  return (
    <div className={cn(ui.card, 'space-y-4')}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-gold-700" />
            <h2 className="text-lg font-semibold text-charcoal-900">Media storage</h2>
          </div>
          <p className="mt-1 text-sm text-charcoal-600">
            Gallery and product images are stored on{' '}
            <strong>{data.provider}</strong>
            {data.cloudName ? (
              <>
                {' '}
                (cloud: <code className="rounded bg-cream-100 px-1">{data.cloudName}</code>)
              </>
            ) : null}
            . Plan: <strong>{data.plan || '—'}</strong>
            {data.lastUpdated ? ` · usage as of ${data.lastUpdated}` : null}
          </p>
        </div>
        <a
          href={data.providerUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(ui.link, 'inline-flex items-center gap-1 text-sm font-medium')}
        >
          Open {data.provider}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {error ? (
        <p className="text-sm text-copper-700">
          Live usage unavailable ({error}). Showing configured limits only.
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-cream-200 bg-cream-50 p-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-charcoal-500">
            <HardDrive className="h-3.5 w-3.5" />
            Storage used
          </div>
          <p className="text-lg font-semibold text-charcoal-900">
            {formatBytes(data.storage?.usageBytes ?? 0)}
          </p>
          <p className="text-xs text-charcoal-500">
            of ~{data.storage?.limitBytes != null ? formatBytes(data.storage.limitBytes) : creditsLimitLabel}{' '}
            plan cap
          </p>
          <div className="mt-2">
            <UsageBar percent={storagePercent} />
            <p className="mt-1 text-xs text-charcoal-500">
              {formatPercent(storagePercent)} of plan
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-cream-200 bg-cream-50 p-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-charcoal-500">
            Credits
          </div>
          <p className="text-lg font-semibold text-charcoal-900">
            {data.credits
              ? `${Math.max(0, data.credits.usage).toFixed(2)} / ${data.credits.limit}`
              : '—'}
          </p>
          <p className="text-xs text-charcoal-500">
            Monthly Cloudinary credits (storage + bandwidth)
          </p>
          <div className="mt-2">
            <UsageBar percent={data.credits?.usedPercent} />
          </div>
        </div>

        <div className="rounded-lg border border-cream-200 bg-cream-50 p-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-charcoal-500">
            <ImageIcon className="h-3.5 w-3.5" />
            Assets in library
          </div>
          <p className="text-lg font-semibold text-charcoal-900">
            {data.resources ?? '—'}
          </p>
          <p className="text-xs text-charcoal-500">
            Bandwidth this cycle: {formatBytes(data.bandwidth?.usageBytes ?? 0)}
          </p>
        </div>

        <div className="rounded-lg border border-cream-200 bg-cream-50 p-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-charcoal-500">
            <Upload className="h-3.5 w-3.5" />
            Upload limits
          </div>
          <p className="text-lg font-semibold text-charcoal-900">
            {formatBytes(data.limits.appMaxUploadBytes)} / file
          </p>
          <p className="text-xs text-charcoal-500">
            Cloudinary max image: {formatBytes(data.limits.cloudinaryImageMaxBytes)}
          </p>
          <p className="mt-1 text-xs text-charcoal-500">
            Folder: <code className="rounded bg-white px-1">{data.limits.folder}</code>
          </p>
        </div>
      </div>
    </div>
  );
}
