import { SidebarTrigger } from '@/components/ui/sidebar';
// import { ModeToggle } from '../common/mode-toggle';

export default function DashHeader() {
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between z-10 gap-2 border-b bg-white dark:bg-black   px-4">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
      </div>
      {/* <ModeToggle /> */}
    </header>
  );
}
