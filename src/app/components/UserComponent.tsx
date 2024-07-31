'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Car {
  id: number;
  patente: string;
  parkingSlot: number;
  created_at: string;
}

export default function UserComponent({ cars }: Readonly<{ cars: Car[] }>) {
  const [selected, setSelected] = useState<Array<Car | null>>(
    Array(5).fill(null)
  );
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [currentSlot, setCurrentSlot] = useState<number | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [parkingTime, setParkingTime] = useState<string>('');

  useEffect(() => {
    const initialState = Array(5).fill(null);
    cars.forEach((slot) => {
      initialState[slot.parkingSlot] = {
        id: slot.id,
        patente: slot.patente,
        created_at: slot.created_at,
      };
    });
    setSelected(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateParkingPrice = (created_at: string): number => {
    const startTime = new Date(created_at).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - startTime;
    const minutes = Math.ceil(timeDifference / (1000 * 60));
    const hours = Math.ceil(minutes / 60);

    let price = 0;
    if (hours <= 3) {
      price = Math.ceil(minutes / 10) * 0.5;
    } else {
      const additionalHours = hours - 3;
      price = (3 * 6 + additionalHours * 3) * 0.1;
    }

    return price;
  };

  const calculateParkingTime = (created_at: string): string => {
    const startTime = new Date(created_at).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - startTime;
    const minutes = Math.ceil(timeDifference / (1000 * 60));
    const hours = Math.ceil(minutes / 60);

    return `${hours} hours and ${minutes % 60} minutes`;
  };

  const handleSquareClick = (index: number) => {
    setCurrentSlot(index);
    if (selected[index]) {
      setMessage('Enter the license plate to remove the car');
      setPrice(calculateParkingPrice(selected[index]['created_at']));
      setParkingTime(calculateParkingTime(selected[index]['created_at']));
    } else {
      setPrice(0);
      setMessage(`Do you want to park the car in place ${index + 1}?`);
    }
  };

  const handleConfirm = async () => {
    if (currentSlot !== null) {
      if (selected[currentSlot]) {
        // Removing car
        if (inputValue === selected[currentSlot]['patente']) {
          try {
            const response = await fetch('/api/deleteParking', {
              method: 'DELETE',
              body: JSON.stringify({
                id: selected[currentSlot]['id'],
              }),
            });
            const { data } = await response.json();
            const initialState = Array(5).fill(null);
            data &&
              data.forEach((slot: Car) => {
                initialState[slot.parkingSlot] = {
                  id: slot.id,
                  patente: slot.patente,
                  created_at: slot.created_at,
                };
              });
            setSelected(initialState);
          } catch (error) {
            console.error('Error:', error);
          } finally {
            console.log('Finally');
            setMessage('Car removed successfully');
          }
        } else {
          setMessage('Incorrect license plate');
        }
      } else {
        // Parking car
        try {
          const response = await fetch('/api/addParking', {
            method: 'POST',
            body: JSON.stringify({
              patente: inputValue,
              parkingSlot: currentSlot,
            }),
          });
          const { data } = await response.json();
          const initialState = Array(5).fill(null);
          data &&
            data.forEach((slot: Car) => {
              initialState[slot.parkingSlot] = {
                id: slot.id,
                patente: slot.patente,
                created_at: slot.created_at,
              };
            });
          setSelected(initialState);
          // setSelected(data);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          console.log('Finally');
          setMessage('Car parked successfully');
        }
      }
    }
    setInputValue('');
  };

  const availableSlots = 5 - cars.length;

  return (
    <main className='h-screen flex min-h-screen flex-col items-center p-4'>
      <div className='flex w-full justify-between px-10'>
        <Link href='/'>
          <button className='text-blue-500 underline'>Go Back</button>
        </Link>
      </div>
      <div className='h-screen flex flex-col justify-evenly text-center'>
        <h1 className='text-7xl font-bold underline'>
          {availableSlots === 0
            ? 'No places available'
            : `There are ${availableSlots} places available`}
        </h1>

        <div className='text-2xl font-bold my-4 bg-slate-500 py-2 rounded'>
          {message}
        </div>

        <input
          type='text'
          placeholder='License Plate'
          className='border border-gray-300 rounded-md p-2 font-bold text-2xl text-black w-1/3 self-center'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toUpperCase())}
        />

        <div className='flex items-center justify-center'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4'>
            {selected?.map((car, index) => (
              <div
                key={index}
                className={`relative w-32 h-32 ${
                  car !== null ? 'bg-white' : 'bg-blue-500'
                } border-r-4 border-yellow-500 border-l-4 flex items-center justify-center cursor-pointer`}
                onClick={() => handleSquareClick(index)}
              >
                {car !== null ? (
                  <div className='text-center font-bold'>
                    <Image
                      src='/carRed.avif'
                      alt={`Square ${index + 1}`}
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                ) : (
                  <p>{index + 1}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        {price > 0 ? (
          <div className='text-2xl font-bold my-4 text-black bg-green-300 py-2 rounded'>
            Price: ${price}, Total Time: {parkingTime}
          </div>
        ) : null}
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-3xl self-center'
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </main>
  );
}
