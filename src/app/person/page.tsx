import { prisma } from '@/shared/lib/prisma';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import Image from 'next/image';
import { CreateCharacterButton } from './create-character-button';
import Link from 'next/link';

export default async function Person() {
  const characters = await prisma.character.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className='p-8'>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Персонажи</h1>
        <CreateCharacterButton />
      </div>
      <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
        {characters.map((char) => (
          <Card key={char.id} className='gap-2 bg-gray-700 hover:cursor-pointer'>
            <Link href={`/person/${char.id}`}>
              <CardHeader>
                {char.imageUrl && (
                  <div className='aspect-square w-full overflow-hidden'>
                    <Image src={char.imageUrl} alt={char.name} className='h-full w-full' width={1980} height={1200} />
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <CardTitle>{char.name}</CardTitle>
              </CardContent>
              <CardFooter className='text-muted-foreground flex justify-between text-xs'>
                <CardDescription>
                  {char.race} • {char.class} • {char.description}
                </CardDescription>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
