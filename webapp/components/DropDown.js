import React, { useState } from 'react'

const DropDown = ({ selectedProduct, setSelectedProduct, products }) => {
    const [dropdown, setDropdown] = useState(false)

    return (
        <div onClick={() => setDropdown(!dropdown)} className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border-2 border-black cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 5.25L9 1.5L1.5 5.25V12.75L9 16.5L16.5 12.75V5.25Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M1.5 5.25L9 9M9 9V16.5M9 9L16.5 5.25M12.75 3.375L5.25 7.125" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>{selectedProduct}</p>

            {dropdown && <div className='absolute flex justify-start flex-col h-48 w-52 overflow-y-scroll divide-y-2 bg-white border-2 border-black rounded-md mt-60 z-50 -ml-3.5'>
                {products.map((product, i) => {
                    return <p className='p-3 font-semibold' onClick={() => {setDropdown(false); setSelectedProduct(product)}} key={`product-${i}`} >{product}</p>
                })}
            </div>}
        </div>
    )
}

export default DropDown