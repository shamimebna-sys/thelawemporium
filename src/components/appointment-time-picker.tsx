"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/lib/types";

type AppointmentTimePickerProps = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  locale: Locale;
  error?: string;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDateKey(year: number, monthIndex: number, day: number) {
  return `${pad(monthIndex + 1)}/${pad(day)}/${year}`;
}

function parseValue(value: string): { dateStr: string; timeStr: string } {
  const trimmed = value.trim();
  if (!trimmed) return { dateStr: "", timeStr: "" };
  const match = /^(\d{2}\/\d{2}\/\d{4})\s+(.+)$/.exec(trimmed);
  if (match) {
    return { dateStr: match[1], timeStr: match[2] };
  }
  return { dateStr: "", timeStr: "" };
}

export function AppointmentTimePicker({
  name,
  label,
  value,
  onChange,
  locale,
  error,
}: AppointmentTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(0);
  const [todayKey, setTodayKey] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogId = useId();
  const labelId = useId();

  const { dateStr, timeStr } = parseValue(value);

  useEffect(() => {
    const now = new Date();
    const frame = window.requestAnimationFrame(() => {
      setViewYear(now.getFullYear());
      setViewMonth(now.getMonth());
      setTodayKey(formatDateKey(now.getFullYear(), now.getMonth(), now.getDate()));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function handleSelectDate(day: number) {
    const nextDate = formatDateKey(viewYear, viewMonth, day);
    const nextTime = timeStr || "10:00 AM";
    onChange(`${nextDate} ${nextTime}`);
  }

  function handleSelectTime(slot: string) {
    const fallbackDate = todayKey || formatDateKey(viewYear, viewMonth, 1);
    const nextDate = dateStr || fallbackDate;
    onChange(`${nextDate} ${slot}`);
  }

  function goPrevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function goNextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  const firstDayOffset = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  return (
    <div ref={containerRef} className="relative">
      <label id={labelId} htmlFor={`${dialogId}-trigger`} className="text-lg font-medium text-neutral-800 mb-2 block">
        {label}{" "}
        <span className="text-neutral-900" aria-hidden="true">
          *
        </span>
      </label>

      <input type="hidden" name={name} value={value} />

      <button
        ref={triggerRef}
        id={`${dialogId}-trigger`}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        aria-labelledby={labelId}
        onClick={() => setOpen((prev) => !prev)}
        className="px-3.5 py-3 w-full text-lg text-left bg-white border border-neutral-300 focus:border-blue-500 focus:outline-none rounded-sm flex items-center justify-between gap-3 cursor-pointer transition-colors duration-200"
      >
        <span className={value ? "text-neutral-800" : "text-neutral-500"}>
          {value || "MM/DD/YYYY --:-- --"}
        </span>
        <svg
          className="h-5 w-5 shrink-0 text-neutral-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </button>

      {open ? (
        <div
          id={dialogId}
          role="dialog"
          aria-label={label}
          className="absolute bottom-full left-0 mb-2 z-50 w-full sm:w-auto sm:min-w-[460px] max-w-[calc(100vw-3rem)] bg-white border border-neutral-200 rounded-lg shadow-2xl p-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-[260px]">
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={goPrevMonth}
                  aria-label="Previous month"
                  className="h-9 w-9 flex items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <span className="text-base font-semibold text-neutral-900">
                  {MONTHS[viewMonth]} {viewYear}
                </span>
                <button
                  type="button"
                  onClick={goNextMonth}
                  aria-label="Next month"
                  className="h-9 w-9 flex items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {WEEKDAYS.map((day) => (
                  <div key={day} className="text-sm font-semibold text-neutral-500 py-1">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: firstDayOffset }).map((_, index) => (
                  <div key={`empty-${index}`} className="h-10" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const key = formatDateKey(viewYear, viewMonth, day);
                  const isSelected = dateStr === key;
                  const isToday = todayKey === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelectDate(day)}
                      className={`h-10 w-full rounded-md text-base font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-black text-white"
                          : isToday
                            ? "border border-gold text-neutral-900 hover:bg-neutral-100"
                            : "text-neutral-800 hover:bg-neutral-100"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full sm:w-44 border-t sm:border-t-0 sm:border-l border-neutral-200 pt-3 sm:pt-0 sm:pl-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                {locale === "bn" ? "সময়" : "Time"}
              </p>
              <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = timeStr === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleSelectTime(slot)}
                      className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-black text-white"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onChange("");
              }}
              className="text-sm font-medium text-neutral-500 hover:text-black cursor-pointer"
            >
              {locale === "bn" ? "মুছুন" : "Clear"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold px-4 py-1.5 bg-black text-white rounded-md hover:bg-gold hover:text-black transition-colors cursor-pointer"
            >
              {locale === "bn" ? "সম্পন্ন" : "Done"}
            </button>
          </div>
        </div>
      ) : null}

      {error ? <span className="field-error block mt-1.5">{error}</span> : null}
    </div>
  );
}
