"use client";

import React from "react";
import SignInFlow from "./sign-in-flow";
import { useAuthStore } from "@/lib/store/auth-store";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function AuthDialog() {
  const { isAuthDialogOpen, closeAuthDialog } = useAuthStore();

  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={closeAuthDialog}>
      <DialogContent>
        <DialogTitle className="sr-only">Sign in</DialogTitle>
        <SignInFlow onAuthSuccess={closeAuthDialog} />
      </DialogContent>
    </Dialog>
  );
}
