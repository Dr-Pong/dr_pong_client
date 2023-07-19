import nipplejs from 'nipplejs';

import React, { useEffect, useRef } from 'react';

const Joystick = ({
  onJoy,
  offJoy,
}: {
  onJoy?: (data: nipplejs.JoystickOutputData) => void;
  offJoy?: () => void;
}) => {
  const joystickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('nipplejs').then((nipplejs) => {
      const joystick = nipplejs.create({
        // Customize the joystick appearance and behavior here
        // For example:
        zone: document.getElementById('pongGame'),
        mode: 'dynamic',
        color: 'rgba(154, 154, 154, 0.3)',
        size: 75,
        restJoystick: true,
      });

      // Add event listeners to handle joystick movements
      joystick.on('move', (evt, data) => {
        onJoy?.(data);
      });

      joystick.on('end', () => {
        offJoy?.();
      });

      joystickRef.current = joystick as any;
    });
  }, []);

  return <div ref={joystickRef}></div>;
};

export default Joystick;
