'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  organization,
  useListOrganizations,
  useSession,
} from '@/lib/auth-client';
import { ChevronDownIcon, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ActiveOrganization, AuthSession } from '@/types';
import { toast } from '@/hooks/use-toast';
// import CopyBtn from '@/components/dashboard/copy-btn';
import { InviteMemberDialog } from './invite-member-dialog';
import { Label } from '@/components/ui/label';
import { CreateClientDialog } from './create-client-dialog';

export function ClientCard(props: {
  session: AuthSession | null;
  activeOrganization: ActiveOrganization | null;
}) {
  const organizations = useListOrganizations();
  const [optimisticOrg, setOptimisticOrg] = useState<ActiveOrganization | null>(
    props.activeOrganization
  );

  const [isRevoking, setIsRevoking] = useState<string[]>([]);

  const inviteVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
  };

  const { data } = useSession();
  const session = data || props.session;

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
              <div className="flex items-center gap-1 cursor-pointer">
                <p className="text-sm">
                  <span className="font-bold"></span>{' '}
                  {optimisticOrg?.name || 'Personal'}
                </p>

                <ChevronDownIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                className=" py-1"
                onClick={async () => {
                  organization.setActive({
                    organizationId: null,
                  });
                  setOptimisticOrg(null);
                }}
              >
                <p className="text-sm sm">Personal</p>
              </DropdownMenuItem>
              {organizations.data?.map((org) => (
                <DropdownMenuItem
                  className=" py-1"
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
                  <p className="text-sm sm">{org.name}</p>
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
              className="object-cover w-full h-full rounded-none"
              src={optimisticOrg?.logo || ''}
            />
            <AvatarFallback className="rounded-none">
              {optimisticOrg?.name?.charAt(0) || 'P'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{optimisticOrg?.name || 'Personal'}</p>
            <p className="text-xs text-muted-foreground">
              {optimisticOrg?.members.length || 1} members
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="flex flex-col gap-2 flex-grow">
            <p className="font-medium border-b-2 border-b-foreground/10">
              Members
            </p>
            <div className="flex flex-col gap-2">
              {optimisticOrg?.members.map((member) => (
                <div
                  key={member.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="sm:flex w-9 h-9">
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
                      <p className="text-xs text-muted-foreground">
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
                      <p className="text-xs text-muted-foreground">Owner</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <p className="font-medium border-b-2 border-b-foreground/10">
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
                        <p className="text-xs text-muted-foreground">
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
                                  toast({
                                    title: 'Invitation revoked successfully',
                                  });

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
                                  toast({
                                    title: ctx.error.message,
                                  });
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
                        <div>
                          {/* <CopyBtn
                            textToCopy={`${window.location.origin}/accept-invitation/${invitation.id}`}
                          /> */}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
              {optimisticOrg?.invitations.length === 0 && (
                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  No Active Invitations
                </motion.p>
              )}
              {!optimisticOrg?.id && (
                <Label className="text-xs text-muted-foreground">
                  You can&apos;t invite members to your personal workspace.
                </Label>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full mt-4">
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
