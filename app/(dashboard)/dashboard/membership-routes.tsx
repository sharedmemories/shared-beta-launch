'use client';

import React from 'react';
// import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function MembershipRoutes() {
  const { data: memberships } = authClient.useListOrganizations();

  

  return (
    <>
      {memberships && memberships.length > 0 ? (
        <Dialog>
          <DialogTrigger>View</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>All My Memberships</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-6 ">
              {memberships.map((org) => (
                <Card key={org.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className=" flex items-center justify-between">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={org.logo as string} alt={org.name} />
                        <AvatarFallback>
                          {org.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-lg font-semibold">{org.name}</h2>
                      </div>

                      <Button asChild variant="link">
                        <Link href={`/business-client/${org.slug}`}>
                          Visit{' '}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <p>Unavailable</p>
      )}
    </>
  );
}