'use client';

import React from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MyOrganisations() {
  const { data: organizations } = authClient.useListOrganizations();

  return (
    <div className="">
      {organizations ? (
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-6 text-3xl font-bold">My Organisations</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {organizations.map((org) => (
              <Link href={`/orgs/${org.slug}?id=${org.id}`} key={org.id}>
                <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                  <CardContent className="p-4">
                    <div className="p-4">
                      <div className="mb-4 flex items-center space-x-4">
                        {org.logo ? (
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={org.logo} alt={org.name} />
                            <AvatarFallback>
                              {org.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
                            <span className="text-gray-500">No Logo</span>
                          </div>
                        )}
                        <div>
                          <h2 className="mb-2 text-center text-xl font-semibold">
                            {org.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-center text-sm text-gray-600">
                        Created: {new Date(org.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="py-8 text-center">No organizations found.</p>
      )}
    </div>
  );
}
