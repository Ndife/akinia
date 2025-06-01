'use client';

import { useAuth } from '@/app/lib/AuthProvider';
import { logout } from '@/app/lib/authHelpers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Power, User as UserIcon } from 'lucide-react';
import { getInitials } from '@/helper';

export const UserDropdown = () => {
  const { session } = useAuth();
  if (!session) return null;

  const fullName = session.user.user_metadata?.full_name || session.user.email;
  const initials = getInitials(fullName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-4xl! w-10 h-10 p-0 text-white bg-[#BDBDBD] hover:text-white hover:cursor-pointer hover:bg-[#BDBDBD]"
          variant="ghost"
        >
          <span className="text-sm font-bold">{initials}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='border-none hidden md:block'>
        <DropdownMenuItem asChild>
          <a href="/profile" className="flex items-center space-x-0.1 hover:cursor-pointer hover:bg-transparent! hover:text-blue-600!">
            <UserIcon className="w-4 h-4 text-gray-500" />
            <span>Profile</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout} className="flex items-center space-x-0.1 hover:cursor-pointer hover:bg-transparent! hover:text-blue-600!">
          <Power className="w-4 h-4 text-gray-500" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
