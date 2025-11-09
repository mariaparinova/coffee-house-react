import './Notification.css';
import { useEffect, useRef, useState } from 'react';
import { Button, ButtonStyle } from '../Button/Button.tsx';

export function Notification(props: { textContent: string; duration?: number }) {
  const [visible, setVisible] = useState(true);
  const duration = props.duration ?? 2500;
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration]);

  const handleRemove = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="notification">
      {props.textContent}
      <Button style={ButtonStyle.Secondary} onClick={handleRemove}>
        Close
      </Button>
    </div>
  );
}
