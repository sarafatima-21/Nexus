import Joyride, { Step } from 'react-joyride';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function AppTour() {
  const location = useLocation();
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard')) {
      setRun(true);
    } else {
      setRun(false);
    }
  }, [location.pathname]);

  const steps: Step[] = [
    {
      target: '.dashboard-step',
      content: 'This is your dashboard. You can see your activity overview here.',
    },
    {
      target: '.calendar-step',
      content: 'Schedule and manage meetings using the calendar.',
    },
    {
      target: '.video-step',
      content: 'Start video calls with investors or entrepreneurs.',
    },
    {
      target: '.document-step',
      content: 'Manage contracts and documents in the Document Chamber.',
    },
    {
      target: '.payment-step',
      content: 'Handle wallet balance, payments, and transactions here.',
    },
  ];

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      styles={{
        options: {
          primaryColor: '#2563eb',
          zIndex: 2000,
        },
      }}
    />
  );
}