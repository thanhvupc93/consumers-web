
export default function NavLeftMenuMobile() {
    return (
        <div className='flex-auto w-[75%] ' >
            <div className=' flex flex-row w-[100%]'>
                <svg
                    className='mx-4 text-2xl  cursor-pointer'
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    viewBox='0 0 48 48'
                >
                    <g fill='currentColor'>
                        <path d='M6 36c0-4.965 11.993-8 18-8c6.008 0 18 3.035 18 8v6H6z'></path>
                        <path
                            fill-rule='evenodd'
                            d='M24 26c5.523 0 10-4.477 10-10S29.523 6 24 6s-10 4.477-10 10s4.477 10 10 10'
                            clipRule='evenodd'
                        ></path>
                    </g>
                </svg>

                <svg
                    className='mx-4 text-2xl cursor-pointer'
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    viewBox='0 0 24 24'
                >
                    <path
                        fill='currentColor'
                        d='m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z'
                    ></path>
                </svg>

                <svg
                    className='mx-4 text-2xl  cursor-pointer'
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    viewBox='0 0 24 24'
                >
                    <path
                        fill='currentColor'
                        d='M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2'
                    ></path>
                </svg>
                <div className='text-[6px] rounded-full bg-[var(--background-color)] text-[var(--text-white-color)] pt-2 pr-2 pl-2 pb-2 translate-x-[-130%] translate-y-[-64%]'>
                    {" "}
                    03
                </div>
                <svg className='mx-4 text-2xl  cursor-pointer'
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"></path></svg>
            </div>
        </div>
       
    );
};