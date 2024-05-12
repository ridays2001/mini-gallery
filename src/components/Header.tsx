'use server';

import { getKindeServerSession, LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { PersonIcon, PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export async function Header() {
	const { getUser, isAuthenticated } = getKindeServerSession();

	const isLoggedIn = await isAuthenticated();
	const user = await getUser();

	return (
		<header className='flex justify-between py-4 px-4 md:px-8'>
			<h1 className='text-2xl md:text-3xl'>
				<Link href='/'>Mini Gallery</Link>
			</h1>
			{isLoggedIn ? (
				<nav className='flex items-center gap-4'>
					<Button asChild>
						<Link href='/posts/new' className='flex gap-2'>
							<PlusIcon /> <span className='hidden md:block'>New Post</span>
						</Link>
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button asChild size='icon' className='cursor-pointer'>
								<Avatar>
									<AvatarImage src={user?.picture} alt='Profile Picture' />
									<AvatarFallback>
										<PersonIcon />
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align='end'>
							<DropdownMenuItem asChild className='cursor-pointer'>
								<Link href='/profile'>Profile</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild className='cursor-pointer'>
								<LogoutLink className='text-destructive focus:bg-destructive'>Logout</LogoutLink>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</nav>
			) : (
				<nav className='flex gap-4 items-center'>
					<Button variant='outline' asChild>
						<LoginLink>Login</LoginLink>
					</Button>
					<Button asChild>
						<RegisterLink>Register</RegisterLink>
					</Button>
				</nav>
			)}
		</header>
	);
}
