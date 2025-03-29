import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { organization } from '@/lib/auth-client';
import { ActiveOrganization } from '@/types';
import { Input } from '@/components/ui/input';
import { MailPlus } from 'lucide-react';

export function InviteMemberDialog({
  setOptimisticOrg,
  optimisticOrg,
}: {
  setOptimisticOrg: (org: ActiveOrganization | null) => void;
  optimisticOrg: ActiveOrganization | null;
}) {
  //   const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full gap-2" variant="secondary">
          <MailPlus size={16} />
          <p>Invite Member</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-11/12">
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Invite a member to your organization.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                await organization.inviteMember({
                  email: email,
                  role: role as 'member',
                  fetchOptions: {
                    throw: true,
                    onSuccess: (ctx: {
                      data: {
                        id: string;
                        status:
                          | 'pending'
                          | 'accepted'
                          | 'rejected'
                          | 'canceled';
                        email: string;
                        expiresAt: Date;
                        organizationId: string;
                        role: string;
                        inviterId: string;
                      };
                    }) => {
                      if (optimisticOrg) {
                        setOptimisticOrg({
                          ...optimisticOrg,
                          invitations: [
                            ...(optimisticOrg?.invitations || []),
                            ctx.data,
                          ],
                        });
                      }
                    },
                  },
                });
                toast({
                  title: '',
                });
              }}
            >
              Invite
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
