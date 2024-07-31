import prisma from './prisma';

export async function getCars() {
  try {
    const cars = await prisma.car.findMany();
    return cars;
  } catch (error) {
    console.error('Error retrieving cars:', error);
    throw error;
  }
}

