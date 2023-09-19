import React, { useState, useReducer } from 'react'

import Header from '../components/Header.tsx';

export default function Index() {
  return (
  <>
    <Header />
    <div class='flex flex-col items-center mt-36'>
      <div class='flex items-start pr-96'>
        <div class='w-min mt-5'>
          <h1 class='text-green-500 w-80'>
          First Task: Brainstorm Ideas
          for the next project
          </h1>
          <p class='w-96 mt-24 text-lg'>
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
          Cras ac nibh at arcu ullamcorper lobortis rutrum quis dolor.
          Etiam nisl lorem, commodo vitae tristique quis, iaculis non lectus.
          Nulla sed urna vel lorem pharetra lobortis.
          </p>
        </div>
        <div class='flex flex-col items-center'>
          <div class='ring-8 ring-green-500 w-20 h-20 rounded-full'></div>
          <div class='bg-green-500 w-2 h-96'></div>
        </div>
      </div>
      <div class='flex items-start pl-96'>
        <div class='flex flex-col items-center'>
          <div class='ring-8 ring-amber-500 w-20 h-20 rounded-full'></div>
          <div class='bg-amber-500 w-2 h-96'></div>
        </div>
        <div class='w-min mt-5 '>
          <h1 class='text-amber-500 w-80'>
          First Task: Brainstorm Ideas
          for the next project
          </h1>
          <p class='w-96 mt-24 text-lg'>
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
          Cras ac nibh at arcu ullamcorper lobortis rutrum quis dolor.
          Etiam nisl lorem, commodo vitae tristique quis, iaculis non lectus.
          Nulla sed urna vel lorem pharetra lobortis.
          </p>
        </div>
      </div>
      <div class='flex items-start pr-96'>
        <div class='w-min mt-5'>
          <h1 class='text-rose-500 w-80'>
          First Task: Brainstorm Ideas
          for the next project
          </h1>
          <p class='w-96 mt-24 text-lg'>
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
          Cras ac nibh at arcu ullamcorper lobortis rutrum quis dolor.
          Etiam nisl lorem, commodo vitae tristique quis, iaculis non lectus.
          Nulla sed urna vel lorem pharetra lobortis.
          </p>
        </div>
        <div class='flex flex-col items-center'>
          <div class='ring-8 ring-rose-500 w-20 h-20 rounded-full'></div>
          <div class='bg-rose-500 w-2 h-96'></div>
        </div>
      </div>
    </div>
  </>
  );
}
