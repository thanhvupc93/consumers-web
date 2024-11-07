import { useTranslations } from 'next-intl';

export default function BTAddNew() {
    const au = useTranslations('Admin_User');
    return <>
        <button className=" w-full uppercase cursor-pointer rounded-md border border-[--bs-light-border-subtle] border-slate-300">
            <a className="lg:text-xl text-sm px-4">{au('addNew')}</a>
        </button>

    </>
}