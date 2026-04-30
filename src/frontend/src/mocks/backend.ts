import type { Principal } from "@icp-sdk/core/principal";
import type {
  _ImmutableObjectStorageCreateCertificateResult,
  _ImmutableObjectStorageRefillInformation,
  _ImmutableObjectStorageRefillResult,
  backendInterface,
  ClassificationResult,
  ExternalBlob,
} from "../backend";
import { DRStage, DiabetesType, RiskLevel } from "../backend";

const anonymousPrincipal = { toText: () => "2vxsx-fae" } as unknown as Principal;

const makeBlob = (url: string): ExternalBlob =>
  ({
    getDirectURL: () => url,
    getBytes: async () => new Uint8Array(),
    withUploadProgress: () => makeBlob(url),
  } as unknown as ExternalBlob);

const now = BigInt(Date.now()) * BigInt(1_000_000);
const day = BigInt(86_400_000_000_000);

const mockResult: ClassificationResult = {
  stage: DRStage.Moderate,
  confidence: 0.72,
  riskLevel: RiskLevel.Moderate,
  heatmapImageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Gradient-map.jpg/400px-Gradient-map.jpg",
};

const fundusUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fundus_photograph_of_normal_left_eye.jpg/400px-Fundus_photograph_of_normal_left_eye.jpg";

export const mockBackend: backendInterface = {
  classifyScan: async (scanId) => ({
    __kind__: "ok",
    ok: {
      id: scanId,
      patientId: BigInt(99),
      imageId: makeBlob(fundusUrl),
      uploadedAt: now - day,
      result: mockResult,
    },
  }),

  createProfile: async (input) => ({
    __kind__: "ok" as const,
    ok: {
      id: BigInt(99),
      age: input.age,
      contactInfo: input.contactInfo,
      hbA1c: input.hbA1c,
      name: input.name,
      createdAt: now,
      diabetesType: input.diabetesType,
      principal: anonymousPrincipal,
      updatedAt: now,
    },
  }),

  createScan: async (_input) => ({
    __kind__: "ok" as const,
    ok: {
      id: BigInt(99),
      patientId: BigInt(99),
      imageId: _input.imageId,
      uploadedAt: now,
    },
  }),

  generateShareToken: async (_scanId) => ({
    __kind__: "ok",
    ok: "mock-share-token-abc123",
  }),

  getMyProfile: async () => ({
    id: BigInt(99),
    age: BigInt(45),
    contactInfo: "demo@example.com",
    hbA1c: 7.8,
    name: "Demo Patient",
    createdAt: now - day * BigInt(30),
    diabetesType: DiabetesType.Type2,
    principal: anonymousPrincipal,
    updatedAt: now - day,
  }),

  getMyScans: async () => [
    {
      id: BigInt(1),
      patientId: BigInt(99),
      imageId: makeBlob(fundusUrl),
      uploadedAt: now - day * BigInt(7),
      result: {
        stage: DRStage.Mild,
        confidence: 0.68,
        riskLevel: RiskLevel.Low,
        heatmapImageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Gradient-map.jpg/400px-Gradient-map.jpg",
      },
    },
    {
      id: BigInt(2),
      patientId: BigInt(99),
      imageId: makeBlob(fundusUrl),
      uploadedAt: now - day * BigInt(30),
      result: {
        stage: DRStage.NoRetinopathy,
        confidence: 0.91,
        riskLevel: RiskLevel.Low,
        heatmapImageUrl: "",
      },
    },
    {
      id: BigInt(3),
      patientId: BigInt(99),
      imageId: makeBlob(fundusUrl),
      uploadedAt: now - day * BigInt(60),
      result: {
        stage: DRStage.Moderate,
        confidence: 0.74,
        riskLevel: RiskLevel.Moderate,
        heatmapImageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Gradient-map.jpg/400px-Gradient-map.jpg",
      },
    },
  ],

  getScan: async (id) => ({
    id,
    patientId: BigInt(99),
    imageId: makeBlob(fundusUrl),
    uploadedAt: now - day,
    result: mockResult,
  }),

  getSharedScan: async (_token) => ({
    scanId: BigInt(1),
    uploadedAt: now - day,
    result: mockResult,
  }),

  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),

  updateProfile: async (input) => ({
    __kind__: "ok" as const,
    ok: {
      id: BigInt(99),
      age: input.age,
      contactInfo: input.contactInfo,
      hbA1c: input.hbA1c,
      name: input.name,
      createdAt: now - day * BigInt(30),
      diabetesType: input.diabetesType,
      principal: anonymousPrincipal,
      updatedAt: now,
    },
  }),

  _immutableObjectStorageBlobsAreLive: async (_hashes: Array<Uint8Array>) =>
    [] as boolean[],
  _immutableObjectStorageBlobsToDelete: async () => [] as Uint8Array[],
  _immutableObjectStorageConfirmBlobDeletion: async (
    _blobs: Array<Uint8Array>,
  ) => {},
  _immutableObjectStorageCreateCertificate: async (
    _blobHash: string,
  ): Promise<_ImmutableObjectStorageCreateCertificateResult> => ({
    method: "GET",
    blob_hash: _blobHash,
  }),
  _immutableObjectStorageRefillCashier: async (
    _refillInformation: _ImmutableObjectStorageRefillInformation | null,
  ): Promise<_ImmutableObjectStorageRefillResult> => ({ success: true }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => {},
};
