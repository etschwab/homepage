import { siteCopy } from "@/data/profile";

export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="loader-mark" aria-hidden="true">
        {siteCopy.loading.mark}
      </div>
      <p className="font-mono text-sm text-zinc-500">
        {siteCopy.loading.text}
      </p>
    </div>
  );
}
