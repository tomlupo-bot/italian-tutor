import { redirect } from "next/navigation";
import { withBasePath } from "@/lib/paths";

export default function CalendarPage() {
  redirect(withBasePath("/progress"));
}
