'use client';

import { YouTubeChannelPicker } from '@/components/admin/YouTubeChannelPicker';
import { Button } from '@/components/ui/button';
import { APP_MEDIA_LIMITS, formatBytes } from '@/lib/media/storage';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { Mic, Square, Trash2, Upload, Video } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface ProductMediaValues {
  audio_sample: string;
  video_sample: string;
  youtube_url: string;
  soundcloud_url: string;
}

interface ProductMediaFieldProps {
  value: ProductMediaValues;
  onChange: (next: ProductMediaValues) => void;
  errors?: Partial<Record<keyof ProductMediaValues, { message?: string }>>;
}

async function uploadAvFile(file: File, kind: 'audio' | 'video') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('kind', kind);
  formData.append('title', file.name.replace(/\.[^.]+$/, '') || kind);

  const response = await fetch('/api/media/upload-av', {
    method: 'POST',
    body: formData,
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || 'Upload failed');
  }
  return json.url as string;
}

export function ProductMediaField({ value, onChange, errors }: ProductMediaFieldProps) {
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [recordingVideo, setRecordingVideo] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const audioInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const liveVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const patch = (partial: Partial<ProductMediaValues>) => {
    onChange({ ...value, ...partial });
  };

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (liveVideoRef.current) {
      liveVideoRef.current.srcObject = null;
    }
  };

  const handleUpload = async (file: File, kind: 'audio' | 'video') => {
    setError(null);
    setStatus(null);
    if (kind === 'audio') setUploadingAudio(true);
    else setUploadingVideo(true);

    try {
      const url = await uploadAvFile(file, kind);
      if (kind === 'audio') patch({ audio_sample: url });
      else patch({ video_sample: url });
      setStatus(`${kind === 'audio' ? 'Audio' : 'Video'} uploaded successfully`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploadingAudio(false);
      setUploadingVideo(false);
    }
  };

  const startRecording = async (kind: 'audio' | 'video') => {
    setError(null);
    setStatus(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        kind === 'audio'
          ? { audio: true }
          : { audio: true, video: { facingMode: 'environment' } }
      );
      streamRef.current = stream;

      if (kind === 'video' && liveVideoRef.current) {
        liveVideoRef.current.srcObject = stream;
        await liveVideoRef.current.play().catch(() => undefined);
      }

      const mimeType =
        kind === 'audio'
          ? MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
            ? 'audio/webm;codecs=opus'
            : 'audio/webm'
          : MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
            ? 'video/webm;codecs=vp9,opus'
            : 'video/webm';

      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        stopStream();
        const extension = kind === 'audio' ? 'webm' : 'webm';
        const file = new File([blob], `recording-${Date.now()}.${extension}`, {
          type: mimeType,
        });
        await handleUpload(file, kind);
        setRecordingAudio(false);
        setRecordingVideo(false);
      };

      recorder.start();
      if (kind === 'audio') setRecordingAudio(true);
      else setRecordingVideo(true);
      setStatus(kind === 'audio' ? 'Recording audio…' : 'Recording video…');
    } catch (err) {
      stopStream();
      setError(
        err instanceof Error
          ? err.message
          : 'Microphone/camera permission denied or unavailable'
      );
      setRecordingAudio(false);
      setRecordingVideo(false);
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    } else {
      stopStream();
      setRecordingAudio(false);
      setRecordingVideo(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-charcoal-900">Sound & Video</h2>
        <p className="mt-1 text-sm text-charcoal-600">
          Upload or record a bowl sound sample and product video. Customers hear/see these on the
          product page. Max audio {formatBytes(APP_MEDIA_LIMITS.maxAudioBytes)}, video{' '}
          {formatBytes(APP_MEDIA_LIMITS.maxVideoBytes)}.
        </p>
      </div>

      {status ? <p className={ui.banner.info}>{status}</p> : null}
      {error ? <p className={ui.banner.danger}>{error}</p> : null}

      {/* Audio */}
      <div className="rounded-xl border border-cream-200 bg-cream-50/60 p-4 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-charcoal-900">Audio sample</h3>
          {value.audio_sample ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => patch({ audio_sample: '' })}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Remove
            </Button>
          ) : null}
        </div>

        {value.audio_sample ? (
          <audio controls preload="metadata" className="w-full" src={value.audio_sample} />
        ) : (
          <p className="text-sm text-charcoal-500">No audio yet — upload a file or record now.</p>
        )}

        <div className="flex flex-wrap gap-2">
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.webm"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleUpload(file, 'audio');
              e.target.value = '';
            }}
          />
          <Button
            type="button"
            variant="outline"
            disabled={uploadingAudio || recordingAudio}
            onClick={() => audioInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploadingAudio ? 'Uploading…' : 'Upload audio'}
          </Button>
          {!recordingAudio ? (
            <Button
              type="button"
              disabled={uploadingAudio || recordingVideo}
              onClick={() => void startRecording('audio')}
            >
              <Mic className="mr-2 h-4 w-4" />
              Record audio
            </Button>
          ) : (
            <Button type="button" variant="destructive" onClick={stopRecording}>
              <Square className="mr-2 h-4 w-4" />
              Stop recording
            </Button>
          )}
        </div>

        <div>
          <label className={ui.labelSm}>Or paste audio URL</label>
          <input
            value={value.audio_sample}
            onChange={(e) => patch({ audio_sample: e.target.value })}
            placeholder="https://res.cloudinary.com/.../audio.mp3"
            className={cn(ui.field, ui.focus)}
          />
          {errors?.audio_sample?.message ? (
            <p className="mt-1 text-sm text-copper-700">{errors.audio_sample.message}</p>
          ) : null}
        </div>
      </div>

      {/* Video */}
      <div className="rounded-xl border border-cream-200 bg-cream-50/60 p-4 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-charcoal-900">Video sample</h3>
          {value.video_sample ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => patch({ video_sample: '' })}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Remove
            </Button>
          ) : null}
        </div>

        {recordingVideo ? (
          <video
            ref={liveVideoRef}
            muted
            playsInline
            className="aspect-video w-full rounded-lg bg-black object-cover"
          />
        ) : value.video_sample ? (
          <video
            controls
            preload="metadata"
            className="aspect-video w-full rounded-lg bg-black"
            src={value.video_sample}
          />
        ) : (
          <p className="text-sm text-charcoal-500">No video yet — upload a file or record now.</p>
        )}

        <div className="flex flex-wrap gap-2">
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*,.mp4,.webm,.mov,.m4v"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleUpload(file, 'video');
              e.target.value = '';
            }}
          />
          <Button
            type="button"
            variant="outline"
            disabled={uploadingVideo || recordingVideo}
            onClick={() => videoInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploadingVideo ? 'Uploading…' : 'Upload video'}
          </Button>
          {!recordingVideo ? (
            <Button
              type="button"
              disabled={uploadingVideo || recordingAudio}
              onClick={() => void startRecording('video')}
            >
              <Video className="mr-2 h-4 w-4" />
              Record video
            </Button>
          ) : (
            <Button type="button" variant="destructive" onClick={stopRecording}>
              <Square className="mr-2 h-4 w-4" />
              Stop recording
            </Button>
          )}
        </div>

        <div>
          <label className={ui.labelSm}>Or paste video URL</label>
          <input
            value={value.video_sample}
            onChange={(e) => patch({ video_sample: e.target.value })}
            placeholder="https://res.cloudinary.com/.../video.mp4"
            className={cn(ui.field, ui.focus)}
          />
          {errors?.video_sample?.message ? (
            <p className="mt-1 text-sm text-copper-700">{errors.video_sample.message}</p>
          ) : null}
        </div>
      </div>

      {/* YouTube: channel picker OR paste link */}
      <div className="space-y-3">
        <YouTubeChannelPicker
          selectedUrl={value.youtube_url}
          onSelect={(url) => patch({ youtube_url: url })}
        />
        <div>
          <label className={ui.labelSm}>Or paste YouTube video link</label>
          <input
            value={value.youtube_url}
            onChange={(e) => patch({ youtube_url: e.target.value })}
            placeholder="https://youtube.com/watch?v=..."
            className={cn(ui.field, ui.focus)}
          />
          {errors?.youtube_url?.message ? (
            <p className="mt-1 text-sm text-copper-700">{errors.youtube_url.message}</p>
          ) : null}
          {(() => {
            const videoId = value.youtube_url.match(
              /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
            )?.[1];
            if (!videoId) return null;
            return (
              <div className="mt-3 aspect-video overflow-hidden rounded-lg bg-black">
                <iframe
                  title="YouTube preview"
                  src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          })()}
        </div>
      </div>

      <div>
        <label className={ui.labelSm}>SoundCloud URL (optional embed)</label>
        <input
          value={value.soundcloud_url}
          onChange={(e) => patch({ soundcloud_url: e.target.value })}
          placeholder="https://soundcloud.com/..."
          className={cn(ui.field, ui.focus)}
        />
        {errors?.soundcloud_url?.message ? (
          <p className="mt-1 text-sm text-copper-700">{errors.soundcloud_url.message}</p>
        ) : null}
      </div>
    </div>
  );
}
