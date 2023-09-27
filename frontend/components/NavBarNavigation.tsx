"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const NavBarNavigation = () => {
	const { data: session, status } = useSession();

	if (!session) return null;

	return (
		<nav className='flex justify-between items-center p-2'>
			<h2 className='font-bold text-xl'>App</h2>
			<ul className='flex'>
				<li className='mx-2 flex justify-between items-center'>
					<Link href='/'>Home</Link>
				</li>
				<li className='mx-2 flex justify-between items-center'>
					<Link href='/messages'>Messages</Link>
				</li>
				<li className='mx-2 flex justify-between items-center'>
					<Button variant='destructive' onClick={() => signOut()}>
						Logout
					</Button>
				</li>
			</ul>
		</nav>
	);
};

export default NavBarNavigation;
