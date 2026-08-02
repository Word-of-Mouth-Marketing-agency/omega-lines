import { NextResponse } from "next/server";
import config from "@payload-config";
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";
import { isUIReviewMode } from "@/lib/review-mode";

const disabled = () =>
  NextResponse.json(
    { error: "Payload CMS is disabled in UI review mode." },
    { status: 404 },
  );

export const GET = isUIReviewMode ? disabled : REST_GET(config);
export const POST = isUIReviewMode ? disabled : REST_POST(config);
export const DELETE = isUIReviewMode ? disabled : REST_DELETE(config);
export const PATCH = isUIReviewMode ? disabled : REST_PATCH(config);
export const PUT = isUIReviewMode ? disabled : REST_PUT(config);
export const OPTIONS = isUIReviewMode ? disabled : REST_OPTIONS(config);
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
