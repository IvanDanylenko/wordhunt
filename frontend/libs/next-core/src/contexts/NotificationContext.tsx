/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, createContext, ReactNode, useCallback, useMemo, useState, useContext } from 'react';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface NotificationOptions {
  // The duration in milliseconds the notification is shown
  autoHideDuration?: number;
  // Arguments used to translate the message
  messageArgs?: Record<string, unknown>;
  // If true, the notification shows the message in multiple lines
  multiLine?: boolean;
  // If true, the notification shows an Undo button
  undoable?: boolean;
}

export interface NotificationPayload {
  readonly message: string;
  readonly type: NotificationType;
  readonly notificationOptions?: NotificationOptions;
}

export type NotificationContextType = {
  notifications: NotificationPayload[];
  addNotification: (notification: NotificationPayload) => void;
  takeNotification: () => NotificationPayload | void;
  resetNotifications: () => void;
};

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {},
  takeNotification: () => {},
  resetNotifications: () => {},
});

export interface NotificationContextProviderProps {
  children: ReactNode;
}

export const NotificationContextProvider: FC<NotificationContextProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);

  const addNotification = useCallback((notification: NotificationPayload) => {
    setNotifications((notifications) => [...notifications, notification]);
  }, []);

  const takeNotification = useCallback(() => {
    const [notification, ...rest] = notifications;
    setNotifications(rest);
    return notification;
  }, [notifications]);

  const resetNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      notifications,
      addNotification,
      takeNotification,
      resetNotifications,
    }),
    [notifications, addNotification, resetNotifications, takeNotification],
  );

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
