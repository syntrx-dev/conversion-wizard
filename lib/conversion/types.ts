import type { ValidationCode } from '@/lib/files/validate';

export type ConversionStatus = 'waiting' | 'converting' | 'complete' | 'failed';

export interface ConvertedResult {
  /** The generated PNG blob. */
  blob: Blob;
  /** Object URL for previewing/downloading the PNG. Must be revoked on cleanup. */
  url: string;
  /** Output filename (already de-duplicated), e.g. "IMG_1234.png". */
  filename: string;
  /** Output pixel dimensions. */
  width: number;
  height: number;
  /** Output size in bytes. */
  size: number;
}

export interface QueueItem {
  /** Stable unique id for React keys and updates. */
  id: string;
  /** The original source file. */
  file: File;
  /** De-duplication key (name + size). */
  key: string;
  /** Original filename. */
  name: string;
  /** Original size in bytes. */
  size: number;
  /** Object URL for the source thumbnail (revoked on cleanup). May be null if preview generation failed. */
  previewUrl: string | null;
  /** Current pipeline status. */
  status: ConversionStatus;
  /** 0–100 progress for the converting state. */
  progress: number;
  /** Populated when status === 'complete'. */
  result?: ConvertedResult;
  /** Populated when status === 'failed'. */
  error?: string;
  /** Set when the item failed validation before conversion. */
  validationCode?: ValidationCode;
}
