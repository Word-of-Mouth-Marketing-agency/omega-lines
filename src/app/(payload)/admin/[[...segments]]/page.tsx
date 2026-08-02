import config from "@payload-config";
import { RootPage } from "@payloadcms/next/views";
import { isUIReviewMode } from "@/lib/review-mode";
import { importMap } from "../importMap.js";

type AdminPageProps = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export default function AdminPage({ params, searchParams }: AdminPageProps) {
  if (isUIReviewMode) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-white p-8">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin unavailable</h1>
          <p className="mt-4 text-sm leading-6 text-gray-600">
            Payload CMS Admin is disabled while UI review mode is active.
          </p>
        </div>
      </main>
    );
  }

  return RootPage({
    config,
    importMap,
    params,
    searchParams,
  });
}
