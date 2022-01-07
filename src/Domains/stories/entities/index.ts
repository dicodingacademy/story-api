import { Readable } from 'stream';

export type StoryPhoto = {
  file: Readable,
  meta: {
    filename: string,
    contentType: string,
  },
}

export type StoryCreation = {
  userId: string,
  name: string,
  description: string,
  photo: StoryPhoto,
  lat?: number,
  lon?: number,
}

export type CreatedStory = {
  id: string,
  userId: string,
  name: string,
  description: string,
  createdAt: string,
  photoUrl: string,
  lat: number | null,
  lon: number | null,
}

export type Story = {
  id: string,
  name: string,
  description: string,
  createdAt: string,
  photoUrl: string,
  lat: number | null,
  lon: number | null,
}
