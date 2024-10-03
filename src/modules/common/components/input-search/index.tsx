type InputSearchProps = {
    text: string
}
export default async function InputSearch({ text }: InputSearchProps) {
    return <>
        <div className='h-[80%] rounded-md border border-[--bs-light-border-subtle] border-slate-300 pr-4 pl-4 flex '>
            <input
                type='text'
                className='w-[95%] text-left pl-5 pt-5 pb-5 outline-none'
                placeholder={text}
            ></input>
            <div>
            </div>
            <svg
                className='justify-center mt-4 text-right'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
            >
                <path
                    fill='currentColor'
                    d='M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z'
                ></path>
            </svg>
        </div>
    </>
}