'use client';
import React, { useEffect, useState } from 'react';
import { Car } from './UserComponent';
import Link from 'next/link';

export default function AdminComponent({ cars }: Readonly<{ cars: Car[] }>) {
  const [selected, setSelected] = useState<Array<Car | null>>(
    Array(5).fill(null)
  );

  console.log(cars, 'cars');
  const availableSlots = 5 - cars.length;

  useEffect(() => {
    const initialState = Array(5).fill(null);
    cars.forEach((slot) => {
      console.log(slot, '========0');
      initialState[slot.parkingSlot] = {
        id: slot.id,
        patente: slot.patente,
        parkingSlot: slot.parkingSlot,
        created_at: slot.created_at,
      };
    });
    setSelected(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='h-screen flex min-h-screen flex-col items-center p-4'>
      <div className='flex w-full justify-between px-10'>
        <Link href='/'>
          <button className='text-blue-500 underline'>Go Back</button>
        </Link>
      </div>
      <div className='h-screen flex flex-col justify-evenly text-center'>
        <h1 className='text-7xl font-bold'>
          {availableSlots === 0
            ? 'No places available'
            : `There are ${availableSlots} places available`}
        </h1>
        <div className='flex items-center justify-center'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4'>
            {selected?.map((car, index) => (
              <div
                key={index}
                className={`relative w-32 h-32 ${
                  car !== null ? 'bg-white' : 'bg-blue-500'
                } border-r-4 border-yellow-500 border-l-4 flex items-center justify-center cursor-pointer`}
              >
                {car !== null ? (
                  <div className='text-center font-bold'>
                    <p className='text-black'>Plate: {car.patente}</p>
                    <p className='text-black'>Slot: {car.parkingSlot + 1}</p>
                  </div>
                ) : (
                  <p>{index + 1}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
