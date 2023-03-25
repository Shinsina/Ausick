import type { APIRoute } from 'astro';
import Artists from '$lib/data/Artist.json';

export const get: APIRoute = async () => {
  return {
    body: JSON.stringify(Artists)
  }
};
