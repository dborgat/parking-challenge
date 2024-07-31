import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getCars } from '../../../../lib/data';

export async function DELETE(request) {
  const { id } = await request.json();
  await prisma.car.delete({
    where: {
      id: id,
    },
  });
  const cars = await getCars();

  return NextResponse.json({ data: cars });
}
