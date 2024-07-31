import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export default async function GET(req, res) {
  try {
    // const cars = await prisma.car.findMany();
    console.log(cars, 'cars');
    // return NextResponse.json(cars);
  } catch (error) {
    console.error(error);
    // return NextResponse.error();
  }
}
