'use server';
import { getStore } from '@netlify/blobs';
import { uploadDisabled } from 'utils';

interface BlobParameters {
  seed: string | null;
  edges: number;
  growth: number;
  colors: string[];
  name: string;
}

interface UploadShapeParams {
  parameters: BlobParameters;
}

interface GetShapeParams {
  keyName: string;
}

function store() {
  return getStore({ name: 'shapes', consistency: 'strong' });
}

// Always be sanitizing data in real sites!
export async function uploadShapeAction({ parameters }: UploadShapeParams): Promise<void> {
  if (uploadDisabled) throw new Error('Sorry, uploads are disabled');

  const key = parameters.name;
  await store().setJSON(key, parameters);
  console.log('Stored shape with parameters:', parameters, 'to key:', key);
}

export async function listShapesAction(): Promise<string[]> {
  const data = await store().list();
  const keys = data.blobs.map(({ key }: { key: string }) => key);
  return keys;
}

export async function getShapeAction({ keyName }: GetShapeParams): Promise<BlobParameters | null> {
  const data = await store().get(keyName, { type: 'json' });
  return data;
} 