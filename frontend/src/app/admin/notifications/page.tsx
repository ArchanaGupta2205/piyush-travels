"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import { Bell, Info, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import "./Notifications.css";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "alert";
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetchAPI("/notifications/admin");
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      try {
        await fetchAPI(`/notifications/${notification._id}/read`, {
          method: "PUT"
        });
        // Update local state to show as read immediately
        setNotifications(notifications.map(n => 
          n._id === notification._id ? { ...n, isRead: true } : n
        ));
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    }

    if (notification.link) {
      router.push(notification.link);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle size={24} />;
      case "warning": return <AlertTriangle size={24} />;
      case "alert": return <AlertCircle size={24} />;
      case "info":
      default: return <Info size={24} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
      </div>

      {notifications.length === 0 ? (
        <div className="no-notifications glass-panel">
          <Bell size={48} />
          <p>You have no notifications yet.</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`notification-card glass-panel ${!notification.isRead ? 'unread' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className={`notification-icon ${notification.type}`}>
                {getIcon(notification.type)}
              </div>
              <div className="notification-content">
                <h3 className="notification-title">{notification.title}</h3>
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">{formatDate(notification.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
