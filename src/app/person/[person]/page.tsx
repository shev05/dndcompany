import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ScrollText, Shield, Users } from 'lucide-react';

import { prisma } from '@/shared/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { BackButton } from '@/shared/components/back-button';

export default async function PersonDetail({ params }: { params: Promise<{ person: string }> }) {
  const { person } = await params;

  const character = await prisma.character.findFirst({
    where: {
      id: person,
    },
  });

  if (!character) {
    notFound();
  }

  return (
    <div className='container mx-auto flex flex-col gap-6 px-4 py-6'>
      <BackButton />
      <Card className='border-border/50 bg-card/70 overflow-hidden backdrop-blur-sm'>
        <div className='grid p-2 lg:grid-cols-[320px_1fr]'>
          <div className='relative aspect-[5/5] overflow-hidden lg:border-b-0'>
            {character.imageUrl ? (
              <Image src={character.imageUrl} alt={character.name} fill className='rounded-lg border object-cover' />
            ) : (
              <div className='bg-muted text-muted-foreground flex h-full items-center justify-center'>
                Картинки няма
              </div>
            )}
          </div>

          <div className='flex flex-col gap-6 p-6'>
            <div className='space-y-4'>
              <div className='flex flex-wrap items-center gap-3'>
                <h1 className='text-4xl font-bold'>{character.name}</h1>
                {character.race && <span>{character.race}</span>}
              </div>

              <div className='text-muted-foreground flex items-center gap-2'>
                <Shield className='size-4' />
                <span>{character.class}</span>
              </div>
            </div>

            {character.description && (
              <Card>
                <div className='flex items-start gap-5 p-2'>
                  <div className='flex items-center gap-2 text-lg font-semibold'>
                    <Users className='size-5' />
                    <span>Команда</span>
                  </div>

                  <p className='text-muted-foreground leading-7'>{character.description}</p>
                </div>
              </Card>
            )}

            {character.backstory && (
              <Card className='gap-1'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-lg'>
                    <ScrollText className='size-5' />
                    История
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className='text-muted-foreground space-y-4 leading-7 whitespace-pre-wrap'>
                    {character.backstory}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
