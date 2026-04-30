import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface UpdatePatientInput {
    age: bigint;
    contactInfo: string;
    hbA1c?: number;
    name: string;
    diabetesType: DiabetesType;
}
export type Result_2 = {
    __kind__: "ok";
    ok: ScanRecord;
} | {
    __kind__: "err";
    err: string;
};
export interface SharedScanView {
    result?: ClassificationResult;
    scanId: ScanId;
    uploadedAt: Timestamp;
}
export type Result_1 = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface ScanRecord {
    id: ScanId;
    result?: ClassificationResult;
    patientId: PatientId;
    shareToken?: string;
    imageId: ExternalBlob;
    uploadedAt: Timestamp;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type PatientId = bigint;
export type Result = {
    __kind__: "ok";
    ok: Patient;
} | {
    __kind__: "err";
    err: string;
};
export interface Patient {
    id: PatientId;
    age: bigint;
    principal: Principal;
    contactInfo: string;
    hbA1c?: number;
    name: string;
    createdAt: Timestamp;
    diabetesType: DiabetesType;
    updatedAt: Timestamp;
}
export type ScanId = bigint;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface CreateScanInput {
    imageId: ExternalBlob;
}
export interface ClassificationResult {
    stage: DRStage;
    confidence: number;
    riskLevel: RiskLevel;
    heatmapImageUrl: string;
}
export interface CreatePatientInput {
    age: bigint;
    contactInfo: string;
    hbA1c?: number;
    name: string;
    diabetesType: DiabetesType;
}
export enum DRStage {
    Mild = "Mild",
    Proliferative = "Proliferative",
    Severe = "Severe",
    Moderate = "Moderate",
    NoRetinopathy = "NoRetinopathy"
}
export enum DiabetesType {
    Gestational = "Gestational",
    None = "None",
    Type1 = "Type1",
    Type2 = "Type2"
}
export enum RiskLevel {
    Low = "Low",
    High = "High",
    Moderate = "Moderate"
}
export interface backendInterface {
    classifyScan(scanId: ScanId): Promise<Result_2>;
    createProfile(input: CreatePatientInput): Promise<Result>;
    createScan(input: CreateScanInput): Promise<Result_2>;
    generateShareToken(scanId: ScanId): Promise<Result_1>;
    getMyProfile(): Promise<Patient | null>;
    getMyScans(): Promise<Array<ScanRecord>>;
    getScan(scanId: ScanId): Promise<ScanRecord | null>;
    getSharedScan(token: string): Promise<SharedScanView | null>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateProfile(input: UpdatePatientInput): Promise<Result>;
}
