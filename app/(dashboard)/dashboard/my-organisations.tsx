'use client';

import React from 'react';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MyOrganisations() {
  const { data: organizations } = authClient.useListOrganizations();

  return (
    <div className="">
      {organizations ? (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 ">My Organisations</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {organizations.map((org) => (
              <Link href={`/orgs/${org.slug}?id=${org.id}`} key={org.id}>
                <Card className="  overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="p-4">
                      <div className="flex items-center space-x-4 mb-4">
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
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Logo</span>
                          </div>
                        )}
                        <div>
                          <h2 className="text-xl font-semibold text-center mb-2 ">
                            {org.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600  text-center text-sm">
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
        <p className="text-center py-8 ">No organizations found.</p>
      )}
    </div>
  );
}
