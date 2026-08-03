import { Calendar } from "@/registry/new-york-v4/ui/calendar"

// Every story pins its month and selection to fixed dates. A Calendar that
// defaults to "today" screenshots differently on every run, which churns the
// grades for no reason.
const JUNE_2025 = new Date(2025, 5, 1)

// Ported from examples/calendar-demo.tsx. `captionLayout="dropdown"` is the
// month/year dropdown caption; startMonth/endMonth pin the year range so the
// dropdown options do not move with the wall clock.
export function DatePicker() {
  return (
    <Calendar
      mode="single"
      defaultMonth={JUNE_2025}
      selected={new Date(2025, 5, 12)}
      startMonth={new Date(2024, 0)}
      endMonth={new Date(2026, 11)}
      captionLayout="dropdown"
      className="rounded-md border shadow-sm"
    />
  )
}

// `mode="range"` with both ends set — the middle days pick up the range fill
// and the endpoints render as the rounded range caps.
export function DateRange() {
  return (
    <Calendar
      mode="range"
      defaultMonth={JUNE_2025}
      selected={{ from: new Date(2025, 5, 9), to: new Date(2025, 5, 16) }}
      className="rounded-md border shadow-sm"
    />
  )
}

// `numberOfMonths` for a two-up range picker, with the range crossing the
// month boundary so the continuation styling is visible on both panels.
export function TwoMonthRange() {
  return (
    <Calendar
      mode="range"
      defaultMonth={JUNE_2025}
      numberOfMonths={2}
      selected={{ from: new Date(2025, 5, 24), to: new Date(2025, 6, 8) }}
      className="rounded-md border shadow-sm"
    />
  )
}

// The disabled axis: a weekend matcher plus specific unavailable dates, which
// is the shape a booking calendar actually uses.
export function UnavailableDates() {
  return (
    <Calendar
      mode="single"
      defaultMonth={JUNE_2025}
      selected={new Date(2025, 5, 18)}
      disabled={[
        { dayOfWeek: [0, 6] },
        new Date(2025, 5, 10),
        new Date(2025, 5, 11),
        new Date(2025, 5, 25),
      ]}
      className="rounded-md border shadow-sm"
    />
  )
}
