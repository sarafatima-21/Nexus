import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

type CalendarEvent = {
  title: string;
  date: string;
  status: 'availability' | 'pending' | 'accepted';
};

export function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    { title: 'Investor Meeting', date: '2026-04-12', status: 'accepted' }
  ]);

  const handleDateClick = (info: any) => {
    const type = prompt(
      'Type:\n1 = Availability\n2 = Meeting Request'
    );

    if (type === '1') {
      setEvents([
        ...events,
        {
          title: 'Available',
          date: info.dateStr,
          status: 'availability'
        }
      ]);
    }

    if (type === '2') {
      setEvents([
        ...events,
        {
          title: 'Meeting (Pending)',
          date: info.dateStr,
          status: 'pending'
        }
      ]);
    }
  };

  const calendarEvents = events.map(ev => ({
    title: ev.title,
    date: ev.date,
    backgroundColor:
      ev.status === 'availability'
        ? '#22c55e'   // green
        : ev.status === 'pending'
        ? '#facc15'   // yellow
        : '#3b82f6'   // blue
  }));

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Meeting Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        dateClick={handleDateClick}
        height={450}
      />
    </div>
  );
}