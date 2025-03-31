'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ActiveOrganization, AuthSession } from '@/types';
import { InviteMemberDialog } from './invite-member-dialog';
import { CreateClientDialog } from './create-client-dialog';
import { organization, useListOrganizations } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ClientCardProps = {
  session: AuthSession | null;
  activeOrganization: ActiveOrganization | null;
};

export function ClientCard({ session, activeOrganization }: ClientCardProps) {
  const organizations = useListOrganizations();
  const [optimisticOrg, setOptimisticOrg] = useState<ActiveOrganization | null>(
    activeOrganization
  );

  const [isRevoking, setIsRevoking] = useState<string[]>([]);

  const inviteVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
  };

  const currentMember = optimisticOrg?.members.find(
    (member) => member.userId === session?.user.id
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clients</CardTitle>
        <div className="flex justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center gap-1">
                <p className="text-sm">
                  <span className="font-bold"></span>{' '}
                  {optimisticOrg?.name || 'Personal'}
                </p>

                <ChevronDownIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                className="py-1"
                onClick={async () => {
                  organization.setActive({
                    organizationId: null,
                  });
                  setOptimisticOrg(null);
                }}
              >
                <p className="sm text-sm">Personal</p>
              </DropdownMenuItem>
              {organizations.data?.map((org) => (
                <DropdownMenuItem
                  className="py-1"
                  key={org.id}
                  onClick={async () => {
                    if (org.id === optimisticOrg?.id) {
                      return;
                    }
                    setOptimisticOrg({
                      members: [],
                      invitations: [],
                      ...org,
                    });
                    const { data } = await organization.setActive({
                      organizationId: org.id,
                    });
                    setOptimisticOrg(data);
                  }}
                >
                  <p className="sm text-sm">{org.name}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <CreateClientDialog />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="rounded-none">
            <AvatarImage
              className="h-full w-full rounded-none object-cover"
              src={optimisticOrg?.logo || ''}
            />
            <AvatarFallback className="rounded-none">
              {optimisticOrg?.name?.charAt(0) || 'P'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{optimisticOrg?.name || 'Personal'}</p>
            <p className="text-muted-foreground text-xs">
              {optimisticOrg?.members.length || 1} members
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-grow flex-col gap-2">
            <p className="border-b-foreground/10 border-b-2 font-medium">
              Members
            </p>
            <div className="flex flex-col gap-2">
              {optimisticOrg?.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-9 w-9 sm:flex">
                      <AvatarImage
                        src={member.user.image || ''}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {member.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{member.user.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  {member.role !== 'owner' &&
                    (currentMember?.role === 'owner' ||
                      currentMember?.role === 'admin') && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          organization.removeMember({
                            memberIdOrEmail: member.id,
                          });
                        }}
                      >
                        {currentMember?.id === member.id ? 'Leave' : 'Remove'}
                      </Button>
                    )}
                </div>
              ))}
              {!optimisticOrg?.id && (
                <div>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={session?.user.image || ''} />
                      <AvatarFallback>
                        {session?.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{session?.user.name}</p>
                      <p className="text-muted-foreground text-xs">Owner</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-grow flex-col gap-2">
            <p className="border-b-foreground/10 border-b-2 font-medium">
              Invites
            </p>
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {optimisticOrg?.invitations
                  .filter((invitation) => invitation.status === 'pending')
                  .map((invitation) => (
                    <motion.div
                      key={invitation.id}
                      className="flex items-center justify-between"
                      variants={inviteVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <div>
                        <p className="text-sm">{invitation.email}</p>
                        <p className="text-muted-foreground text-xs">
                          {invitation.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          disabled={isRevoking.includes(invitation.id)}
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            organization.cancelInvitation(
                              {
                                invitationId: invitation.id,
                              },
                              {
                                onRequest: () => {
                                  setIsRevoking([...isRevoking, invitation.id]);
                                },
                                onSuccess: () => {
                                  toast('Invitation revoked successfully');

                                  setIsRevoking(
                                    isRevoking.filter(
                                      (id) => id !== invitation.id
                                    )
                                  );
                                  setOptimisticOrg({
                                    ...optimisticOrg,
                                    invitations:
                                      optimisticOrg?.invitations.filter(
                                        (inv) => inv.id !== invitation.id
                                      ),
                                  });
                                },
                                onError: (ctx: {
                                  error: { message: string };
                                }) => {
                                  toast(ctx.error.message);
                                  setIsRevoking(
                                    isRevoking.filter(
                                      (id) => id !== invitation.id
                                    )
                                  );
                                },
                              }
                            );
                          }}
                        >
                          {isRevoking.includes(invitation.id) ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            'Revoke'
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
              {optimisticOrg?.invitations.length === 0 && (
                <motion.p
                  className="text-muted-foreground text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  No Active Invitations
                </motion.p>
              )}
              {!optimisticOrg?.id && (
                <Label className="text-muted-foreground text-xs">
                  You can&apos;t invite members to your personal workspace.
                </Label>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full justify-end">
          <div>
            <div>
              {optimisticOrg?.id && (
                <InviteMemberDialog
                  setOptimisticOrg={setOptimisticOrg}
                  optimisticOrg={optimisticOrg}
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
