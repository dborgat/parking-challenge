import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getCars } from '../../../../lib/data';

export async function POST(request) {
  const { patente, parkingSlot } = await request.json();
  const result = await prisma.car.create({
    data: {
      patente: patente,
      parkingSlot: parkingSlot,
    },
  });

  const cars = await getCars();

  return NextResponse.json({ data: cars });
}
