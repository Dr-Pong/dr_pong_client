import nipplejs from 'nipplejs';

import React, { useEffect, useRef } from 'react';

const Joystick = ({
  onJoy,
  offJoy,
}: {
  onJoy?: (data: nipplejs.JoystickOutputData) => void;
  offJoy?: () => void;
}) => {
  const joystickRef = useRef({});

  useEffect(() => {
    import('nipplejs').then((nipplejs) => {
      const joystick = nipplejs.create({
        // Customize the joystick appearance and behavior here
        // For example:
        zone: document.getElementById('pongGame'),
        mode: 'dynamic',
        position: { left: '50%', top: '50%' },
        color: 'rgba(154, 154, 154, 0.3)',
        size: 75,
        dynamicPage: true,
      });

      // Add event listeners to handle joystick movements
      joystick.on('move', (evt, data) => {
        onJoy?.(data);
      });

      joystick.on('end', () => {
        offJoy?.();
      });

      joystickRef.current = joystick;
    });
  }, []);

  return <div ref={joystickRef}></div>;
};

export default Joystick;