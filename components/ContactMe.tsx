import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'
import { Bodoni_Moda } from 'next/font/google'
import { X } from 'lucide-react'

const font = Bodoni_Moda({ subsets: ['latin'] })
const ContactMe = () => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="bg-orange-200 hover:bg-orange-300 px-4 py-2 rounded-lg text-black font-medium">
                    Lets Talk
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[95vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-7 shadow-lg">
                    <Dialog.Title className={`${font.className} text-5xl pb-8 my-4 flex items-center justify-center`}>
                        Contact us
                    </Dialog.Title>
                    <div className='flex-col justify-end items-start'>
                        <fieldset className="mb-[15px] flex gap-5">
                            <label className="w-[90px] text-right text-[15px]" htmlFor="name">
                                Name
                            </label>
                            <input className="border border-black inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none" />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="w-[90px] text-right text-[15px]" htmlFor="username">
                                Email
                            </label>
                            <input className="border border-black inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none" />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="w-[90px] text-right text-[15px]" >
                                Message
                            </label>
                            <textarea className="border border-black inline-flex w-full flex-1 items-center justify-center rounded" rows={4} />
                        </fieldset>
                    </div>
                    <div className="mt-[25px] flex justify-center">
                        <Dialog.Close className='btn'>
                            Send Enquiry{" "}
                        </Dialog.Close>
                    </div>
                    <Dialog.Close className="absolute right-2.5 top-2.5 inline-flex hover:bg-gray-200 p-2 rounded-full">
                        <X />
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}

export default ContactMe;