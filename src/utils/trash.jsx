import React from 'react';

const Trash = () => {
    return (
        <div>
            
            <h2 class="mt-8 text-base text-gray-900">Choose subscription</h2>
                            <div class="mt-3 flex select-none flex-wrap items-center gap-1">
                                <label class="">
                                    <input type="radio" name="subscription" value="4 Months" class="peer sr-only" />
                                    <p class="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">4 Months</p>
                                    <span class="mt-1 block text-center text-xs">$80/mo</span>
                                </label>
                                <label class="">
                                    <input type="radio" name="subscription" value="8 Months" class="peer sr-only" checked />
                                    <p class="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">8 Months</p>
                                    <span class="mt-1 block text-center text-xs">$60/mo</span>
                                </label>
                                <label class="">
                                    <input type="radio" name="subscription" value="12 Months" class="peer sr-only" />
                                    <p class="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">12 Months</p>
                                    <span class="mt-1 block text-center text-xs">$40/mo</span>
                                </label>
                            </div>


                            <h2 class="mt-8 text-base text-gray-900">Coffee Type</h2>
                            <div class="mt-3 flex select-none flex-wrap items-center gap-1">
                                <label class="">
                                    <input type="radio" name="type" value="Powder" class="peer sr-only" checked />
                                    <p class="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">Powder</p>
                                </label>
                                <label class="">
                                    <input type="radio" name="type" value="Whole Bean" class="peer sr-only" />
                                    <p class="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">Whole Bean</p>
                                </label>
                                <label class="">
                                    <input type="radio" name="type" value="Groud" class="peer sr-only" />
                                    <p class="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">Groud</p>
                                </label>
                            </div>


                            <ul class="mt-8 space-y-2">
                            <li class="flex items-center text-left text-sm font-medium text-gray-600">
                                <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" class=""></path>
                                </svg>
                                Free shipping worldwide
                            </li>

                            <li class="flex items-center text-left text-sm font-medium text-gray-600">
                                <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" class=""></path>
                                </svg>
                                Cancel Anytime
                            </li>
                            </ul>
        </div>
    );
}

export default Trash;
