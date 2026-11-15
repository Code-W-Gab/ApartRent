export function formatDate(dateString: string){
  const date = new Date(dateString)

  if(Number.isNaN(date.getTime())) return "Invalid date"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC"
  }).format(date)
}