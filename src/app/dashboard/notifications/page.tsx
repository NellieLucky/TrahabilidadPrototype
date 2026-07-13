'use client';

import React, { useState } from 'react';
import { Bell, Info, ShieldAlert, Sparkles, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'alert' | 'success';
  read: boolean;
}

export default function NotificationsPage() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Interview Accommodation Approved',
      message: 'Google Philippines has confirmed a Sign Language Interpreter and extended Response Time will be provided for your upcoming Frontend Developer interview.',
      time: '3 hours ago',
      type: 'success',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'New Accommodation Feature Added',
      message: 'You can now set dyslexia-friendly fonts as your default reading setting on all Job Details screens.',
      time: '1 day ago',
      type: 'info',
      read: true,
    },
    {
      id: 'notif-3',
      title: 'Accessibility Action Required',
      message: 'Your requested schedule window for the Accenture interview is conflicting. Please review and update your calendar preferences under Profile Settings.',
      time: '2 days ago',
      type: 'alert',
      read: true,
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast('All notifications marked as read', 'success');
  };

  const handleDelete = (id: string, title: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast(`Dismissed: "${title}"`, 'info');
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return <Sparkles className="w-5 h-5 text-green-600" aria-hidden="true" />;
      case 'alert':
        return <ShieldAlert className="w-5 h-5 text-amber-600" aria-hidden="true" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" aria-hidden="true" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Description banner */}
      <section
        aria-label="Alerts controls"
        className="p-5 rounded-2xl border border-border-color bg-background-color shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <p className="text-base text-gray-700 font-semibold leading-relaxed max-w-xl">
          Track real-time responses from inclusive employers regarding your interview accommodation approvals.
        </p>
        {notifications.some((n) => !n.read) && (
          <Button variant="outline" size="sm" onClick={handleMarkAllRead} className="whitespace-nowrap">
            Mark all read
          </Button>
        )}
      </section>

      {/* Notifications list */}
      <section aria-label="Inbox list" className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <article
              key={n.id}
              className={cn(
                'p-5 rounded-xl border border-border-color bg-background-color shadow-sm flex gap-4 transition-all hover:shadow-md relative focus-within:ring-4 focus-within:ring-primary/20',
                !n.read && 'border-primary/20 bg-primary/[0.02]'
              )}
            >
              {/* Unread circle pip indicator */}
              {!n.read && (
                <div
                  className="absolute top-5 left-2.5 w-2 h-2 rounded-full bg-primary"
                  aria-label="Unread alert indicator"
                />
              )}

              {/* Action type Icon */}
              <div className="shrink-0 mt-0.5" aria-hidden="true">
                {getIcon(n.type)}
              </div>

              {/* Text content details */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <h3 className="text-base font-bold text-foreground-color leading-snug">
                    {n.title}
                  </h3>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                    {n.time}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-600 leading-relaxed">
                  {n.message}
                </p>
              </div>

              {/* Delete notification */}
              <button
                type="button"
                onClick={() => handleDelete(n.id, n.title)}
                aria-label={`Dismiss notification: ${n.title}`}
                className="p-1.5 rounded-lg border border-transparent hover:bg-surface text-gray-400 hover:text-foreground-color transition-colors focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </article>
          ))
        ) : (
          <div className="p-12 text-center border-2 border-dashed border-border-color rounded-2xl bg-background-color max-w-lg mx-auto">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground-color">All caught up!</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              No new alerts or accommodations updates in your inbox.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
