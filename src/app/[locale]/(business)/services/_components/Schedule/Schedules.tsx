import ScheduleComponent from './ScheduleCardItem';

export default function Schedules() {
  return (
    <div>
      <ScheduleComponent day='monday' />
      <ScheduleComponent day='tuesday' />
      <ScheduleComponent day='wednesday' />
      <ScheduleComponent day='thursday' />
      <ScheduleComponent day='friday' />
      <ScheduleComponent day='saturday' />
      <ScheduleComponent day='sunday' />
    </div>
  );
}
