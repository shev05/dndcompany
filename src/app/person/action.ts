'use server';

import { prisma } from '@/shared/lib/prisma';
import { auth } from '@/shared/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function addCharacter(formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect('/');

  const name = formData.get('name') as string;
  const class_ = formData.get('class') as string;
  const race = formData.get('race') as string;
  const description = formData.get('description') as string;
  const backstory = formData.get('backstory') as string;
  const image = formData.get('image') as File | null;

  let imageUrl = null;

  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = image.name.split('.').pop();
    const fileName = `${uuidv4()}.${extension}`;
    const filePath = join(process.cwd(), 'public', 'uploads', 'characters', fileName);
    await writeFile(filePath, buffer);
    imageUrl = `/uploads/characters/${fileName}`;
  }

  await prisma.character.create({
    data: {
      name,
      class: class_,
      race: race || null,
      description: description || null,
      backstory: backstory || null,
      imageUrl,
    },
  });

  revalidatePath('/person');
}
