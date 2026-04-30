import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreatePatientInput,
  Patient,
  PatientId,
  ScanRecord,
  UpdatePatientInput,
} from "../backend";
import { useAuth } from "./useAuth";
import { useBackend } from "./useBackend";

// ── Patient profile keyed to the logged-in principal ──────────────────────────

/**
 * Fetches the patient record for the currently authenticated user.
 * The backend identifies the patient by the caller's principal.
 * Returns null if no profile exists yet (first-time user).
 */
export function useMyProfile() {
  const { backend, isReady } = useBackend();
  const { isAuthenticated } = useAuth();

  return useQuery<Patient | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!backend) return null;
      try {
        const result = await backend.getMyProfile();
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: isReady && isAuthenticated,
    staleTime: 60_000,
    retry: 1,
  });
}

// ── My scans (scans belonging to the logged-in patient) ───────────────────────

export function useMyScans() {
  const { backend, isReady } = useBackend();
  const { isAuthenticated } = useAuth();

  return useQuery<ScanRecord[]>({
    queryKey: ["myScans"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        const result = await backend.getMyScans();
        if (!Array.isArray(result)) return [];
        return result;
      } catch {
        return [];
      }
    },
    enabled: isReady && isAuthenticated,
    staleTime: 0,
    retry: 1,
  });
}

// ── Profile mutations ─────────────────────────────────────────────────────────

export function useCreateProfile() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();

  return useMutation<Patient, Error, CreatePatientInput>({
    mutationFn: async (input) => {
      if (!backend) throw new Error("Backend not available");
      const result = await backend.createProfile(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}

export function useUpdateProfile() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();

  return useMutation<Patient | null, Error, UpdatePatientInput>({
    mutationFn: async (input) => {
      if (!backend) throw new Error("Backend not available");
      const result = await backend.updateProfile(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}

// ── Scan queries ───────────────────────────────────────────────────────────────

export function useScan(scanId: string) {
  const { backend, isReady } = useBackend();

  return useQuery<ScanRecord | null>({
    queryKey: ["scan", scanId],
    queryFn: async () => {
      if (!backend || !scanId) return null;
      try {
        const result = await backend.getScan(BigInt(scanId));
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: isReady && !!scanId,
    staleTime: 15_000,
    retry: 1,
  });
}

// ── Public scan fetch (no auth required for shared result pages) ──────────────

export function useScanPublic(scanId: string) {
  const { backend, isReady } = useBackend();

  return useQuery<ScanRecord | null>({
    queryKey: ["scanPublic", scanId],
    queryFn: async () => {
      if (!backend || !scanId) return null;
      try {
        const result = await backend.getScan(BigInt(scanId));
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: isReady && !!scanId,
    staleTime: 60_000,
    retry: 2,
  });
}

// ── Classify a scan ──────────────────────────────────────────────────────────

export function useClassifyScan() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();

  return useMutation<ScanRecord, Error, PatientId>({
    mutationFn: async (scanId) => {
      if (!backend) throw new Error("Backend not available");
      const result = await backend.classifyScan(scanId);
      // Safely validate the result shape before accessing __kind__
      if (result === null || result === undefined) {
        throw new Error("Classification returned no result");
      }
      if (
        typeof result === "object" &&
        "__kind__" in result &&
        result.__kind__ === "err"
      ) {
        throw new Error(
          (result as { __kind__: "err"; err: string }).err ||
            "Classification failed",
        );
      }
      if (typeof result === "object" && "__kind__" in result) {
        return (result as { __kind__: "ok"; ok: ScanRecord }).ok;
      }
      // If result doesn't have __kind__, assume it's the scan directly
      return result as unknown as ScanRecord;
    },
    onSuccess: (_data, scanId) => {
      void queryClient.invalidateQueries({
        queryKey: ["scan", String(scanId)],
      });
      void queryClient.invalidateQueries({ queryKey: ["myScans"] });
    },
  });
}

// ── Generate share token ──────────────────────────────────────────────────────

export function useGenerateShareToken() {
  const { backend } = useBackend();

  return useMutation<string, Error, PatientId>({
    mutationFn: async (scanId) => {
      if (!backend) throw new Error("Backend not available");
      const result = await backend.generateShareToken(scanId);
      if (
        result === null ||
        result === undefined ||
        typeof result !== "object"
      ) {
        throw new Error("Failed to generate share token");
      }
      if ("__kind__" in result && result.__kind__ === "err") {
        throw new Error(
          (result as { __kind__: "err"; err: string }).err ||
            "Share token generation failed",
        );
      }
      if ("__kind__" in result) {
        return (result as { __kind__: "ok"; ok: string }).ok;
      }
      return result as unknown as string;
    },
  });
}
