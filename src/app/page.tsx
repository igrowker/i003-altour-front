import Image from "next/image";
import altour from '../../public/altour.png';
import { waffleSoft, lato } from "./ui/fonts";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

 
    <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <p
          className={`${lato} text-xl text-gray-800 md:text-3xl md:leading-normal`}
        >
          <Image src={altour} alt="Logo de mi aplicación" width={300} height={100} />
          <strong>Welcome to Altour.</strong> 
        </p>
        <Link
          href="/login"
          className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
