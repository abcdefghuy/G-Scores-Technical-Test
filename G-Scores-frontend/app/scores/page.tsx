"use client";
import { useState } from "react";
import { SbdSearchBox } from "@/components/scores/SbdSearchBox";
import { ScoreGrid } from "@/components/scores/ScoreGrid";
import type { ScoreResponse } from "@/types/api";
import { AlertCircle } from "lucide-react";
export default function ScoresPage() {
  const [result, setResult] = useState<ScoreResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleResult(data: ScoreResponse) {
    setResult(data);
    setError(null);
  }

  function handleError(msg: string) {
    setResult(null);
    setError(msg);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tra cứu điểm thi</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Nhập số báo danh để xem kết quả thi
        </p>
      </div>

      <SbdSearchBox onResult={handleResult} onError={handleError} />

      {error && (
        <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-red-400 w-full max-w-md">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {result && <ScoreGrid data={result} />}

      {!result && !error && (
        <div className="pt-12 text-center text-muted-foreground text-sm">
          <p className="text-4xl mb-3">🎓</p>
          <p>Nhập SBD để tra cứu điểm thi</p>
        </div>
      )}
    </div>
  );
}
