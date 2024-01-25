import { useState, useEffect, useCallback } from 'react';
import { Snackbar, SnackbarProps, SnackbarOrigin } from '@mui/material';
import { NotificationPayload, useNotificationContext } from '../../contexts';

export interface NotificationProps extends Omit<SnackbarProps, 'open'> {
  type?: string;
  autoHideDuration?: number;
  multiLine?: boolean;
}

const defaultAnchorOrigin: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'center',
};

/**
 * Provides a way to show a notification.
 */
export const Notification = (props: NotificationProps) => {
  const {
    type = 'info',
    autoHideDuration = 4000,
    multiLine = false,
    anchorOrigin = defaultAnchorOrigin,
    ...rest
  } = props;

  const { notifications, takeNotification } = useNotificationContext();
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<NotificationPayload | void>();

  useEffect(() => {
    if (notifications.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo(takeNotification());
      setOpen(true);
    } else if (notifications.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [notifications, messageInfo, open, takeNotification]);

  const handleRequestClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleExited = useCallback(() => {
    setMessageInfo(undefined);
  }, []);

  if (!messageInfo) return null;

  return (
    <Snackbar
      open={open}
      message={messageInfo.message}
      autoHideDuration={messageInfo.notificationOptions?.autoHideDuration || autoHideDuration}
      disableWindowBlurListener={messageInfo.notificationOptions?.undoable}
      TransitionProps={{ onExited: handleExited }}
      onClose={handleRequestClose}
      ContentProps={{
        sx: {
          backgroundColor: `${messageInfo.type || type}.main`,
          color: `${messageInfo.type || type}.contrastText`,
          whiteSpace: multiLine ? 'pre-wrap' : 'unset',
        },
      }}
      anchorOrigin={anchorOrigin}
      {...rest}
    />
  );
};
