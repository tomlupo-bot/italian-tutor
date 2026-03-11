import { redirect } from "next/navigation";
import { withBasePath } from "@/lib/paths";

export default function ExercisesRedirectPage() {
  redirect(withBasePath("/drills"));
}
