"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  CheckSquare,
  Users,
  Video,
  FileText,
  UserCheck,
  Search,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { SearchData } from "@/types/search.types";

interface SearchResultsProps {
  data: SearchData | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string | null;
  isOpen: boolean;
  isMobileModal?: boolean;
  onSelect?: () => void;
}

type CategoryKey = "all" | "projects" | "users" | "tasks" | "meetings" | "files" | "teams";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function SearchResults({
  data,
  isLoading,
  isError,
  errorMessage,
  isOpen,
  isMobileModal = false,
  onSelect,
}: SearchResultsProps) {
  const [activeTab, setActiveTab] = useState<CategoryKey>("all");

  if (!isOpen) return null;

  const results = data?.results;
  const projects = results?.projects?.items ?? [];
  const users = results?.users?.items ?? [];
  const tasks = results?.tasks?.items ?? [];
  const meetings = results?.meetings?.items ?? [];
  const files = results?.files?.items ?? [];
  const teams = results?.teams?.items ?? [];

  const totalCount = data?.total ?? 0;
  const hasAnyResults = totalCount > 0;

  const tabs: { key: CategoryKey; label: string; count: number }[] = [
    { key: "all", label: "All", count: totalCount },
    ...(results?.projects?.total ? [{ key: "projects" as const, label: "Projects", count: results.projects.total }] : []),
    ...(results?.users?.total ? [{ key: "users" as const, label: "Users", count: results.users.total }] : []),
    ...(results?.tasks?.total ? [{ key: "tasks" as const, label: "Tasks", count: results.tasks.total }] : []),
    ...(results?.meetings?.total ? [{ key: "meetings" as const, label: "Meetings", count: results.meetings.total }] : []),
    ...(results?.files?.total ? [{ key: "files" as const, label: "Files", count: results.files.total }] : []),
    ...(results?.teams?.total ? [{ key: "teams" as const, label: "Teams", count: results.teams.total }] : []),
  ];

  return (
    <div
      className={
        isMobileModal
          ? "flex flex-col h-full w-full bg-white"
          : "absolute left-0 top-full z-[100] mt-2 w-[440px] md:w-[480px] overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-2xl backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-150"
      }
    >
      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center gap-3 px-4 py-12 text-sm text-neutral-500">
          <Loader2 className="size-5 animate-spin text-primary-light" />
          <span>Searching results...</span>
        </div>
      )}

      {/* Error state */}
      {!isLoading && isError && (
        <div className="flex flex-col items-center gap-2 px-4 py-12 text-center text-sm text-red-500">
          <AlertCircle className="size-6 text-red-500" />
          <p className="font-medium">Search failed</p>
          <p className="text-xs text-neutral-500">
            {errorMessage || "Unable to retrieve search results. Please try again."}
          </p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && !hasAnyResults && (
        <div className="flex flex-col items-center gap-2 px-4 py-12 text-center text-sm text-neutral-500">
          <Search className="size-8 text-neutral-200" />
          <p className="font-medium text-neutral-700">No results found</p>
          <p className="text-xs text-neutral-400">
            Type something to find projects, tasks, meetings, files, and users.
          </p>
        </div>
      )}

      {/* Results view */}
      {!isLoading && !isError && hasAnyResults && (
        <div className="flex flex-col h-full">
          {/* Header & Tabs */}
          <div className="sticky top-0 z-10 border-b border-neutral-100 bg-neutral-50/95 px-3 py-2.5 backdrop-blur-sm shrink-0">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-neutral-700">
                Found {totalCount} result{totalCount > 1 ? "s" : ""}
              </span>
              <span className="text-[11px] text-neutral-400">
                Scroll to explore
              </span>
            </div>

            {tabs.length > 2 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                      activeTab === tab.key
                        ? "bg-primary-light text-white shadow-xs"
                        : "bg-white text-neutral-600 hover:bg-neutral-200/70 border border-neutral-200/50"
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Scrollable list items */}
          <div
            className={
              isMobileModal
                ? "flex-1 overflow-y-auto overscroll-contain px-2 py-1 divide-y divide-neutral-100 [scrollbar-width:thin]"
                : "max-h-[min(420px,65vh)] overflow-y-auto overscroll-contain px-2 py-1 divide-y divide-neutral-100 [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0.5)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300 hover:[&::-webkit-scrollbar-thumb]:bg-neutral-400 [&::-webkit-scrollbar-track]:bg-transparent"
            }
          >
            {/* Projects */}
            {(activeTab === "all" || activeTab === "projects") && projects.length > 0 && (
              <div className="py-2">
                <div className="sticky top-0 z-[5] bg-white/95 backdrop-blur-xs flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  <FolderKanban className="size-3.5 text-blue-600" />
                  Projects ({projects.length})
                </div>
                {projects.map((proj) => (
                  <Link
                    key={`proj-${proj.id}`}
                    href={`/projects/${proj.id}`}
                    onClick={onSelect}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-neutral-100/80"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <FolderKanban className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-light">
                          {proj.name}
                        </p>
                        {proj.status && (
                          <span className="shrink-0 rounded-md bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600">
                            {proj.status}
                          </span>
                        )}
                      </div>
                      {proj.description && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">
                          {proj.description}
                        </p>
                      )}
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-neutral-400">
                        {proj.priority && (
                          <span className="text-amber-600 font-medium">
                            {proj.priority}
                          </span>
                        )}
                        {proj.progress_percentage !== undefined && (
                          <span>• {proj.progress_percentage}% completed</span>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="size-3.5 text-neutral-300 group-hover:text-neutral-500 shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            )}

            {/* Users */}
            {(activeTab === "all" || activeTab === "users") && users.length > 0 && (
              <div className="py-2">
                <div className="sticky top-0 z-[5] bg-white/95 backdrop-blur-xs flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  <Users className="size-3.5 text-emerald-600" />
                  Users ({users.length})
                </div>
                {users.map((u) => (
                  <Link
                    key={`user-${u.id}`}
                    href="/profile"
                    onClick={onSelect}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-neutral-100/80"
                  >
                    <Avatar className="size-9 shrink-0">
                      {u.avatar_url && <AvatarImage src={u.avatar_url} alt={u.name} />}
                      <AvatarFallback className="bg-emerald-100 text-xs font-semibold text-emerald-800">
                        {initials(u.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-light">
                          {u.name}
                        </p>
                        {u.roles?.[0] && (
                          <span className="shrink-0 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                            {u.roles[0]}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs text-neutral-500">
                        {u.job_title || u.email}
                      </p>
                    </div>
                    <ExternalLink className="size-3.5 text-neutral-300 group-hover:text-neutral-500 shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            )}

            {/* Tasks */}
            {(activeTab === "all" || activeTab === "tasks") && tasks.length > 0 && (
              <div className="py-2">
                <div className="sticky top-0 z-[5] bg-white/95 backdrop-blur-xs flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  <CheckSquare className="size-3.5 text-amber-600" />
                  Tasks ({tasks.length})
                </div>
                {tasks.map((task) => (
                  <Link
                    key={`task-${task.id}`}
                    href={`/tasks?taskId=${task.id}`}
                    onClick={onSelect}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-neutral-100/80"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      <CheckSquare className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-light">
                        {task.title || task.name}
                      </p>
                      {task.status && (
                        <span className="mt-0.5 inline-block text-[10px] text-neutral-500">
                          Status: {task.status}
                        </span>
                      )}
                    </div>
                    <ExternalLink className="size-3.5 text-neutral-300 group-hover:text-neutral-500 shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            )}

            {/* Meetings */}
            {(activeTab === "all" || activeTab === "meetings") && meetings.length > 0 && (
              <div className="py-2">
                <div className="sticky top-0 z-[5] bg-white/95 backdrop-blur-xs flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  <Video className="size-3.5 text-purple-600" />
                  Meetings ({meetings.length})
                </div>
                {meetings.map((m) => (
                  <Link
                    key={`meeting-${m.id}`}
                    href={`/meetings/${m.id}`}
                    onClick={onSelect}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-neutral-100/80"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                      <Video className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-light">
                        {m.title || m.name}
                      </p>
                      {m.date && (
                        <p className="text-xs text-neutral-500">{m.date}</p>
                      )}
                    </div>
                    <ExternalLink className="size-3.5 text-neutral-300 group-hover:text-neutral-500 shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            )}

            {/* Files */}
            {(activeTab === "all" || activeTab === "files") && files.length > 0 && (
              <div className="py-2">
                <div className="sticky top-0 z-[5] bg-white/95 backdrop-blur-xs flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  <FileText className="size-3.5 text-sky-600" />
                  Files ({files.length})
                </div>
                {files.map((file) => (
                  <Link
                    key={`file-${file.id}`}
                    href="/profile/files"
                    onClick={onSelect}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-neutral-100/80"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                      <FileText className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-light">
                        {file.name}
                      </p>
                      {file.file_size && (
                        <p className="text-xs text-neutral-500">{file.file_size}</p>
                      )}
                    </div>
                    <ExternalLink className="size-3.5 text-neutral-300 group-hover:text-neutral-500 shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            )}

            {/* Teams */}
            {(activeTab === "all" || activeTab === "teams") && teams.length > 0 && (
              <div className="py-2">
                <div className="sticky top-0 z-[5] bg-white/95 backdrop-blur-xs flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  <UserCheck className="size-3.5 text-indigo-600" />
                  Teams ({teams.length})
                </div>
                {teams.map((t) => (
                  <Link
                    key={`team-${t.id}`}
                    href="/projects"
                    onClick={onSelect}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-neutral-100/80"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <UserCheck className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-light">
                        {t.name}
                      </p>
                    </div>
                    <ExternalLink className="size-3.5 text-neutral-300 group-hover:text-neutral-500 shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
