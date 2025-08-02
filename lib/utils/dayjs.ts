import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import updateLocale from "dayjs/plugin/updateLocale";

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(updateLocale);

// Configure Indonesian locale
dayjs.updateLocale("en", {
  relativeTime: {
    future: "dalam %s",
    past: "%s yang lalu",
    s: "beberapa detik",
    m: "1 menit",
    mm: "%d menit",
    h: "1 jam",
    hh: "%d jam",
    d: "1 hari",
    dd: "%d hari",
    w: "1 minggu",
    ww: "%d minggu",
    M: "1 bulan",
    MM: "%d bulan",
    y: "1 tahun",
    yy: "%d tahun",
  },
});

// Utility functions for consistent date formatting
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DD");
};

export const formatDateLong = (date: string | Date | null | undefined): string => {
  if (!date) return "";
  return dayjs(date).format("DD MMMM YYYY");
};

export const formatDateTime = (date: string | Date | null | undefined): string => {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DD HH:mm");
};

export const formatRelativeTime = (date: string | Date | null | undefined): string => {
  if (!date) return "";
  return dayjs(date).fromNow();
};

export default dayjs; 