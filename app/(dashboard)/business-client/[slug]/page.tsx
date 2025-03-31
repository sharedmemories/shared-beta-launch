import { requireOrganizationRole } from '@/lib/auth-utils';

export default async function BusinessClientPage({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const resolvedParams = await params;

  const slug = resolvedParams.slug || '';

  // Get both the session and organization data
  const { session, businessOrg } = await requireOrganizationRole(
    slug,
    'member'
  );

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Welcome to {businessOrg.name}</h1>
      <p className="text-muted-foreground">
        You are logged in as {session.user.name || session.user.email}
      </p>

      {/* Your page content here */}
    </div>
  );
}
