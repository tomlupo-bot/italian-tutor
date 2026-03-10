"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ShellWidth = "narrow" | "wide";

interface AppScreenShellProps {
  children: ReactNode;
  header?: ReactNode;
  width?: ShellWidth;
  className?: string;
  contentClassName?: string;
}

const WIDTH_CLASS: Record<ShellWidth, string> = {
  narrow: "max-w-lg",
  wide: "max-w-xl",
};

export function AppScreenShell({
  children,
  header,
  width = "narrow",
  className,
  contentClassName,
}: AppScreenShellProps) {
  return (
    <main
      className={cn(
        "min-h-screen flex flex-col mx-auto w-full pb-16",
        WIDTH_CLASS[width],
        className,
      )}
    >
      {header}
      <div className={cn("px-4", contentClassName)}>{children}</div>
    </main>
  );
}

interface StudyShellProps {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function StudyShell({
  children,
  header,
  className,
  contentClassName,
}: StudyShellProps) {
  return (
    <AppScreenShell
      width="wide"
      header={header}
      className={className}
      contentClassName={cn("py-4 flex flex-col items-center justify-center gap-4", contentClassName)}
    >
      {children}
    </AppScreenShell>
  );
}

interface MissionShellProps {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function MissionShell({
  children,
  header,
  className,
  contentClassName,
}: MissionShellProps) {
  return (
    <AppScreenShell
      width="narrow"
      header={header}
      className={className}
      contentClassName={cn("py-4 flex flex-col gap-4", contentClassName)}
    >
      {children}
    </AppScreenShell>
  );
}

interface DashboardShellProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function DashboardShell({
  children,
  className,
  contentClassName,
}: DashboardShellProps) {
  return (
    <AppScreenShell
      width="narrow"
      className={className}
      contentClassName={cn("py-4 flex flex-col gap-4", contentClassName)}
    >
      {children}
    </AppScreenShell>
  );
}
