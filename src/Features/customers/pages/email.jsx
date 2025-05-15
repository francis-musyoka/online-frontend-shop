import React from 'react';

const Email = () => {

    const now = new Date();
    const formart = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true 
      });

    return (
        <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
        <div class="items-center border-b-2 border-gray-300 ">
            <h4 class='font-semibold'>Order Confirmation</h4>
            <h4 className='mb-4'> Order: RF25041010000156</h4>
        </div>
        <div class="mt-6">
            <h3 class="text-secondary mb-2"> Hi Francis Musyoka</h3>
            <p class="mb-2 text-sm text-gray-700"> Thank you for shopping at RiverFlow.</p>
            <p class="mb-2 text-sm text-gray-700"> Your order has been placed and will be processed as soon as possible.</p>
            <p class="mb-2 text-sm text-gray-700"> Once your package has shipped, we'll send you a confirmation email.</p>
        </div>
        <div class="items-center mt-8">
            <h4 class='font-medium mb-4 text-secondary'>Details</h4>
            <div class="text-gray-700 md:flex justify-between mb-4 ">
                <h4 className='mb-2'> Order: RF25041010000156</h4>
                <p class="text-base ">Date: {formart}</p>
            </div>
        </div>
        <div>
            <h3 class="text-neutral pb-3">Payment status:  <span className='text-secondary pl-2'> Paid</span></h3>
        </div>
        <div class="mb-8 flex justify-between">
        <div>
            <h3 class="text-sm text-secondary mb-4"> Shipping To:</h3>
            <p class="text-neutral mb-1 text-sm">John Doe</p>
            <p class="text-gray-700 text-sm">mwaani ketuasi,</p>
            <p class="text-gray-700 text-sm ">Makueni Wote 93489</p>
            <p class="text-gray-700 text-sm">0728767864</p>
        </div>

        <div>
            <h3 class="text-sm text-secondary mb-4"> Payment Method:</h3>
            <p class="text-neutral text-sm">M-pesa,</p>
            <p class="text-gray-700 text-sm">0728767864</p>
        </div> 
    </div>
    <div class='border-b-2 border-gray-300  mb-3'>
        <h2 class='mb-3 text-slate-950 text-2xl'>You Ordered</h2>
    </div>
    <table class="w-full text-left mb-8">
        <thead >
            <tr>
                <th class="text-secondary text-sm py-2 px-3">Qty</th>
                <th class="text-secondary text-sm py-2 px-3">Description</th>
                <th class="text-secondary text-sm py-2 px-3">Price</th>
                <th class="text-secondary text-sm py-2 px-3">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="py-4 px-4 text-gray-700 text-sm"> 1</td>
                <td class="py-4 px-4 text-gray-700 text-sm">Product 1</td>
                <td class="py-4 px-4 text-gray-700 text-sm">$100.00</td>
                <td class="py-4 px-4 text-gray-700 text-sm">$100.00</td>
            </tr>
            <tr>
                <td class="py-4 px-4 text-gray-700 text-sm">2</td>
                <td class="py-4 px-4 text-gray-700 text-sm">Product 2</td>
                <td class="py-4 px-4 text-gray-700 text-sm">$50.00</td>
                <td class="py-4 px-4 text-gray-700 text-sm">$100.00</td>
            </tr>
            <tr>
                <td class="py-4 px-4 text-gray-700 text-sm"> 3</td>
                <td class="py-4 px-4 text-gray-700 text-sm">Product 3</td>
                <td class="py-4 px-4 text-gray-700 text-sm">$75.00</td>
                <td class="py-4 px-4 text-gray-700 text-sm">$225.00</td>
            </tr>
        </tbody>
    </table>
    <div class="grid justify-end text-right gap-y-2 mb-8 md:mr-12">
        <div class="flex justify-between gap-8 text-gray-700">
            <span>Subtotal:</span>
            <span>$425000.00</span>
        </div>
        <div class="flex justify-between gap-8 text-gray-700">
            <span>Tax:</span>
            <span>$25.50</span>
        </div>
        <div class="flex justify-between gap-8 text-secondary font-medium">
            <span>Total:</span>
            <span>$450.50</span>
            </div>
    </div>
    <div class="border-t-2 border-gray-300 pt-8 mb-8">
        <p class="text-gray-700 text-sm">Thank you for shopping at RiverFlow.</p>
        <p class="text-gray-700 text-sm">You can contact RiverFlow at:</p>
        <p class="text-gray-700 mb-2 text-sm">+254728767442</p>
    </div>
    <div class='border-b-2 border-gray-300' ></div>
</div>
    );
}

export default Email;
