'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { useState } from 'react';
import { toast } from 'sonner';

const SUBJECT_OPTIONS = [
  'general',
  'product',
  'order',
  'shipping',
  'wholesale',
  'custom',
] as const;

interface ContactFormProps {
  locale: Locale;
}

export function ContactForm({ locale }: ContactFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<string>('general');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!firstName.trim() || !email.trim() || !message.trim()) {
      toast.error(t('contact.form.error', locale));
      return;
    }

    setSubmitting(true);

    try {
      const subjectLabel = t(`contact.form.subject.${subject}`, locale);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          email: email.trim(),
          subject: subjectLabel,
          message: message.trim(),
          locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success(t('contact.form.success', locale));
      setFirstName('');
      setLastName('');
      setEmail('');
      setSubject('general');
      setMessage('');
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(t('contact.form.error', locale));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">{t('form.firstName', locale)}</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">{t('form.lastName', locale)}</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">{t('form.email', locale)}</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="relative z-10">
        <Label htmlFor="subject">{t('form.subject', locale)}</Label>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger id="subject">
            <SelectValue placeholder={t('contact.form.subject.general', locale)} />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4} className="bg-white">
            {SUBJECT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {t(`contact.form.subject.${option}`, locale)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">{t('contact.form.message', locale)}</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('contact.form.message.placeholder', locale)}
          rows={6}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold-600 hover:bg-gold-700"
      >
        {submitting ? t('contact.form.sending', locale) : t('contact.form.send', locale)}
      </Button>
    </form>
  );
}
